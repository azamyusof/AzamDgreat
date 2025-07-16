const SHEET_NAME = 'Sheet1'; // Gantikan dengan nama sheet anda
const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);

function doGet(e) {
  const action = e.parameter.action;

  if (action === 'getData') {
    const data = sheet.getDataRange().getValues();
    const headers = data.shift(); // Ambil baris pertama sebagai pengepala

    const jsonData = data.map(row => {
      let obj = {};
      headers.forEach((header, index) => {
        obj[header] = row[index];
      });
      return obj;
    });

    return ContentService.createTextOutput(JSON.stringify(jsonData))
      .setMimeType(ContentService.MimeType.JSON);
  }

  return ContentService.createTextOutput("Invalid action").setMimeType(ContentService.MimeType.TEXT);
}

function doPost(e) {
  const action = e.parameter.action;

  if (action === 'addData') {
    const data = JSON.parse(e.postData.contents);
    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    const newRow = headers.map(header => data[header] || "");

    sheet.appendRow(newRow);

    return ContentService.createTextOutput(JSON.stringify({ status: 'success', message: 'Data added successfully' }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  return ContentService.createTextOutput(JSON.stringify({ status: 'error', message: 'Invalid action' }))
    .setMimeType(ContentService.MimeType.JSON);
}
