# Hướng Dẫn Xây Dựng API Nội Bộ Cho CareCheck Assistant

Bạn đang cấu hình sử dụng **Máy chủ Nội bộ Bệnh viện (Custom API)** thay vì dùng JSONBin. Việc này đảm bảo tính bảo mật tuyệt đối 100% vì dữ liệu luật cảnh báo không bao giờ lọt ra ngoài mạng LAN/Internet của Bệnh viện Đa khoa Lạng Sơn.

Để Tiện ích có thể kết nối được với Server `https://htqlbenhvien.bvdklangson.com.vn:201/htqlbenhvien`, bộ phận IT cần lập trình thêm **2 đường dẫn API (Endpoints)** đơn giản trên server này.

---

## 1. Yêu Cầu Kỹ Thuật (API Specification)

Tiện ích mở rộng (Extension) giao tiếp với Server thông qua dữ liệu chuẩn **JSON**, với cấu trúc là một mảng (Array) các quy tắc (Rules).

> Lưu ý quan trọng:
> - Tiện ích sẽ truyền và nhận nguyên một Mảng (Array) chứa các Object luật. 
> - API của bạn chỉ cần nhận cái mảng đó lưu vào Database, và khi có request GET thì lôi cái mảng đó từ Database ra trả về đúng y như vậy. Không cần xử lý logic gì phức tạp.

### 1.1. API Tải Luật Về (Dành cho Máy Trạm PULL)
- **Method:** `GET`
- **Chức năng:** Trả về danh sách các luật đang lưu trong Database.
- **Header gửi lên:** `Authorization: Bearer <API_KEY>` (nếu bạn có cấu hình bảo mật).
- **Kết quả trả về:** Phải là JSON dạng Array. Ví dụ:
```json
[
  {
    "id": "mock-1",
    "name": "Cảnh báo nhập sai Ngày sinh",
    "urlPattern": "*://*.vncare.vn/*",
    "targetSelector": "#txtNgaySinh",
    "triggerMode": "REALTIME",
    "logic": { /* ... */ },
    "message": "Ngày sinh không hợp lệ!"
  },
  {
    "id": "mock-2",
    "triggerMode": "SYNC_ON_CLICK",
    "targetSelector": "#btn-login"
  }
]
```

### 1.2. API Đẩy Luật Lên (Dành cho Máy Admin PUSH)
- **Method:** `POST`
- **Chức năng:** Nhận toàn bộ danh sách luật mới và GHI ĐÈ vào Database.
- **Header gửi lên:** 
  - `Content-Type: application/json`
  - `Authorization: Bearer <API_KEY>`
- **Body gửi lên (Payload):** Toàn bộ chuỗi JSON Array (Giống hệt phần GET ở trên).
- **Kết quả trả về:** HTTP Status 200 (OK).

---

## 2. Các Mã Nguồn Mẫu Để Bạn Tham Khảo

Nếu hệ thống quản lý của BVĐK Lạng Sơn đang dùng **C# (ASP.NET Core)**, **PHP** hoặc **Node.js**, bạn có thể đưa đoạn code mẫu này cho lập trình viên để họ thêm vào Server.

### Lựa chọn A: Mẫu code cho C# (ASP.NET Core Web API)

```csharp
using Microsoft.AspNetCore.Mvc;
using System.IO;

namespace VNCARE.Controllers
{
    [ApiController]
    [Route("api/carecheck-rules")]
    public class CareCheckRulesController : ControllerBase
    {
        // Giả sử lưu tạm vào file trên ổ cứng máy chủ để test nhanh
        // Trong thực tế, bạn nên lưu chuỗi JSON này vào SQL Server (1 cột kiểu NVARCHAR(MAX))
        private readonly string _filePath = "C:\\Data\\carecheck_rules.json";

        // GET: htqlbenhvien.bvdklangson.com.vn:201/htqlbenhvien/api/carecheck-rules/get
        [HttpGet("get")]
        public IActionResult GetRules()
        {
            // Kiểm tra bảo mật (Tùy chọn)
            var token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            if (token != "SECRET_TOKEN_CUA_BV_LANG_SON") return Unauthorized();

            if (!System.IO.File.Exists(_filePath))
                return Ok(new object[] { }); // Trả về mảng rỗng nếu chưa có dữ liệu

            string jsonString = System.IO.File.ReadAllText(_filePath);
            return Content(jsonString, "application/json");
        }

        // POST: htqlbenhvien.bvdklangson.com.vn:201/htqlbenhvien/api/carecheck-rules/update
        [HttpPost("update")]
        public async Task<IActionResult> UpdateRules()
        {
            // Kiểm tra bảo mật
            var token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            if (token != "SECRET_TOKEN_CUA_BV_LANG_SON") return Unauthorized();

            using (StreamReader reader = new StreamReader(Request.Body))
            {
                string jsonBody = await reader.ReadToEndAsync();
                
                // Lưu chuỗi JSON đè vào file (hoặc Database)
                System.IO.File.WriteAllText(_filePath, jsonBody);
                
                return Ok(new { success = true, message = "Saved successfully" });
            }
        }
    }
}
```

### Lựa chọn B: Mẫu code cho PHP

Nếu server chạy PHP, bạn tạo 1 thư mục `carecheck_api` trên server, tạo file `index.php` với nội dung sau:

```php
<?php
// Fix CORS nếu máy trạm truy cập từ IP khác
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// 1. Kiểm tra Token bảo mật
$headers = apache_request_headers();
$authHeader = isset($headers['Authorization']) ? $headers['Authorization'] : '';
if ($authHeader !== 'Bearer SECRET_TOKEN_CUA_BV_LANG_SON') {
    http_response_code(401);
    echo json_encode(["error" => "Unauthorized"]);
    exit();
}

$db_file = 'rules_database.json';

// 2. Xử lý API PULL (GET)
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (file_exists($db_file)) {
        header('Content-Type: application/json');
        echo file_get_contents($db_file);
    } else {
        echo '[]'; // Mảng rỗng
    }
    exit();
}

// 3. Xử lý API PUSH (POST)
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $jsonString = file_get_contents('php://input');
    
    // Lưu đè dữ liệu
    file_put_contents($db_file, $jsonString);
    
    echo json_encode(["success" => true]);
    exit();
}
?>
```

### Lựa chọn C: Mẫu code cho Node.js (Express)

Nếu bạn đang chạy môi trường Node.js, bạn có thể tạo một server Express siêu nhẹ chỉ với 1 file `server.js`:

```javascript
const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();
app.use(cors()); // Cho phép gọi API từ Extension
app.use(express.json());

const DB_FILE = './rules_database.json';
const SECRET_TOKEN = 'SECRET_TOKEN_CUA_BV_LANG_SON';

// Middleware kiểm tra bảo mật
const authenticate = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (authHeader !== `Bearer ${SECRET_TOKEN}`) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    next();
};

// 1. API PULL (GET) - Tải dữ liệu về
app.get('/api/carecheck-rules/get', authenticate, (req, res) => {
    if (fs.existsSync(DB_FILE)) {
        const rawData = fs.readFileSync(DB_FILE, 'utf8');
        res.setHeader('Content-Type', 'application/json');
        res.send(rawData);
    } else {
        res.json([]); // Mảng rỗng
    }
});

// 2. API PUSH (POST) - Đẩy dữ liệu lên
app.post('/api/carecheck-rules/update', authenticate, (req, res) => {
    const jsonBody = JSON.stringify(req.body);
    
    // Lưu đè toàn bộ vào file
    fs.writeFileSync(DB_FILE, jsonBody, 'utf8');
    
    res.json({ success: true, message: 'Saved successfully' });
});

// Chạy server ở cổng 201
app.listen(201, () => {
    console.log('CareCheck Custom API đang chạy tại cổng 201...');
});
```

---

## 3. Cấu hình lên Tiện Ích (Sau khi tạo xong API)

Sau khi bộ phận IT đã đưa API lên server xong, bạn vào máy **Admin**, điền cấu hình như sau:

1. **Chọn:** `Dùng API Nội bộ Bệnh viện`
2. **GET URL (Tải Luật):** `https://htqlbenhvien.bvdklangson.com.vn:201/htqlbenhvien/api/carecheck-rules/get` *(Thay đổi tùy theo đường dẫn bạn code)*
3. **POST URL (Đẩy Luật):** `https://htqlbenhvien.bvdklangson.com.vn:201/htqlbenhvien/api/carecheck-rules/update`
4. **API Key / Token:** `SECRET_TOKEN_CUA_BV_LANG_SON`

Lưu lại, và từ nay Dữ liệu của bệnh viện sẽ được bảo vệ 100% trên chính máy chủ của các bạn!
