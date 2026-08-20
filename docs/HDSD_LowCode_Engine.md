# Hướng dẫn sử dụng: Hệ thống Low-Code (Low-Code Engine)

Hệ thống Tiện ích (Extension) của Bệnh viện Đa khoa Lạng Sơn (BVDKLS) đã được nâng cấp lõi trở thành một Nền tảng Low-Code. 
Thay vì phải code cứng từng tính năng cảnh báo (Ví dụ: Khóa dịch vụ, Bắt trái tuyến, Phân quyền API...), giờ đây Quản trị viên (Admin) có thể tự do tạo ra **MỌI KỊCH BẢN CẢNH BÁO** trực tiếp từ giao diện **"Quản lý Luật"**.

Dưới đây là 3 kịch bản phổ biến nhất để thiết lập **Hệ thống Phân quyền API** bằng giao diện Low-Code.

---

## 1. Kịch bản 1: Xóa Cache Phân Quyền Cũ (Khi nhập Tên Tài Khoản)
Khi Bác sĩ nhập tên tài khoản vào ô đăng nhập, chúng nhập xóa các dữ liệu phân quyền cũ của bác sĩ trước đó còn lưu trong bộ nhớ máy (LocalStorage) để đảm bảo không bị lẫn lộn dữ liệu.

**Cách thiết lập:**
- Bấm **+ Thêm Luật mới** và cấu hình như sau:
- **Tên quy tắc:** Xóa quyền cũ khi gõ tài khoản
- **URL Pattern:** `*://*.vncare.vn/*/login.jsp`
- **Loại quy tắc:** Sự kiện (Click, Nhập text...)
- **Hành động:** 🗑️ Xóa LocalStorage
- **Danh sách Nút/Ô:** `#username` *(ID của ô nhập tên tài khoản)*
- **Tên biến cần xóa (Storage Key):** `api_permissions`

---

## 2. Kịch bản 2: Gọi API lấy Quyền mới (Khi bấm nút Đăng nhập)
Sau khi nhập tên tài khoản, Bác sĩ bấm nút Đăng nhập. Lúc này Tiện ích sẽ gọi API về máy chủ Bệnh viện để kéo danh sách các dịch vụ mà Bác sĩ này được phép làm, sau đó lưu ngầm vào trình duyệt.

**Cách thiết lập:**
- Bấm **+ Thêm Luật mới** và cấu hình như sau:
- **Tên quy tắc:** Tải phân quyền từ API
- **URL Pattern:** `*://*.vncare.vn/*/login.jsp`
- **Loại quy tắc:** Sự kiện (Click, Nhập text...)
- **Hành động:** ⬇️ Gọi API & Lưu LocalStorage
- **Danh sách Nút/Ô:** `#btn-login` (hoặc dùng nút Pick để chấm đúng nút Đăng nhập)
- **Đường dẫn API (Cấu hình Server):** `https://api.benhvien.vn/permissions?user=` 
- **Selector ô chứa tham số:** `#username` *(Tiện ích sẽ tự động đọc chữ ở ô Tên đăng nhập để nối vào đuôi link API)*
- **Tên biến lưu LocalStorage:** `api_permissions`

---

## 3. Kịch bản 3: Khóa Checkbox Chỉ Định (Báo Lỗi / Chặn Thao Tác)
Khi vào màn hình Khám bệnh/Chỉ định dịch vụ. Nếu Bác sĩ tích chọn vào 1 dịch vụ KHÔNG CÓ TRONG DANH SÁCH ở bước 2, Tiện ích sẽ giật Còi Cảnh Báo và không cho phép tích.

**Cách thiết lập:**
- Bấm **+ Thêm Luật mới** và cấu hình như sau:
- **Tên quy tắc:** Khóa Checkbox Chỉ Định
- **URL Pattern:** `*://*.vncare.vn/*/chidinh.jsp` *(Hoặc để trống nếu muốn áp dụng mọi trang)*
- **Loại quy tắc:** Sự kiện (Click, Nhập text...)
- **Hành động:** 🚫 Báo Lỗi / Chặn thao tác (Mặc định)
- **Danh sách Nút/Ô:** `input[type="checkbox"]`
- **Lời cảnh báo hiển thị cho User:** Bác sĩ không có quyền chỉ định dịch vụ này!

**Trong Cây Điều kiện (Logic Tree), tạo 1 điều kiện sau:**
- **DOM Selector:** `tr td[aria-describedby$="_MADICHVU"]` *(Đây là cách lấy Mã Dịch Vụ ở màn hình Chỉ định)*
- **Phép toán:** `Không nằm trong mảng (NOT IN)`
- **Nguồn:** `Biến LocalStorage`
- **Tên biến (Key):** `api_permissions`

### 💡 Hướng dẫn ô "Trường trích xuất (JSON Path)"
Khi API trả về dữ liệu phức tạp, bạn có thể điền vào ô "Trường trích xuất" để Tiện ích tự động "lặn sâu" vào JSON lôi mảng ra so sánh.

**Trường hợp A: Mảng chuỗi tiêu chuẩn**
Nếu Server API trả về mảng trực tiếp: `["22.0154.1735", "11.0001", "22.B01"]`
👉 *Bỏ trống ô Trường trích xuất.* Tiện ích tự động so sánh thẳng luôn.

**Trường hợp B: Mảng nằm sâu trong Object (Response bọc ngoài)**
Nếu Server API trả về dạng bọc: `{ "success": true, "data": { "dich_vu": ["A01", "A02"] } }`
👉 Điền vào ô Trường trích xuất: `data.dich_vu`

**Trường hợp C: Mảng chứa nhiều Object (Array of Objects) cực mạnh**
Nếu Server API trả về danh sách chi tiết (thường thấy nhất trong thực tế): 
```json
{
  "success": true,
  "data": [
    { "ma_dv": "A01", "ten_dv": "Khám nội" },
    { "ma_dv": "A02", "ten_dv": "Khám ngoại" }
  ]
}
```
👉 Điền vào ô Trường trích xuất: `data.ma_dv`. 
Tiện ích sẽ tự động hiểu `data` là một mảng, và nó sẽ tự động lôi toàn bộ các giá trị của key `ma_dv` ở bên trong ra, gom thành một mảng sạch `["A01", "A02"]` để đi so sánh! Rất tiện lợi và gọn gàng!

---

## 4. Biến ma thuật `{{VALUE}}` (Tự động lấy dữ liệu trên lưới)
Khi bạn bắt một sự kiện trên Bảng/Lưới dữ liệu (Ví dụ: Click vào checkbox ở cột 1 của lưới chỉ định), bạn thường muốn kiểm tra xem cái Mã dịch vụ ở trên **cùng cái dòng vừa click đó** có thỏa mãn điều kiện hay không.

Thay vì phải dùng Nút Pick (🎯) để bắt chính xác thẻ `<td...>` của từng dòng (rất dễ gây lỗi bắt nhầm dòng khác), bạn chỉ cần gõ thẳng chữ **`{{VALUE}}`** vào ô **DOM Selector (Trường cần ktra)** ở phần Điều kiện.

**Sức mạnh của `{{VALUE}}`:**
- Nó hiểu được dòng dữ liệu (Row) mà Bác sĩ đang tương tác.
- Nó sẽ tự động dùng thuật toán thông minh **quét qua toàn bộ các Cột (td) trong dòng đó**, bới tung cả các thẻ `<input>` ẩn hay hiện bên trong để tìm xem có cột nào chứa giá trị thỏa mãn Điều kiện của bạn hay không.
- Nghĩa là: Bất kể cột Mã Dịch Vụ của bạn nằm ở Cột 2, Cột 3 hay Cột 4, `{{VALUE}}` đều xử lý mượt mà và tìm ra đúng Mã dịch vụ của dòng đó!

**Quy tắc ngầm:**
👉 Hãy luôn dùng **`{{VALUE}}`** khi muốn so sánh dữ liệu nằm ngang hàng (cùng một dòng lưới) với cái Checkbox/Nút bấm mà bạn đang bắt sự kiện!
