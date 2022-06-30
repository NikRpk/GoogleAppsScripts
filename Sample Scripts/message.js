// Puts the message box functionality into a mini formula. All you need to do is call the function and pass along the three parameters

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
