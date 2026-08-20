import type { PlasmoCSConfig } from "plasmo"
import { useEffect, useState } from "react"
import { Storage } from "@plasmohq/storage"
import type { Rule } from "./features/admin/RuleList"

const storage = new Storage({ area: "local" });

// Cấu hình Plasmo để script này chỉ chạy trên trang VNPT HIS
export const config: PlasmoCSConfig = {
  matches: ["*://*.vncare.vn/*"],
  all_frames: true
}

// 1. Quét tìm các Luật hệ thống (SYNC_ON_CLICK) để cài đặt Trigger kéo dữ liệu ngầm
storage.get<Rule[]>("mock_db_rules").then(rules => {
  if (rules && rules.length > 0) {
    const syncRules = rules.filter(r => r.triggerMode === "SYNC_ON_CLICK" && r.isActive !== false);
    
    if (syncRules.length > 0) {
      console.log(`[CareCheck] Đã tìm thấy ${syncRules.length} lệnh hệ thống kéo dữ liệu ngầm.`);
      
      document.addEventListener("click", (e) => {
        const target = e.target as HTMLElement;
        
        // Kiểm tra xem cú click chuột có trúng vào nút của lệnh hệ thống nào không
        for (const rule of syncRules) {
          if (rule.targetSelector && target.closest(rule.targetSelector)) {
            console.log(`[CareCheck] Phát hiện thao tác kích hoạt lệnh: ${rule.name}. Đang PULL dữ liệu...`);
            chrome.runtime.sendMessage({ action: "FORCE_SYNC_RULES" });
            return; // Kích hoạt 1 lần là đủ
          }
        }
      }, true); // Bắt buộc true (Capture phase) để xuyên qua stopPropagation
    }
  }
});

// -----------------------------------------------------------------------------
// LOW-CODE ENGINE & ADVANCED PERMISSIONS
// -----------------------------------------------------------------------------
// Engine Logic is now completely generic and resides in /contents/validator.ts
// There is no hardcoded API or Checkbox logic anymore!

chrome.runtime.onMessage.addListener((msg: any, sender: any, sendResponse: any) => {
  if (msg.type === "SCAN_DOM") {
    try {
      const scannedElements: any[] = [];
      const getSelector = (el: Element) => {
        if (el.id) return `#${el.id}`;
        const tagName = el.tagName.toLowerCase();
        const classes = Array.from(el.classList).filter(c => !c.includes('hover') && !c.includes('focus')).join('.');
        return classes ? `${tagName}.${classes}` : tagName;
      };

      document.querySelectorAll("input, textarea, select").forEach(el => {
        const val = (el as HTMLInputElement).value?.trim();
        const sel = getSelector(el);
        if (sel !== "input" || el.id || el.className) {
           scannedElements.push({
             selector: sel,
             textValue: val || (el.getAttribute("placeholder") || ""),
             tagName: el.tagName.toLowerCase()
           });
        }
      });

      document.querySelectorAll("td[id], td[class], span[id], span[class], label").forEach(el => {
        const val = el.textContent?.trim();
        if (val && val.length > 0 && val.length < 100) {
          scannedElements.push({
             selector: getSelector(el),
             textValue: val,
             tagName: el.tagName.toLowerCase()
          });
        }
      });

      const uniqueElements = Array.from(new Map(scannedElements.map(item => [item.selector, item])).values());
      sendResponse({ elements: uniqueElements });
    } catch (e) {
      console.error("Lỗi SCAN_DOM:", e);
      sendResponse({ elements: [] });
    }
    return true; // Cho biết sẽ gửi response bất đồng bộ
  }
});

export default function VisualPickerOverlay() {
  const [isActive, setIsActive] = useState(false)
  const [hoveredEl, setHoveredEl] = useState<HTMLElement | null>(null)

  useEffect(() => {
    // Lắng nghe lệnh bật Picker từ Popup hoặc Options
    const messageListener = (msg: any) => {
      if (msg.action === "START_PICKING" || msg.type === "START_PICKER") {
        setIsActive(true)
        // Phát lệnh xuống tất cả các iframe/frame con
        document.querySelectorAll('iframe, frame').forEach(f => {
          try { (f as HTMLIFrameElement).contentWindow?.postMessage({ type: "START_PICKER_INTERNAL" }, "*"); } catch(e){}
        });
      }
    }
    chrome.runtime.onMessage.addListener(messageListener)

    // Lắng nghe lệnh từ window (được truyền từ frame cha xuống)
    const windowMessageListener = (e: MessageEvent) => {
      if (e.data?.type === "START_PICKER_INTERNAL") {
        setIsActive(true)
        // Tiếp tục truyền xuống nếu có frame con nữa
        document.querySelectorAll('iframe, frame').forEach(f => {
          try { (f as HTMLIFrameElement).contentWindow?.postMessage({ type: "START_PICKER_INTERNAL" }, "*"); } catch(err){}
        });
      }
    }
    window.addEventListener("message", windowMessageListener)

    return () => {
      chrome.runtime.onMessage.removeListener(messageListener)
      window.removeEventListener("message", windowMessageListener)
    }
  }, [])

  useEffect(() => {
    if (!isActive) return;

    const handleMouseMove = (e: MouseEvent) => {
      e.stopPropagation();
      let el = e.target as HTMLElement;
      
      if (e.shiftKey && el) {
        el = el.closest('tr') || el.parentElement || el;
      }
      
      if (el && !el.closest("#plasmo-visual-picker-root")) {
        setHoveredEl(el);
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
    };

    const handleClick = async (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      
      let el = e.target as HTMLElement;
      if (e.shiftKey && el) {
        el = el.closest('tr') || el.parentElement || el;
      }
      
      if (!el || el.closest("#plasmo-visual-picker-root")) return;

      let selector = "";
      if (el.id) {
        selector = `#${el.id}`;
      } else {
        const tagName = el.tagName.toLowerCase();
        const classes = Array.from(el.classList).filter(c => !c.includes('hover') && !c.includes('focus')).join('.');
        selector = classes ? `${tagName}.${classes}` : tagName;
      }

      let finalUrl = window.location.href.split('?')[0] + "*";
      try {
        if (window.top && window.top.location.href) {
          finalUrl = window.top.location.href.split('?')[0] + "*";
        }
      } catch (err) {}

      const pickedData = { selector, urlPattern: finalUrl };
      await chrome.storage.local.set({ picked_element: pickedData });
      
      setIsActive(false);
      setHoveredEl(null);
      chrome.runtime.sendMessage({ action: "OPEN_OPTIONS" });
    };

    // Lắng nghe ở capture phase để chặn các sự kiện của trang web
    document.addEventListener("mousemove", handleMouseMove, true);
    document.addEventListener("mousedown", handleMouseDown, true);
    document.addEventListener("click", handleClick, true);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove, true);
      document.removeEventListener("mousedown", handleMouseDown, true);
      document.removeEventListener("click", handleClick, true);
    };
  }, [isActive]);

  if (!isActive) return null

  // Tính toán vị trí khung viền highlight
  let overlayStyle = {}
  if (hoveredEl) {
    const rect = hoveredEl.getBoundingClientRect()
    overlayStyle = {
      position: "fixed",
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
      border: "3px solid #3b82f6", // Blue-500
      backgroundColor: "rgba(59, 130, 246, 0.2)",
      pointerEvents: "none",
      zIndex: 999998,
      transition: "all 0.1s ease-out"
    }
  }

  return (
    <div id="plasmo-visual-picker-root">

      {/* Khung viền bám theo phần tử */}
      {hoveredEl && <div style={overlayStyle as any}></div>}
      
      {/* Thanh thông báo nổi */}
      <div style={{
        position: "fixed",
        bottom: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        backgroundColor: "#1e293b",
        color: "white",
        padding: "12px 24px",
        borderRadius: "9999px",
        fontWeight: "bold",
        zIndex: 999999,
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.5)",
        fontFamily: "sans-serif",
        textAlign: "center"
      }}>
        ✨ Chế độ Visual Picker: Hãy click vào ô dữ liệu bạn muốn!
        <div style={{ fontSize: "12px", color: "#94a3b8", marginTop: "4px", fontWeight: "normal" }}>
          (Mẹo: Giữ phím <b>SHIFT</b> khi rê chuột để chọn toàn bộ Dòng/Row)
        </div>
      </div>
    </div>
  )
}
