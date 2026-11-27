/* global LockService, ContentService, SpreadsheetApp, Utilities, MailApp, Logger */
/* eslint-disable no-unused-vars */
/**
 * ==============================================================================
 * GENZWORKS STUDIO — Unified Google Sheets Automation Script
 * (Handles Both: 1. Client Inquiries & 2. Join Our Team Applications)
 * ==============================================================================
 * 
 * Website: GENZWORKS (Technology & Creative Studio)
 * Tabs Supported:
 *   - "Inquiries" (For client project inquiries)
 *   - "Team Applications" (For hiring & career applications)
 * 
 * ------------------------------------------------------------------------------
 * STEP-BY-STEP SETUP INSTRUCTIONS:
 * ------------------------------------------------------------------------------
 * 1. Open Google Sheets (https://sheets.new) and name the spreadsheet:
 *    "GENZWORKS — Studio Submissions"
 * 
 * 2. In the top menu, go to:
 *    Extensions > Apps Script
 * 
 * 3. Delete any placeholder code inside `Code.gs` and PASTE THIS ENTIRE FILE.
 * 
 * 4. Verify NOTIFY_EMAIL = "contact@genzworks.in".
 * 
 * 5. Click the "Save" icon (💾) or press Ctrl + S.
 * 
 * 6. Click "Deploy" (top right button) > "New deployment".
 * 
 * 7. Click the gear ⚙️ icon next to "Select type" and choose "Web app".
 * 
 * 8. Set the configuration:
 *    - Description: "GenzWorks Studio Webhook"
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
 * 11. Open `main.jsx` in your project and paste this URL into:
 *     `BRAND_CONFIG.googleSheetScriptUrl` and `BRAND_CONFIG.joinTeamScriptUrl`
 * 
 * ==============================================================================
 */

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

    // Determine submission type: 'join_team' vs 'inquiry'
    var isJoinTeam = (data.formType === 'join_team' || data.action === 'join_team' || !!data.resumeLink || !!data.role);

    var timestamp = Utilities.formatDate(new Date(), "Asia/Kolkata", "dd-MMM-yyyy hh:mm:ss a");

    if (isJoinTeam) {
      // ==========================================
      // ROUTE 1: JOIN OUR TEAM APPLICATION
      // ==========================================
      var joinSheet = ss.getSheetByName("Team Applications");
      if (!joinSheet) {
        joinSheet = ss.insertSheet("Team Applications");
      }

      if (joinSheet.getLastRow() === 0) {
        var joinHeaders = [
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
        joinSheet.appendRow(joinHeaders);

        var hRange = joinSheet.getRange(1, 1, 1, joinHeaders.length);
        hRange.setBackground("#0A0A0E");
        hRange.setFontColor("#D9FF3F");
        hRange.setFontWeight("bold");
        hRange.setFontSize(11);
        hRange.setHorizontalAlignment("center");
        hRange.setVerticalAlignment("middle");
        joinSheet.setRowHeight(1, 40);
        joinSheet.setFrozenRows(1);
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

      joinSheet.appendRow([
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

      var lastRow = joinSheet.getLastRow();
      var newRowRange = joinSheet.getRange(lastRow, 1, 1, 15);
      newRowRange.setVerticalAlignment("middle");
      newRowRange.setFontSize(10);
      joinSheet.setRowHeight(lastRow, 28);

      var statusCell = joinSheet.getRange(lastRow, 15);
      statusCell.setBackground("#FFF4E5");
      statusCell.setFontColor("#B45309");
      statusCell.setFontWeight("bold");
      statusCell.setHorizontalAlignment("center");

      for (var col = 1; col <= 15; col++) {
        joinSheet.autoResizeColumn(col);
      }

      // Notification Email
      if (NOTIFY_EMAIL && NOTIFY_EMAIL.indexOf("@") !== -1) {
        try {
          var subject = "🚀 New Team Application: " + (fullName || "Candidate") + " (" + role + ")";
          var body = 
            "GENZWORKS STUDIO — NEW TEAM APPLICATION\n" +
            "====================================================\n\n" +
            "• Full Name:      " + fullName + "\n" +
            "• Role:           " + role + "\n" +
            "• Experience:     " + experience + "\n" +
            "• Availability:   " + availability + "\n" +
            "• Location:       " + location + "\n" +
            "• Email:          " + email + "\n" +
            "• Phone/WA:       " + phone + "\n\n" +
            "SKILLS & PROOF OF WORK:\n" +
            "• Skills:         " + skills + "\n" +
            "• Portfolio Link: " + portfolio + "\n" +
            "• GitHub:         " + github + "\n" +
            "• LinkedIn:       " + linkedin + "\n" +
            "• Resume/CV Link: " + resumeLink + "\n\n" +
            "WHY GENZWORKS / PITCH:\n" +
            pitch + "\n\n" +
            "• Submitted At:   " + timestamp + " (IST)\n" +
            "====================================================\n";
          MailApp.sendEmail(NOTIFY_EMAIL, subject, body);
        } catch (mErr) {
          Logger.log("Email error: " + mErr.toString());
        }
      }

      return ContentService.createTextOutput(JSON.stringify({
        status: "success",
        type: "team_application",
        message: "Application recorded successfully",
        row: lastRow
      })).setMimeType(ContentService.MimeType.JSON);

    } else {
      // ==========================================
      // ROUTE 2: CLIENT PROJECT INQUIRY
      // ==========================================
      var inqSheet = ss.getSheetByName("Inquiries");
      if (!inqSheet) {
        inqSheet = ss.insertSheet("Inquiries");
      }

      if (inqSheet.getLastRow() === 0) {
        var inqHeaders = [
          "Timestamp (IST)",
          "Client Name",
          "Email Address",
          "Phone / WhatsApp",
          "Interested In",
          "Project Message",
          "Status"
        ];
        inqSheet.appendRow(inqHeaders);

        var inqHRange = inqSheet.getRange(1, 1, 1, inqHeaders.length);
        inqHRange.setBackground("#0A0A0E");
        inqHRange.setFontColor("#D9FF3F");
        inqHRange.setFontWeight("bold");
        inqHRange.setFontSize(11);
        inqHRange.setHorizontalAlignment("center");
        inqHRange.setVerticalAlignment("middle");
        inqSheet.setRowHeight(1, 38);
        inqSheet.setFrozenRows(1);
      }

      var clientName = (data.name || "").toString().trim();
      var clientEmail = (data.email || "").toString().trim();
      var clientPhone = (data.phone || "").toString().trim();
      if (clientPhone && !clientPhone.startsWith("'") && (clientPhone.startsWith("+") || clientPhone.startsWith("="))) {
        clientPhone = "'" + clientPhone;
      }
      var services = (data.services || "General Inquiry").toString().trim();
      var message = (data.message || "").toString().trim();

      inqSheet.appendRow([
        timestamp,
        clientName,
        clientEmail,
        clientPhone,
        services,
        message,
        "New Lead"
      ]);

      var inqLastRow = inqSheet.getLastRow();
      var inqRowRange = inqSheet.getRange(inqLastRow, 1, 1, 7);
      inqRowRange.setVerticalAlignment("middle");
      inqRowRange.setFontSize(10);

      var inqStatusCell = inqSheet.getRange(inqLastRow, 7);
      inqStatusCell.setBackground("#E6F9EE");
      inqStatusCell.setFontColor("#0D6832");
      inqStatusCell.setFontWeight("bold");
      inqStatusCell.setHorizontalAlignment("center");

      for (var j = 1; j <= 7; j++) {
        inqSheet.autoResizeColumn(j);
      }

      if (NOTIFY_EMAIL && NOTIFY_EMAIL.indexOf("@") !== -1) {
        try {
          var clientSubject = "⚡ New Lead Received: " + (clientName || "Client") + " (" + services + ")";
          var clientBody = 
            "GENZWORKS STUDIO — NEW WEBSITE INQUIRY\n" +
            "====================================================\n\n" +
            "• Name:       " + clientName + "\n" +
            "• Email:      " + clientEmail + "\n" +
            "• Phone/WA:   " + clientPhone + "\n" +
            "• Services:   " + services + "\n" +
            "• Message:    " + message + "\n" +
            "• Submitted:  " + timestamp + " (IST)\n\n" +
            "====================================================\n";
          MailApp.sendEmail(NOTIFY_EMAIL, clientSubject, clientBody);
        } catch (mailErr) {
          Logger.log("Email notification error (ignored): " + mailErr.toString());
        }
      }

      return ContentService.createTextOutput(JSON.stringify({
        status: "success",
        type: "client_inquiry",
        message: "Lead recorded successfully",
        row: inqLastRow
      })).setMimeType(ContentService.MimeType.JSON);
    }

  } catch (error) {
    Logger.log("Error handling submission: " + error.toString());
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);

  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: "online",
    service: "GENZWORKS Google Sheets Webhook API (Unified)",
    version: "2.0.0",
    message: "Ready to accept client inquiries and team applications."
  })).setMimeType(ContentService.MimeType.JSON);
}
