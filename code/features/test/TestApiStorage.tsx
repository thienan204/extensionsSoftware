import React, { useState } from "react";
import { Storage } from "@plasmohq/storage";

const storage = new Storage({ area: "local" });

export function TestApiStorage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [customJson, setCustomJson] = useState('{\n  "id": 999,\n  "name": "Custom User"\n}');
  const [storageKey, setStorageKey] = useState("ma_dich_vu"); // Biến cho phép người dùng tùy chọn tên Key

  const handleFetchAndSave = async () => {
    if (!storageKey) return alert("Vui lòng nhập Tên biến (Storage Key)!");
    try {
      setLoading(true);
      // 1. Gọi API miễn phí (Lấy thông tin User 1)
      const response = await fetch("https://jsonplaceholder.typicode.com/users/1");
      const data = await response.json();

      // 2. Lưu vào Storage
      await storage.set(storageKey, data);
      
      setResult({ status: `Đã lưu API mẫu vào biến [${storageKey}] thành công!`, data });
      alert(`✅ Đã gọi API và lưu vào Storage (${storageKey}) thành công!`);
    } catch (error) {
      console.error(error);
      alert("❌ Có lỗi xảy ra khi gọi API");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveCustomJson = async () => {
    if (!storageKey) return alert("Vui lòng nhập Tên biến (Storage Key)!");
    try {
      const parsedData = JSON.parse(customJson);
      await storage.set(storageKey, parsedData);
      setResult({ status: `Đã lưu chuỗi JSON tùy chỉnh vào biến [${storageKey}] thành công!`, data: parsedData });
      alert(`✅ Đã lưu chuỗi JSON vào Storage (${storageKey}) thành công!`);
    } catch (error) {
      console.error(error);
      alert("❌ Chuỗi JSON không hợp lệ. Vui lòng kiểm tra lại cú pháp!");
    }
  };

  const handleLoadFromStorage = async () => {
    if (!storageKey) return alert("Vui lòng nhập Tên biến (Storage Key)!");
    // Lấy dữ liệu từ Storage lên để kiểm tra
    const data = await storage.get(storageKey);
    if (data) {
      setResult({ status: `Dữ liệu của biến [${storageKey}] đang có trong Storage:`, data });
    } else {
      setResult({ status: `Không tìm thấy dữ liệu cho biến [${storageKey}] trong Storage`, data: null });
    }
  };
  
  const handleClearStorage = async () => {
    if (!storageKey) return alert("Vui lòng nhập Tên biến (Storage Key)!");
    await storage.remove(storageKey);
    setResult({ status: `Đã xóa biến [${storageKey}] trong Storage`, data: null });
    alert(`✅ Đã xóa thành công biến ${storageKey}!`);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
      <h2 className="text-2xl font-bold text-slate-800 mb-6 border-b pb-4">Test Gọi API & Storage</h2>
      
      <div className="space-y-6">
        
        {/* Nhập Tên Biến cần Test */}
        <div className="bg-blue-50/50 p-6 rounded-xl border border-blue-100 mb-6">
          <label className="block text-sm font-bold text-blue-800 mb-2">
            Tên biến (Storage Key) cần kiểm tra:
          </label>
          <input 
            type="text"
            className="w-full md:w-1/2 p-3 font-mono text-sm border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
            value={storageKey}
            onChange={(e) => setStorageKey(e.target.value)}
            placeholder="VD: ma_dich_vu"
          />
          <p className="text-xs text-blue-600 mt-2 font-medium">Nhập tên biến (ví dụ: <code>ma_dich_vu</code>) và bấm nút <b>2. Kiểm tra Storage</b> để xem đã có dữ liệu chưa.</p>
        </div>

        {/* Nhập JSON tùy chỉnh */}
        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Nhập chuỗi JSON để lưu thử nghiệm:
          </label>
          <textarea 
            className="w-full h-32 p-4 font-mono text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={customJson}
            onChange={(e) => setCustomJson(e.target.value)}
            placeholder="Nhập JSON hợp lệ..."
          />
          <button 
            onClick={handleSaveCustomJson}
            className="mt-4 px-6 py-2 bg-emerald-600 text-white font-bold rounded-lg shadow-sm hover:bg-emerald-700 transition"
          >
            Lưu chuỗi JSON này vào Storage
          </button>
        </div>

        <div className="flex gap-4">
          <button 
            onClick={handleFetchAndSave}
            disabled={loading}
            className="px-6 py-3 bg-blue-600 text-white font-bold rounded-xl shadow-md hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Đang xử lý..." : "1. Gọi API & Lưu Storage"}
          </button>
          
          <button 
            onClick={handleLoadFromStorage}
            className="px-6 py-3 bg-indigo-100 text-indigo-700 font-bold rounded-xl hover:bg-indigo-200 transition"
          >
            2. Kiểm tra Storage
          </button>
          
          <button 
            onClick={handleClearStorage}
            className="px-6 py-3 bg-red-100 text-red-700 font-bold rounded-xl hover:bg-red-200 transition"
          >
            3. Xóa Storage
          </button>
        </div>

        {/* Khu vực hiển thị kết quả */}
        {result && (
          <div className="mt-8 bg-slate-50 border border-slate-200 rounded-xl p-6">
            <h3 className="font-bold text-slate-700 mb-2">{result.status}</h3>
            {result.data && (
              <pre className="bg-slate-800 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
                {JSON.stringify(result.data, null, 2)}
              </pre>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
