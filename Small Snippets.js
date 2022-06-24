// Small nice to know hacks

// Start to every script nearly 
    var ss = SpreadsheetApp.getActive();
    var sheet = ss.getSheetByName("Sheet Name");

// Clear some data , format, or validations
    sheet.getRange("A2:A").clearContent();
    sheet.getRange("H2:H").clearFormat();
    sheet.getRange("H2:H").clearDataValidations();

// Use this one to set the values of a range (e.g. with a copied range)
// Use setvalue(X) to set everything in a range to the same value such as a timestamp
    sheet.getRange(starting_row, starting_column, number_of_rows, number_of_columns).setValues(data);

// Find the current time & date 
    timestamp = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "yyyy-MM-dd HH:mm:ss");

// Popup box for the user to interact with and enter information
// There are different types of popup boxes. Options for the buttons are "OK", "OK_CANCEL", 'YES_NO". "YES_NO_CANCEL" 
// You can pair this with an if statement afterwards to execute code depending on the user's click or their input
// You might see SpreadsheetApp.getUi().alert vs Browser.inputBox and they can perform similar functions except that browser is older and only works in sheets
// Full explanation: https://spreadsheet.dev/pop-up-alert-messages-in-google-sheets
// Different kinds of boxes: https://developers.google.com/apps-script/reference/base/browser
    alert = SpreadsheetApp.getUi().alert("Header", "Button text\n\n These Ns start a new line", SpreadsheetApp.getUi().ButtonSet.OK);
    input_box = Browser.inputBox('Title', 'Enter your name', Browser.Buttons.OK_CANCEL

//Example of a check
  var ui = SpreadsheetApp.getUi();
  alert = ui.alert("Check", "Are you sure you want to create the event?", SpreadsheetApp.getUi().ButtonSet.YES_NO);
  if ( alert == ui.Button.YES) {

// Cycle through a loop with conditions
// the try function makes sure that if there is an error, it doesn't stop right away
// the following code, looks at the tab names of a google sheet and adds them to a list
    for (i = 0; i < 20; i++) {
        try {
          var sheetname = list[i].toString();
          var sheet = ss.getSheetByName(sheetname);
          sheet.getRange("H2:H").clearContent();
        } catch(error) {}





