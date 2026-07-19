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
