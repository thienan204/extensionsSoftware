import React from "react";

export type Operator = "==" | "!=" | ">" | "<" | ">=" | "<=" | "CONTAINS" | "NOT_CONTAINS" | "IS_EMPTY" | "IS_NOT_EMPTY" | "LENGTH_EQUALS" | "LENGTH_NOT_EQUALS" | "LENGTH_MIN" | "IN_ARRAY" | "NOT_IN_ARRAY";
export type LogicalOp = "AND" | "OR";

export interface ConditionNode {
  type: "CONDITION";
  selector: string;
  operator: Operator;
  dataSourceType: "STATIC" | "API" | "LOCAL_STORAGE";
  value?: string;
  apiResponsePath?: string;
  // Dùng khi dataSourceType = LOCAL_STORAGE
  localStorageKey?: string; 
}

export interface LogicGroup {
  type: "GROUP";
  logicalOp: LogicalOp;
  conditions: Array<ConditionNode | LogicGroup>;
}

export interface Rule {
  id: string;
  name: string;
  urlPattern: string;
  targetSelector: string;
  isActive?: boolean; // Cho phép bật/tắt luật (Từ phía Admin)
  allowClientToggle?: boolean; // Cho phép Bác sĩ tự bật/tắt luật này trên máy cá nhân
  showInClientUI?: boolean; // Cho phép hiển thị ở giao diện Client
  
  // Hành động của Rule (Low-Code)
  actionType?: "SHOW_WARNING" | "FETCH_API" | "CLEAR_STORAGE" | "CONFIRM_WARNING" | "SET_VALUE" | "SAVE_TO_STORAGE" | "FETCH_AND_SELECT";
  
  // --- Cấu hình cho action SHOW_WARNING ---
  logic?: LogicGroup;
  message?: string; // (DEPRECATED) Giữ lại để tương thích ngược. Khuyên dùng warningConfig
  
  warningConfig?: {
    template: "TOAST" | "MODAL" | "BANNER";
    position?: "TOP_RIGHT" | "BOTTOM_RIGHT" | "TOP_LEFT" | "BOTTOM_LEFT" | "TOP_CENTER" | "BOTTOM_CENTER" | "CENTER";
    title?: string;
    message: string;
  };
  
  // --- Cấu hình cho action FETCH_API ---
  apiActionConfig?: {
    apiUrl: string;
    paramSelector?: string; // Nơi lấy tham số để nối vào URL (VD: #username)
    storageKey: string;     // Tên biến lưu vào LocalStorage
    clearStorageKeyBeforeFetch?: string; // Tên biến cần xóa trước khi gọi API
  };

  // --- Cấu hình cho action FETCH_AND_SELECT ---
  fetchAndSelectConfig?: {
    apiUrl: string;
    paramSelector?: string; // Nơi lấy tham số để nối vào URL (VD: #txtSoThe)
    columns: { key: string; title: string }[]; // Cấu hình các cột hiển thị
    selectField: string; // Tên trường dữ liệu cần lấy sau khi chọn dòng (VD: SOHENKHA)
    modalTitle?: string; // Tiêu đề hiển thị trên popup chọn dòng
  };

  // --- Cấu hình cho action CLEAR_STORAGE ---
  clearStorageConfig?: {
    storageKey: string;     // Tên biến cần xóa
  };

  // --- Cấu hình Nút Hành động khẩn cấp (POST API) trên Toast ---
  toastAction?: {
    label: string;             // Chữ hiển thị trên nút (VD: Xin cấp quyền)
    apiUrl: string;            // Link API nhận POST
    userSelector?: string;     // Selector để móc tên Bác sĩ trên màn hình
  };

  // --- Cấu hình cho action SET_VALUE ---
  setValueConfig?: {
    value: string; // Giá trị cần điền
  };

  triggerMode?: "REALTIME" | "EVENT_BASED" | "SYNC_ON_CLICK" | "ON_LOAD";
  triggerSelector?: string;
  triggerShortcut?: string;
}

interface RuleListProps {
  rules: Rule[];
  onOpenModal: () => void;
  onDeleteRule: (id: string) => void;
  onEditRule: (rule: Rule) => void;
  onExport: () => void;
  onImport: () => void;
  onSync: () => void;
  onToggleRule: (rule: Rule, isActive: boolean) => void;
}

export function RuleList({ rules, onOpenModal, onDeleteRule, onEditRule, onToggleRule, onExport, onImport, onSync }: RuleListProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
        <h2 className="text-xl font-bold text-slate-800">Danh sách Luật Cảnh báo</h2>
        <div className="flex gap-2">
          <button 
            onClick={onSync}
            title="Đồng bộ ngay từ Cloud"
            className="bg-purple-100 hover:bg-purple-200 text-purple-700 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
            Sync
          </button>
          <button 
            onClick={onExport}
            title="Xuất file cấu hình"
            className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
            Export
          </button>
          <button 
            onClick={onImport}
            title="Nhập file cấu hình"
            className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/></svg>
            Import
          </button>
          <button 
            onClick={onOpenModal}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-colors shadow-sm flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4"/>
            </svg>
            Thêm Luật mới
          </button>
        </div>
      </div>
      
      <div className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-sm font-semibold text-slate-500 uppercase tracking-wider">
                <th className="pb-3 px-4">Tên quy tắc</th>
                <th className="pb-3 px-4">URL Pattern</th>
                <th className="pb-3 px-4">DOM Selector</th>
                <th className="pb-3 px-4 text-center">Trạng thái</th>
                <th className="pb-3 px-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {rules.map((rule) => (
                <tr key={rule.id} className={`border-b border-slate-100 hover:bg-slate-50/80 transition-colors ${rule.isActive === false ? 'opacity-50 grayscale' : ''}`}>
                  <td className="py-4 px-4 font-medium text-slate-800">{rule.name}</td>
                  <td className="py-4 px-4 text-slate-500 font-mono text-xs">{rule.urlPattern}</td>
                  <td className="py-4 px-4 text-blue-600 font-mono text-xs bg-blue-50/50 rounded">{rule.targetSelector}</td>
                  <td className="py-4 px-4 text-center">
                    <label className="relative inline-flex items-center cursor-pointer" title={rule.isActive === false ? "Đang tắt" : "Đang bật"}>
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={rule.isActive !== false} 
                        onChange={(e) => onToggleRule(rule, e.target.checked)} 
                      />
                      <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <button 
                      onClick={() => onEditRule(rule)}
                      className="text-slate-400 hover:text-blue-600 transition-colors px-2"
                    >
                      Sửa
                    </button>
                    <button 
                      onClick={() => onDeleteRule(rule.id)}
                      className="text-slate-400 hover:text-red-600 transition-colors px-2"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {rules.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-500">Chưa có luật cảnh báo nào. Hãy bấm "Thêm Luật mới" để bắt đầu.</p>
          </div>
        )}
      </div>
    </div>
  );
}
