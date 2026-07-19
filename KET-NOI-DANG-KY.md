# Kết nối ô đăng ký với Google Sheets

1. Mở Google Sheets của chiến dịch.
2. Chọn **Tiện ích mở rộng → Apps Script**.
3. Xóa mã mẫu và dán toàn bộ nội dung file `google-apps-script.gs`.
4. Chọn **Triển khai → Lần triển khai mới → Ứng dụng web**.
5. Chọn **Thực thi dưới danh nghĩa: Tôi** và **Ai có quyền truy cập: Bất kỳ ai**.
6. Sao chép URL kết thúc bằng `/exec`.
7. Mở `script.js`, thay `PASTE_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE` bằng URL đó.
8. Đăng lại website.

Email sẽ được thêm vào tab **Đăng ký tình nguyện viên**. Email trùng sẽ không được thêm lần thứ hai.
