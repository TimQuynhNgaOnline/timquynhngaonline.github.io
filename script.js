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


// Switch between terrain and administrative maps.
document.querySelectorAll('[data-map-switcher]').forEach((switcher) => {
  const buttons = switcher.querySelectorAll('[data-map]');
  const panels = switcher.querySelectorAll('[data-map-panel]');

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const selected = button.getAttribute('data-map');
      buttons.forEach((item) => {
        const active = item === button;
        item.classList.toggle('is-active', active);
        item.setAttribute('aria-pressed', String(active));
      });
      panels.forEach((panel) => {
        panel.hidden = panel.getAttribute('data-map-panel') !== selected;
      });
    });
  });
});


// Dán URL triển khai Google Apps Script dạng .../exec vào đây.
const VOLUNTEER_FORM_ENDPOINT = "https://script.google.com/macros/s/AKfycbyVzzIdDBM_yjj4kDBsI_3iPCEiqiFhTbkzjXi__0MsKljLrRZD7XIqOd5q-rwhKntUKg/exec";

const volunteerForm = document.getElementById("volunteer-form");
const volunteerStatus = document.getElementById("volunteer-form-status");

if (volunteerForm && volunteerStatus) {
  volunteerForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const emailInput = document.getElementById("volunteer-email");
    const submitButton = volunteerForm.querySelector("button[type='submit']");
    const email = emailInput ? emailInput.value.trim() : "";

    if (!emailInput || !email || !emailInput.checkValidity()) {
      volunteerStatus.textContent = "Vui lòng nhập một địa chỉ email hợp lệ.";
      emailInput?.focus();
      return;
    }

    if (!VOLUNTEER_FORM_ENDPOINT) {
      volunteerStatus.textContent =
        "Biểu mẫu chưa được kết nối. Vui lòng thêm URL Apps Script vào script.js.";
      return;
    }

    submitButton.disabled = true;
    volunteerStatus.textContent = "Đang gửi…";

    try {
      const body = new URLSearchParams();
      body.set("email", email);

      await fetch(VOLUNTEER_FORM_ENDPOINT, {
        method: "POST",
        mode: "no-cors",
        body
      });

      volunteerForm.reset();
      volunteerStatus.textContent =
        "Cảm ơn bạn. Gia đình sẽ liên hệ qua email.";
    } catch (error) {
      console.error(error);
      volunteerStatus.textContent =
        "Chưa gửi được. Vui lòng thử lại sau.";
    } finally {
      submitButton.disabled = false;
    }
  });
}
