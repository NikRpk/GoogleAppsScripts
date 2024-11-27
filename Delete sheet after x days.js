function onInstall(e) {
  onOpen(e);
};

//So that the add-on runs on each open
function onOpen(e) {
  var ui = SpreadsheetApp.getUi()
    .createAddonMenu()
    .addItem('Set timed deletion', 'messageBox')
    .addToUi();
};

function messageBox() {
  var ui = SpreadsheetApp.getUi();
  var response = ui.prompt(
    "Checker",
    "In how many days should this sheet be deleted?",
    ui.ButtonSet.YES_NO);

  if (response.getSelectedButton() == "YES") {
    createTimeTriggerSpecifcDate(response.getResponseText())
    ui.alert("Success","The sheet will be deleted in " + response.getResponseText() + " days.", ui.ButtonSet.OK)
  };
};

function deleteSheet() {
  var ss = SpreadsheetApp.getActive()
  var id = ss.getId()
  var file = DriveApp.getFileById(id)

  file.setTrashed(true)
};

function createTimeTriggerSpecifcDate(days) {
  ScriptApp.newTrigger("deleteSheet")
    .timeBased()
    .after(days * 24 * 60 * 60 * 1000)
    .create();
}; 
