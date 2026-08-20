# Quy tắc lập trình cho Hệ thống Extension VNPT HIS (Coding Rules)

Đây là file thiết lập các quy tắc dành riêng cho AI (Agent) khi viết code cho dự án này. 
Agent BẮT BUỘC PHẢI TUÂN THỦ các quy tắc dưới đây trong mọi tình huống.

## 1. Nguyên tắc cốt lõi (Core Principles)
- **Kiến trúc linh hoạt & dễ bảo trì:** Viết code rõ ràng. Áp dụng Cấu trúc thư mục theo Tính năng (Feature-based) thay vì gom tất cả components vào 1 chỗ. Chia theo tính năng (VD: `/features/auth`, `/features/validation`) để dễ quản lý.
- **Hỏi trước khi làm:** Nếu gặp khó khăn, tình huống không chắc chắn, hoặc có sự thay đổi lớn về thiết kế, BẮT BUỘC phải dừng lại và hỏi ý kiến người dùng trước khi tiếp tục.
- **Xử lý Lỗi Triệt để (Strict Error Handling):** Mọi lệnh gọi API và thao tác DOM phải bọc trong Try...Catch và luôn có thông báo thân thiện (Toast/Alert) cho người dùng nếu lỗi.

## 2. Quy tắc An toàn Dữ liệu
- **TUYỆT ĐỐI KHÔNG XÓA DATABASE:** Dưới mọi hình thức, cấm việc thực thi các lệnh xóa (DROP, DELETE) trên cơ sở dữ liệu nếu không có chỉ định trực tiếp và xác nhận của người dùng.

## 3. Kiến trúc Component (Component-Based)
- **Tái sử dụng (Reusable):** Code giao diện (UI) phải được chia nhỏ thành các React Components độc lập, có tính tái sử dụng cao. Không viết code "Spaghetti".
- **Quản lý State tập trung:** Quản lý State bằng Zustand hoặc Context. Không truyền dữ liệu qua lại quá nhiều lớp (Prop-drilling). Dùng kho lưu trữ state tập trung cho các dữ liệu lớn.

## 4. Công nghệ & Ngôn ngữ (Tech Stack)
- Sử dụng TypeScript để đảm bảo chặt chẽ về kiểu dữ liệu (Typing).
- Giao diện sử dụng React và Tailwind CSS.
- **Quản lý Class CSS:** Bắt buộc dùng `clsx` hoặc `tailwind-merge` để tránh việc các thẻ HTML có class dài dòng và xung đột khi dùng Tailwind CSS.

## 5. Quy tắc Đặt tên (Naming Conventions)
- Tên biến, hàm: `camelCase` (Ví dụ: `fetchUserData`).
- Tên Component, File Component: `PascalCase` (Ví dụ: `UserProfile.tsx`).
- Tên hằng số (Constants): `UPPER_SNAKE_CASE` (Ví dụ: `MAX_RETRY_COUNT`).

## 6. Quy tắc Tài liệu (Documentation)
- **Luôn có Hướng dẫn sử dụng:** Khi hoàn thành code xong bất kỳ một chức năng (Feature) hoặc một phân hệ nào, BẮT BUỘC phải viết ngay Hướng dẫn sử dụng chi tiết cho phần đó.
- **Minh họa rõ ràng:** Trong tài liệu hướng dẫn, phải có các ví dụ minh họa (Ví dụ code, hoặc kịch bản thao tác từng bước) để người dùng có thể dễ dàng hiểu và test ngay lập tức. Càng chi tiết và dễ hiểu càng tốt.
