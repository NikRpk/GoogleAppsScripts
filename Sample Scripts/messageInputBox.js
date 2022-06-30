// Popup box for the user to interact with and enter information
// Puts the message box functionality into a mini formula. All you need to do is call the function and pass along the three parameters
// You can pair this with an if statement afterwards to execute code depending on the user's click or their input
// Full documentation can be found here: https://developers.google.com/apps-script/reference/base/ui#prompt(String,String,ButtonSet)
// "\n" this adds a line break into your message 

function message(title, content, type) {
  var ui = SpreadsheetApp.getUi();
  if (type = "Yes/No") {
    ui.alert(title, content,ui.ButtonSet.YES_NO)
  }
  else if (type = "Ok") {
    ui.alert(title, content,ui.ButtonSet.Ok)
  }
  else if (type = "Ok/Cancel") {
    ui.alert(title, content,ui.ButtonSet.OK_CANCEL)
  }
  else if (type = "Yes/No/Cancel") {
    ui.alert(title, content,ui.ButtonSet.YES_NO_CANCEL)
  }
};


// Similar to the message box but this also requests information to be entered by the user. This can then be used later 

function prompt(title, content, type) {
  var ui = SpreadsheetApp.getUi();
  if (type = "Yes/No") {
    var response = ui.prompt(title, content,ui.ButtonSet.YES_NO)
  }
  else if (type = "Ok") {
    var response = ui.prompt(title, content,ui.ButtonSet.Ok)
  }
  else if (type = "Ok/Cancel") {
    var response = ui.prompt(title, content,ui.ButtonSet.OK_CANCEL)
  }
  else if (type = "Yes/No/Cancel") {
    var response = ui.prompt(title, content,ui.ButtonSet.YES_NO_CANCEL)
  }
};
