/* ----------------------------- Main Function Control ---------------------------- */ 

function updateDashboards() {
  // Import the data from the Warenausgangsliste of today
  importData();

  // Look at all the routes from that day. This is the result of the importData function. 
  var routes = getRoutes();

  // Look at all the slides in the folder. There is one per Tor/Loading Dock in the DC. This pulls the relevant information from it and stores it in a dictionary that is returned. 
  var slideData = getSlideData();

  // Cycle through each slide deck and update it with the correct information if there is a corresponding route in the overview
  applyRoutesToSlides(slideData, routes);

  // Update the last updated field 
  sheetControl.getRange("C7").setValue(new Date())
};



/* ----------------------------- User Input ---------------------------- */ 

// 


/* -------------------------- Global Variables -------------------------- */ 

var torSlideFolderId = "1fdS16gG5tfsArKuCcVp_ufGv00N0_WAA";
var torSlideFolder = DriveApp.getFolderById(torSlideFolderId);

var warenlisteFolderId = '10KU4JwhfRzZkCvVM1gqwB4JZLSQqnMQG';
var warenlisteFolder = DriveApp.getFolderById(warenlisteFolderId);

var qrFolderId = '1RAyjm8wgeWMsVMFAnmWYVc0OUW64_D_a';
var qrFolder = DriveApp.getFolderById(qrFolderId);

var sheetId = '1hTelqBxbN9D4iw1eywoAzcrYJePNIv9jUABbIaGC4HU';
var ss = SpreadsheetApp.openById(sheetId);
var sheetImport = ss.getSheetByName("Import");
var sheetControl = ss.getSheetByName("Control");


/* -------------------------- Supporting Functions -------------------------- */ 

function logger(topic, message) {
  var logSheet = ss.getSheetByName("_Log");

  if (!logSheet) {
    logSheet = spreadsheet.insertSheet('_Log');
    logSheet.appendRow(['Timestamp', 'Topic', 'Issue']); // Add headers
  };

  if (logSheet.getLastRow() > 200) { 
    logSheet.deleteRows(2, 160)
  }

  // Get the current date and time
  var timestamp = new Date();
  
  // Append the log entry
  logSheet.appendRow([timestamp, topic, message]);

  Logger.log("Logged: " + message + " at " + timestamp);
};
