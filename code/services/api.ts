import { Storage } from "@plasmohq/storage"
import type { Rule } from "../features/admin/RuleList"

const storage = new Storage({ area: "local" })
const RULES_STORAGE_KEY = "mock_db_rules"
const SYNC_SETTINGS_KEY = "cloud_sync_settings"

export type SyncRole = "ADMIN" | "CLIENT";
export type BackendType = "JSONBIN" | "CUSTOM_API";

export interface SyncSettings {
  role: SyncRole;
  backendType: BackendType;
  
  // For JSONBin
  binId?: string;
  masterKey?: string;
  
  // For Custom API
  getUrl?: string;
  postUrl?: string;
  apiKey?: string;
  
  // General
  syncInterval?: number; // Chu kỳ đồng bộ ngầm (phút)
}

// ----------------------------------------------------
// PHÂN QUYỀN CHỈ ĐỊNH API SETTINGS
// ----------------------------------------------------
export interface PermissionSettings {
  enabled: boolean;
  apiUrl: string;
  loginBtnSelector: string;
  usernameSelector: string;
  serviceCodeSuffix: string;
  icdInputSelector: string;
}

export const defaultPermissionSettings: PermissionSettings = {
  enabled: false,
  apiUrl: "",
  loginBtnSelector: "#btnLogin, button[type='submit']",
  usernameSelector: "input[name='username'], input[type='text'], #username",
  serviceCodeSuffix: "_MADICHVU",
  icdInputSelector: ""
}

const PERMISSION_SETTINGS_KEY = "advanced_permission_settings";
const PERMISSION_DATA_KEY = "advanced_permission_data"; // Nơi lưu mảng mã dịch vụ

export async function getPermissionSettings(): Promise<PermissionSettings> {
  const settings = await storage.get<PermissionSettings>(PERMISSION_SETTINGS_KEY);
  return settings || defaultPermissionSettings;
}

export async function savePermissionSettings(settings: PermissionSettings): Promise<void> {
  await storage.set(PERMISSION_SETTINGS_KEY, settings);
}

export async function clearPermissionData(): Promise<void> {
  await storage.remove(PERMISSION_DATA_KEY);
}

export async function savePermissionData(data: any): Promise<void> {
  await storage.set(PERMISSION_DATA_KEY, data);
}

export async function getPermissionData(): Promise<any> {
  return await storage.get(PERMISSION_DATA_KEY);
}

export const defaultSyncSettings: SyncSettings = {
  role: "ADMIN",
  backendType: "CUSTOM_API",
  binId: "",
  masterKey: "",
  getUrl: "https://htqlbenhvien.bvdklangson.com.vn:201/htqlbenhvien/api/extension-config?key=carecheck_rules",
  postUrl: "https://htqlbenhvien.bvdklangson.com.vn:201/htqlbenhvien/api/extension-config?key=carecheck_rules",
  apiKey: "",
  syncInterval: 30
}

export async function getSyncSettings(): Promise<SyncSettings> {
  const settings = await storage.get<SyncSettings>(SYNC_SETTINGS_KEY);
  return settings || defaultSyncSettings;
}

export async function saveSyncSettings(settings: SyncSettings): Promise<void> {
  await storage.set(SYNC_SETTINGS_KEY, settings);
}

// ----------------------------------------------------
// LOCAL STORAGE API (For UI and Content Script reading)
// ----------------------------------------------------

export async function fetchRulesAPI(): Promise<Rule[]> {
  const rules = await storage.get<Rule[]>(RULES_STORAGE_KEY)
  if (!rules || rules.length === 0) {
    return [];
  }
  return rules
}

export async function saveRuleAPI(rule: Rule): Promise<boolean> {
  const currentRules = await fetchRulesAPI()
  const existingIndex = currentRules.findIndex(r => r.id === rule.id)
  let updatedRules;
  if (existingIndex >= 0) {
    updatedRules = [...currentRules]
    updatedRules[existingIndex] = rule
  } else {
    updatedRules = [...currentRules, rule]
  }
  
  await storage.set(RULES_STORAGE_KEY, updatedRules)
  
  // If ADMIN, push to cloud
  const settings = await getSyncSettings();
  if (settings.role === "ADMIN") {
    await pushRulesToCloud(updatedRules, settings).catch(e => console.error(e));
  }
  
  return true
}

export async function deleteRuleAPI(id: string): Promise<boolean> {
  const rules = await fetchRulesAPI()
  const updatedRules = rules.filter(r => r.id !== id)
  await storage.set(RULES_STORAGE_KEY, updatedRules)
  
  // If ADMIN, push to cloud
  const settings = await getSyncSettings();
  if (settings.role === "ADMIN") {
    await pushRulesToCloud(updatedRules, settings).catch(e => console.error(e));
  }
  
  return true
}

export async function saveAllRulesAPI(rules: Rule[]): Promise<boolean> {
  await storage.set(RULES_STORAGE_KEY, rules)
  
  // If ADMIN, push to cloud
  const settings = await getSyncSettings();
  if (settings.role === "ADMIN") {
    await pushRulesToCloud(rules, settings).catch(e => console.error(e));
  }
  return true
}

// ----------------------------------------------------
// CLOUD SYNC API
// ----------------------------------------------------

export async function fetchRulesFromCloud(settings?: SyncSettings): Promise<Rule[] | null> {
  const config = settings || await getSyncSettings();
  
  try {
    if (config.backendType === "JSONBIN") {
      if (!config.binId) {
        console.warn("[CareCheck] Bỏ qua đồng bộ: Chưa cấu hình JSONBin Bin ID");
        return null;
      }
      const headers: HeadersInit = {};
      if (config.masterKey) headers["X-Master-Key"] = config.masterKey;
      
      const res = await fetch(`https://api.jsonbin.io/v3/b/${config.binId}/latest`, { headers });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      return data.record as Rule[];
    } 
    else if (config.backendType === "CUSTOM_API") {
      if (!config.getUrl) {
        console.warn("[CareCheck] Bỏ qua đồng bộ: Chưa cấu hình Custom API GET URL");
        return null;
      }
      const headers: HeadersInit = {};
      if (config.apiKey) headers["Authorization"] = `Bearer ${config.apiKey}`;
      
      const res = await fetch(config.getUrl, { headers });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      return Array.isArray(data) ? data : (data.rules || data.data || data); // Attempt to unpack
    }
  } catch (error) {
    console.error("[CareCheck] Error fetching from cloud:", error);
  }
  return null;
}

export async function pushRulesToCloud(rules: Rule[], settings?: SyncSettings): Promise<void> {
  const config = settings || await getSyncSettings();
  if (config.role !== "ADMIN") return; // Only Admin can push
  
  try {
    if (config.backendType === "JSONBIN") {
      if (!config.binId || !config.masterKey) {
        console.warn("[CareCheck] Bỏ qua Push Cloud: Chưa cấu hình JSONBin Bin ID hoặc Master Key");
        return;
      }
      
      const res = await fetch(`https://api.jsonbin.io/v3/b/${config.binId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Master-Key': config.masterKey
        },
        body: JSON.stringify(rules)
      });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    } 
    else if (config.backendType === "CUSTOM_API") {
      if (!config.postUrl) {
        console.warn("[CareCheck] Bỏ qua Push Cloud: Chưa cấu hình Custom API POST URL");
        return;
      }
      const headers: HeadersInit = { 'Content-Type': 'application/json' };
      if (config.apiKey) headers["Authorization"] = `Bearer ${config.apiKey}`;
      
      const res = await fetch(config.postUrl, {
        method: 'POST', // Or PUT, typically POST or PUT works
        headers,
        body: JSON.stringify(rules)
      });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    }
  } catch (error) {
    console.error("[CareCheck] Error pushing to cloud:", error);
  }
}
