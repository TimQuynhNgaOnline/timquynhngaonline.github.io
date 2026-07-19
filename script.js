const copyStatus = document.getElementById('copyStatus');

document.querySelectorAll('.copy-button').forEach((button) => {
  button.addEventListener('click', async () => {
    const targetId = button.getAttribute('data-target');
    const messageBox = document.getElementById(targetId);
    if (!messageBox) return;
    const text = messageBox.innerText.trim();
    try {
      await navigator.clipboard.writeText(text);
      const oldText = button.textContent;
      button.textContent = 'Đã sao chép';
      if (copyStatus) copyStatus.textContent = 'Đã sao chép mẫu tin nhắn.';
      setTimeout(() => {
        button.textContent = oldText;
        if (copyStatus) copyStatus.textContent = '';
      }, 2200);
    } catch (error) {
      if (copyStatus) copyStatus.textContent = 'Không thể sao chép tự động. Vui lòng sao chép thủ công.';
    }
  });
});


// Dán URL Web App của Google Apps Script vào đây sau khi triển khai.
const VOLUNTEER_FORM_ENDPOINT = 'https://script.google.com/macros/s/AKfycbxZStN3ZJ4jhAsCeSariV1FEcTcsiM5JhfV2rZ_WW-9PKsOPZjNCVsCg6kLiqmAgjrj/exec';
const volunteerForm = document.getElementById('volunteerForm');
const volunteerStatus = document.getElementById('volunteerStatus');

if (volunteerForm) {
  volunteerForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const emailInput = document.getElementById('volunteerEmail');
    const submitButton = volunteerForm.querySelector('button[type="submit"]');
    if (!emailInput || !emailInput.checkValidity()) {
      if (volunteerStatus) volunteerStatus.textContent = 'Vui lòng nhập một địa chỉ email hợp lệ.';
      emailInput?.focus();
      return;
    }
    if (VOLUNTEER_FORM_ENDPOINT.startsWith('PASTE_')) {
      if (volunteerStatus) volunteerStatus.textContent = 'Biểu mẫu chưa được kết nối với Google Sheets.';
      return;
    }

    const oldText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.textContent = 'Đang gửi…';
    if (volunteerStatus) volunteerStatus.textContent = '';

    try {
      const response = await fetch(VOLUNTEER_FORM_ENDPOINT, {
        method: 'POST',
        headers: {'Content-Type': 'text/plain;charset=utf-8'},
        body: JSON.stringify({email: emailInput.value.trim(), source: window.location.href})
      });
      if (!response.ok) throw new Error('Request failed');
      const result = await response.json();
      if (!result.ok) throw new Error(result.error || 'Request failed');
      volunteerForm.reset();
      if (volunteerStatus) volunteerStatus.textContent = 'Cảm ơn bạn. Ban quản trị sẽ liên hệ qua email.';
    } catch (error) {
      if (volunteerStatus) volunteerStatus.textContent = 'Chưa thể gửi đăng ký. Vui lòng thử lại sau.';
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = oldText;
    }
  });
}
