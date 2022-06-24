// to be used in combination with the following google sheet that acts as an interface
// https://docs.google.com/spreadsheets/d/1thw3SoUTNwsnjQt49hMWqk6B3knYFV_1ZvECO5T3mxA/edit#gid=0

function createGcalEvent() {
  var ss = SpreadsheetApp.getActive();
  var sheet = ss.getActiveSheet();
  var ui = SpreadsheetApp.getUi();
  var calendarID = sheet.getRange("K8").getValue();
  var eventCal = CalendarApp.getCalendarById(calendarID);

  sheet.getRange("F18:F19").setValues([["Code Source:"],["https://github.com/NikRpk/GoogleScripts/tree/main/Tool%20Examples"]])

  if (eventCal == null) {
    return alert = ui.alert("Error", "You do not have access to the calendar!",SpreadsheetApp.getUi().ButtonSet.OK)
  }

  //check in the cell whether all items have been correctly filled in
  var check = sheet.getRange("E6").getDisplayValue();
  if (check != "All good!") {
    return alert = SpreadsheetApp.getUi().alert("Error", "You are missing some information. Please check again.",SpreadsheetApp.getUi().ButtonSet.OK)
  }

// sets all of the variables needed to create an event
  var title = sheet.getRange("K9").getValue();
  var description = sheet.getRange("K11").getValue();
  var start = sheet.getRange("K15").getValue();
  var end = sheet.getRange("K16").getValue();
  var guests = sheet.getRange("K12").getValue();
  var sendInvites = sheet.getRange("K13").getValue();


// popup box asking for input and confirming the user really wants to proceed

  alert = ui.alert("Check", "Are you sure you want to create the event?", SpreadsheetApp.getUi().ButtonSet.YES_NO);

  if ( alert == ui.Button.YES) {
    eventCal.createEvent(title, start, end,
      {'description': description,
      'guests': guests,
      'sendInvites': sendInvites}
    );

    addEventDatabase();
    //clears the content the event has been created
    sheet.getRange("C5:C").clearContent()
    alert = ui.alert("Success :)", "The event was successfully created! \n\n \
      Title: " + title +
      "\n Start: " + start +
      "\n End: " + end
      ,SpreadsheetApp.getUi().ButtonSet.OK)
  }
  else {alert = ui.alert("", "No event was created",SpreadsheetApp.getUi().ButtonSet.OK)};
};

//function to get the last row of a range
function getLastRowSpecial(range){
  var rowNum = 0;
  var blank = false;
  for(var row = 0; row < range.length; row++){
      if(range[row][0] === "" && !blank){
      rowNum = row;
      blank = true;
      }
      else if(range[row][0] !== ""){
      blank = false;
      };
  };
  return rowNum;
};

function addEventDatabase() {
  var ss = SpreadsheetApp.getActive();
  var sheet = ss.getActiveSheet();
  var sheet_log = ss.getSheetByName("Log");

  var title = sheet.getRange("K9").getValue();
  var description = sheet.getRange("K11").getValue();
  var start = sheet.getRange("K15").getValue();
  var end = sheet.getRange("K16").getValue();
  var guests = sheet.getRange("K12").getValue();

  var data = []
  data.push([title,date])
  var rows = data.length;
  var columns = data[0].length;

  var range = sheet_log.getRange("A:A").getValues();
  var row = getLastRowSpecial(range)

  sheet_log.getRange(row + 1, 1, rows, columns).setValues(data);
}