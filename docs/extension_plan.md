# Kế hoạch phát triển Extension - CareCheck Assistant

## 1. Mục tiêu dự án
- Tương tác và xử lý dữ liệu tự động trên hệ thống quản lý bệnh viện.
- **Nguồn dữ liệu đầu vào (Input):** Màn hình danh sách bệnh nhân và thông tin điều trị (URL ví dụ: `bvlangson.vncare.vn/...`).

## 2. Lộ trình Phát triển (Roadmap)

### Giai đoạn 1: Core Engine & Giả lập (Hoàn thành)
- [x] Nhận diện trang web mục tiêu (chỉ chạy trên domain chỉ định).
- [x] Động cơ quét DOM (MutationObserver) tốc độ cao.
- [x] Tính năng "Visual Picker" - click để bắt phần tử.
- [x] Giao diện Admin quản lý Luật (Rules) lưu trữ tạm qua Local Storage.

### Giai đoạn 2: Backend, Cơ chế Xác thực Linh hoạt (Flexible Auth) & Hệ thống Mẫu
Dựa trên thống nhất trước đó, hệ thống sẽ được thiết kế hướng tới tính dễ dùng tối đa trong môi trường bệnh viện:

1. **Cơ chế 1 - Ẩn danh (Guest Mode - Mặc định):**
   - Triển khai hàng loạt trên các máy tính bệnh viện mà không cần Bác sĩ phải Đăng nhập.
   - Extension tự ngầm lấy **Luật Chung (Global Rules)** từ Server và bảo vệ màn hình khám bệnh tự động.

2. **Cơ chế 2 - Đăng nhập Cá nhân (Personal Mode):**
   - Tích hợp đăng nhập (Authentication) qua Popup UI. 
   - Sau khi Bác sĩ đăng nhập, Extension sẽ tải thêm bộ **Luật Cá nhân (Personal Profile)** và **Luật theo Khoa/Phòng (Templates)** trộn chung với Luật Chung.

3. **Server API & Hệ thống Quản trị:**
   - Kết nối API kiểm tra chéo dữ liệu (VD: Lấy lịch sử thẻ khám chữa bệnh BHYT từ site khác).
   - Chuyển đổi lưu trữ từ Local Storage sang Cơ sở dữ liệu thật (PostgreSQL).
   - Trang Admin cho phép tạo sẵn các bộ Template (Khoa Nội, Khoa Nhi, v.v.).

## 3. Kiến trúc & Thành phần
- **Content Script**: Chịu trách nhiệm quét DOM, trích xuất dữ liệu và vẽ khung cảnh báo viền đỏ.
- **Background Worker**: Xử lý gọi API ngầm tới Server, quản lý Token Xác thực.
- **Popup UI**: Màn hình Đăng nhập (Login) và hiển thị trạng thái hệ thống.
- **Options UI**: Trang Admin (Dashboard) quản lý cấu hình.

## 4. Công nghệ sử dụng
- Ngôn ngữ: TypeScript, React.js.
- Giao diện: Tailwind CSS.
- Đóng gói: Plasmo Framework.
