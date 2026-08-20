import React, { useState } from "react";
import type { Rule, LogicGroup, ConditionNode, Operator, LogicalOp } from "./RuleList";

interface RuleFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (rule: Omit<Rule, "id">) => void;
  initialData?: any;
}

const defaultCondition: ConditionNode = {
  type: "CONDITION",
  selector: "",
  operator: "==",
  dataSourceType: "STATIC",
  value: ""
};

interface DomElementInfo {
  selector: string;
  textValue: string;
  tagName: string;
}

export function RuleFormModal({ isOpen, onClose, onSave, initialData }: RuleFormModalProps) {
  const [formData, setFormData] = React.useState<Omit<Rule, "id">>({
    name: "",
    urlPattern: "",
    targetSelector: "",
    message: "",
    logic: {
      type: "GROUP",
      logicalOp: "AND",
      conditions: [{ ...defaultCondition }]
    }
  });

  const [availableTabs, setAvailableTabs] = useState<chrome.tabs.Tab[]>([]);
  const [showTabSelector, setShowTabSelector] = useState(false);
  const [tabActionType, setTabActionType] = useState<"PICK" | "SCAN">("PICK");

  const [isTestingApi, setIsTestingApi] = useState(false);
  const [apiTestResult, setApiTestResult] = useState<string | null>(null);
  
  const [pickerCallback, setPickerCallback] = useState<((selector: string) => void) | null>(null);
  
  // State for DOM Scanner Table Modal
  const [showDomScanner, setShowDomScanner] = useState(false);
  const [domElements, setDomElements] = useState<DomElementInfo[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [domSearchTerm, setDomSearchTerm] = useState("");

  const handleStartPicker = async (onPicked: (selector: string) => void) => {
    try {
      setPickerCallback(() => onPicked);
      const allTabs = await chrome.tabs.query({ url: "*://*.vncare.vn/*" });
      if (allTabs.length === 0) {
        alert("Vui lòng mở một trang VNPT HIS (*.vncare.vn) trước khi dùng tính năng này!");
        return;
      }
      
      // Lọc các tab khớp với URL Pattern
      let targetTabs = allTabs;
      if (formData.urlPattern) {
        try {
          // Escape các ký tự đặc biệt của regex, TRỪ dấu *
          const escapedPattern = formData.urlPattern.replace(/[.+?^${}()|[\]\\]/g, '\\$&');
          const pattern = escapedPattern.replace(/\*/g, ".*");
          const regex = new RegExp(`^${pattern}$`);
          const matched = allTabs.filter(t => t.url && regex.test(t.url));
          if (matched.length > 0) {
            targetTabs = matched; // Chỉ ưu tiên các tab khớp URL Pattern
          } else {
            const confirm = window.confirm(`Không tìm thấy tab nào khớp với URL Pattern:\n${formData.urlPattern}\n\nBạn có muốn chọn từ danh sách TẤT CẢ các tab HIS đang mở không?`);
            if (!confirm) return;
          }
        } catch (e) {
          console.error("Lỗi Regex:", e);
        }
      }

      if (targetTabs.length === 1) {
        activatePickerOnTab(targetTabs[0].id!);
      } else {
        setAvailableTabs(targetTabs);
        setTabActionType("PICK");
        setShowTabSelector(true);
      }
    } catch (error) {
      console.error("Lỗi khi tìm tab:", error);
    }
  };

  const handleStartDomScanner = async (onPicked: (selector: string) => void) => {
    try {
      setPickerCallback(() => onPicked);
      const allTabs = await chrome.tabs.query({ url: "*://*.vncare.vn/*" });
      if (allTabs.length === 0) {
        alert("Vui lòng mở một trang VNPT HIS (*.vncare.vn) trước khi dùng tính năng này!");
        return;
      }
      
      // Lọc các tab khớp với URL Pattern
      let targetTabs = allTabs;
      if (formData.urlPattern) {
        try {
          // Escape các ký tự đặc biệt của regex, TRỪ dấu *
          const escapedPattern = formData.urlPattern.replace(/[.+?^${}()|[\]\\]/g, '\\$&');
          const pattern = escapedPattern.replace(/\*/g, ".*");
          const regex = new RegExp(`^${pattern}$`);
          const matched = allTabs.filter(t => t.url && regex.test(t.url));
          if (matched.length > 0) {
            targetTabs = matched;
          } else {
            const confirm = window.confirm(`Không tìm thấy tab nào khớp với URL Pattern:\n${formData.urlPattern}\n\nBạn có muốn chọn từ danh sách TẤT CẢ các tab HIS đang mở không?`);
            if (!confirm) return;
          }
        } catch (e) {
          console.error("Lỗi Regex:", e);
        }
      }

      if (targetTabs.length === 1) {
        activateDomScannerOnTab(targetTabs[0].id!);
      } else {
        setAvailableTabs(targetTabs);
        setTabActionType("SCAN");
        setShowTabSelector(true);
      }
    } catch (error) {
      console.error("Lỗi khi tìm tab:", error);
    }
  };

  const activatePickerOnTab = async (tabId: number) => {
    setShowTabSelector(false);
    try {
      const tab = await chrome.tabs.get(tabId);
      await chrome.tabs.update(tabId, { active: true });
      await chrome.windows.update(tab.windowId, { focused: true });
      
      chrome.tabs.sendMessage(tabId, { type: "START_PICKER" }, (res) => {
        if (chrome.runtime.lastError) {
          console.error("Lỗi gửi message:", chrome.runtime.lastError);
          alert("Không thể kết nối với trang HIS. Vui lòng tải lại (F5) tab HIS đó và thử lại!");
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  const activateDomScannerOnTab = async (tabId: number) => {
    setShowTabSelector(false);
    setShowDomScanner(true);
    setIsScanning(true);
    try {
      const tab = await chrome.tabs.get(tabId);
      await chrome.tabs.update(tabId, { active: true });
      
      // Gửi lệnh quét DOM, content script sẽ trả về mảng phần tử
      chrome.tabs.sendMessage(tabId, { type: "SCAN_DOM" }, (response) => {
        setIsScanning(false);
        if (chrome.runtime.lastError) {
          console.error("Lỗi gửi message:", chrome.runtime.lastError);
          alert("Không thể kết nối với trang HIS. Vui lòng tải lại (F5) tab HIS đó và thử lại!");
          setShowDomScanner(false);
          return;
        }
        
        if (response && response.elements) {
          setDomElements(response.elements);
        } else {
          alert("Không nhận được dữ liệu phản hồi từ trang.");
        }
      });
    } catch (error) {
      setIsScanning(false);
      console.error(error);
    }
  };

  React.useEffect(() => {
    if (!isOpen || !pickerCallback) return;

    // Lắng nghe sự kiện thay đổi storage ngay lập tức (khi người dùng bấm Pick ở tab khác)
    const handleStorageChange = (changes: { [key: string]: chrome.storage.StorageChange }, areaName: string) => {
      if (areaName === "local" && changes.picked_element && changes.picked_element.newValue) {
        pickerCallback(changes.picked_element.newValue.selector);
        chrome.storage.local.remove("picked_element");
        
        // Tự động kéo trình duyệt quay trở lại Tab Cấu hình
        chrome.tabs.getCurrent((tab) => {
          if (tab && tab.id) {
            chrome.tabs.update(tab.id, { active: true });
            chrome.windows.update(tab.windowId, { focused: true });
          }
        });
      }
    };

    chrome.storage.onChanged.addListener(handleStorageChange);

    // Kiểm tra dự phòng lúc component vừa mở
    chrome.storage.local.get("picked_element", (result) => {
      if (result.picked_element) {
        pickerCallback(result.picked_element.selector);
        chrome.storage.local.remove("picked_element");
      }
    });

    return () => {
      chrome.storage.onChanged.removeListener(handleStorageChange);
    };
  }, [isOpen, pickerCallback]);

  React.useEffect(() => {
    if (isOpen) {
      if (initialData && initialData.name) {
        // Tương thích ngược: Nếu rule cũ không có logic, tự động tạo một logic group cơ bản
        const logicData = initialData.logic || {
          type: "GROUP",
          logicalOp: "AND",
          conditions: [
            {
              type: "CONDITION",
              selector: initialData.selector || "",
              operator: "IS_EMPTY",
              dataSourceType: "STATIC",
              value: ""
            }
          ]
        };
        
        setFormData({
          ...initialData,
          targetSelector: initialData.targetSelector || initialData.selector || "", // fallback cho rule cũ
          triggerMode: initialData.triggerMode || "REALTIME",
          triggerSelector: initialData.triggerSelector || "",
          triggerShortcut: initialData.triggerShortcut || "",
          logic: logicData,
          warningConfig: initialData.warningConfig || {
            template: "TOAST",
            position: "BOTTOM_RIGHT",
            title: "",
            message: initialData.message || ""
          }
        });
      } else {
        setFormData({
          name: "",
          urlPattern: initialData?.urlPattern || "",
          targetSelector: initialData?.selector || "",
          message: "",
          triggerMode: "REALTIME",
          triggerSelector: "",
          triggerShortcut: "",
          logic: {
            type: "GROUP",
            logicalOp: "AND",
            conditions: [{ ...defaultCondition }]
          },
          actionType: initialData?.actionType || "SHOW_WARNING",
          apiActionConfig: initialData?.apiActionConfig || { apiUrl: "", paramSelector: "", storageKey: "" },
          clearStorageConfig: initialData?.clearStorageConfig || { storageKey: "" },
          warningConfig: {
            template: "TOAST",
            position: "BOTTOM_RIGHT",
            title: "",
            message: ""
          }
        });
      }
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const dataToSave = { ...formData };
    
    // Xóa toastAction nếu người dùng không nhập gì hoặc để trống label/apiUrl
    if (dataToSave.toastAction) {
      if (!dataToSave.toastAction.label?.trim() || !dataToSave.toastAction.apiUrl?.trim()) {
        delete dataToSave.toastAction;
      }
    }
    
    onSave(dataToSave);
    onClose();
  };

  const updateLogicGroup = (newLogic: LogicGroup) => {
    setFormData({ ...formData, logic: newLogic });
  };
  
  const filteredDomElements = domElements.filter(el => 
    el.textValue.toLowerCase().includes(domSearchTerm.toLowerCase()) || 
    el.selector.toLowerCase().includes(domSearchTerm.toLowerCase())
    );
  
    const handleTestApi = async () => {
      if (!formData.apiActionConfig?.apiUrl) {
        setApiTestResult("Vui lòng nhập đường dẫn API trước!");
        return;
      }
      setIsTestingApi(true);
      setApiTestResult("Đang gọi API...");
      try {
        // Lấy thử URL (có thể người dùng viết mock param ngay trên URL luôn)
        let testUrl = formData.apiActionConfig.apiUrl;
        // Nếu user nhập /permissions?user= thì nối thử chuỗi test
        if (testUrl.endsWith("=")) testUrl += "test_user";
  
        const res = await fetch(testUrl);
        const data = await res.json();
        setApiTestResult(JSON.stringify(data, null, 2));
      } catch (e: any) {
        setApiTestResult(`Lỗi: ${e.message}`);
      } finally {
        setIsTestingApi(false);
      }
    };
  
    return (
    <>
      <div className="fixed inset-0 z-[50] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm transition-opacity py-6">
        <div className="bg-white rounded-2xl shadow-xl w-[90vw] max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50 shrink-0">
            <h2 className="text-lg font-bold text-slate-800">Cấu Hình Luật Cảnh Báo (Advanced Logic Engine)</h2>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">✕</button>
          </div>
          
          <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
            <div className="p-6 space-y-6 flex-1 overflow-y-auto">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Tên quy tắc</label>
                <input type="text" required className="w-full px-4 py-2 border rounded-lg" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">URL Pattern</label>
                <input type="text" className="w-full px-4 py-2 border rounded-lg font-mono text-sm" value={formData.urlPattern} onChange={e => setFormData({...formData, urlPattern: e.target.value})} />
              </div>
            </div>

            {formData.triggerMode !== "SYNC_ON_CLICK" && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Target Selector (Phần tử sẽ bị hiển thị cảnh báo)</label>
                <div className="flex gap-2">
                  <input type="text" className="flex-1 px-4 py-2 border rounded-lg font-mono text-sm" value={formData.targetSelector} onChange={e => setFormData({...formData, targetSelector: e.target.value})} placeholder="Ví dụ: #btnLuu hoặc .row-patient (Có thể để trống)" />
                  <button type="button" onClick={() => handleStartPicker(sel => setFormData({...formData, targetSelector: sel}))} className="px-3 py-2 bg-slate-100 border rounded-lg text-sm hover:bg-slate-200 transition" title="Bắt phần tử thủ công">🎯 Pick</button>
                  <button type="button" onClick={() => handleStartDomScanner(sel => setFormData({...formData, targetSelector: sel}))} className="px-3 py-2 bg-blue-50 text-blue-600 border border-blue-200 rounded-lg text-sm hover:bg-blue-100 transition" title="Quét toàn bộ DOM để chọn">🔍 Quét DOM</button>
                </div>
              </div>
            )}

            {formData.triggerMode === "SYNC_ON_CLICK" && (
              <div>
                <label className="block text-sm font-medium text-blue-700 mb-1">DOM Selector của Nút bấm để kích hoạt đồng bộ</label>
                <div className="flex gap-2">
                  <input type="text" required className="flex-1 px-4 py-2 border border-blue-300 bg-blue-50 rounded-lg font-mono text-sm" value={formData.targetSelector} onChange={e => setFormData({...formData, targetSelector: e.target.value})} placeholder="Ví dụ: #btn-login hoặc .btn-primary" />
                  <button type="button" onClick={() => handleStartPicker(sel => setFormData({...formData, targetSelector: sel}))} className="px-3 py-2 bg-slate-100 border rounded-lg text-sm hover:bg-slate-200 transition" title="Bắt phần tử thủ công">🎯 Pick</button>
                </div>
                <p className="text-xs text-slate-500 mt-1">Khi Bác sĩ click vào đúng nút này, Tiện ích sẽ tự động PULL luật mới từ Cloud về ngầm.</p>
              </div>
            )}

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-800 mb-1">Loại quy tắc (Trigger Mode)</label>
                  <select className="w-full px-4 py-2 border rounded-lg font-medium focus:border-blue-500 focus:ring-1 focus:ring-blue-500" value={formData.triggerMode || "REALTIME"} onChange={e => setFormData({...formData, triggerMode: e.target.value as any})}>
                    <option value="REALTIME">Luật Cảnh báo (Quét liên tục)</option>
                    <option value="EVENT_BASED">Sự kiện (Click, Nhập text, Phím tắt...)</option>
                    <option value="ON_LOAD">Khi tải trang (Run Once on Load)</option>
                    <option value="SYNC_ON_CLICK">⚡ Lệnh Hệ thống: Tự động Kéo Luật (Auto-Pull)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-800 mb-1">Hành động (Action Type)</label>
                  <select className="w-full px-4 py-2 border border-purple-300 rounded-lg font-medium text-purple-700 bg-purple-50 focus:border-purple-500 focus:ring-1 focus:ring-purple-500" value={formData.actionType || "SHOW_WARNING"} onChange={e => setFormData({...formData, actionType: e.target.value as any})}>
                    <option value="SHOW_WARNING">🚫 Báo Lỗi / Chặn thao tác (Mặc định)</option>
                    <option value="FETCH_API">⬇️ Gọi API & Lưu LocalStorage</option>
                    <option value="CLEAR_STORAGE">🗑️ Xóa LocalStorage</option>
                  </select>
                </div>
              </div>
              <p className="text-xs text-slate-500">
                {formData.triggerMode === "EVENT_BASED" 
                  ? "Quy tắc này sẽ nằm yên chờ sự kiện (click, change, keydown...) trên các phần tử mục tiêu rồi mới kích hoạt Hành động." 
                  : formData.triggerMode === "SYNC_ON_CLICK"
                  ? "Biến quy tắc này thành một lệnh hệ thống: tự động PULL cấu hình từ Đám mây khi người dùng click vào phần tử được chỉ định (như nút Đăng nhập)."
                  : formData.triggerMode === "ON_LOAD"
                  ? "Quy tắc chỉ chạy ĐÚNG 1 LẦN khi vừa tải xong trang web (rất phù hợp để gọi API hoặc hiện câu chào)."
                  : "Liên tục quét DOM mỗi 2 giây. Kích hoạt Hành động ngay lập tức khi phát hiện."}
              </p>

              {formData.triggerMode === "EVENT_BASED" && (
                <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-200">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Danh sách Nút/Ô nhập liệu (Ngăn cách phẩy)</label>
                    <div className="flex gap-2">
                      <input type="text" className="flex-1 px-3 py-2 border rounded-lg font-mono text-sm" value={formData.triggerSelector || ""} onChange={e => setFormData({...formData, triggerSelector: e.target.value})} placeholder="VD: #btnLuu, #username" />
                      <button type="button" onClick={() => handleStartPicker(sel => setFormData({...formData, triggerSelector: formData.triggerSelector ? `${formData.triggerSelector}, ${sel}` : sel}))} className="px-2 py-1 bg-slate-100 border rounded-lg text-sm hover:bg-slate-200 transition" title="Chấm nhiều nút (Cộng dồn)">🎯 Pick</button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Phím tắt (Tùy chọn)</label>
                    <input type="text" className="w-full px-3 py-2 border rounded-lg font-mono text-sm" value={formData.triggerShortcut || ""} onChange={e => setFormData({...formData, triggerShortcut: e.target.value})} placeholder="VD: F4, F5, Ctrl+S" />
                  </div>
                </div>
              )}
            </div>

            {formData.triggerMode !== "SYNC_ON_CLICK" && (!formData.actionType || formData.actionType === "SHOW_WARNING") && (
              <>
                <div className="border border-blue-200 rounded-xl p-5 bg-blue-50/20 shadow-inner">
                  <h3 className="text-sm font-bold text-blue-800 mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                    Cây Điều Kiện (Logic Tree)
                  </h3>
                  <LogicGroupEditor group={formData.logic} onChange={updateLogicGroup} onPicker={handleStartPicker} onScanner={handleStartDomScanner} />
                </div>

                <div className="border border-amber-200 rounded-xl p-5 bg-amber-50 shadow-inner mt-4 space-y-4">
                  <h3 className="text-sm font-bold text-amber-800 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                    Giao diện Cảnh báo (Warning UI)
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-amber-900 mb-1">Mẫu hiển thị (Template)</label>
                      <select 
                        className="w-full px-4 py-2 border border-amber-200 rounded-lg text-sm bg-white"
                        value={formData.warningConfig?.template || "TOAST"}
                        onChange={e => {
                          const tpl = e.target.value as any;
                          setFormData({
                            ...formData, 
                            warningConfig: { 
                              ...(formData.warningConfig || { position: "BOTTOM_RIGHT", message: formData.message || "" }), 
                              template: tpl,
                              // Đặt vị trí mặc định hợp lý cho từng loại
                              position: tpl === "MODAL" ? "CENTER" : tpl === "BANNER" ? "TOP_CENTER" : "BOTTOM_RIGHT"
                            }
                          });
                        }}
                      >
                        <option value="TOAST">Toast (Góc màn hình nhỏ gọn)</option>
                        <option value="MODAL">Modal (Hộp thoại chính giữa)</option>
                        <option value="BANNER">Banner (Dải băng vắt ngang)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-amber-900 mb-1">Vị trí (Position)</label>
                      <select 
                        className="w-full px-4 py-2 border border-amber-200 rounded-lg text-sm bg-white"
                        value={formData.warningConfig?.position || "BOTTOM_RIGHT"}
                        onChange={e => setFormData({...formData, warningConfig: { ...(formData.warningConfig || { template: "TOAST", message: "" }), position: e.target.value as any }})}
                      >
                        {formData.warningConfig?.template === "MODAL" ? (
                          <option value="CENTER">Chính giữa màn hình</option>
                        ) : formData.warningConfig?.template === "BANNER" ? (
                          <>
                            <option value="TOP_CENTER">Phía trên cùng</option>
                            <option value="BOTTOM_CENTER">Phía dưới cùng</option>
                          </>
                        ) : (
                          <>
                            <option value="BOTTOM_RIGHT">Góc dưới - Phải</option>
                            <option value="BOTTOM_LEFT">Góc dưới - Trái</option>
                            <option value="TOP_RIGHT">Góc trên - Phải</option>
                            <option value="TOP_LEFT">Góc trên - Trái</option>
                          </>
                        )}
                      </select>
                    </div>
                  </div>

                  {(formData.warningConfig?.template === "MODAL" || formData.warningConfig?.template === "BANNER") && (
                    <div>
                      <label className="block text-sm font-medium text-amber-900 mb-1">Tiêu đề (Header)</label>
                      <input 
                        type="text" 
                        className="w-full px-4 py-2 border border-amber-200 rounded-lg text-sm font-bold bg-white" 
                        value={formData.warningConfig?.title || ""} 
                        onChange={e => setFormData({...formData, warningConfig: { ...(formData.warningConfig || { template: "MODAL", position: "CENTER", message: "" }), title: e.target.value }})} 
                        placeholder="VD: PHÁT HIỆN LỖI {{api_data.error_code}}!" 
                      />
                    </div>
                  )}

                  <div className="border-t border-amber-200 pt-3">
                    <label className="block text-sm font-bold text-amber-900 mb-2">Nội dung chi tiết</label>
                    <textarea 
                      required 
                      rows={2} 
                      className="w-full px-4 py-2 border border-amber-200 rounded-lg resize-none font-medium bg-white" 
                      value={formData.warningConfig?.message ?? formData.message} 
                      onChange={e => setFormData({...formData, warningConfig: { ...(formData.warningConfig || { template: "TOAST", position: "BOTTOM_RIGHT", message: "" }), message: e.target.value }, message: e.target.value})} 
                      placeholder="Ví dụ: Chỉ định này {{api_data.error_msg}}..." 
                    />
                    <div className="mt-2 p-3 bg-amber-100/50 border border-amber-200 rounded-lg text-xs text-amber-800 space-y-1">
                      <div><strong>💡 Mẹo (Nội dung động):</strong> Bạn có thể chèn các biến từ LocalStorage vào Tiêu đề và Nội dung bằng cú pháp <code>{`{{ten_bien.path}}`}</code>. Hoặc sử dụng <code>{`{{VALUE}}`}</code> để tự động hiển thị giá trị gây lỗi.</div>
                      <div><em>Ví dụ:</em> <code>{`Phát hiện lỗi: {{api_data.loi_tu_server}}`}</code> hoặc <code>{`Dịch vụ {{VALUE}} không hợp lệ`}</code></div>
                    </div>
                  </div>
                </div>

                {/* Phần Nút Hành động khẩn cấp */}
                <div className="border border-green-200 rounded-xl p-5 bg-green-50 shadow-inner space-y-4">
                  <h3 className="text-sm font-bold text-green-800 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    Nút Hành động khẩn cấp trên Cảnh báo (Tùy chọn POST API)
                  </h3>
                  <p className="text-xs text-green-700 mb-2">Nút này chỉ xuất hiện khi Cảnh báo được kích hoạt (luật bị vi phạm). Cho phép Bác sĩ bấm vào để tự động gửi thông số lỗi về Server.</p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-green-900 mb-1">Tên Nút hiển thị</label>
                      <input type="text" className="w-full px-4 py-2 border border-green-200 rounded-lg text-sm" value={formData.toastAction?.label || ""} onChange={e => setFormData({...formData, toastAction: {...(formData.toastAction || { apiUrl: "", userSelector: "" }), label: e.target.value}})} placeholder="VD: Thêm vào DS Phạm vi" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-green-900 mb-1">Selector lấy Tên Bác sĩ (Tùy chọn)</label>
                      <div className="flex gap-2">
                        <input type="text" className="flex-1 px-4 py-2 border border-green-200 rounded-lg font-mono text-sm" value={formData.toastAction?.userSelector || ""} onChange={e => setFormData({...formData, toastAction: {...(formData.toastAction || { label: "", apiUrl: "" }), userSelector: e.target.value}})} placeholder="VD: #username_display" />
                        <button type="button" onClick={() => handleStartPicker(sel => setFormData({...formData, toastAction: {...(formData.toastAction || { label: "", apiUrl: "" }), userSelector: sel}}))} className="px-2 py-1 bg-white border border-green-200 rounded-lg text-sm text-green-700 hover:bg-green-100 transition">🎯</button>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-green-900 mb-1">Đường dẫn API (URL gửi POST)</label>
                    <input type="text" className="w-full px-4 py-2 border border-green-200 rounded-lg font-mono text-sm" value={formData.toastAction?.apiUrl || ""} onChange={e => setFormData({...formData, toastAction: {...(formData.toastAction || { label: "", userSelector: "" }), apiUrl: e.target.value}})} placeholder="VD: https://api.benhvien.vn/request_permission" />
                    <p className="text-xs text-green-600 mt-1">Dữ liệu POST sẽ có dạng: <code>{`{ "username": "...", "error_value": "Mã gây lỗi" }`}</code></p>
                  </div>
                </div>
              </>
            )}

            {formData.actionType === "FETCH_API" && (
              <div className="border border-purple-200 rounded-xl p-5 bg-purple-50 shadow-inner space-y-4">
                <h3 className="text-sm font-bold text-purple-800 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                  Cấu hình Gọi API Động
                </h3>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <label className="block text-sm font-medium text-purple-900">Đường dẫn API (URL)</label>
                    <button type="button" onClick={handleTestApi} disabled={isTestingApi} className="text-xs font-bold text-white bg-purple-600 px-3 py-1 rounded hover:bg-purple-700 disabled:opacity-50">
                      {isTestingApi ? "Đang Test..." : "⚡ Test API Nhanh"}
                    </button>
                  </div>
                  <input type="text" required className="w-full px-4 py-2 border border-purple-200 rounded-lg font-mono text-sm" value={formData.apiActionConfig?.apiUrl || ""} onChange={e => setFormData({...formData, apiActionConfig: {...(formData.apiActionConfig || { paramSelector: "", storageKey: "" }), apiUrl: e.target.value}})} placeholder="Ví dụ: https://.../api/permissions?user=" />
                  <p className="text-xs text-purple-600 mt-1">API sẽ tự động nối tham số lấy được từ Selector bên dưới vào cuối URL này.</p>
                  
                  {apiTestResult && (
                    <div className="mt-2 p-3 bg-slate-900 rounded-lg overflow-auto max-h-[150px]">
                      <div className="text-[10px] text-slate-400 mb-1 flex justify-between"><span>Kết quả (JSON):</span><button type="button" onClick={() => setApiTestResult(null)} className="hover:text-white">✕ Tắt</button></div>
                      <pre className="text-xs font-mono text-green-400 whitespace-pre-wrap">{apiTestResult}</pre>
                    </div>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-purple-900 mb-1">Selector ô chứa tham số</label>
                    <div className="flex gap-2">
                      <input type="text" className="flex-1 px-4 py-2 border border-purple-200 rounded-lg font-mono text-sm" value={formData.apiActionConfig?.paramSelector || ""} onChange={e => setFormData({...formData, apiActionConfig: {...(formData.apiActionConfig || { apiUrl: "", storageKey: "" }), paramSelector: e.target.value}})} placeholder="VD: #username" />
                      <button type="button" onClick={() => handleStartPicker(sel => setFormData({...formData, apiActionConfig: {...(formData.apiActionConfig || { apiUrl: "", storageKey: "" }), paramSelector: sel}}))} className="px-2 py-1 bg-white border border-purple-200 rounded-lg text-sm text-purple-700 hover:bg-purple-100 transition">🎯</button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-purple-900 mb-1">Tên biến lưu LocalStorage</label>
                    <input type="text" required className="w-full px-4 py-2 border border-purple-200 rounded-lg font-mono text-sm" value={formData.apiActionConfig?.storageKey || ""} onChange={e => setFormData({...formData, apiActionConfig: {...(formData.apiActionConfig || { apiUrl: "", paramSelector: "" }), storageKey: e.target.value}})} placeholder="VD: api_data" />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-purple-900 mb-1">Tên biến cần dọn dẹp trước (Tùy chọn)</label>
                  <input type="text" className="w-full px-4 py-2 border border-purple-200 rounded-lg font-mono text-sm bg-white" value={formData.apiActionConfig?.clearStorageKeyBeforeFetch !== undefined ? formData.apiActionConfig.clearStorageKeyBeforeFetch : (formData.apiActionConfig?.storageKey || "")} onChange={e => setFormData({...formData, apiActionConfig: {...(formData.apiActionConfig || { apiUrl: "", storageKey: "", paramSelector: "" }), clearStorageKeyBeforeFetch: e.target.value}})} placeholder="Để trống sẽ tự động lấy theo Tên biến lưu ở trên" />
                  <p className="text-xs text-purple-600 mt-1">Hệ thống sẽ tự động xóa biến này để làm sạch rác trước khi gọi API (Mặc định là xóa chính biến bạn sắp lưu).</p>
                </div>
              </div>
            )}

            {formData.actionType === "CLEAR_STORAGE" && (
              <div className="border border-orange-200 rounded-xl p-5 bg-orange-50 shadow-inner space-y-4">
                <h3 className="text-sm font-bold text-orange-800 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  Cấu hình Xóa LocalStorage
                </h3>
                <div>
                  <label className="block text-sm font-medium text-orange-900 mb-1">Tên biến cần xóa (Storage Key)</label>
                  <input type="text" required className="w-full px-4 py-2 border border-orange-200 rounded-lg font-mono text-sm" value={formData.clearStorageConfig?.storageKey || ""} onChange={e => setFormData({...formData, clearStorageConfig: { storageKey: e.target.value }})} placeholder="VD: api_data" />
                </div>
              </div>
            )}

            </div>
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex justify-end gap-3 shrink-0">
              <button type="button" onClick={onClose} className="px-5 py-2.5 text-slate-600 bg-white border border-slate-300 rounded-xl font-medium hover:bg-slate-50 transition">Hủy bỏ</button>
              <button type="submit" className="px-5 py-2.5 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition shadow-md">Lưu cấu hình Luật</button>
            </div>
          </form>
        </div>
      </div>

      {/* DOM Scanner Modal */}
      {showDomScanner && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl h-[80vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <div>
                <h2 className="text-lg font-bold text-slate-800">Kết quả Quét DOM</h2>
                <p className="text-xs text-slate-500">Tìm kiếm và chọn phần tử chứa dữ liệu bạn muốn kiểm tra</p>
              </div>
              <button onClick={() => setShowDomScanner(false)} className="text-slate-400 hover:text-red-500 transition-colors">✕ Đóng</button>
            </div>
            
            <div className="p-4 border-b border-slate-100 bg-white">
              <input type="text" className="w-full px-4 py-2 border border-slate-300 rounded-lg" placeholder="Tìm kiếm theo giá trị nội dung hoặc tên class, id..." value={domSearchTerm} onChange={e => setDomSearchTerm(e.target.value)} autoFocus />
            </div>

            <div className="flex-1 overflow-auto bg-slate-50 p-4">
              {isScanning ? (
                <div className="flex justify-center items-center h-full">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
                  <span className="ml-3 text-slate-500 font-medium">Đang quét dữ liệu trang...</span>
                </div>
              ) : filteredDomElements.length === 0 ? (
                <div className="text-center text-slate-500 mt-10">Không tìm thấy phần tử nào phù hợp.</div>
              ) : (
                <div className="grid grid-cols-1 gap-2">
                  {filteredDomElements.map((el, i) => (
                    <div key={i} className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm flex items-center gap-4 hover:border-blue-400 hover:shadow transition group">
                      <div className="w-16 flex-shrink-0 text-center">
                        <span className="px-2 py-1 bg-slate-100 text-slate-500 text-xs rounded font-mono uppercase">{el.tagName}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-slate-800 truncate" title={el.textValue}>{el.textValue || "(Rỗng)"}</div>
                        <div className="text-xs text-slate-400 font-mono truncate mt-1" title={el.selector}>{el.selector}</div>
                      </div>
                      <button 
                        type="button"
                        onClick={() => {
                          if (pickerCallback) pickerCallback(el.selector);
                          setShowDomScanner(false);
                        }}
                        className="px-4 py-1.5 bg-blue-50 text-blue-600 border border-blue-200 rounded text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        Chọn thẻ này
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Tab Selector Modal */}
      {showTabSelector && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl overflow-hidden animate-in fade-in zoom-in-95">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h2 className="text-lg font-bold text-slate-800">Chọn Tab để Thao tác</h2>
              <button onClick={() => setShowTabSelector(false)} className="text-slate-400 hover:text-red-500 transition-colors">✕</button>
            </div>
            <div className="p-4 max-h-[60vh] overflow-auto">
              <p className="text-sm text-slate-600 mb-4">Bạn đang mở nhiều tab VNPT HIS. Vui lòng chọn một tab cụ thể để chạy {tabActionType === "PICK" ? "Picker (Bắt thẻ)" : "DOM Scanner"}:</p>
              <div className="grid gap-2">
                {availableTabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => tabActionType === "PICK" ? activatePickerOnTab(tab.id!) : activateDomScannerOnTab(tab.id!)}
                    className="flex flex-col text-left p-3 border border-slate-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition"
                  >
                    <span className="font-semibold text-slate-800 truncate block w-full">{tab.title || "Không có tiêu đề"}</span>
                    <span className="text-xs text-slate-500 break-all block w-full mt-1">{tab.url}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// Helper components for Logic Tree
function LogicGroupEditor({ group, onChange, onPicker, onScanner }: { group: LogicGroup, onChange: (g: LogicGroup) => void, onPicker: (cb: (s: string) => void) => void, onScanner: (cb: (s: string) => void) => void }) {
  const addCondition = () => {
    onChange({ ...group, conditions: [...group.conditions, { ...defaultCondition }] });
  };

  const addGroup = () => {
    onChange({ ...group, conditions: [...group.conditions, { type: "GROUP", logicalOp: "AND", conditions: [{ ...defaultCondition }] }] });
  };

  const updateChild = (index: number, newChild: ConditionNode | LogicGroup) => {
    const newConds = [...group.conditions];
    newConds[index] = newChild;
    onChange({ ...group, conditions: newConds });
  };

  const removeChild = (index: number) => {
    const newConds = [...group.conditions];
    newConds.splice(index, 1);
    onChange({ ...group, conditions: newConds });
  };

  return (
    <div className="pl-6 border-l-2 border-slate-300 space-y-4 relative py-2">
      <div 
        className="absolute -left-[18px] top-4 w-[34px] text-center bg-white border border-slate-300 rounded shadow-sm py-1 text-xs font-bold text-slate-600 cursor-pointer hover:bg-slate-50 hover:text-blue-600 transition" 
        onClick={() => onChange({...group, logicalOp: group.logicalOp === "AND" ? "OR" : "AND"})}
        title="Bấm để đổi AND / OR"
      >
        {group.logicalOp}
      </div>
      {group.conditions.map((child, idx) => (
        <div key={idx} className="flex gap-2 items-start relative group">
          <div className="absolute -left-[14px] top-4 w-3 border-t-2 border-slate-300"></div>
          <div className="flex-1">
            {child.type === "GROUP" ? (
              <LogicGroupEditor group={child} onChange={c => updateChild(idx, c)} onPicker={onPicker} onScanner={onScanner} />
            ) : (
              <ConditionEditor condition={child} onChange={c => updateChild(idx, c)} onPicker={onPicker} onScanner={onScanner} />
            )}
          </div>
          <button type="button" onClick={() => removeChild(idx)} className="text-slate-300 hover:text-red-500 p-2 opacity-0 group-hover:opacity-100 transition-opacity" title="Xóa điều kiện này">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
          </button>
        </div>
      ))}
      <div className="flex gap-3 text-sm pt-2 pl-2">
        <button type="button" onClick={addCondition} className="text-blue-600 font-medium hover:bg-blue-50 px-3 py-1 rounded transition">+ Điều kiện</button>
        <button type="button" onClick={addGroup} className="text-purple-600 font-medium hover:bg-purple-50 px-3 py-1 rounded transition">+ Nhóm (Group)</button>
      </div>
    </div>
  );
}

function ConditionEditor({ condition, onChange, onPicker, onScanner }: { condition: ConditionNode, onChange: (c: ConditionNode) => void, onPicker: (cb: (s: string) => void) => void, onScanner: (cb: (s: string) => void) => void }) {
  return (
    <div className="flex flex-wrap gap-2 items-center bg-white p-3 border border-slate-200 rounded-lg shadow-sm">
      <div className="flex items-center gap-1 min-w-[200px] flex-1">
        <input type="text" placeholder="DOM Selector hoặc {{VALUE}}, {{STORAGE:key}}..." title="Nhập CSS Selector, Dùng nút Pick, hoặc gõ {{VALUE}} để lấy giá trị dòng hiện tại, hoặc {{STORAGE:ten_bien}} để so sánh với LocalStorage" className="w-full px-3 py-1.5 text-sm border border-slate-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-mono" value={condition.selector} onChange={e => onChange({...condition, selector: e.target.value})} />
        <button type="button" onClick={() => onPicker(s => onChange({...condition, selector: s}))} className="p-1.5 bg-slate-50 border border-slate-200 rounded text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition" title="Bắt phần tử thủ công">🎯</button>
        <button type="button" onClick={() => onScanner(s => onChange({...condition, selector: s}))} className="p-1.5 bg-slate-50 border border-slate-200 rounded text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition" title="Mở bảng Quét DOM">🔍</button>
      </div>
      
      <select className="px-3 py-1.5 text-sm border border-slate-300 rounded bg-slate-50 focus:border-blue-500 font-medium" value={condition.operator} onChange={e => onChange({...condition, operator: e.target.value as Operator})}>
        <option value="==">Bằng (==)</option>
        <option value="!=">Khác (!=)</option>
        <option value=">">Lớn hơn (&gt;)</option>
        <option value="<">Nhỏ hơn (&lt;)</option>
        <option value=">=">Lớn hơn bằng (&gt;=)</option>
        <option value="<=">Nhỏ hơn bằng (&lt;=)</option>
        <option value="CONTAINS">Chứa từ khóa</option>
        <option value="NOT_CONTAINS">Không chứa từ khóa</option>
        <option value="IS_EMPTY">Bị bỏ trống</option>
        <option value="IS_NOT_EMPTY">Không bỏ trống</option>
        <option value="LENGTH_EQUALS">Độ dài =</option>
        <option value="LENGTH_NOT_EQUALS">Độ dài khác (!=)</option>
        <option value="LENGTH_MIN">Độ dài &gt;=</option>
        <option value="IN_ARRAY">Nằm trong mảng (IN)</option>
        <option value="NOT_IN_ARRAY">Không nằm trong mảng (NOT IN)</option>
      </select>
      
      {condition.operator !== "IS_EMPTY" && condition.operator !== "IS_NOT_EMPTY" && (
        <div className="flex items-center gap-1 flex-1 min-w-[200px]">
          <select className="px-2 py-1.5 text-sm border border-slate-300 rounded bg-slate-50" value={condition.dataSourceType} onChange={e => onChange({...condition, dataSourceType: e.target.value as "STATIC" | "API" | "LOCAL_STORAGE"})}>
            <option value="STATIC">Nhập tay</option>
            <option value="LOCAL_STORAGE">Biến LocalStorage</option>
            <option value="API">Tự gọi API</option>
          </select>

          {condition.dataSourceType === "STATIC" && (
            <input type="text" placeholder="Giá trị so sánh..." className="flex-1 px-3 py-1.5 text-sm border border-slate-300 rounded focus:border-blue-500" value={condition.value || ""} onChange={e => onChange({...condition, value: e.target.value})} />
          )}

          {condition.dataSourceType === "LOCAL_STORAGE" && (
            <>
              <input type="text" placeholder="Tên biến (Key) trong LocalStorage..." className="flex-1 px-3 py-1.5 text-sm border border-slate-300 border-l-4 border-l-orange-400 rounded focus:border-blue-500 font-mono" value={condition.localStorageKey || ""} onChange={e => onChange({...condition, localStorageKey: e.target.value})} />
              <input type="text" placeholder="Trường trích xuất (VD: data.list)" className="w-[180px] px-2 py-1.5 text-xs border border-slate-300 rounded border-l-4 border-l-purple-400" value={condition.apiResponsePath || ""} onChange={e => onChange({...condition, apiResponsePath: e.target.value})} title="Nếu biến lưu dạng JSON, nhập đường dẫn để trích xuất mảng (VD: permissions)" />
            </>
          )}

          {condition.dataSourceType === "API" && (
            <>
              <input type="url" placeholder="https://api..." className="flex-1 px-3 py-1.5 text-sm border border-slate-300 rounded focus:border-blue-500" value={condition.value || ""} onChange={e => onChange({...condition, value: e.target.value})} />
              <input type="text" placeholder="Trường JSON (VD: data.value)" className="w-[140px] px-2 py-1.5 text-xs border border-slate-300 rounded" value={condition.apiResponsePath || ""} onChange={e => onChange({...condition, apiResponsePath: e.target.value})} title="Đường dẫn trích xuất từ dữ liệu JSON trả về (Ví dụ: data.length)" />
            </>
          )}
        </div>
      )}
    </div>
  );
}
