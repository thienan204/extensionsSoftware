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

---

## 5. Kịch bản 4: Ràng buộc chéo 1-1 (Ví dụ: Trái tuyến và ĐT 1.13)
Đây là bài toán rất thường gặp trên form tiếp nhận/khám bệnh: Bắt buộc 2 trường dữ liệu phải được chọn ĐỒNG THỜI, hoặc để trống ĐỒNG THỜI. Nếu chọn 1 cái mà bỏ quên cái kia thì phải báo lỗi.

**Ví dụ thực tế:** 
Nếu chọn **Tuyến (Mã: 4)** thì bắt buộc **Đối tượng KCB** phải là **1.13** và ngược lại. Nếu chọn khác đi thì báo lỗi.

**Cách thiết lập:**
- Bấm **+ Thêm Luật mới** và cấu hình như sau:
- **Tên quy tắc:** Ràng buộc đồng bộ Tuyến (4) và ĐT KCB (1.13)
- **URL Pattern:** `*://*.vncare.vn/*/manager.jsp*`
- **Loại quy tắc:** Sự kiện (Click) hoặc Realtime. Nếu là Sự kiện, hãy điền ID nút Lưu vào ô Nút/Ô kích hoạt.
- **Hành động:** 🚫 Báo Lỗi / Chặn thao tác
- **Lời cảnh báo:** Lỗi nhập liệu! Trái tuyến (4) bắt buộc phải đi kèm với Đối tượng KCB 1.13 và ngược lại.

**Trong Cây Điều kiện (Logic Tree), bạn cần thiết lập cấu trúc phân tầng như sau:**
- Đổi Node Gốc (ngoài cùng) thành **`HOẶC (OR)`**
- Tạo **Nhóm con 1** - Đổi thành **`VÀ (AND)`**:
  - Điều kiện 1: Selector `#cboBHYT_LoaiID` | `Bằng (==)` | Giá trị: `4`
  - Điều kiện 2: Selector `#cboMA_DOITUONG_KCB` | `Khác (!=)` | Giá trị: `1.13`
- Tạo **Nhóm con 2** - Đổi thành **`VÀ (AND)`**:
  - Điều kiện 1: Selector `#cboBHYT_LoaiID` | `Khác (!=)` | Giá trị: `4`
  - Điều kiện 2: Selector `#cboMA_DOITUONG_KCB` | `Bằng (==)` | Giá trị: `1.13`

**💡 Giải thích thuật toán:**
Hệ thống sẽ dịch cấu trúc trên thành: `(Tuyến=4 VÀ ĐT!=1.13) HOẶC (Tuyến!=4 VÀ ĐT=1.13)`. 
Bất kỳ khi nào 1 trong 2 vế ngoặc đơn này xảy ra (tức là người dùng chỉ nhập 1 cái mà quên cái kia), hệ thống sẽ lập tức chặn lại và báo lỗi. Nếu nhập đúng cả 2 (hoặc không nhập cả 2), logic sẽ trả về FALSE (Không có lỗi) và cho phép lưu bình thường.

---

## 6. Kịch bản 5: Tự động điền dữ liệu tương hỗ (Auto Fill)
Thay vì báo lỗi chặn người dùng như Kịch bản 4, bạn có thể thiết lập hệ thống **tự động nhảy giá trị** cho Bác sĩ để tăng tốc độ làm việc.

**Ví dụ thực tế:** 
Nếu Bác sĩ chọn **Tuyến (Mã: 4)** thì hệ thống tự động nhảy **Đối tượng KCB** sang **1.13**. Và ngược lại, nếu chọn 1.13 thì hệ thống tự động đổi Tuyến sang 4.

**Cách thiết lập:**
Bạn cần tạo **2 Luật riêng biệt** để hỗ trợ chéo cho nhau.

**Luật 1 (Trái tuyến tự động điền 1.13):**
- **Tên quy tắc:** Tự điền 1.13 khi chọn Trái tuyến
- **Loại quy tắc:** Luật Cảnh báo (Quét liên tục REALTIME)
- **Hành động:** `✍️ Tự động điền giá trị (Auto Fill)`
- **DOM Selector của Ô cần điền:** `#cboMA_DOITUONG_KCB`
- **Giá trị cần điền tự động:** `1.13`
- **Logic Tree:** Gốc `AND` ➡️ Mệnh đề: `#cboBHYT_LoaiID` `Bằng (==)` `4`

**Luật 2 (1.13 tự động điền Trái Tuyến):**
- **Tên quy tắc:** Tự điền Trái tuyến khi chọn 1.13
- **Loại quy tắc:** Luật Cảnh báo (Quét liên tục REALTIME)
- **Hành động:** `✍️ Tự động điền giá trị (Auto Fill)`
- **DOM Selector của Ô cần điền:** `#cboBHYT_LoaiID`
- **Giá trị cần điền tự động:** `4`
- **Logic Tree:** Gốc `AND` ➡️ Mệnh đề: `#cboMA_DOITUONG_KCB` `Bằng (==)` `1.13`

**💡 Lợi ích:** Ngay khi Bác sĩ vừa thao tác đổi giá trị ở 1 trong 2 ô, hệ thống sẽ chớp nhoáng tự động gán giá trị tương ứng vào ô còn lại, đem lại trải nghiệm "ma thuật" và tránh sai sót.

---

## 7. Kịch bản 6: Truyền dữ liệu xuyên không giữa các Form (Window LocalStorage)
Khi bạn cần copy một giá trị từ Form A sang Form B, nhưng ngặt nỗi khi mở Form B lên thì Form A đã bị hệ thống HIS xóa mất tiêu (tiêu hủy DOM). Lúc này bạn không thể dùng Selector thông thường để móc dữ liệu được nữa.

**Giải pháp:** Bắt dữ liệu ngay trước khi Form A bị hủy, giấu nó vào bộ nhớ tạm của trang web, rồi xả nó ra khi Form B xuất hiện.

**Luật 1 (Lưu dữ liệu vào bộ nhớ tạm):**
- **Tên quy tắc:** Lưu Giờ vào của giường
- **Loại quy tắc:** Sự kiện (Click...)
- **Danh sách Nút/Ô:** `#btnKeGiuong` *(Nút kích hoạt việc chuyển form)*
- **Hành động:** `💾 Lưu giá trị vào LocalStorage`
- **Tên biến lưu trữ:** `TEMP_GIOVAO`
- **Giá trị cần lưu:** `{{SELECTOR:#grdBenhNhanGiuong tr.jqgrow[aria-selected="true"] td[aria-describedby="grdBenhNhanGiuong_GIOVAO"]}}`

**Luật 2 (Xả dữ liệu ra Form mới):**
- **Tên quy tắc:** Tự điền Giờ vào
- **Loại quy tắc:** Sự kiện (Click...)
- **Danh sách Nút/Ô:** `#grdDichVu tr.jqgrow` *(Dòng dịch vụ trong Form mới)*
- **Hành động:** `✍️ Tự động điền giá trị (Auto Fill)`
- **DOM Selector của Ô cần điền:** `#txtTGCHIDINH`
- **Giá trị cần điền tự động:** `{{STORAGE:TEMP_GIOVAO}}` *(Hệ thống tự động lôi dữ liệu từ bụng ra để điền)*

**Luật 3 (Dọn rác - Khuyên dùng):**
- **Tên quy tắc:** Xóa bộ nhớ tạm khi đóng form
- **Hành động:** `🗑️ Xóa LocalStorage`
- **Tên biến cần xóa:** `TEMP_GIOVAO` *(Sẽ dọn sạch sẽ để không bị lưu cữu sang bệnh nhân khác)*

> **⚠️ Phân biệt 2 loại Storage:**
> - Hành động `Lưu giá trị vào LocalStorage` (Lưu biến tạm): Lưu vào bộ nhớ RAM của chính trang HIS (Window LocalStorage). Tốc độ 0ms. Trang "Test API" của Extension sẽ **không thể nhìn thấy** biến này.
> - Hành động `Gọi API & Lưu LocalStorage`: Lưu vào Ổ cứng của Extension (Chrome Storage). Dùng để lưu danh sách phân quyền dùng chung cho mọi Tab.

---

## 8. Các từ khóa Ma thuật Mở rộng (Advanced Macros)

Ngoài `{{VALUE}}`, hệ thống còn cung cấp các "câu thần chú" cực mạnh cho ô **Giá trị cần điền tự động**:

### ✂️ Cắt chuỗi bằng Regex (`| REGEX:`)
Nếu màn hình chỉ hiển thị một chuỗi dài (VD: `Thông tin ĐT: Ngày tiếp nhận: 11/09/2026 15:44:08 - Ngày ra viện...`), bạn muốn dùng kéo cắt đúng ngày giờ ra để điền:
👉 Dùng cú pháp: `{{SELECTOR:#lblThongTinDT | REGEX:([\d]{2}\/[\d]{2}\/[\d]{4}\s+[\d]{2}:[\d]{2}:[\d]{2})}}`
Hệ thống sẽ tự động bám vào chuỗi văn bản đó, dùng Regex cắt đúng đoạn thời gian (Group 1) và trả về cho bạn.

### 🪟 Xuyên thấu Iframe (`PARENT:`)
Nếu trang HIS hiển thị Form dưới dạng Iframe (một trang web con bị nhốt trong trang web mẹ), các câu lệnh bình thường sẽ bị giới hạn bên trong Iframe đó.
👉 Dùng cú pháp: `{{SELECTOR:PARENT:#cboKhoaPhong}}`
Chữ `PARENT:` ở đầu sẽ cấp quyền cho Extension "nhảy" ra khỏi Iframe con, bay ra ngoài trang web mẹ để bốc dữ liệu mang vào.

---

## 9. Kịch bản 7: Gọi API & Hiển thị Bảng chọn dữ liệu (Table Modal)
Đây là tính năng cực kỳ mạnh mẽ dành cho các bài toán: Nhập mã -> Văng ra danh sách -> Người dùng chọn 1 dòng -> Tự động điền dữ liệu của dòng đó vào ô khác.
Ví dụ: Điền số thẻ BHYT -> Chọn "Khám theo giấy hẹn" -> Văng bảng Lịch sử khám -> Bác sĩ click chọn 1 đợt khám -> Tự động bốc Số hẹn khám điền vào form.

**Cách thiết lập:**
- Bấm **+ Thêm Luật mới** và cấu hình như sau:
- **Tên quy tắc:** Tự động điền số hẹn khám
- **Loại quy tắc:** Sự kiện (Click, Nhập text...)
- **Danh sách Nút/Ô:** `#cboGiayChuyen` *(Nút hoặc Dropdown kích hoạt việc gọi API)*
- **Hành động:** 📋 `Gọi API & Bảng chọn dữ liệu (FETCH_AND_SELECT)`
- **Đường dẫn API:** `https://api.benhvien.vn/lich_su_kham?so_the=`
- **Selector ô chứa tham số:** `#txtSoThe` *(Tiện ích lấy Số thẻ nối vào API)*
- **Selector Ô nhận giá trị (Đích đến):** `#txtSoChuyenVien` *(Nơi sẽ nhận giá trị sau khi chọn)*
- **Cấu hình Cột Bảng:** `MABA:Mã Bệnh Án, NGAYVAO:Ngày Vào, SOHENKHA:Số Hẹn Khám` *(Các cột sẽ hiển thị trên Bảng)*
- **Trường lấy giá trị:** `SOHENKHA` *(Khi click chọn dòng, nó sẽ lấy giá trị của trường SOHENKHA để điền vào Đích đến)*

**Luồng hoạt động:**
1. Khi có sự thay đổi (Change) ở ô `#cboGiayChuyen`, Tiện ích gọi API.
2. Nếu API trả về mảng dữ liệu, một Popup Bảng (Table) sẽ văng ra giữa màn hình.
3. Bác sĩ xem và bấm nút "Chọn" ở dòng tương ứng.
4. Tiện ích đóng Bảng, lấy SOHENKHA của dòng đó điền tự động vào `#txtSoChuyenVien`.

> **💡 Mẹo:** Trong lúc chưa có API thật, bạn có thể tạo API ảo trên `mocky.io` trả về mảng JSON để điền vào cấu hình và test thử giao diện Bảng!
