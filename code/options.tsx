import "./style.css"
import { useState, useEffect } from "react"
import { RuleList, type Rule } from "./features/admin/RuleList"
import { RuleFormModal } from "./features/admin/RuleFormModal"
import { fetchRulesAPI, saveRuleAPI, deleteRuleAPI, saveAllRulesAPI, getSyncSettings, type SyncSettings } from "./services/api"
import { CloudSyncSettings } from "./features/admin/CloudSyncSettings"
import { SecuritySettings } from "./features/admin/SecuritySettings"
import { TestApiStorage } from "./features/test/TestApiStorage"

// Đường link gốc để đồng bộ cấu hình (Sẽ thay bằng link thật sau)
const SYNC_URL = "https://raw.githubusercontent.com/sample/carecheck-rules.json";

function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = await chrome.storage.local.get("admin_password");
    const savedPass = data.admin_password || "admin123";
    if (password === savedPass) {
      onLogin();
    } else {
      setError("Mật khẩu không chính xác!");
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 text-center">
          <div className="w-16 h-16 bg-white/20 rounded-2xl mx-auto flex items-center justify-center backdrop-blur-sm mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-1">CareCheck Assistant</h2>
          <p className="text-blue-100 text-sm">Hệ thống Quản trị & Cấu hình Luật</p>
        </div>
        <div className="p-8">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Mật khẩu truy cập</label>
              <input 
                type="password" 
                required
                autoFocus
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-600 focus:ring-0 transition-colors text-lg text-center tracking-widest" 
                value={password}
                onChange={e => { setPassword(e.target.value); setError(""); }}
                placeholder="••••••"
              />
              {error && <p className="text-red-500 text-sm mt-2 text-center font-medium animate-pulse">{error}</p>}
            </div>
            <button type="submit" className="w-full py-3.5 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition shadow-lg flex justify-center items-center gap-2">
              Mở khóa hệ thống
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

function OptionsIndex() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [activeTab, setActiveTab] = useState<"rules" | "templates" | "instructions" | "cloud" | "security" | "test">("rules")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [rules, setRules] = useState<Rule[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [syncSettings, setSyncSettings] = useState<SyncSettings | null>(null)

  // Dùng để truyền dữ liệu cho Modal (nếu có từ Picker)
  const [initialFormData, setInitialFormData] = useState<any>(null)
  const [editingRuleId, setEditingRuleId] = useState<string | null>(null)

  // Gọi API tải danh sách luật khi vừa mở trang (chỉ tải khi đã xác thực)
  useEffect(() => {
    if (isAuthenticated) {
      Promise.all([fetchRulesAPI(), getSyncSettings()]).then(([rulesData, settingsData]) => {
        setRules(rulesData)
        setSyncSettings(settingsData)
        setIsLoading(false)
      })
    }
  }, [isAuthenticated])

  const handleEditRule = (rule: Rule) => {
    setInitialFormData(rule)
    setEditingRuleId(rule.id)
    setIsModalOpen(true)
  }

  const handleSaveRule = async (newRuleData: Omit<Rule, "id">) => {
    const rule: Rule = {
      ...newRuleData,
      id: editingRuleId || Date.now().toString()
    }
    await saveRuleAPI(rule)
    
    if (editingRuleId) {
      setRules(rules.map(r => r.id === editingRuleId ? rule : r))
    } else {
      setRules([...rules, rule])
    }
  }

  const handleDeleteRule = async (id: string) => {
    await deleteRuleAPI(id)
    setRules(rules.filter(r => r.id !== id))
  }

  const handleToggleRule = async (rule: Rule, isActive: boolean) => {
    const updatedRule = { ...rule, isActive };
    await saveRuleAPI(updatedRule);
    setRules(rules.map(r => r.id === updatedRule.id ? updatedRule : r));
  }

  // ---- TÍNH NĂNG QUẢN LÝ CẤU HÌNH ----
  
  const handleExport = () => {
    const dataStr = JSON.stringify(rules, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `carecheck-rules-backup-${new Date().toISOString().slice(0,10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = async (event) => {
        try {
          const importedRules = JSON.parse(event.target?.result as string) as Rule[];
          if (Array.isArray(importedRules)) {
            await saveAllRulesAPI(importedRules);
            setRules(importedRules);
            alert("✅ Đã nhập cấu hình thành công!");
          } else {
            alert("❌ File cấu hình không đúng định dạng!");
          }
        } catch (err) {
          alert("❌ Lỗi khi đọc file cấu hình!");
        }
      };
      reader.readAsText(file);
    };
    input.click();
  };

  const handleSync = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(SYNC_URL);
      if (!res.ok) throw new Error("Không thể tải cấu hình từ Cloud");
      const fetchedRules = await res.json() as Rule[];
      if (Array.isArray(fetchedRules)) {
        await saveAllRulesAPI(fetchedRules);
        setRules(fetchedRules);
        alert("✅ Đã đồng bộ cấu hình mới nhất từ mạng thành công!");
      } else {
        alert("❌ Dữ liệu tải về không đúng định dạng!");
      }
    } catch (err) {
      alert("❌ Lỗi đồng bộ: Vui lòng kiểm tra lại đường Link cấu hình hoặc kết nối mạng.");
    } finally {
      setIsLoading(false);
    }
  };

  // ------------------------------------

  if (!isAuthenticated) {
    return <LoginScreen onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                CareCheck Assistant
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                Admin Mode
              </span>
              <div className="w-8 h-8 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-full shadow-md"></div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full md:w-64 space-y-2">
            <button
              onClick={() => setActiveTab("rules")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                activeTab === "rules"
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                  : "text-slate-600 hover:bg-slate-100 font-medium"
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
              Quản lý Luật (Rules)
            </button>
            <button
              onClick={() => setActiveTab("templates")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                activeTab === "templates"
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                  : "text-slate-600 hover:bg-slate-100 font-medium"
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
              </svg>
              Quản lý Mẫu (Templates)
            </button>
            <button
              onClick={() => setActiveTab("instructions")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                activeTab === "instructions"
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                  : "text-slate-600 hover:bg-slate-100 font-medium"
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Hướng dẫn Sử dụng
            </button>
            <button
              onClick={() => setActiveTab("cloud")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all duration-200 ${
                activeTab === "cloud"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
              </svg>
              Cấu hình Hệ thống
            </button>
            <button
              onClick={() => setActiveTab("security")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                activeTab === "security"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                  : "text-slate-600 hover:bg-slate-100 font-medium"
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
              Bảo mật (Đổi Mật Khẩu)
            </button>
            <button
              onClick={() => setActiveTab("test")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                activeTab === "test"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                  : "text-slate-600 hover:bg-slate-100 font-medium"
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
              Test API & Storage
            </button>
            <div className="pt-4 mt-4 border-t border-slate-200">
              <button 
                onClick={() => setIsAuthenticated(false)}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-red-600 hover:bg-red-50 font-bold"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                Đăng xuất
              </button>
            </div>
          </aside>

          {/* Main Content Area */}
          <div className="flex-1">
            {activeTab === "rules" && (
              isLoading ? (
                <div className="flex justify-center items-center h-64 bg-white rounded-2xl border border-slate-200">
                  <span className="text-slate-400 font-medium animate-pulse">Đang tải dữ liệu từ API...</span>
                </div>
              ) : (
                <RuleList 
                  rules={rules} 
                  onOpenModal={() => {
                    if (syncSettings?.role === 'CLIENT') {
                      alert("Máy tính của bạn đang ở chế độ Máy Trạm (Client). Không thể thêm luật mới.");
                      return;
                    }
                    setIsModalOpen(true);
                  }} 
                  onDeleteRule={(id) => {
                    if (syncSettings?.role === 'CLIENT') {
                      alert("Máy tính của bạn đang ở chế độ Máy Trạm (Client). Không thể xóa luật.");
                      return;
                    }
                    handleDeleteRule(id);
                  }}
                  onEditRule={(rule) => {
                    if (syncSettings?.role === 'CLIENT') {
                      alert("Máy tính của bạn đang ở chế độ Máy Trạm (Client). Chỉ có thể xem luật.");
                      return;
                    }
                    handleEditRule(rule);
                  }}
                  onToggleRule={(rule, isActive) => {
                    if (syncSettings?.role === 'CLIENT') {
                      alert("Máy tính của bạn đang ở chế độ Máy Trạm (Client). Không thể thay đổi trạng thái luật.");
                      return;
                    }
                    handleToggleRule(rule, isActive);
                  }}
                  onExport={handleExport}
                  onImport={handleImport}
                  onSync={handleSync}
                />
              )
            )}

            {activeTab === "templates" && (
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 text-center">
                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">Hệ thống Mẫu (Templates)</h3>
                <p className="text-slate-500 max-w-md mx-auto">Tính năng này đang được xây dựng. Admin sẽ có thể tạo các bộ mẫu quy tắc cho từng chuyên khoa tại đây.</p>
              </div>
            )}

            {activeTab === "instructions" && (
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                <h2 className="text-2xl font-bold text-slate-800 mb-6 border-b pb-4">Hướng Dẫn Sử Dụng Hệ Thống</h2>
                
                <div className="space-y-6 text-slate-700">
                  <div>
                    <h3 className="text-lg font-bold text-blue-700 mb-2">1. Chế độ Quét liên tục (Mặc định)</h3>
                    <p>Hệ thống sẽ chạy ngầm liên tục 2 giây/lần. Bất cứ khi nào dữ liệu trên màn hình bị sai luật, còi báo động sẽ ngay lập tức được kích hoạt.</p>
                    <p className="text-sm text-slate-500 italic mt-1">Lưu ý: Chế độ này có thể gây phiền khi dữ liệu đang tải dở dang.</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-blue-700 mb-2">2. Chế độ Thông minh (Sự kiện)</h3>
                    <p>Hệ thống chỉ kiểm tra dữ liệu vào 2 thời điểm VÀNG, đảm bảo không bỏ sót bất kỳ lỗi nào nhưng cũng không gây phiền nhiễu:</p>
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                      <li><strong>Khi nhập tay:</strong> Bác sĩ tự tay gõ vào ô và click chuột ra ngoài (Sự kiện Rời chuột / onBlur). Báo lỗi tức thì.</li>
                      <li><strong>Khi máy tự điền (Auto-fill):</strong> Hệ thống chực chờ ở Nút Lưu và Phím tắt (F4). Bác sĩ bấm nút, Tiện ích sẽ chặn lệnh Lưu lại để kiểm tra. Nếu có lỗi, nó sẽ "Nuốt" luôn sự kiện để bảo vệ dữ liệu!</li>
                    </ul>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                    <h3 className="text-md font-bold text-blue-800 mb-2">💡 Mẹo cài đặt Nút chặn Thông minh</h3>
                    <ul className="list-disc pl-6 space-y-1 text-sm text-blue-900">
                      <li>Sử dụng nút 🎯 Pick để bắt thẻ (chấm) vào nút "Lưu" hoặc "Lưu & In" trên trang HIS.</li>
                      <li>Bạn có thể Pick liên tục nhiều nút, hệ thống sẽ tự động cộng dồn chúng lại.</li>
                      <li>Nhập phím <strong>F4</strong> hoặc <strong>F5</strong> vào ô Phím tắt chặn kèm để Tiện ích có thể nuốt sự kiện bàn phím.</li>
                    </ul>
                  </div>

                  <div className="mt-8 pt-6 border-t border-slate-200">
                    <h3 className="text-xl font-bold text-slate-800 mb-4">Mô hình Đồng bộ Đám mây (Cloud Sync)</h3>
                    <p className="mb-4">Hệ thống hỗ trợ đồng bộ cấu hình trên hàng loạt máy tính thông qua Internet hoặc mạng LAN nội bộ. Việc quản lý chỉ cần thực hiện trên 1 máy duy nhất!</p>
                    
                    <h4 className="text-lg font-bold text-blue-700 mb-2">1. Phân quyền Máy tính</h4>
                    <ul className="list-disc pl-6 mb-4 space-y-2">
                      <li><strong>Máy Quản trị (Admin):</strong> Là máy chủ của trưởng khoa hoặc đội IT. Máy này có Full quyền (Thêm/Sửa/Xóa). Khi bấm Lưu cấu hình, dữ liệu sẽ tự động được <strong>Bắn (PUSH)</strong> lên Đám mây.</li>
                      <li><strong>Máy Trạm (Client):</strong> Là máy của các Bác sĩ/Y tá. Máy này bị <strong>KHÓA</strong> các chức năng chỉnh sửa để đảm bảo an toàn. Tiện ích sẽ có một tiến trình chạy ngầm, cứ mỗi 30 phút sẽ tự động <strong>Kéo (PULL)</strong> cấu hình mới nhất từ Đám mây về áp dụng.</li>
                    </ul>

                    <h4 className="text-lg font-bold text-blue-700 mb-2">2. Hướng dẫn Dùng thử JSONBin.io (Miễn phí)</h4>
                    <p className="mb-2">Nếu bệnh viện chưa code xong API nội bộ, bạn có thể triển khai ngay qua dịch vụ JSONBin theo 4 bước sau:</p>
                    <ol className="list-decimal pl-6 space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-200">
                      <li>Đăng ký 1 tài khoản miễn phí tại <a href="https://jsonbin.io/" target="_blank" className="text-blue-600 font-bold hover:underline">JSONBin.io</a>.</li>
                      <li>Tạo 1 Bin mới, chọn nội dung ban đầu là một mảng rỗng: <code>[]</code> và lấy <strong>Bin ID</strong>.</li>
                      <li>Vào phần Settings &gt; Security để lấy <strong>Master Key</strong> (Dùng làm mật khẩu ghi dữ liệu).</li>
                      <li>Trên <strong>Máy Admin</strong>: Vào Cấu hình Đồng bộ &gt; Chọn JSONBin &gt; Nhập Bin ID và Master Key &gt; Lưu cấu hình. Từ giờ, mọi chỉnh sửa luật sẽ tự động đẩy lên Bin ID này!</li>
                      <li>Trên <strong>Máy Client</strong>: Vào Cấu hình Đồng bộ &gt; Chọn Máy Trạm &gt; Chọn JSONBin &gt; Nhập Bin ID &gt; Lưu cấu hình. (Không cần nhập Master Key).</li>
                    </ol>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === "cloud" && (
              <CloudSyncSettings onSyncSuccess={(fetchedRules) => {
                setRules(fetchedRules);
                getSyncSettings().then(setSyncSettings);
              }} />
            )}

            {activeTab === "security" && (
              <SecuritySettings />
            )}

            {activeTab === "test" && (
              <TestApiStorage />
            )}
          </div>
        </div>
      </main>

      <RuleFormModal 
        isOpen={isModalOpen} 
        onClose={() => {
          setIsModalOpen(false)
          setInitialFormData(null)
          setEditingRuleId(null)
        }} 
        onSave={handleSaveRule}
        initialData={initialFormData}
      />
    </div>
  )
}

export default OptionsIndex
