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
// You can also put the information that you want to paste into an array beforehand and use the array to paste directly
  var sheet_log = ss.getSheetByName("Log");
  var rows = data.length;
  var columns = data[0].length;
  var range = sheet_log.getRange("A:A").getValues();
  var row = getLastRowSpecial(range);
  sheet_log.getRange(row + 1, 1, rows, columns).setValues(info)

// To add data points to an array, you can use the push command. You can push individual items or other arrays as well (see second example below)
    var data = [];
    data.push("some random data")
    data.push(["array data 1","array data 2"])

// Find the current time & date 
    timestamp = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "yyyy-MM-dd HH:mm:ss");

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

// Arrays. These are 2 dimensional objects if you adapt them a little.
// The format is [ ["a", "b"] ]  for a 1 row 2 column one
// The format is [ ["a"], ["b"] ] for a 2 row 1 column one
// When reading values from cells with getValues(), this is the format it ends up in
// Use the push command to add to the array
  var data = []
  data.push([value1,value2,value3])
  // or
  data.push([value1],[value2],[value3])






