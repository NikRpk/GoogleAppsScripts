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
``` javascript
//Example
var ui = SpreadsheetApp.getUi();
var response = ui.alert("Final Check", "Are you sure that you want to run the script?", ui.ButtonSet.YES_NO)

// Would make a box (see screenshot below). 
```
![image](https://user-images.githubusercontent.com/49123781/208710775-1a3b1195-2de8-4fd5-ba18-28487f157812.png)


Message boxes are similar to alert boxes with the small change that they expect the user to input something such as a "name". 
``` javascript
var ui = SpreadsheetApp.getUi();

var response = ui.prompt(title, content,ui.ButtonSet.YES_NO)
var response = ui.prompt(title, content,ui.ButtonSet.YES_NO_CANCEL)
var response = ui.prompt(title, content,ui.ButtonSet.OK)
var response = ui.prompt(title, content,ui.ButtonSet.OK_CANCEL)
```

``` javascript
//Example
var ui = SpreadsheetApp.getUi();
var var response = ui.prompt("Name", "What is your name?", ui.ButtonSet.YES_NO)

// Would make a box (see screenshot below). 
```
![image](https://user-images.githubusercontent.com/49123781/208711234-52636426-30d2-4660-801e-9beaf0d93ce0.png)


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

### Get the last row
This function finds the last non-empty row in a given range. If there are blank rows in the middle, it assumes that these are still part of the range. The output is the number of rows in the range and not necessarily the row number of the sheet! This can be very useful if you need to add information at the end of a range and need to ensure that you are not overwriting information. 

``` javascript
function getLastRowSpecial(sheet_name, reference){
  var ss = SpreadsheetApp.getActive();
  var sheet = ss.getSheetByName(sheet_name);
  var range = sheet.getRange(reference).getValues();
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
```

``` javascript
// Usage as follows below:
var lastRow = getLastRowSpecial("Log","A2:A100");

//Would output 99. 
```

