import { Storage } from "@plasmohq/storage"
import { getSyncSettings, fetchRulesFromCloud, saveAllRulesAPI } from "./services/api"

const storage = new Storage({ area: "local" })
const RULES_STORAGE_KEY = "mock_db_rules"

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "OPEN_OPTIONS") {
    chrome.runtime.openOptionsPage();
    // Ép trình duyệt trỏ thẳng về tab Options và đẩy cửa sổ đó lên trên cùng
    const optionsUrl = chrome.runtime.getURL("options.html");
    chrome.tabs.query({ url: optionsUrl + "*" }, (tabs) => {
      if (tabs.length > 0) {
        chrome.tabs.update(tabs[0].id!, { active: true });
        chrome.windows.update(tabs[0].windowId, { focused: true });
      }
    });
  }
  
  if (message.action === "UPDATE_SYNC_ALARM") {
    setupSyncAlarm();
    sendResponse({ success: true });
  }
  
  if (message.action === "FORCE_SYNC_RULES") {
    console.log("[CareCheck] Nhận được lệnh ép đồng bộ từ Content Script (Nút Đăng nhập)");
    autoSyncRules();
    sendResponse({ success: true });
  }

  if (message.action === "FETCH_API_PERMISSIONS") {
    console.log("[CareCheck] Background: Bắt đầu lấy quyền cho user", message.username);
    fetchAndSavePermissions(message.username).then(() => {
      sendResponse({ success: true });
    });
    return true; // Keep message channel open for async
  }

  if (message.action === "CLEAR_API_PERMISSIONS") {
    console.log("[CareCheck] Background: Xóa quyền đăng nhập cũ");
    import("./services/api").then(api => {
      api.clearPermissionData().then(() => sendResponse({ success: true }));
    });
    return true;
  }

  if (message.action === "PROXY_FETCH") {
    console.log("[CareCheck] Background: Bắt đầu Proxy Fetch URL:", message.url);
    fetch(message.url)
      .then(res => res.json())
      .then(async data => {
        if (message.saveToStorageKey) {
          await storage.set(message.saveToStorageKey, data);
          console.log(`[CareCheck] Background: Đã lưu API data vào biến [${message.saveToStorageKey}] an toàn`);
        }
        if (message.saveParamToStorageKey && message.paramValue !== undefined) {
          await storage.set(message.saveParamToStorageKey, message.paramValue);
          console.log(`[CareCheck] Background: Đã lưu Param value vào biến [${message.saveParamToStorageKey}] an toàn`);
        }
        sendResponse({ success: true, data });
      })
      .catch(err => sendResponse({ success: false, error: err.message || String(err) }));
    return true; // Keep message channel open for async
  }
})

async function fetchAndSavePermissions(username: string) {
  try {
    const { getPermissionSettings, savePermissionData } = await import("./services/api");
    const settings = await getPermissionSettings();
    
    if (!settings.enabled) {
      console.log("[CareCheck] Phân quyền API đang tắt.");
      return;
    }

    let permissionData: any[] = [];

    if (settings.apiUrl) {
      // Có link API thật -> Fetch
      const targetUrl = settings.apiUrl.includes('?') 
        ? `${settings.apiUrl}${username}` 
        : `${settings.apiUrl}?user=${username}`;
      
      console.log("[CareCheck] Đang gọi API thật:", targetUrl);
      const res = await fetch(targetUrl);
      if (res.ok) {
        permissionData = await res.json();
      } else {
        console.warn("[CareCheck] Lỗi gọi API, mã lỗi:", res.status);
      }
    } else {
      // KHÔNG CÓ LINK API -> DÙNG GIẢ LẬP (MOCK DATA)
      console.log("[CareCheck] Đang sử dụng Mock Data cho user", username);
      if (username === "dkls.bvdkls") {
        permissionData = [
          { "ma_dich_vu": "22.0015.1308" }, // Được phép
          { "ma_dich_vu": "22.0154.1735" }  // Được phép
        ];
      } else {
        // Tài khoản khác thì giả vờ chỉ có quyền làm 1 dịch vụ
        permissionData = [
          { "ma_dich_vu": "03.0191.1510" } 
        ];
      }
    }

    // Lưu vào Storage
    await savePermissionData(permissionData);
    console.log(`[CareCheck] Đã lưu ${permissionData.length} quyền cho user ${username}`);
  } catch (err) {
    console.error("[CareCheck] Lỗi khi tải quyền API:", err);
  }
}

async function setupSyncAlarm() {
  const settings = await getSyncSettings();
  const interval = settings.syncInterval || 30;
  
  // Xóa alarm cũ nếu có
  chrome.alarms.clear("syncRulesAlarm", () => {
    // Tạo lại alarm mới với chu kỳ mới
    chrome.alarms.create("syncRulesAlarm", {
      periodInMinutes: interval
    });
    console.log(`[CareCheck] Đã cài đặt chu kỳ đồng bộ ngầm: ${interval} phút`);
  });
}

// Xóa dòng này ở top-level để tránh reset alarm mỗi khi Service Worker thức dậy
// setupSyncAlarm();

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "syncRulesAlarm") {
    autoSyncRules();
  }
});

// Chạy một lần khi Extension vừa được load
chrome.runtime.onStartup.addListener(() => {
  setupSyncAlarm();
  autoSyncRules();
});
chrome.runtime.onInstalled.addListener(() => {
  setupSyncAlarm();
  autoSyncRules();
});

async function autoSyncRules() {
  try {
    const settings = await getSyncSettings();
    
    // Nếu là Admin, admin có thể tự bấm đồng bộ thủ công, không nhất thiết phải kéo ngầm liên tục
    // Nhưng để an toàn cho máy con (CLIENT), bắt buộc phải kéo ngầm.
    if (settings.role !== 'CLIENT') {
      console.log("[CareCheck] Background: Bỏ qua Auto-Sync vì đây là máy Admin.");
      return;
    }

    console.log("[CareCheck] Background: Bắt đầu tự động đồng bộ luật từ Cloud...");
    const fetchedRules = await fetchRulesFromCloud(settings);
    
    if (fetchedRules && Array.isArray(fetchedRules)) {
      await saveAllRulesAPI(fetchedRules);
      console.log("[CareCheck] Background: Đã đồng bộ thành công", fetchedRules.length, "luật.");
    }
  } catch (err) {
    console.error("[CareCheck] Background: Lỗi đồng bộ ngầm", err);
  }
}
