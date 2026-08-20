import "./style.css"
import { useState } from "react"

function IndexPopup() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleStartPicker = async () => {
    // Lấy tab hiện tại đang mở
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
    if (tab && tab.id) {
      // Gửi lệnh kích hoạt Picker cho content script của tab đó
      chrome.tabs.sendMessage(tab.id, { action: "START_PICKING" })
      // Đóng popup để người dùng thao tác trên web
      window.close()
    }
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Đăng nhập:", username)
  }

  return (
    <div className="w-80 p-6 bg-slate-50 font-sans text-slate-800">
      <h2 className="text-xl font-bold mb-4 text-blue-600 flex items-center gap-2">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
        CareCheck Assistant
      </h2>

      <div className="mb-6 p-4 bg-white rounded-xl shadow-sm border border-slate-200">
        <p className="text-sm text-slate-600 mb-3">Tạo nhanh luật cảnh báo bằng cách trỏ vào phần tử trên trang web hiện tại.</p>
        <button 
          onClick={handleStartPicker}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-2.5 px-4 rounded-lg hover:shadow-lg hover:shadow-blue-500/30 transition-all"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"/></svg>
          Bắt đầu Bắt phần tử
        </button>
      </div>

      <div className="border-t border-slate-200 pt-4">
        <button 
          onClick={() => chrome.runtime.openOptionsPage()}
          className="w-full text-sm text-slate-500 hover:text-blue-600 flex items-center justify-center gap-1 transition-colors"
        >
          Mở trang Quản trị Hệ thống &rarr;
        </button>
      </div>
    </div>
  )
}

export default IndexPopup
