import React, { useState } from "react";

export function SecuritySettings() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [statusMsg, setStatusMsg] = useState<{ text: string, type: "success" | "error" } | null>(null);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMsg(null);

    if (newPassword !== confirmPassword) {
      setStatusMsg({ text: "Mật khẩu xác nhận không khớp!", type: "error" });
      return;
    }

    if (newPassword.length < 6) {
      setStatusMsg({ text: "Mật khẩu mới phải có ít nhất 6 ký tự!", type: "error" });
      return;
    }

    try {
      const data = await chrome.storage.local.get("admin_password");
      const savedPass = data.admin_password || "admin123";

      if (currentPassword !== savedPass) {
        setStatusMsg({ text: "Mật khẩu hiện tại không đúng!", type: "error" });
        return;
      }

      await chrome.storage.local.set({ "admin_password": newPassword });
      setStatusMsg({ text: "Đổi mật khẩu thành công!", type: "success" });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setStatusMsg({ text: "Có lỗi xảy ra khi lưu mật khẩu.", type: "error" });
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden max-w-2xl">
      <div className="p-6 border-b border-slate-100 bg-slate-50/50">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
          Bảo mật Hệ thống (Đổi mật khẩu)
        </h2>
        <p className="text-sm text-slate-500 mt-1">Mật khẩu này dùng để khóa trang Quản trị, ngăn chặn người khác (hoặc máy Client) truy cập và sửa đổi các Luật Cảnh báo.</p>
      </div>
      
      <div className="p-6">
        <form onSubmit={handleChangePassword} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Mật khẩu hiện tại</label>
            <input 
              type="password" 
              required
              className="w-full px-4 py-2 border rounded-lg focus:border-blue-500" 
              value={currentPassword}
              onChange={e => setCurrentPassword(e.target.value)}
              placeholder="Mặc định là: admin123"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Mật khẩu mới</label>
            <input 
              type="password" 
              required
              minLength={6}
              className="w-full px-4 py-2 border rounded-lg focus:border-blue-500" 
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              placeholder="Ít nhất 6 ký tự"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Xác nhận mật khẩu mới</label>
            <input 
              type="password" 
              required
              minLength={6}
              className="w-full px-4 py-2 border rounded-lg focus:border-blue-500" 
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              placeholder="Nhập lại mật khẩu mới"
            />
          </div>

          {statusMsg && (
            <div className={`p-3 rounded-lg text-sm font-medium ${statusMsg.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
              {statusMsg.text}
            </div>
          )}

          <div className="pt-2">
            <button type="submit" className="px-5 py-2.5 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition shadow-md flex items-center gap-2">
              Lưu thay đổi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
