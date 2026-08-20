import React, { useState, useEffect } from "react"
import { getSyncSettings, saveSyncSettings, type SyncSettings, fetchRulesFromCloud, saveAllRulesAPI, pushRulesToCloud, fetchRulesAPI } from "../../services/api"
import type { Rule } from "./RuleList"

interface Props {
  onSyncSuccess: (rules: Rule[]) => void;
}

export function CloudSyncSettings({ onSyncSuccess }: Props) {
  const [settings, setSettings] = useState<SyncSettings | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [isSyncing, setIsSyncing] = useState(false)
  const [message, setMessage] = useState<{type: 'success' | 'error', text: string} | null>(null)

  useEffect(() => {
    getSyncSettings().then(setSettings)
  }, [])

  if (!settings) return <div className="p-8 text-center animate-pulse text-slate-500">Đang tải cấu hình...</div>

  const handleSave = async () => {
    setIsSaving(true)
    setMessage(null)
    try {
      await saveSyncSettings(settings)
      setMessage({ type: 'success', text: 'Đã lưu cấu hình đồng bộ thành công!' })
      // Báo cho background script biết để cập nhật chu kỳ báo thức (alarm)
      chrome.runtime.sendMessage({ action: "UPDATE_SYNC_ALARM" });
    } catch (error: any) {
      setMessage({ type: 'error', text: `Lỗi khi lưu: ${error.message}` })
    } finally {
      setIsSaving(false)
    }
  }

  const handleManualSync = async () => {
    setIsSyncing(true)
    setMessage(null)
    try {
      const rules = await fetchRulesFromCloud(settings)
      if (rules && Array.isArray(rules)) {
        await saveAllRulesAPI(rules)
        onSyncSuccess(rules)
        setMessage({ type: 'success', text: `Đã kéo thành công ${rules.length} luật từ máy chủ!` })
      } else {
        throw new Error("Dữ liệu tải về không hợp lệ")
      }
    } catch (error: any) {
      setMessage({ type: 'error', text: `Lỗi đồng bộ: ${error.message}` })
    } finally {
      setIsSyncing(false)
    }
  }

  const handlePushToCloud = async () => {
    setIsSyncing(true)
    setMessage(null)
    try {
      const localRules = await fetchRulesAPI();
      await pushRulesToCloud(localRules, settings);
      setMessage({ type: 'success', text: `Đã ĐẨY thành công ${localRules.length} luật lên máy chủ đám mây!` })
    } catch (error: any) {
      setMessage({ type: 'error', text: `Lỗi đẩy dữ liệu: ${error.message}` })
    } finally {
      setIsSyncing(false)
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
      <div className="flex justify-between items-center mb-6 border-b pb-4">
        <h2 className="text-2xl font-bold text-slate-800">Đồng bộ Đám mây (Cloud Sync)</h2>
        <div className="flex gap-2">
          {settings.role === 'ADMIN' && (
            <button
              onClick={handlePushToCloud}
              disabled={isSyncing}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              Đẩy lên Cloud (PUSH)
            </button>
          )}
          <button
            onClick={handleManualSync}
            disabled={isSyncing}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Tải về máy (PULL)
          </button>
        </div>
      </div>

      {message && (
        <div className={`p-4 mb-6 rounded-lg font-medium ${message.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
          {message.text}
        </div>
      )}

      <div className="space-y-8">
        {/* Vai trò */}
        <div>
          <h3 className="text-lg font-bold text-slate-700 mb-3">1. Phân quyền Máy tính</h3>
          <div className="grid grid-cols-2 gap-4">
            <label className={`cursor-pointer border-2 rounded-xl p-4 flex gap-3 transition-colors ${settings.role === 'ADMIN' ? 'border-blue-600 bg-blue-50' : 'border-slate-200 hover:border-slate-300'}`}>
              <input type="radio" name="role" value="ADMIN" checked={settings.role === 'ADMIN'} onChange={() => setSettings({...settings, role: 'ADMIN'})} className="mt-1 w-5 h-5 text-blue-600" />
              <div>
                <div className="font-bold text-slate-800 text-lg">Máy Quản trị (Admin)</div>
                <div className="text-sm text-slate-500 mt-1">Được phép Thêm/Sửa/Xóa luật. Tự động đẩy dữ liệu (PUSH) lên Server mỗi khi Lưu.</div>
              </div>
            </label>
            <label className={`cursor-pointer border-2 rounded-xl p-4 flex gap-3 transition-colors ${settings.role === 'CLIENT' ? 'border-emerald-600 bg-emerald-50' : 'border-slate-200 hover:border-slate-300'}`}>
              <input type="radio" name="role" value="CLIENT" checked={settings.role === 'CLIENT'} onChange={() => setSettings({...settings, role: 'CLIENT'})} className="mt-1 w-5 h-5 text-emerald-600" />
              <div>
                <div className="font-bold text-slate-800 text-lg">Máy Trạm (Client)</div>
                <div className="text-sm text-slate-500 mt-1">Chỉ được xem luật. Tự động tải (PULL) cấu hình từ Server về máy liên tục.</div>
              </div>
            </label>
          </div>
        </div>

        {/* Loại Máy chủ */}
        <div>
          <h3 className="text-lg font-bold text-slate-700 mb-3">2. Lựa chọn Máy chủ (Backend)</h3>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <label className={`cursor-pointer border-2 rounded-xl p-4 flex gap-3 transition-colors ${settings.backendType === 'JSONBIN' ? 'border-purple-600 bg-purple-50' : 'border-slate-200 hover:border-slate-300'}`}>
              <input type="radio" name="backend" value="JSONBIN" checked={settings.backendType === 'JSONBIN'} onChange={() => setSettings({...settings, backendType: 'JSONBIN'})} className="mt-1 w-5 h-5 text-purple-600" />
              <div>
                <div className="font-bold text-slate-800 text-lg">Dùng JSONBin.io (Cloud)</div>
                <div className="text-sm text-slate-500 mt-1">Dễ cài đặt, miễn phí. Yêu cầu máy tính có kết nối Internet.</div>
              </div>
            </label>
            <label className={`cursor-pointer border-2 rounded-xl p-4 flex gap-3 transition-colors ${settings.backendType === 'CUSTOM_API' ? 'border-purple-600 bg-purple-50' : 'border-slate-200 hover:border-slate-300'}`}>
              <input type="radio" name="backend" value="CUSTOM_API" checked={settings.backendType === 'CUSTOM_API'} onChange={() => setSettings({...settings, backendType: 'CUSTOM_API'})} className="mt-1 w-5 h-5 text-purple-600" />
              <div>
                <div className="font-bold text-slate-800 text-lg">Dùng API Nội bộ Bệnh viện</div>
                <div className="text-sm text-slate-500 mt-1">Bảo mật tuyệt đối, dữ liệu không lọt ra ngoài mạng LAN.</div>
              </div>
            </label>
          </div>

          {/* Form JSONBin */}
          {settings.backendType === 'JSONBIN' && (
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">JSONBin ID (Cần thiết để tải dữ liệu)</label>
                <input 
                  type="text" 
                  value={settings.binId || ''} 
                  onChange={e => setSettings({...settings, binId: e.target.value})}
                  placeholder="VD: 64b8a2c28b43533..." 
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Master Key (Chỉ cần cho Máy Admin để ghi dữ liệu)</label>
                <input 
                  type="password" 
                  value={settings.masterKey || ''} 
                  onChange={e => setSettings({...settings, masterKey: e.target.value})}
                  placeholder="VD: $2b$10$abc..." 
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>
          )}

          {/* Form Custom API */}
          {settings.backendType === 'CUSTOM_API' && (
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Đường dẫn Tải Luật (GET URL)</label>
                <input 
                  type="text" 
                  value={settings.getUrl || ''} 
                  onChange={e => setSettings({...settings, getUrl: e.target.value})}
                  placeholder="VD: http://192.168.1.100/api/rules" 
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Đường dẫn Đẩy Luật (POST URL) - Dành cho Admin</label>
                <input 
                  type="text" 
                  value={settings.postUrl || ''} 
                  onChange={e => setSettings({...settings, postUrl: e.target.value})}
                  placeholder="VD: http://192.168.1.100/api/rules/update" 
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">API Key / Token (Nếu Server yêu cầu bảo mật)</label>
                <input 
                  type="password" 
                  value={settings.apiKey || ''} 
                  onChange={e => setSettings({...settings, apiKey: e.target.value})}
                  placeholder="Nhập Bearer Token..." 
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>
          )}
        </div>

        {/* Chu kỳ đồng bộ */}
        <div>
          <h3 className="text-lg font-bold text-slate-700 mb-3">3. Cài đặt Thời gian (Auto-Sync)</h3>
          <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
            <label className="block text-sm font-semibold text-slate-700 mb-1">Chu kỳ kéo dữ liệu ngầm (phút)</label>
            <div className="flex items-center gap-3">
              <input 
                type="number" 
                min="1"
                max="1440"
                value={settings.syncInterval || 30} 
                onChange={e => setSettings({...settings, syncInterval: parseInt(e.target.value, 10) || 30})}
                className="w-32 px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <span className="text-slate-500 text-sm">Phút (Áp dụng chủ yếu cho Máy Trạm để tự động cập nhật luật)</span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-end pt-4 border-t">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-200 transition-colors"
          >
            {isSaving ? "Đang lưu..." : "Lưu Cấu hình Đồng bộ"}
          </button>
        </div>
      </div>
    </div>
  )
}
