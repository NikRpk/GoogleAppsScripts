# Mini

Here you can find explanations and examples of common functions or usecases. 




# Sample Scripts and Functions
### Alert boxes / Message boxes
Pop up boxes can be super useful to collect input from the user or get their final confirmation. The buttons clicked by the user can then be used in your code to execute different parts of your code (e.g. the user clicks "Yes" and then the script continues and otherwise the script stops. 
Documentation can be found [here](https://developers.google.com/apps-script/guides/dialogs). 

By assigning the boxes to a variable, they will still be executed (box pops up) but the user input such as button presses or text they write is assigned to the response variable and can thus be used in follow on formulas with an if statement for example. 

Alert boxes are just boxes with certain buttons.   
``` javascript
var ui = SpreadsheetApp.getUi();

var response = ui.alert(title, content,ui.ButtonSet.YES_NO_CANCEL)
var response = ui.alert(title, content,ui.ButtonSet.YES_NO)
var response = ui.alert(title, content,ui.ButtonSet.OK)
var response = ui.alert(title, content,ui.ButtonSet.OK_CANCEL)
```

Message boxes are similar to alert boxes with the small change that they expect the user to input something such as a "name". 
``` javascript
var ui = SpreadsheetApp.getUi();

var response = ui.prompt(title, content,ui.ButtonSet.YES_NO)
var response = ui.prompt(title, content,ui.ButtonSet.YES_NO_CANCEL)
var response = ui.prompt(title, content,ui.ButtonSet.OK)
var response = ui.prompt(title, content,ui.ButtonSet.OK_CANCEL)
```

If you are using this often, you can create your own little function that takes title, content, and type as input. 
``` javascript
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
```
