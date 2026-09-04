import "./style.css"
import { useState, useEffect } from "react"
import type { Rule } from "./features/admin/RuleList"
import { fetchRulesAPI } from "./services/api"

function IndexPopup() {
  const [rules, setRules] = useState<Rule[]>([])
  const [disabledRuleIds, setDisabledRuleIds] = useState<Set<string>>(new Set())
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    // Tải danh sách rules từ API/Storage
    fetchRulesAPI().then(loadedRules => {
      setRules(loadedRules)
      
      // Tải trạng thái Tắt/Bật của từng máy Client
      chrome.storage.local.get("client_disabled_rules", (result) => {
        const disabledArr = result.client_disabled_rules || [];
        setDisabledRuleIds(new Set(disabledArr));
        setIsLoading(false)
      })
    })
  }, [])

  const handleToggleRule = (ruleId: string, isCurrentlyActiveForClient: boolean) => {
    const newDisabledSet = new Set(disabledRuleIds);
    
    if (isCurrentlyActiveForClient) {
      // Client muốn tắt -> Thêm vào danh sách disabled
      newDisabledSet.add(ruleId);
    } else {
      // Client muốn bật -> Xóa khỏi danh sách disabled
      newDisabledSet.delete(ruleId);
    }

    setDisabledRuleIds(newDisabledSet);
    
    // Lưu xuống Local Storage riêng của Client
    chrome.storage.local.set({ client_disabled_rules: Array.from(newDisabledSet) });
  }

  return (
    <div className="w-80 p-4 bg-slate-50 font-sans text-slate-800 flex flex-col max-h-[500px]">
      <div className="flex-none pb-3 border-b border-slate-200 mb-3">
        <h2 className="text-lg font-bold text-blue-600 flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
          CareCheck Assistant
        </h2>
        <p className="text-xs text-slate-500 mt-1">Danh sách Quy tắc (Chế độ Bác sĩ)</p>
        
        <div className="mt-3 relative">
          <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
            <svg className="h-4 w-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </div>
          <input
            type="text"
            className="w-full pl-9 pr-3 py-1.5 bg-white border border-slate-300 text-sm rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
            placeholder="Tìm kiếm quy tắc..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-1 space-y-2">
        {isLoading ? (
          <div className="text-center py-4 text-sm text-slate-500">Đang tải cấu hình...</div>
        ) : rules.filter(r => r.isActive !== false && r.showInClientUI !== false && r.name.toLowerCase().includes(searchTerm.toLowerCase())).length === 0 ? (
          <div className="text-center py-4 text-sm text-slate-500">
            {searchTerm ? "Không tìm thấy quy tắc nào phù hợp." : "Chưa có quy tắc nào khả dụng."}
          </div>
        ) : (
          rules.filter(r => r.isActive !== false && r.showInClientUI !== false && r.name.toLowerCase().includes(searchTerm.toLowerCase())).map((rule) => {
            // Kiểm tra phân quyền: Admin có cấm Client tắt/bật rule này không?
            const isClientLocked = rule.allowClientToggle === false;
            
            // Client đang bật nếu nó không nằm trong danh sách tự tắt của Client
            const isClientActive = !disabledRuleIds.has(rule.id);
            
            // Trạng thái cuối cùng để hiển thị: Client phải bật
            const isVisualActive = isClientActive;
            
            // Nếu Admin khóa không cho Client thao tác -> Disable nút gạt
            const isToggleDisabled = isClientLocked;

            return (
              <div key={rule.id} className={`p-3 rounded-xl border flex items-center justify-between transition-colors ${isVisualActive ? 'bg-white border-blue-100 shadow-sm' : 'bg-slate-100 border-slate-200 opacity-60'}`}>
                <div className="flex-1 pr-3 overflow-hidden">
                  <div className="flex items-center gap-1">
                    <h3 className="font-semibold text-sm truncate" title={rule.name}>{rule.name}</h3>
                    {isClientLocked && (
                      <span title="Admin khóa: Không cho phép tự ý Tắt/Bật">
                        <svg className="w-3 h-3 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                      </span>
                    )}
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5 truncate">
                    {rule.actionType === "SET_VALUE" ? "✍️ Tự động điền giá trị" : "⚠️ Cảnh báo lỗi"}
                  </div>
                </div>
                
                {/* Toggle Switch */}
                <button 
                  disabled={isToggleDisabled}
                  onClick={() => handleToggleRule(rule.id, isClientActive)}
                  className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none ${isVisualActive ? 'bg-blue-600' : 'bg-slate-300'} ${isToggleDisabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
                >
                  <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${isVisualActive ? 'translate-x-4.5' : 'translate-x-1'}`} style={{ transform: isVisualActive ? 'translateX(18px)' : 'translateX(2px)' }} />
                </button>
              </div>
            )
          })
        )}
      </div>

      <div className="flex-none border-t border-slate-200 pt-3 mt-3">
        <button 
          onClick={() => chrome.runtime.openOptionsPage()}
          className="w-full text-xs font-medium bg-slate-200 hover:bg-slate-300 text-slate-700 py-2 rounded-lg flex items-center justify-center gap-1.5 transition-colors"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          Quản trị Hệ thống (Dành cho IT)
        </button>
      </div>
    </div>
  )
}

export default IndexPopup
