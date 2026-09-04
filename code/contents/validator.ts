import type { PlasmoCSConfig } from "plasmo"
import { Storage } from "@plasmohq/storage"
import type { Rule, LogicGroup, ConditionNode } from "../features/admin/RuleList"

export const config: PlasmoCSConfig = {
  matches: ["*://*.vncare.vn/*"],
  all_frames: true
}

const storage = new Storage({ area: "local" })
const RULES_STORAGE_KEY = "mock_db_rules"

// Đánh dấu phần tử đã bị lỗi để quản lý
const ERROR_ATTR = "data-carecheck-error";
const TOAST_CONTAINER_ID = "carecheck-toast-container";
const ruleStates = (window as any).__carecheckRuleStates = (window as any).__carecheckRuleStates || new Map<string, boolean>();
const dismissedRules = (window as any).__carecheckDismissedRules = (window as any).__carecheckDismissedRules || new Set<string>();
const ruleOffendingValues = (window as any).__carecheckOffendingValues = (window as any).__carecheckOffendingValues || new Map<string, string>();
let activeRules: Rule[] = [];

// Bơm CSS Animation cho Toast
if (typeof document !== "undefined") {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes carecheck-slide-in {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
  `;
  document.head.appendChild(style);
}

export async function showWarningUI(rule: Rule) {
  if (dismissedRules.has(rule.id)) return;

  const warningId = `carecheck-warning-${rule.id}`;
  const existingWarning = document.getElementById(warningId);
  if (existingWarning) {
    existingWarning.remove(); // Xóa Toast cũ để cập nhật Toast mới (khi click liên tiếp nhiều row)
  }
  
  const config = rule.warningConfig || {
    template: "TOAST",
    position: "BOTTOM_RIGHT",
    title: "",
    message: rule.message || "Cảnh báo Lỗi!"
  };
  
  // Hàm xử lý thông điệp động (String Interpolation)
  const interpolateString = async (str: string) => {
    if (!str) return str;
    const matches = str.match(/\{\{([^}]+)\}\}/g);
    if (!matches) return str;
    
    let result = str;
    for (const match of matches) {
      if (match === "{{VALUE}}") continue; // Sẽ được xử lý riêng ở dưới
      const fullPath = match.replace(/[{}]/g, '').trim();
      const parts = fullPath.split(".");
      if (parts.length > 0) {
        const storageKey = parts[0];
        const data = await storage.get<any>(storageKey);
        let val = "";
        if (data) {
          const extracted = extractFromPath(data, parts.slice(1).join("."));
          val = extracted != null ? String(extracted) : "";
        }
        // Replace all occurrences of this specific match
        result = result.split(match).join(val);
      }
    }
    
    // Thay thế nhanh {{VALUE}} bằng giá trị vi phạm (nếu có)
    const offendingValue = (window as any).__carecheckOffendingValues?.get(rule.id) || "";
    result = result.replace(/\{\{VALUE\}\}/g, offendingValue);
    
    return result;
  };

  const messageText = await interpolateString(config.message);
  const titleText = await interpolateString(config.title || "");
  
  if (!messageText) return; // Nếu rỗng thì ẩn đi theo rule
  
  const wrapper = document.createElement("div");
  wrapper.id = warningId;
  wrapper.style.zIndex = "2147483647"; // Max z-index
  wrapper.style.pointerEvents = "auto";
  wrapper.style.fontFamily = "sans-serif";
  
  // Hàm tạo Nút Hành động
  const createActionBtn = () => {
    if (!rule.toastAction?.apiUrl || !rule.toastAction?.label) return null;
    const btn = document.createElement('button');
    btn.innerText = rule.toastAction.label;
    btn.style.cssText = "background: white; color: #ef4444; border: none; padding: 6px 12px; border-radius: 4px; font-weight: bold; font-size: 14px; cursor: pointer;";
    if (config.template === "TOAST") btn.style.marginLeft = "auto";
    if (config.template === "MODAL") btn.style.marginTop = "12px";
    
    btn.onclick = async (e) => {
      e.stopPropagation();
      try {
        btn.innerText = "Đang xử lý...";
        btn.disabled = true;
        let username = "";
        if (rule.toastAction!.userSelector) {
          try {
            const userEl = document.querySelector(rule.toastAction!.userSelector) as any;
            username = userEl ? (userEl.value || userEl.textContent || "") : "";
          } catch (e) {
            console.error(`[CareCheck] Invalid userSelector in toastAction: ${rule.toastAction!.userSelector}`);
          }
        }
        const offendingValue = ruleOffendingValues.get(rule.id) || "";
        const res = await fetch(rule.toastAction!.apiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: username.trim(), error_value: offendingValue.trim() })
        });
        if (res.ok) {
          btn.style.background = "#22c55e"; btn.style.color = "white"; btn.innerText = "✓ Thành công";
          setTimeout(() => wrapper.remove(), 2000);
        } else {
          btn.innerText = "❌ Lỗi Server";
        }
      } catch (err) {
        btn.innerText = "❌ Lỗi Mạng";
      }
    };
    return btn;
  };
  
  const actionBtn = createActionBtn();
  const closeBtnHtml = `<button class="carecheck-close-btn" style="background:none;border:none;color:inherit;cursor:pointer;font-size:20px;opacity:0.8;padding:0;line-height:1;" title="Đóng">✕</button>`;

  if (config.template === "MODAL") {
    wrapper.style.position = "fixed";
    wrapper.style.inset = "0";
    wrapper.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    wrapper.style.backdropFilter = "blur(4px)";
    wrapper.style.display = "flex";
    
    // Position alignment cho Modal (CENTER là mặc định)
    wrapper.style.alignItems = "center";
    wrapper.style.justifyContent = "center";
    
    wrapper.innerHTML = `
      <div class="carecheck-modal-content" style="background: white; border-radius: 12px; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25); max-width: 500px; width: 90%; overflow: hidden; animation: carecheck-slide-in 0.3s ease-out;">
        <div style="background: #ef4444; color: white; padding: 16px 20px; display: flex; justify-content: space-between; align-items: center;">
          <h2 style="margin: 0; font-size: 18px; font-weight: bold; display: flex; gap: 8px; align-items: center;">
            <span style="font-size: 24px;">⚠️</span> ${titleText || "Cảnh báo Hệ thống"}
          </h2>
          ${closeBtnHtml}
        </div>
        <div style="padding: 24px; color: #1e293b; font-size: 16px; line-height: 1.5;">
          ${messageText}
        </div>
        <div class="carecheck-action-container" style="padding: 0 24px 24px; display: flex; justify-content: flex-end;"></div>
      </div>
    `;
    
    // Đóng khi click X hoặc ra ngoài nền
    wrapper.onclick = (e) => {
      if (e.target === wrapper) {
        wrapper.remove();
        dismissedRules.add(rule.id);
      }
    };
    wrapper.querySelector('.carecheck-close-btn')?.addEventListener('click', () => {
      wrapper.remove();
      dismissedRules.add(rule.id);
    });
    
    if (actionBtn) {
      actionBtn.style.background = "#ef4444";
      actionBtn.style.color = "white";
      wrapper.querySelector('.carecheck-action-container')?.appendChild(actionBtn);
    }
    
    document.body.appendChild(wrapper);
  } 
  else if (config.template === "BANNER") {
    wrapper.style.position = "fixed";
    wrapper.style.left = "0";
    wrapper.style.right = "0";
    if (config.position === "BOTTOM_CENTER") {
      wrapper.style.bottom = "0";
    } else {
      wrapper.style.top = "0";
    }
    wrapper.style.backgroundColor = "#ef4444";
    wrapper.style.color = "white";
    wrapper.style.padding = "12px 24px";
    wrapper.style.display = "flex";
    wrapper.style.alignItems = "center";
    wrapper.style.justifyContent = "center";
    wrapper.style.gap = "16px";
    wrapper.style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.1)";
    
    wrapper.innerHTML = `
      <div style="display: flex; align-items: center; gap: 8px; flex: 1; max-width: 1200px; margin: 0 auto;">
        <span style="font-size: 20px;">⚠️</span>
        ${titleText ? `<strong>${titleText}:</strong>` : ""} 
        <span>${messageText}</span>
        <div class="carecheck-action-container" style="margin-left: auto; display: flex; align-items: center; gap: 16px;">
          ${closeBtnHtml}
        </div>
      </div>
    `;
    
    wrapper.querySelector('.carecheck-close-btn')?.addEventListener('click', () => wrapper.remove());
    if (actionBtn) {
      wrapper.querySelector('.carecheck-action-container')?.prepend(actionBtn);
    }
    
    document.body.appendChild(wrapper);
  }
  else {
    // TOAST (Mặc định)
    wrapper.style.backgroundColor = "#ef4444"; // red-500
    wrapper.style.color = "white";
    wrapper.style.padding = "16px 24px";
    wrapper.style.borderRadius = "8px";
    wrapper.style.boxShadow = "0 10px 15px -3px rgba(0, 0, 0, 0.3)";
    wrapper.style.fontWeight = "bold";
    wrapper.style.fontSize = "16px";
    wrapper.style.display = "flex";
    wrapper.style.alignItems = "center";
    wrapper.style.gap = "12px";
    wrapper.style.animation = "carecheck-slide-in 0.3s ease-out";
    
    // Tìm hoặc tạo Container cho Toast dựa trên vị trí
    const position = config.position || "BOTTOM_RIGHT";
    const containerId = `carecheck-toast-container-${position}`;
    let container = document.getElementById(containerId);
    
    if (!container) {
      container = document.createElement("div");
      container.id = containerId;
      container.style.position = "fixed";
      container.style.display = "flex";
      // Xếp chồng từ dưới lên hoặc từ trên xuống tùy vị trí
      container.style.flexDirection = position.startsWith("BOTTOM") ? "column-reverse" : "column";
      container.style.gap = "12px";
      container.style.zIndex = "999999";
      
      const margin = "20px";
      if (position === "TOP_LEFT") { container.style.top = margin; container.style.left = margin; }
      else if (position === "TOP_RIGHT") { container.style.top = margin; container.style.right = margin; }
      else if (position === "BOTTOM_LEFT") { container.style.bottom = margin; container.style.left = margin; }
      else { container.style.bottom = margin; container.style.right = margin; }
      
      document.body.appendChild(container);
    }
    
    wrapper.innerHTML = `
      <span style="font-size: 24px;">⚠️</span> 
      <span style="flex: 1;">${messageText}</span>
      ${closeBtnHtml}
    `;
    
    const closeBtn = wrapper.querySelector('.carecheck-close-btn');
    const dismissHandler = () => {
      wrapper.remove();
      ruleStates.set(rule.id, false);
      if (rule.triggerMode !== "EVENT_BASED") {
        dismissedRules.add(rule.id); // Chỉ đánh dấu đóng vĩnh viễn với REALTIME
      }
    };
    
    closeBtn?.addEventListener('click', dismissHandler);
    
    // Bỏ tính năng "click ra ngoài để đóng" đối với Toast vì giờ nó là 1 list chồng lên nhau,
    // click ra ngoài thì đóng nhầm các Toast khác. Bác sĩ phải ấn X hoặc sửa lỗi để đóng.
    
    if (actionBtn) {
      if (closeBtn && closeBtn.parentNode) {
        closeBtn.parentNode.insertBefore(actionBtn, closeBtn);
      } else {
        wrapper.appendChild(actionBtn);
      }
    }
    
    container.appendChild(wrapper);
  }
}

function removeWarningUI(ruleId: string) {
  const warning = document.getElementById(`carecheck-warning-${ruleId}`);
  if (warning) {
    warning.remove();
  }
}

function extractFromPath(obj: any, path: string): any {
  if (!obj || !path) return obj;
  const parts = path.split('.');
  let current = obj;
  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    if (current == null) return undefined;
    if (Array.isArray(current)) {
      // If we hit an array, the current part needs to be extracted from each item
      const remainingPath = parts.slice(i).join('.');
      return current.map((item: any) => extractFromPath(item, remainingPath)).filter((item: any) => item != null);
    }
    current = current[part];
  }
  return current;
}

const storageCache = new Map<string, any>();

function getConditionDataSync(node: ConditionNode): any {
  if (node.dataSourceType === "STATIC") {
    return node.value || "";
  }
  
  if (node.dataSourceType === "LOCAL_STORAGE" && node.localStorageKey) {
    let data = storageCache.get(node.localStorageKey);
    if (data && node.apiResponsePath) {
      data = extractFromPath(data, node.apiResponsePath);
    }
    return data;
  }

  // API is not supported in EVENT_BASED realtime synchronous evaluation yet.
  return "";
}

function evaluateConditionSync(node: ConditionNode, ruleId: string, triggerEl?: Element): boolean {
  let el: Element | null = null;
  const safeSelector = node.selector ? node.selector.replace(/[“”]/g, '"').replace(/[‘’]/g, "'") : "";
  
  try {
    if (!safeSelector) return false; // Tránh lỗi DOMException khi người dùng để trống selector

    if (safeSelector === "{{VALUE}}") {
      if (triggerEl) {
        const row = triggerEl.closest('tr') || triggerEl.closest('.jqgrow') || triggerEl.closest('.row');
        if (row) {
          const targetData = getConditionDataSync(node);
          
          // Xử lý đặc biệt cho jqGrid (Frozen columns chia row làm 2 thẻ tr ở 2 bảng khác nhau)
          let rowsToCheck: Element[] = [row];
          const tr = row as HTMLTableRowElement;
          
          if (row.id) {
            // Ưu tiên dùng id vì jqGrid luôn đặt id bằng nhau cho cả 2 nửa dòng (rất chính xác)
            try {
              const escapedId = CSS.escape(row.id);
              const matchingRows = document.querySelectorAll(`[id="${escapedId}"]`);
              rowsToCheck = Array.from(matchingRows);
            } catch (e) {}
          } else if (tr.tagName === "TR") {
            // Dự phòng: nếu không có id, dùng rowIndex (nhưng có thể lệch nếu header 2 bảng khác nhau)
            const rowIndex = tr.rowIndex;
            if (rowIndex >= 0) {
              const allTables = document.querySelectorAll('table');
              allTables.forEach(table => {
                if (table.rows && table.rows.length > rowIndex) {
                  const siblingRow = table.rows[rowIndex];
                  if (siblingRow && siblingRow !== tr) {
                    rowsToCheck.push(siblingRow);
                  }
                }
              });
            }
          }
          
          for (const r of rowsToCheck) {
            // Kiểm tra cả input value và textContent của TẤT CẢ các thẻ bên trong dòng
            const textVal = r.textContent?.trim() || "";
            if (textVal && performOperatorCheck(node, textVal, targetData, ruleId)) {
              console.log(`[CareCheck DEBUG] Rule ${ruleId} - Selector: {{VALUE}} | Value: "${textVal}" | Match: TRUE (row textContent)`);
              return true;
            }
            
            const inputs = r.querySelectorAll('input:not([type="checkbox"])');
            for (let i = 0; i < inputs.length; i++) {
              const val = (inputs[i] as HTMLInputElement).value?.trim();
              if (val && performOperatorCheck(node, val, targetData, ruleId)) {
                console.log(`[CareCheck DEBUG] Rule ${ruleId} - Selector: {{VALUE}} | Value: "${val}" | Match: TRUE (input value)`);
                return true;
              }
            }
            
            // Thử check lại từng ô (td/div)
            const cells = r.querySelectorAll('td, div');
            for (let i = 0; i < cells.length; i++) {
              const val = cells[i].textContent?.trim() || "";
              if (val && performOperatorCheck(node, val, targetData, ruleId)) {
                console.log(`[CareCheck DEBUG] Rule ${ruleId} - Selector: {{VALUE}} | Value: "${val}" | Match: TRUE (cell textContent)`);
                return true;
              }
            }
          }
          console.log(`[CareCheck DEBUG] Rule ${ruleId} - Selector: {{VALUE}} | Target: "${targetData}" | Match: FALSE (Checked ${rowsToCheck.length} rows)`);
        } else {
          console.log(`[CareCheck DEBUG] Rule ${ruleId} - Selector: {{VALUE}} | Lỗi: Không tìm thấy dòng cha (tr) của trigger!`);
        }
      } else {
        console.log(`[CareCheck DEBUG] Rule ${ruleId} - Selector: {{VALUE}} | Lỗi: triggerEl bị null!`);
      }
      return false;
    }

    if (safeSelector.startsWith("{{STORAGE:") && safeSelector.endsWith("}}")) {
      const fullPath = safeSelector.substring(10, safeSelector.length - 2).trim();
      const dotIndex = fullPath.indexOf('.');
      const rootKey = dotIndex > -1 ? fullPath.substring(0, dotIndex) : fullPath;
      const jsonPath = dotIndex > -1 ? fullPath.substring(dotIndex + 1) : "";
      
      let storageVal = storageCache.get(rootKey);
      if (jsonPath && storageVal) {
        storageVal = extractFromPath(storageVal, jsonPath);
      }
      
      const targetData = getConditionDataSync(node);
      const valStr = typeof storageVal === 'string' ? storageVal : JSON.stringify(storageVal || "");
      const result = performOperatorCheck(node, valStr, targetData, ruleId);
      console.log(`[CareCheck DEBUG] Rule ${ruleId} - Selector: ${safeSelector} | StorageValue: "${valStr}" | Operator: ${node.operator} | Target: "${targetData}" | Result: ${result}`);
      return result;
    }

    if (triggerEl) {
      const row = triggerEl.closest('tr') || triggerEl.closest('.row') || triggerEl.parentElement;
      if (row) {
        el = row.querySelector(safeSelector);
      }
    }
    if (!el) {
      el = document.querySelector(safeSelector);
    }
  } catch (e) {
    console.error(`[CareCheck] Invalid selector in condition for rule ${ruleId}: ${node.selector}`, e);
    return false;
  }
  
  if (!el) {
    console.log(`[CareCheck DEBUG] Rule ${ruleId}: Không tìm thấy phần tử cho selector ${safeSelector}`);
    return false;
  }

  const value = (el as HTMLInputElement).value?.trim() || el.textContent?.trim() || "";
  const targetData = getConditionDataSync(node);
  
  const result = performOperatorCheck(node, value, targetData, ruleId);
  console.log(`[CareCheck DEBUG] Rule ${ruleId} - Selector: ${safeSelector} | Value: "${value}" | Operator: ${node.operator} | Target: "${targetData}" | Result: ${result}`);
  return result;
}

function performOperatorCheck(node: ConditionNode, value: string, targetData: any, ruleId: string): boolean {
  if (node.operator === "IN_ARRAY" || node.operator === "NOT_IN_ARRAY") {
    let arr: any[] = [];
    if (Array.isArray(targetData)) {
      arr = targetData;
    } else if (typeof targetData === "string") {
      arr = targetData.split(",").map(s => s.trim());
    }
    
    // So sánh mảng
    const valString = String(value).toLowerCase();
    const isInArray = arr.some(item => String(item).toLowerCase() === valString);
    
    if (node.operator === "IN_ARRAY") {
      if (isInArray) ruleOffendingValues.set(ruleId, value);
      return isInArray;
    }
    if (node.operator === "NOT_IN_ARRAY") {
      if (!isInArray) ruleOffendingValues.set(ruleId, value);
      return !isInArray;
    }
  }

  const targetVal = String(targetData || "").trim();
  const targetNum = parseFloat(targetVal) || 0;
  const valNum = parseFloat(value) || 0;

  let isMatched = false;
  switch (node.operator) {
    case "==": isMatched = value.toLowerCase() === targetVal.toLowerCase(); break;
    case "!=": isMatched = value.toLowerCase() !== targetVal.toLowerCase(); break;
    case "CONTAINS": isMatched = value.toLowerCase().includes(targetVal.toLowerCase()); break;
    case "NOT_CONTAINS": isMatched = !value.toLowerCase().includes(targetVal.toLowerCase()); break;
    case "IS_EMPTY": isMatched = !value; break;
    case "IS_NOT_EMPTY": isMatched = !!value; break;
    case "LENGTH_EQUALS": isMatched = value.length === (parseInt(targetVal, 10) || 0); break;
    case "LENGTH_NOT_EQUALS": isMatched = value.length !== (parseInt(targetVal, 10) || 0); break;
    case "LENGTH_MIN": isMatched = value.length >= (parseInt(targetVal, 10) || 0); break;
    case ">": isMatched = valNum > targetNum; break;
    case "<": isMatched = valNum < targetNum; break;
    case ">=": isMatched = valNum >= targetNum; break;
    case "<=": isMatched = valNum <= targetNum; break;
  }

  if (isMatched) {
    ruleOffendingValues.set(ruleId, value);
  }
  return isMatched;
}

function evaluateGroupSync(group: LogicGroup, ruleId: string, triggerEl?: Element): boolean {
  if (group.logicalOp === "AND") {
    for (const child of group.conditions) {
      const isTrue = child.type === "CONDITION" ? evaluateConditionSync(child as ConditionNode, ruleId, triggerEl) : evaluateGroupSync(child as LogicGroup, ruleId, triggerEl);
      if (!isTrue) return false; // Fail fast for AND
    }
    return true; // All true
  } else { // OR
    for (const child of group.conditions) {
      const isTrue = child.type === "CONDITION" ? evaluateConditionSync(child as ConditionNode, ruleId, triggerEl) : evaluateGroupSync(child as LogicGroup, ruleId, triggerEl);
      if (isTrue) return true; // Succeed fast for OR
    }
    return false; // All false
  }
}

function applyErrorVisuals(el: Element, ruleId: string = "true") {
  // Nếu el là một checkbox nằm trong 1 row (bảng), ta nên tô đỏ CẢ DÒNG thay vì chỉ tô mỗi cái checkbox bé xíu
  let targetEl = el;
  if (el.tagName === "INPUT" && (el as HTMLInputElement).type === "checkbox") {
    const tr = el.closest('tr') || el.closest('.jqgrow');
    if (tr) targetEl = tr;
  }

  if (targetEl.hasAttribute(ERROR_ATTR) && targetEl.getAttribute(ERROR_ATTR) === ruleId) return;
  targetEl.setAttribute(ERROR_ATTR, ruleId);
  
  const htmlEl = targetEl as HTMLElement;
  
  // Lưu style cũ
  htmlEl.dataset.oldOutline = htmlEl.style.outline || "";
  htmlEl.dataset.oldOutlineOffset = htmlEl.style.outlineOffset || "";

  // Áp dụng style lỗi (Chỉ bôi viền đỏ, giữ nguyên màu nền vàng của dòng)
  // Dùng outline thay vì border vì outline hoạt động cực tốt trên thẻ <tr> mà không làm lệch form bảng
  htmlEl.style.setProperty("outline", "2px solid red", "important");
  htmlEl.style.setProperty("outline-offset", "-1px", "important");
  
  // Không dùng tooltip cục bộ nữa vì đã có Toast ở góc
}

function removeErrorVisuals(el: Element) {
  let targetEl = el;
  if (el.tagName === "INPUT" && (el as HTMLInputElement).type === "checkbox") {
    const tr = el.closest('tr') || el.closest('.jqgrow');
    if (tr) targetEl = tr;
  }

  if (!targetEl.hasAttribute(ERROR_ATTR)) return;
  
  const htmlEl = targetEl as HTMLElement;
  htmlEl.style.removeProperty("outline");
  htmlEl.style.removeProperty("outline-offset");
  
  // Trị dứt điểm căn bệnh mờ chữ (white text) do bóng ma cũ để lại
  htmlEl.style.setProperty("color", "black", "important");
  
  if (htmlEl.dataset.oldOutline) {
    htmlEl.style.outline = htmlEl.dataset.oldOutline;
  }
  if (htmlEl.dataset.oldOutlineOffset) {
    htmlEl.style.outlineOffset = htmlEl.dataset.oldOutlineOffset;
  }
  
  el.removeAttribute(ERROR_ATTR);
}

// Lấy danh sách luật và chạy kiểm tra đệ quy
let isEvaluating = false;
let engineInterval: ReturnType<typeof setInterval>;
let cachedRules: Rule[] = [];

// Theo dõi thay đổi từ storage để cập nhật cache
if (typeof chrome !== "undefined" && chrome.storage) {
  chrome.storage.onChanged.addListener((changes, area) => {
    if (area === "local") {
      if (changes[RULES_STORAGE_KEY]) {
        try {
          cachedRules = JSON.parse(changes[RULES_STORAGE_KEY].newValue) || [];
        } catch (e) {
          cachedRules = changes[RULES_STORAGE_KEY].newValue || [];
        }
        
        // Khi rules đổi, quét lại các key cần cache và fetch bổ sung
        const newKeys = new Set<string>();
        const extractNewKeys = (group: LogicGroup) => {
          group.conditions.forEach(c => {
            if (c.type === "CONDITION") {
              const node = c as ConditionNode;
              if (node.dataSourceType === "LOCAL_STORAGE" && node.localStorageKey) {
                newKeys.add(node.localStorageKey);
              }
              if (node.selector && node.selector.startsWith("{{STORAGE:") && node.selector.endsWith("}}")) {
                const fullPath = node.selector.substring(10, node.selector.length - 2).trim();
                const rootKey = fullPath.split('.')[0];
                if (rootKey) newKeys.add(rootKey);
              }
            } else {
              extractNewKeys(c as LogicGroup);
            }
          });
        };
        cachedRules.forEach(r => { if (r.logic) extractNewKeys(r.logic); });
        
        newKeys.forEach(key => {
          if (!storageCache.has(key)) {
            chrome.storage.local.get(key, (data) => {
              storageCache.set(key, data[key]);
            });
          }
        });
      }
      
      // Luôn đồng bộ dữ liệu mới nhất vào storageCache nếu nó thay đổi
      for (const [key, change] of Object.entries(changes)) {
        if (key !== RULES_STORAGE_KEY) {
          storageCache.set(key, change.newValue);
        }
      }
    }
  });
}

export function evaluateRuleAndUpdateStateSync(rule: Rule, triggerEl?: Element) {
  try {
    console.log(`[CareCheck DEBUG] === BẮT ĐẦU ĐÁNH GIÁ LUẬT: ${rule.name} (${rule.id}) ===`);
  
    const action = rule.actionType || "SHOW_WARNING";

  if (action === "CLEAR_STORAGE") {
    if (rule.clearStorageConfig?.storageKey) {
      storage.remove(rule.clearStorageConfig.storageKey);
      console.log(`[CareCheck] Đã xóa LocalStorage key: ${rule.clearStorageConfig.storageKey}`);
    }
    return false; // Không block UI
  }

  if (action === "SET_VALUE") {
    if (!rule.logic) return false;
    const isConditionMet = evaluateGroupSync(rule.logic, rule.id, triggerEl);
    const previousState = ruleStates.get(rule.id);

    if (isConditionMet && previousState !== true) {
      if (rule.targetSelector && rule.setValueConfig?.value !== undefined) {
        const targetEls = document.querySelectorAll(rule.targetSelector);
        targetEls.forEach(el => {
          if ((el as HTMLInputElement).value !== rule.setValueConfig!.value) {
            (el as HTMLInputElement).value = rule.setValueConfig!.value;
            el.dispatchEvent(new Event('change', { bubbles: true }));
            el.dispatchEvent(new Event('input', { bubbles: true }));

            // Gửi sự kiện cho main_world.ts để kích hoạt jQuery & Select2 của HIS
            window.dispatchEvent(new CustomEvent("CARECHECK_TRIGGER_JQUERY_CHANGE", {
              detail: {
                selector: rule.targetSelector,
                value: rule.setValueConfig!.value
              }
            }));
          }
        });
      }
    }
    ruleStates.set(rule.id, isConditionMet);
    return false;
  }

  if (action === "FETCH_API") {
    if (rule.apiActionConfig?.apiUrl && rule.apiActionConfig?.storageKey) {
      let finalUrl = rule.apiActionConfig.apiUrl;
      let paramValue = "";
      // Nối tham số nếu có
      if (rule.apiActionConfig.paramSelector) {
        try {
          const paramEl = document.querySelector(rule.apiActionConfig.paramSelector) as HTMLInputElement;
          if (paramEl && paramEl.value) {
            paramValue = paramEl.value.trim();
            finalUrl += paramValue;
          }
        } catch (e) {
          console.error(`[CareCheck] Invalid paramSelector in API config: ${rule.apiActionConfig.paramSelector}`);
        }
      }
      
      console.log(`[CareCheck] Đang gọi API: ${finalUrl}`);
      try {
        // Tự động xóa dữ liệu cũ trong Storage trước khi gọi API mới để tránh bị rò rỉ dữ liệu của user cũ
        const keyToRemove = rule.apiActionConfig.clearStorageKeyBeforeFetch !== undefined && rule.apiActionConfig.clearStorageKeyBeforeFetch.trim() !== "" ? rule.apiActionConfig.clearStorageKeyBeforeFetch : rule.apiActionConfig.storageKey;
        storage.remove(keyToRemove);
        storage.remove(rule.apiActionConfig.storageKey + "_param"); // Xóa param cũ
        console.log(`[CareCheck] Đã xóa LocalStorage key [${keyToRemove}] trước khi gọi API mới`);

        chrome.runtime.sendMessage({ 
          action: "PROXY_FETCH", 
          url: finalUrl,
          saveToStorageKey: rule.apiActionConfig.storageKey,
          saveParamToStorageKey: rule.apiActionConfig.storageKey + "_param",
          paramValue: paramValue
        }, (res) => {
          if (res && res.success && res.data) {
            storage.set(rule.apiActionConfig!.storageKey, res.data);
            console.log(`[CareCheck] Đã lấy API xong, kích hoạt quét lại các luật cảnh báo để cập nhật giao diện...`);
            // Kích hoạt quét lại các luật EVENT_BASED để Cảnh báo ăn theo data mới
            cachedRules.forEach(r => {
              if ((!r.actionType || r.actionType === "SHOW_WARNING") && r.triggerMode === "EVENT_BASED" && r.triggerSelector) {
                const els = document.querySelectorAll(r.triggerSelector);
                els.forEach(el => evaluateRuleAndUpdateStateSync(r, el));
              }
            });
          }
        });
      } catch (err) {
        console.error(`[CareCheck] Lỗi khi gọi API qua proxy:`, err);
      }
    }
    return false; // Không block UI
  }

  // Đánh giá logic
  if (!rule.logic) return false;
  
  let isError = evaluateGroupSync(rule.logic, rule.id, triggerEl);
  
  // LOGIC ĐẶC BIỆT CHO BỆNH VIỆN: Nếu click vào checkbox hoặc row để BỎ CHECK (unchecked), 
  // thì tuyệt đối không bao giờ là lỗi (vì bỏ check nghĩa là hủy chỉ định).
  if (rule.triggerMode === "EVENT_BASED" && triggerEl) {
    let relatedCheckbox: HTMLInputElement | null = null;
    if (triggerEl.tagName === "INPUT" && (triggerEl as HTMLInputElement).type === "checkbox") {
      relatedCheckbox = triggerEl as HTMLInputElement;
    } else {
      relatedCheckbox = triggerEl.querySelector('input[type="checkbox"]') as HTMLInputElement;
    }
    
    // Nếu tìm thấy checkbox mà nó đang KHÔNG được check -> Coi như không có lỗi!
    if (relatedCheckbox && !relatedCheckbox.checked) {
      isError = false;
    }
  }
  
  ruleStates.set(rule.id, isError);
  
  if (rule.triggerMode === "EVENT_BASED") {
    if (isError) {
      showWarningUI(rule);
      if (triggerEl) {
        // Xóa viền đỏ cũ của luật này trên các row khác trước khi tô row mới
        const oldVisuals = document.querySelectorAll(`[data-carecheck-error="${rule.id}"]`);
        oldVisuals.forEach(el => removeErrorVisuals(el));
        
        applyErrorVisuals(triggerEl, rule.id);
      }
    } else {
      if (triggerEl) removeErrorVisuals(triggerEl);
      // Nếu hết lỗi, tự động xóa Toast nếu đang hiện
      removeWarningUI(rule.id);
      dismissedRules.delete(rule.id); // Reset trạng thái dismiss khi lỗi đã được khắc phục
    }
  } else {
    if (!isError) {
      dismissedRules.delete(rule.id);
    }
    renderVisualsAndToasts();
  }
  
  return isError;
  } catch (e) {
    console.error(`[CareCheck DEBUG] Lỗi trong evaluateRuleAndUpdateStateSync của luật ${rule.id}:`, e);
    return false;
  }
}

function renderVisualsAndToasts() {
  const activeErrorRules = cachedRules.filter(r => ruleStates.get(r.id) === true && r.triggerMode !== "EVENT_BASED");
  
  const errorTargetEls = new Set<Element>();

  activeErrorRules.forEach(rule => {
    showWarningUI(rule);
    if (rule.targetSelector) {
      const targetEls = document.querySelectorAll(rule.targetSelector);
      targetEls.forEach(el => errorTargetEls.add(el));
    }
  });

  const resolvedRules = cachedRules.filter(r => ruleStates.get(r.id) === false && r.triggerMode !== "EVENT_BASED");
  resolvedRules.forEach(rule => {
    removeWarningUI(rule.id);
  });

  // Cleanup Visuals
  const oldErrorEls = document.querySelectorAll(`[${ERROR_ATTR}]`);
  oldErrorEls.forEach(el => {
    if (!errorTargetEls.has(el)) {
      removeErrorVisuals(el);
    }
  });

  // Apply Visuals
  errorTargetEls.forEach(el => applyErrorVisuals(el));
}

// Global keydown listener for shortcuts
let isKeydownBound = false;
function bindGlobalKeydown() {
  if (isKeydownBound) return;
  isKeydownBound = true;
  document.addEventListener("keydown", (e) => {
    const currentUrl = window.location.href;
    const activeEventRules = cachedRules.filter(rule => {
      if (rule.isActive === false) return false;
      if (rule.triggerMode !== "EVENT_BASED" || !rule.triggerShortcut) return false;
      if (!rule.urlPattern) return true;
      try {
        const escapedPattern = rule.urlPattern.replace(/[.+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(`^${escapedPattern.replace(/\*/g, ".*")}$`);
        return regex.test(currentUrl);
      } catch (err) { return false; }
    });

    if (activeEventRules.length === 0) return;

    let keyPressed = e.key.toLowerCase();
    let combo = [];
    if (e.ctrlKey) combo.push("ctrl");
    if (e.shiftKey) combo.push("shift");
    if (e.altKey) combo.push("alt");
    combo.push(keyPressed);
    const comboStr = combo.join("+");

    let hasError = false;
    for (const rule of activeEventRules) {
      const shortcuts = rule.triggerShortcut!.split(',').map(s => s.trim().toLowerCase());
      if (shortcuts.includes(keyPressed) || shortcuts.includes(comboStr)) {
        const isError = evaluateRuleAndUpdateStateSync(rule);
        if (isError) hasError = true;
      }
    }

    if (hasError) {
      e.preventDefault();
      e.stopImmediatePropagation();
    }
  }, true); // Capture phase
}

const executedOnLoadRules = new Set<string>(); // Tracker for ON_LOAD rules

async function runEngineEvaluation() {
  if (isEvaluating) return;
  isEvaluating = true;

  try {
    const rules = cachedRules;
    if (!rules || rules.length === 0) return;
    
    // Đọc danh sách luật bị tắt bởi Bác sĩ (Client)
    const clientStorage = await chrome.storage.local.get("client_disabled_rules");
    const clientDisabledRules = new Set<string>(clientStorage.client_disabled_rules || []);

    const currentUrl = window.location.href;
    const activeRules = rules.filter(rule => {
      // 1. Admin tắt (Global) -> Loại bỏ
      if (rule.isActive === false) return false;
      
      // 2. Client tắt (Local) và Admin cho phép tắt -> Loại bỏ
      if (clientDisabledRules.has(rule.id) && rule.allowClientToggle !== false) return false;

      if (!rule.urlPattern) return true;
      try {
        const escapedPattern = rule.urlPattern.replace(/[.+?^${}()|[\]\\]/g, '\\$&');
        const pattern = escapedPattern.replace(/\*/g, ".*");
        const regex = new RegExp(`^${pattern}$`);
        return regex.test(currentUrl);
      } catch (e) {
        console.error("Invalid regex in rule:", rule.name, e);
        return false;
      }
    });

    // Dọn dẹp ruleStates cho các rule không còn thỏa mãn URL
    const activeRuleIds = new Set(activeRules.map(r => r.id));
    for (const key of ruleStates.keys()) {
      if (!activeRuleIds.has(key)) ruleStates.delete(key);
    }

    // 0. Cache Storage dữ liệu cho các rule hiện tại
    const keysToCache = new Set<string>();
    const extractKeys = (group: LogicGroup) => {
      group.conditions.forEach(c => {
        if (c.type === "CONDITION") {
          const node = c as ConditionNode;
          if (node.dataSourceType === "LOCAL_STORAGE" && node.localStorageKey) {
            keysToCache.add(node.localStorageKey);
          }
          if (node.selector && node.selector.startsWith("{{STORAGE:") && node.selector.endsWith("}}")) {
            const fullPath = node.selector.substring(10, node.selector.length - 2).trim();
            const rootKey = fullPath.split('.')[0];
            if (rootKey) keysToCache.add(rootKey);
          }
        } else {
          extractKeys(c as LogicGroup);
        }
      });
    };
    activeRules.forEach(r => {
      if (r.logic) extractKeys(r.logic);
    });

    for (const key of keysToCache) {
      const val = await storage.get(key);
      storageCache.set(key, val);
    }
    
    // 1. Đánh giá lỗi (chỉ với REALTIME rules) và thực thi ON_LOAD
    for (const rule of activeRules) {
      const action = rule.actionType || "SHOW_WARNING";

      if (rule.triggerMode === "ON_LOAD") {
        if (!executedOnLoadRules.has(rule.id)) {
          executedOnLoadRules.add(rule.id);
          evaluateRuleAndUpdateStateSync(rule);
        }
      } else if (rule.triggerMode !== "EVENT_BASED") {
        // REALTIME
        if (action === "SHOW_WARNING" || action === "CONFIRM_WARNING") {
          if (!rule.logic) continue;
          const isError = evaluateGroupSync(rule.logic, rule.id);
          ruleStates.set(rule.id, isError);
        } else if (action === "SET_VALUE") {
          if (!rule.logic) continue;
          const isConditionMet = evaluateGroupSync(rule.logic, rule.id);
          const previousState = ruleStates.get(rule.id);
          
          if (isConditionMet && previousState !== true) {
            if (rule.targetSelector && rule.setValueConfig?.value !== undefined) {
              const targetEls = document.querySelectorAll(rule.targetSelector);
              targetEls.forEach(el => {
                if ((el as HTMLInputElement).value !== rule.setValueConfig!.value) {
                  (el as HTMLInputElement).value = rule.setValueConfig!.value;
                  el.dispatchEvent(new Event('change', { bubbles: true }));
                  el.dispatchEvent(new Event('input', { bubbles: true }));
                  
                  // Gửi sự kiện cho main_world.ts để kích hoạt jQuery & Select2 của HIS
                  window.dispatchEvent(new CustomEvent("CARECHECK_TRIGGER_JQUERY_CHANGE", {
                    detail: {
                      selector: rule.targetSelector,
                      value: rule.setValueConfig!.value
                    }
                  }));
                }
              });
            }
          }
          ruleStates.set(rule.id, isConditionMet);
        }
      } else {
        // Gắn sự kiện cho EVENT_BASED rules
        // a. Bắt sự kiện blur/change trên targetSelector
        if (rule.targetSelector && rule.targetSelector.trim() !== "") {
          try {
            const targetEls = document.querySelectorAll(rule.targetSelector);
            targetEls.forEach(el => {
              if (!el.hasAttribute(`data-bound-blur-${rule.id}`)) {
                el.setAttribute(`data-bound-blur-${rule.id}`, "true");
                el.addEventListener("blur", () => {
                  evaluateRuleAndUpdateStateSync(rule, el);
                });
                if (el.tagName === "SELECT" || el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
                  el.addEventListener("change", () => evaluateRuleAndUpdateStateSync(rule, el));
                }
              }
            });
          } catch (e) {
            console.error(`[CareCheck] Invalid targetSelector in rule ${rule.id}: ${rule.targetSelector}`, e);
          }
        }
        
        // b. Bắt sự kiện trên triggerSelector
        if (rule.triggerSelector && rule.triggerSelector.trim() !== "") {
          try {
            const triggerEls = document.querySelectorAll(rule.triggerSelector);
            triggerEls.forEach(el => {
              if (!el.hasAttribute(`data-bound-trigger-${rule.id}`)) {
                el.setAttribute(`data-bound-trigger-${rule.id}`, "true");
                
                let isExecuting = false;
                const handler = (e: Event) => {
                  if (isExecuting) return;
                  
                  const isCheckbox = el.tagName === "INPUT" && (el as HTMLInputElement).type === "checkbox";
                  const isRow = el.tagName === "TR" || el.tagName === "TD";
                  const isClickOnButton = e.type === "click" && !isCheckbox && !isRow;

                  // 1. Kiểm tra tức thời (Synchronous Check) chặn Save HIS
                  if (isClickOnButton) {
                    if (rule.logic) {
                      const isErrorSync = evaluateGroupSync(rule.logic, rule.id, el);
                      if (isErrorSync) {
                        const msg = rule.warningConfig?.message || rule.message || "Dữ liệu không hợp lệ!";
                        
                        if (rule.actionType === "CONFIRM_WARNING") {
                          // Nếu đã bypass qua modal custom rồi thì bỏ qua không check nữa
                          if ((window as any).__carecheckBypassedRules?.has(rule.id)) {
                            return; 
                          }
                          
                          e.preventDefault();
                          e.stopImmediatePropagation();
                          
                          const offendingVal = (window as any).__carecheckOffendingValues?.get(rule.id) || "";
                          const finalMsg = msg.replace(/\{\{VALUE\}\}/g, offendingVal);
                          
                          showCustomConfirmModal(
                            "CẢNH BÁO KIỂM TRA LỖI!",
                            finalMsg,
                            () => {
                              // Confirm: Đánh dấu đã bypass
                              if (!(window as any).__carecheckBypassedRules) {
                                (window as any).__carecheckBypassedRules = new Set<string>();
                              }
                              (window as any).__carecheckBypassedRules.add(rule.id);
                              
                              // Giả lập lại cú click chuột để đi tiếp
                              if (typeof jQuery !== 'undefined') {
                                jQuery(el).trigger('click');
                              } else {
                                (el as HTMLElement).click();
                              }
                              
                              // Xóa cờ bypass sau nửa giây
                              setTimeout(() => {
                                (window as any).__carecheckBypassedRules.delete(rule.id);
                              }, 500);
                            },
                            () => {
                              // Cancel: Không làm gì cả
                            }
                          );
                          return;
                        } else {
                          // Mặc định SHOW_WARNING (Hard block)
                          e.preventDefault();
                          e.stopImmediatePropagation();
                          evaluateRuleAndUpdateStateSync(rule, el); // Kích hoạt Toast UI
                          return;
                        }
                      }
                    }
                    return; // Không có lỗi, cho HIS chạy tiếp
                  }

                  // 2. Với Checkbox/Row trên lưới, vẫn giữ nguyên cơ chế chờ 50ms để HIS cập nhật DOM
                  isExecuting = true;
                  const initialState = isCheckbox ? (el as HTMLInputElement).checked : undefined;
                  let attempts = 0;
                  
                  const checkInterval = setInterval(() => {
                    attempts++;
                    // Luôn luôn poll đợi HIS đổi state, bất kể click vào row hay checkbox.
                    // Đợi tối đa 5 giây (100 lần * 50ms) cho các mạng chậm
                    if (!isCheckbox || (el as HTMLInputElement).checked !== initialState || attempts >= 100) {
                      clearInterval(checkInterval);
                      isExecuting = false;
                      evaluateRuleAndUpdateStateSync(rule, el);
                    }
                  }, 50);
                };

                el.addEventListener("click", handler, true);
                el.addEventListener("change", handler, true);
                
                // Mở rộng vùng bắt sự kiện: Nếu người dùng cấu hình trigger là checkbox, 
                // nhưng họ lại click vào cái Row (thẻ <tr>), thì HIS vẫn sẽ check checkbox.
                // Do đó ta phải bắt luôn cả sự kiện click trên cái Row chứa nó!
                const parentRow = el.closest('tr') || el.closest('.jqgrow');
                if (parentRow && !parentRow.hasAttribute(`data-bound-trigger-row-${rule.id}`)) {
                  parentRow.setAttribute(`data-bound-trigger-row-${rule.id}`, "true");
                  parentRow.addEventListener("click", handler, true);
                }
                
                if (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.tagName === "SELECT") {
                  el.addEventListener("blur", handler, true);
                  el.addEventListener("change", handler, true);
                  el.addEventListener("keydown", (e) => {
                    if ((e as KeyboardEvent).key === "Enter") handler(e);
                  }, true);
                }
              }
            });
          } catch (e) {
            console.error(`[CareCheck] Invalid triggerSelector in rule ${rule.id}: ${rule.triggerSelector}`, e);
          }
        }
        
        // c. Đăng ký phím tắt toàn cục
        if (rule.triggerShortcut) {
          bindGlobalKeydown();
        }
      }
    }

    // 2. Render giao diện Toast và Visuals
    renderVisualsAndToasts();
  } catch (error: any) {
    if (error.message && error.message.includes("Extension context invalidated")) {
      console.log("[CareCheck] Extension đã được cập nhật bản mới. Đang tắt luồng cũ...");
      if (engineInterval) clearInterval(engineInterval);
      return;
    }
    console.error("Lỗi khi chạy engine đánh giá:", error);
  } finally {
    isEvaluating = false;
  }
}

// Khởi chạy Động cơ
async function startEngine() {
  console.log("[CareCheck Assistant] Khởi động động cơ logic phức hợp...");
  
  // Nạp Rules vào bộ nhớ đệm (Cache) ngay lần đầu
  const initialRules = await storage.get<Rule[]>(RULES_STORAGE_KEY);
  if (initialRules) {
    cachedRules = initialRules;
  }
  
  // Chạy ngay lần đầu
  await runEngineEvaluation();

  // Đăng ký observer để chạy lại mỗi khi DOM thay đổi hoặc user gõ phím
  const debouncedEval = debounce(runEngineEvaluation, 500);

  const observer = new MutationObserver(() => {
    debouncedEval();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    characterData: true
  });

  // Lắng nghe sự kiện input để gỡ lỗi realtime
  document.body.addEventListener("input", () => {
    debouncedEval();
  }, true);
  
  document.body.addEventListener("change", () => {
    debouncedEval();
  }, true);

  // Fallback: Quét định kỳ mỗi 0.1 giây (100ms) để phản hồi siêu tốc độ
  // Chạy thẳng runEngineEvaluation thay vì debounce để không bị cộng dồn độ trễ
  if (engineInterval) clearInterval(engineInterval);
  engineInterval = setInterval(() => {
    runEngineEvaluation();
  }, 100);
}

// Utility debounce function
function debounce(func: Function, wait: number) {
  let timeout: any;
  return function(...args: any[]) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", startEngine)
} else {
  startEngine()
}

function showCustomConfirmModal(title: string, message: string, onConfirm: () => void, onCancel: () => void) {
  const modalId = "carecheck-confirm-overlay";
  const existingModal = document.getElementById(modalId);
  if (existingModal) return;

  const overlayHTML = `
    <div id="${modalId}" style="position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(0,0,0,0.6); z-index: 2147483647; display: flex; align-items: center; justify-content: center; backdrop-filter: blur(2px); font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
      <div style="background: white; width: 450px; max-width: 90%; border-radius: 12px; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04); overflow: hidden; animation: cc-modal-pop 0.3s cubic-bezier(0.16, 1, 0.3, 1);">
        <div style="background: #dc2626; padding: 24px; text-align: center;">
          <svg style="width: 56px; height: 56px; color: white; margin: 0 auto;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
        </div>
        <div style="padding: 24px;">
          <h3 style="margin: 0 0 12px 0; color: #111827; font-size: 1.35rem; font-weight: 700; text-align: center; line-height: 1.2;">${title}</h3>
          <p style="margin: 0 0 28px 0; color: #4b5563; font-size: 1.05rem; line-height: 1.6; text-align: center; font-weight: 500;">${message}</p>
          <div style="display: flex; gap: 12px;">
            <button id="cc-btn-cancel" style="flex: 1; padding: 12px 16px; background: #f3f4f6; color: #374151; border: 1px solid #d1d5db; border-radius: 8px; font-weight: 600; font-size: 1rem; cursor: pointer; transition: all 0.2s; box-shadow: 0 1px 2px rgba(0,0,0,0.05);">Hủy bỏ (Sửa lại)</button>
            <button id="cc-btn-confirm" style="flex: 1; padding: 12px 16px; background: #ef4444; color: white; border: none; border-radius: 8px; font-weight: 600; font-size: 1rem; cursor: pointer; transition: all 0.2s; box-shadow: 0 1px 2px rgba(0,0,0,0.05);">Bỏ qua & Tiếp tục</button>
          </div>
        </div>
      </div>
    </div>
  `;
  
  const div = document.createElement('div');
  div.innerHTML = overlayHTML;
  document.body.appendChild(div);
  
  if (!document.getElementById('cc-modal-style')) {
    const style = document.createElement('style');
    style.id = 'cc-modal-style';
    style.innerHTML = `
      @keyframes cc-modal-pop {
        0% { transform: scale(0.9); opacity: 0; }
        100% { transform: scale(1); opacity: 1; }
      }
      #cc-btn-cancel:hover { background: #e5e7eb !important; border-color: #9ca3af !important; }
      #cc-btn-cancel:active { background: #d1d5db !important; }
      #cc-btn-confirm:hover { background: #dc2626 !important; transform: translateY(-1px); box-shadow: 0 4px 6px -1px rgba(239,68,68,0.4); }
      #cc-btn-confirm:active { background: #b91c1c !important; transform: translateY(0); box-shadow: none; }
    `;
    document.head.appendChild(style);
  }
  
  document.getElementById('cc-btn-cancel')!.onclick = () => {
    div.remove();
    onCancel();
  };
  
  document.getElementById('cc-btn-confirm')!.onclick = () => {
    div.remove();
    onConfirm();
  };
}
