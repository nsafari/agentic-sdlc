/**
 * FlowForge landing page analytics — Google Apps Script backend.
 *
 * Receives batched analytics events POSTed by the tracking script embedded in
 * flowforge.html and appends them to a Google Sheet.
 *
 * SETUP
 * 1. Create a Google Sheet (any name).
 * 2. In that sheet: Extensions → Apps Script, replace the default code with this file.
 * 3. Deploy → New deployment → type "Web app":
 *      - Description: FlowForge analytics
 *      - Execute as: Me
 *      - Who has access: Anyone
 * 4. Authorize when prompted, then copy the Web app URL ending in /exec.
 * 5. Paste that URL into the `ENDPOINT` constant in the analytics <script>
 *    block inside flowforge.html.
 *
 * Each event becomes one row with columns:
 * sessionId | type | timestamp | path | label | value
 */

var SHEET_NAME = 'analytics';
var WAITLIST_SHEET_NAME = 'waitlist';

function doPost(e) {
  try {
    var payload = JSON.parse(e.postData.contents);

    if (payload && !Array.isArray(payload) && payload.type === 'waitlist') {
      return appendWaitlist(payload);
    }

    var events = Array.isArray(payload) ? payload : [payload];

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow(['sessionId', 'type', 'timestamp', 'path', 'label', 'value']);
    }

    var rows = events.map(function (ev) {
      return [
        ev.sessionId || '',
        ev.type || '',
        ev.ts || new Date().toISOString(),
        ev.path || '',
        ev.label || '',
        ev.value || ''
      ];
    });

    sheet.getRange(sheet.getLastRow() + 1, 1, rows.length, rows[0].length).setValues(rows);

    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  }
}

function appendWaitlist(entry) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(WAITLIST_SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(WAITLIST_SHEET_NAME);
    sheet.appendRow(['email', 'timestamp', 'path']);
  }
  sheet.appendRow([entry.email || '', entry.ts || new Date().toISOString(), entry.path || '']);
  return json({ ok: true });
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
