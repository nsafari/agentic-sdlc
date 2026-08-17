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

/**
 * Prevent Google Sheets formula injection. A cell value beginning with `=`,
 * `+`, `-` or `@` (optionally after leading whitespace) would otherwise be
 * interpreted as a formula and could run scripts or corrupt data. Prefixing a
 * single quote forces the value to be treated as literal text.
 */
function sanitizeCell(value) {
  if (value == null) return '';
  if (typeof value === 'number') return value;
  var s = String(value);
  if (/^[\s]*[=+\-@]/.test(s)) return "'" + s;
  return s;
}

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
        sanitizeCell(ev.sessionId),
        sanitizeCell(ev.type),
        sanitizeCell(ev.ts || new Date().toISOString()),
        sanitizeCell(ev.path),
        sanitizeCell(ev.label),
        sanitizeCell(ev.value != null ? ev.value : '')
      ];
    });

    appendRows(sheet, rows);

    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  }
}

/**
 * Serialize concurrent writes. `getLastRow()` + `setValues()` is not atomic:
 * two simultaneous requests could both compute the same start row and
 * overwrite each other. LockService makes the read-and-append critical
 * section atomic.
 */
function appendRows(sheet, rows) {
  var lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    sheet.getRange(sheet.getLastRow() + 1, 1, rows.length, rows[0].length).setValues(rows);
  } finally {
    lock.releaseLock();
  }
}

function appendWaitlist(entry) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(WAITLIST_SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(WAITLIST_SHEET_NAME);
    sheet.appendRow(['email', 'timestamp', 'path']);
  }
  appendRows(sheet, [[
    sanitizeCell(entry.email),
    sanitizeCell(entry.ts || new Date().toISOString()),
    sanitizeCell(entry.path)
  ]]);
  return json({ ok: true });
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
