const SPREADSHEET_ID = '1y5IT9wJrsxHUxSeygnta8Y9Z0lQcKngUpPZOKxu6hG8';
const SHEET_NAME = 'Đăng ký tình nguyện viên';

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents || '{}');
    const email = String(data.email || '').trim().toLowerCase();
    const source = String(data.source || '').trim();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return jsonOutput({ok: false, error: 'Email không hợp lệ'});
    }

    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
    const existing = sheet.getRange(2, 2, Math.max(sheet.getLastRow() - 1, 1), 1).getDisplayValues().flat();
    if (!existing.includes(email)) {
      sheet.appendRow([new Date(), email, source, false, '']);
    }
    return jsonOutput({ok: true});
  } catch (error) {
    return jsonOutput({ok: false, error: error.message});
  }
}

function jsonOutput(value) {
  return ContentService.createTextOutput(JSON.stringify(value))
    .setMimeType(ContentService.MimeType.JSON);
}
