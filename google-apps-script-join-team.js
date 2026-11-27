/* global LockService, ContentService, SpreadsheetApp, Utilities, MailApp, Logger */
/* eslint-disable no-unused-vars */
/**
 * ==============================================================================
 * GENZWORKS STUDIO — "Join Our Team" Careers Google Sheets Automation Script
 * ==============================================================================
 * 
 * Website: GENZWORKS (Technology & Creative Studio)
 * Tab Name: "Team Applications"
 * 
 * Fields Captured:
 *   1. Timestamp (Indian Standard Time - Asia/Kolkata)
 *   2. Full Name
 *   3. Email Address
 *   4. Phone / WhatsApp
 *   5. Role / Domain
 *   6. Experience Level
 *   7. Availability
 *   8. Location
 *   9. Primary Skills & Tech Stack
 *  10. Portfolio / Project Link
 *  11. GitHub Profile
 *  12. LinkedIn Profile
 *  13. Resume / CV Link (Google Drive / Cloud)
 *  14. Why GENZWORKS / Pitch
 *  15. Application Status (Defaults to "Under Review")
 * 
 * ------------------------------------------------------------------------------
 * STEP-BY-STEP SETUP INSTRUCTIONS:
 * ------------------------------------------------------------------------------
 * 1. Open Google Sheets (https://sheets.new) and name the spreadsheet:
 *    "GENZWORKS — Team Applications"
 * 
 * 2. In the top menu, go to:
 *    Extensions > Apps Script
 * 
 * 3. Delete any placeholder code inside `Code.gs` and PASTE THIS ENTIRE FILE.
 * 
 * 4. Verify NOTIFY_EMAIL = "contact@genzworks.in" below to receive instant 
 *    email alerts when someone applies!
 * 
 * 5. Click the "Save" icon (💾) or press Ctrl + S.
 * 
 * 6. Click "Deploy" (top right button) > "New deployment".
 * 
 * 7. Click the gear ⚙️ icon next to "Select type" and choose "Web app".
 * 
 * 8. Set the configuration:
 *    - Description: "GenzWorks Join Team Webhook"
 *    - Execute as: "Me" (<your_email>@gmail.com)
 *    - Who has access: "Anyone"   <--- [IMPORTANT: Must be "Anyone"]
 * 
 * 9. Click "Deploy":
 *    - Click "Authorize access" when prompted.
 *    - Select your Google account.
 *    - Click "Advanced" > "Go to Untitled project (unsafe)" > "Allow".
 * 
 * 10. Copy the generated "Web app URL" (starts with https://script.google.com/macros/s/...).
 * 
 * 11. Open `main.jsx` and paste this URL into:
 *     `BRAND_CONFIG.joinTeamScriptUrl`
 * 
 * That's it! Every candidate application will now automatically populate your Google Sheet!
 * ==============================================================================
 */

// Configuration
var SHEET_NAME = "Team Applications";
var NOTIFY_EMAIL = "contact@genzworks.in";

function doPost(e) {
  var lock = LockService.getScriptLock();
  
  // Wait up to 30 seconds for concurrent requests to complete safely
  try {
    lock.waitLock(30000);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: "Server is busy. Could not acquire lock."
    })).setMimeType(ContentService.MimeType.JSON);
  }

  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(SHEET_NAME);

    // If tab doesn't exist, create it automatically
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
    }

    // Set up formatted headers if the sheet is newly created
    if (sheet.getLastRow() === 0) {
      var headers = [
        "Timestamp (IST)",
        "Full Name",
        "Email Address",
        "Phone / WhatsApp",
        "Role / Domain",
        "Experience Level",
        "Availability",
        "Location",
        "Primary Skills & Tech Stack",
        "Portfolio / Website",
        "GitHub Profile",
        "LinkedIn Profile",
        "Resume / CV Link",
        "Why GENZWORKS / Pitch",
        "Application Status"
      ];
      sheet.appendRow(headers);

      // Apply GenzWorks theme styling to header row (Dark Navy + Neon Lime)
      var headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setBackground("#0A0A0E");
      headerRange.setFontColor("#D9FF3F");
      headerRange.setFontWeight("bold");
      headerRange.setFontSize(11);
      headerRange.setHorizontalAlignment("center");
      headerRange.setVerticalAlignment("middle");
      sheet.setRowHeight(1, 40);
      sheet.setFrozenRows(1);
    }

    // Parse incoming data (handles both URL-encoded form data and raw JSON)
    var data = {};
    if (e && e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (err) {
        data = e.parameter || {};
      }
    } else if (e && e.parameter) {
      data = e.parameter;
    }

    var fullName = (data.fullName || data.name || "").toString().trim();
    var email = (data.email || "").toString().trim();
    var phone = (data.phone || "").toString().trim();
    if (phone && !phone.startsWith("'") && (phone.startsWith("+") || phone.startsWith("="))) {
      phone = "'" + phone;
    }
    var role = (data.role || "General Contributor").toString().trim();
    var experience = (data.experience || "Fresher / Student").toString().trim();
    var availability = (data.availability || "Immediate").toString().trim();
    var location = (data.location || "Coimbatore / Remote").toString().trim();
    var skills = (data.skills || "").toString().trim();
    var portfolio = (data.portfolio || "").toString().trim();
    var github = (data.github || "").toString().trim();
    var linkedin = (data.linkedin || "").toString().trim();
    var resumeLink = (data.resumeLink || data.resume || "").toString().trim();
    var pitch = (data.pitch || data.message || "").toString().trim();

    // Indian Standard Time (IST) formatting
    var timestamp = Utilities.formatDate(new Date(), "Asia/Kolkata", "dd-MMM-yyyy hh:mm:ss a");

    // Append candidate application row to Google Sheets
    sheet.appendRow([
      timestamp,
      fullName,
      email,
      phone,
      role,
      experience,
      availability,
      location,
      skills,
      portfolio,
      github,
      linkedin,
      resumeLink,
      pitch,
      "Under Review"
    ]);

    var lastRow = sheet.getLastRow();
    
    // Style the new data row for clean readability
    var newRowRange = sheet.getRange(lastRow, 1, 1, 15);
    newRowRange.setVerticalAlignment("middle");
    newRowRange.setFontSize(10);
    sheet.setRowHeight(lastRow, 28);
    
    // Highlight Status cell with amber/orange badge background
    var statusCell = sheet.getRange(lastRow, 15);
    statusCell.setBackground("#FFF4E5");
    statusCell.setFontColor("#B45309");
    statusCell.setFontWeight("bold");
    statusCell.setHorizontalAlignment("center");

    // Auto-fit columns for optimal layout
    for (var i = 1; i <= 15; i++) {
      sheet.autoResizeColumn(i);
    }

    // Send instant email notification to GenzWorks core team
    if (NOTIFY_EMAIL && NOTIFY_EMAIL.indexOf("@") !== -1) {
      try {
        var emailSubject = "🚀 New Team Application: " + (fullName || "Candidate") + " (" + role + ")";
        var emailBody = 
          "GENZWORKS STUDIO — NEW TEAM APPLICATION\n" +
          "====================================================\n\n" +
          "A new candidate just applied to join GENZWORKS!\n\n" +
          "• Full Name:      " + fullName + "\n" +
          "• Role:           " + role + "\n" +
          "• Experience:     " + experience + "\n" +
          "• Availability:   " + availability + "\n" +
          "• Location:       " + location + "\n" +
          "• Email:          " + email + "\n" +
          "• Phone/WA:       " + phone + "\n\n" +
          "SKILLS & PROOFS OF WORK:\n" +
          "• Primary Skills: " + skills + "\n" +
          "• Portfolio Link: " + portfolio + "\n" +
          "• GitHub:         " + github + "\n" +
          "• LinkedIn:       " + linkedin + "\n" +
          "• Resume/CV Link: " + resumeLink + "\n\n" +
          "WHY GENZWORKS / PITCH:\n" +
          pitch + "\n\n" +
          "• Submitted At:   " + timestamp + " (IST)\n" +
          "====================================================\n" +
          "Open your Google Sheet to review candidate details.";

        MailApp.sendEmail(NOTIFY_EMAIL, emailSubject, emailBody);
      } catch (mailErr) {
        Logger.log("Email notification error (ignored): " + mailErr.toString());
      }
    }

    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      message: "Application recorded successfully in Google Sheets",
      row: lastRow
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    Logger.log("Error handling application: " + error.toString());
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);

  } finally {
    lock.releaseLock();
  }
}

/**
 * Health check endpoint (When opened in a web browser)
 */
function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: "online",
    service: "GENZWORKS Careers Google Sheets Webhook API",
    version: "1.0.0",
    message: "Ready to accept team applications from GenzWorks website."
  })).setMimeType(ContentService.MimeType.JSON);
}
