# Tài liệu Hướng dẫn Sử dụng (HDSD) - CareCheck Assistant

**CareCheck Assistant** là tiện ích mở rộng (Extension) trợ lý kiểm tra tự động trên trình duyệt Chrome, được thiết kế đặc biệt cho hệ thống quản lý bệnh viện VNPT HIS. Tiện ích này giúp các y bác sĩ và nhân viên y tế tự động hóa việc kiểm tra dữ liệu, ngăn ngừa tình trạng bỏ sót các thông tin quan trọng trong quá trình khám chữa bệnh.

---

## 1. Cài đặt Extension vào Trình duyệt Chrome

> Nếu máy tính của bạn đã được IT cài đặt sẵn, vui lòng bỏ qua bước này.

1. Mở trình duyệt Google Chrome.
2. Truy cập vào đường dẫn quản lý tiện ích bằng cách gõ lên thanh địa chỉ: `chrome://extensions/`
3. Nhìn lên góc **trên cùng bên phải** của màn hình, gạt công tắc **"Developer mode"** (Chế độ dành cho nhà phát triển) sang màu xanh để bật.
4. Bấm vào nút **"Load unpacked"** (Tải tiện ích đã giải nén) ở góc trên bên trái.
5. Chọn đến thư mục mã nguồn chứa bản build của phần mềm (Thường nằm ở: `extensionsSoftware/code/build/chrome-mv3-prod`).
6. Tìm biểu tượng **CareCheck Assistant** trong danh sách và bấm vào nút **Ghim (Pin)** để tiện ích luôn hiện trên thanh công cụ.

---

## 2. Hướng dẫn Thiết lập Luật Cảnh báo Tự động

Hệ thống cung cấp tính năng **Visual Picker (Bắt phần tử trực quan)**, giúp bạn không cần biết lập trình vẫn có thể tự tạo ra các luật cảnh báo cho bất kỳ ô nhập liệu nào.

### Bước 2.1: Bắt phần tử trên trang VNPT HIS
1. Mở tab mới và đăng nhập vào hệ thống VNPT HIS của bạn như bình thường.
2. Đi tới màn hình mà bạn muốn tạo cảnh báo (VD: Màn hình tiếp đón bệnh nhân).
3. Bấm vào biểu tượng của Extension trên thanh công cụ Chrome. Một bảng nhỏ (Popup) sẽ hiện ra.
4. Bấm vào nút màu xanh **"Bắt đầu Bắt phần tử"**.
5. Lúc này, tiện ích đã được kích hoạt ngầm. Hãy rê chuột (hover) quanh các nút bấm hoặc ô nhập liệu trên màn hình, bạn sẽ thấy một **khung viền màu xanh dương** bao quanh chúng.
6. Khi khung viền màu xanh bao quanh đúng ô dữ liệu bạn hay quên nhập (VD: ô Nhóm máu), hãy **Click chuột trái** vào ô đó.

### Bước 2.2: Lưu Luật Cảnh báo
1. Ngay sau khi bạn Click ở bước trên, trang **Quản trị Hệ thống** sẽ tự động mở lên.
2. Các thông số kỹ thuật khô khan như đường link (`URL Pattern`) và đoạn mã nhận diện phần tử (`DOM Selector`) đã được hệ thống **tự động điền sẵn hoàn toàn**.
3. Bạn chỉ cần nhập 2 thông tin còn lại:
   - **Tên quy tắc:** Đặt một cái tên dễ nhớ (VD: `Cảnh báo quên nhập Nhóm máu`).
   - **Lời cảnh báo:** Viết câu thông báo sẽ đập vào mắt người dùng khi họ mắc lỗi (VD: `Bác sĩ chưa nhập Nhóm máu cho bệnh nhân!`).
4. Bấm nút **"Lưu cấu hình"**. Xong!

---

## 3. Trải nghiệm Hệ thống Cảnh báo (Core Engine)

Sau khi đã tạo luật thành công, hệ thống sẽ chạy hoàn toàn tự động ở chế độ ngầm.

1. Hãy quay lại trang VNPT HIS (Nhấn `F5` tải lại trang nếu cần).
2. Thử xóa trắng ô dữ liệu bạn vừa cấu hình luật.
3. **Kết quả:** Ngay lập tức, ô dữ liệu đó sẽ bị tô viền màu **Đỏ rực**, kèm theo một bảng thông báo nhỏ hiển thị đúng câu chữ bạn đã cài đặt.
4. Khi bạn (hoặc bác sĩ khác) điền dữ liệu vào ô đó, viền đỏ và thông báo sẽ tự động biến mất ngay lập tức.

---

## 4. Quản lý, Sửa và Xóa Luật

Bạn có thể thay đổi các luật cảnh báo bất cứ lúc nào.

1. Bấm chuột phải vào biểu tượng Extension trên Chrome, chọn **"Tùy chọn"** (Options) HOẶC mở Popup và bấm dòng chữ **"Mở trang Quản trị Hệ thống"** ở dưới cùng.
2. Trang Bảng điều khiển (Admin Dashboard) sẽ hiện ra. Tại tab **Quản lý Luật (Rules)**:
   - Bạn có thể xem danh sách toàn bộ các quy tắc đang hoạt động.
   - Bấm **"Sửa"** để thay đổi câu chữ cảnh báo.
   - Bấm **"Xóa"** nếu không muốn áp dụng luật đó nữa.

---

## 5. Xử lý sự cố thường gặp (FAQ)

**Hỏi: Tại sao tôi cài luật rồi nhưng ô dữ liệu không báo đỏ?**
> **Đáp:** Hãy kiểm tra lại cột `URL Pattern` trong trang Quản trị. Đảm bảo rằng đường link của trang web hiện tại khớp với cấu trúc `URL Pattern`. Ví dụ: Màn hình cấp cứu có link khác màn hình ngoại trú, do đó bạn cần phải tạo luật riêng cho từng màn hình, hoặc sử dụng dấu sao `*` để áp dụng cho mọi màn hình (VD: `*://*.vncare.vn/*`).

**Hỏi: Visual Picker không bắt được một số khung bảng đặc biệt?**
> **Đáp:** Đối với các cấu trúc web quá phức tạp, bạn có thể tự mình viết mã `DOM Selector` (VD: `#id_cua_phan_tu`) và dán vào form "Thêm Luật mới" bằng tay trong trang Quản trị.

---
*(Tài liệu được biên soạn tự động, lưu hành nội bộ dự án VNPT HIS)*
