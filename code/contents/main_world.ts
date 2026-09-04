import type { PlasmoCSConfig } from "plasmo"

export const config: PlasmoCSConfig = {
  matches: ["<all_urls>"],
  world: "MAIN"
}

// Lắng nghe sự kiện từ Content Script (Isolated World)
window.addEventListener("CARECHECK_TRIGGER_JQUERY_CHANGE", (e: any) => {
  try {
    const detail = e.detail;
    if (detail && detail.selector && detail.value !== undefined) {
      // @ts-ignore - Bỏ qua lỗi TypeScript vì jQuery nằm ở trang gốc
      if (typeof jQuery !== 'undefined') {
        // @ts-ignore
        jQuery(detail.selector).val(detail.value).trigger('change');
      }
    }
  } catch(err) {
    console.error("[CareCheck MainWorld] Error:", err);
  }
});
