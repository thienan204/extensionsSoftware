# 🚀 HƯỚNG DẪN TỪNG BƯỚC: XÂY DỰNG MÁY CHỦ API BẰNG NODE.JS (CHẠY 24/7)

Tài liệu này là "cầm tay chỉ việc", giúp bạn tự tay dựng một máy chủ API nội bộ hoàn chỉnh bằng **Node.js** trên máy chủ (Windows Server) của Bệnh viện mà không cần biết code. Máy chủ này sẽ chạy ngầm vĩnh viễn và khởi động cùng Windows.

Do trang web phần mềm bệnh viện đang chạy bằng **HTTPS**, API của bạn cũng bắt buộc phải chạy qua **HTTPS**, nếu không Trình duyệt sẽ chặn kết nối (Lỗi Mixed Content).

---

## BƯỚC 1: Chuẩn bị môi trường trên Máy Chủ (Server)

1. Đăng nhập vào Máy chủ Windows (nơi có địa chỉ `htqlbenhvien.bvdklangson.com.vn`).
2. Mở trình duyệt web, vào [https://nodejs.org/](https://nodejs.org/) tải bản **LTS (Long Term Support)** và cài đặt (Cứ bấm Next liên tục cho đến khi Finish).
3. Tạo một thư mục mới trên ổ C để chứa code. Ví dụ: `C:\CareCheckAPI`
4. Mở **Command Prompt (CMD)** dưới quyền Administrator. Di chuyển vào thư mục vừa tạo bằng lệnh:
   ```cmd
   cd C:\CareCheckAPI
   ```

---

## BƯỚC 2: Cài đặt thư viện cần thiết

Trong màn hình CMD (đang ở `C:\CareCheckAPI`), bạn chạy lần lượt 2 lệnh sau:

1. Khởi tạo dự án:
   ```cmd
   npm init -y
   ```
2. Cài đặt các thư viện Web (Express) và thư viện chạy ngầm (PM2):
   ```cmd
   npm install express cors
   npm install -g pm2
   npm install -g pm2-windows-startup
   ```
*(PM2 là công cụ giúp phần mềm của bạn chạy ngầm không bao giờ tắt)*

---

## BƯỚC 3: Chuẩn bị Chứng chỉ bảo mật (SSL Certificate) - RẤT QUAN TRỌNG

Để chạy được link `https://`, bạn phải tìm được 2 file chứng chỉ SSL (thường được IT lưu trên server) của tên miền `htqlbenhvien.bvdklangson.com.vn`:
1. File **Private Key** (thường có đuôi `.key`, ví dụ: `private.key`)
2. File **Certificate** (thường có đuôi `.crt` hoặc `.cer`, ví dụ: `certificate.crt`)

👉 Bạn hãy copy 2 file này và ném chung vào thư mục `C:\CareCheckAPI`.

*(Lưu ý: Nếu chứng chỉ của bạn là đuôi `.pfx` của IIS, bạn cần nhờ IT trích xuất nó ra đuôi `.key` và `.crt` bằng công cụ OpenSSL).*

---

## BƯỚC 4: Tạo mã nguồn máy chủ (server.js)

Tại thư mục `C:\CareCheckAPI`, tạo một file text mới, đặt tên là `server.js`.
Mở file `server.js` bằng Notepad và dán toàn bộ đoạn code dưới đây vào:

```javascript
const express = require('express');
const fs = require('fs');
const https = require('https');
const cors = require('cors');

const app = express();
app.use(cors()); // Cho phép Extension từ trình duyệt truy cập
app.use(express.json());

// ================= CẤU HÌNH =================
const PORT = 202; // Cổng này BẮT BUỘC phải khác cổng 201 (vì 201 đang bị htqlbenhvien chiếm dụng)
const DB_FILE = './rules_database.json'; // File chứa dữ liệu luật
const SECRET_TOKEN = 'SECRET_TOKEN_CUA_BV_LANG_SON'; // Pass bảo vệ API

// Đường dẫn trỏ tới file SSL Certificate (Thay đổi tên file cho đúng với file của bạn)
const privateKey  = fs.readFileSync('./private.key', 'utf8');
const certificate = fs.readFileSync('./certificate.crt', 'utf8');
const credentials = { key: privateKey, cert: certificate };
// ============================================


// Kiểm tra bảo mật
const authenticate = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (authHeader !== `Bearer ${SECRET_TOKEN}`) {
        return res.status(401).json({ error: 'Truy cập bị từ chối. Sai Token!' });
    }
    next();
};

// 1. API Trả dữ liệu về cho Extension (Dành cho Máy Trạm PULL)
app.get('/extensionbvdkls/api/carecheck-rules/get', authenticate, (req, res) => {
    try {
        if (fs.existsSync(DB_FILE)) {
            const rawData = fs.readFileSync(DB_FILE, 'utf8');
            res.setHeader('Content-Type', 'application/json');
            res.send(rawData);
        } else {
            res.json([]); // Nếu chưa có file thì trả về mảng rỗng
        }
    } catch (e) {
        res.status(500).json({ error: 'Lỗi đọc dữ liệu trên Server' });
    }
});

// 2. API Lưu dữ liệu (Dành cho Máy Quản trị PUSH)
app.post('/extensionbvdkls/api/carecheck-rules/update', authenticate, (req, res) => {
    try {
        const jsonBody = JSON.stringify(req.body);
        fs.writeFileSync(DB_FILE, jsonBody, 'utf8'); // Ghi đè vào file
        res.json({ success: true, message: 'Lưu luật thành công' });
    } catch (e) {
        res.status(500).json({ error: 'Lỗi ghi dữ liệu trên Server' });
    }
});

// Chạy máy chủ HTTPS
const httpsServer = https.createServer(credentials, app);

httpsServer.listen(PORT, () => {
    console.log(`[CareCheck] Máy chủ API bảo mật (HTTPS) đang chạy tại cổng ${PORT}...`);
    console.log(`- Link GET:  https://htqlbenhvien.bvdklangson.com.vn:${PORT}/extensionbvdkls/api/carecheck-rules/get`);
    console.log(`- Link POST: https://htqlbenhvien.bvdklangson.com.vn:${PORT}/extensionbvdkls/api/carecheck-rules/update`);
});
```

---

## BƯỚC 5: Mở Tường Lửa (Firewall) cho Cổng 202

Vì cổng 201 đã bị hệ thống cũ chiếm, chúng ta dùng cổng **202** cho API mới này. Do đó, bạn phải mở cổng 202:

1. Mở **Windows Defender Firewall with Advanced Security** trên Server.
2. Chọn **Inbound Rules** -> Bấm **New Rule...** (cột bên phải)
3. Chọn **Port** -> Next.
4. Chọn **TCP** và Gõ vào ô Specific local ports: `202` -> Next.
5. Chọn **Allow the connection** -> Next -> Next.
6. Đặt tên Rule: `Mo_Cong_202_CareCheck` -> Finish.

---

## BƯỚC 6: Chạy Server ngầm vĩnh viễn bằng PM2

Trở lại cửa sổ CMD (vẫn đang ở thư mục `C:\CareCheckAPI`), chạy các lệnh sau:

1. Kích hoạt Server chạy ngầm:
   ```cmd
   pm2 start server.js --name "CareCheckAPI"
   ```
2. Cài đặt để Server tự khởi động lại mỗi khi Windows Server bị mất điện/Restart:
   ```cmd
   pm2-startup install
   pm2 save
   ```

🎉 **XONG!** Bây giờ máy chủ API của bạn đã đi vào hoạt động 24/7 một cách bền bỉ và bảo mật tuyệt đối!

---

## BƯỚC 7: Cấu hình Tiện ích trên Trình duyệt

Bạn vào phần cài đặt của Tiện ích mở rộng, chọn **Dùng API Nội bộ Bệnh viện** và điền chính xác thông tin (Lưu ý đuôi là `:202` nhé):

- **GET URL:** `https://htqlbenhvien.bvdklangson.com.vn:202/extensionbvdkls/api/carecheck-rules/get`
- **POST URL:** `https://htqlbenhvien.bvdklangson.com.vn:202/extensionbvdkls/api/carecheck-rules/update`
- **API Key / Token:** `SECRET_TOKEN_CUA_BV_LANG_SON`

Lưu lại và bắt đầu sử dụng hệ thống!
