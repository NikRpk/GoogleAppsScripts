function onInstall(e) {
  onOpen(e);
};

//So that the add-on runs on each open
function onOpen(e) {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Change Theme')
    .addItem('Set colours to theme', 'setTheme')
    .addItem('Edit theme colours', 'showSidebar')
    .addToUi();
};

//Popup box to show the user that something is being done as the process can be a bit slow at times. 
function loadingAnimation() {
  SpreadsheetApp.getUi().alert('Starting.....\nIt might take a few seconds to run.');
}

//Runs the sidebar and builds this from the html template. 
function showSidebar() {
  var html = HtmlService.createTemplateFromFile('SideBar')
  .evaluate()
      .setTitle('Edit colours');
  SpreadsheetApp.getUi()
      .showSidebar(html);
};

//Pulls the user properties
//Takes a dictionary as an input with each colour type as the keys and the colour codes (hexidecimal) as the values
function setTheme() {
  setUpProperties();
  sp = PropertiesService.getUserProperties().getProperties();
  for (key in sp) {
    setThemeColour(key, sp[key])
  };
  SpreadsheetApp.getUi() // Or DocumentApp or FormApp.
    .alert('Succesfully changed the colour scheme!');
};

//Checks if the relevant user properties have been created. If not, they are added so that they can be filled in at a later date.
function setUpProperties() {
  var sp = PropertiesService.getUserProperties().getKeys();
  var properties = ["text", "background", "accent1", "accent2", "accent3", "accent4", "accent5", "accent6"]
  for (i in properties) {
    if (sp.includes(properties[i]) === false) {
      setColourProperty(properties[i], "000000");
    };
  };
};

//Upon saving the colours in the sidebar, the colours are set as the theme colours and then the user properties are updated so that they can be accessed the next time as well.
function saveColour(list) {
  var app = SpreadsheetApp;
  var ss = app.getActiveSpreadsheet();

  for (key in list) {
    if (list[key] != '') {
      //Update theme colours
      setThemeColour(key, list[key]);
      //Update the user properties
      setColourProperty(key, list[key]);
    };
  };

  var alert = SpreadsheetApp.getUi()
    .alert('Succesfully saved '+counter+' colour(s) and changed the theme!');
  if (alert == 'OK') { 
    showSidebar();
  };
};

//Sets the colour for each theme. It only updates the passed colour type e.g. 'accent2' with the hexidecimal colour
function setThemeColour(dtype, colour) {
  var app = SpreadsheetApp;
  var ss = app.getActiveSpreadsheet();
  if (dtype == "text") 
    {ss.getSpreadsheetTheme().setConcreteColor(app.ThemeColorType.TEXT, app.newColor().setRgbColor(colour).build())}
  else if (dtype == "background") 
    {ss.getSpreadsheetTheme().setConcreteColor(app.ThemeColorType.BACKGROUND, app.newColor().setRgbColor(colour).build())}
  else if (dtype == "accent1") 
    {ss.getSpreadsheetTheme().setConcreteColor(app.ThemeColorType.ACCENT1, app.newColor().setRgbColor(colour).build())}
  else if (dtype == "accent2") 
    {ss.getSpreadsheetTheme().setConcreteColor(app.ThemeColorType.ACCENT2, app.newColor().setRgbColor(colour).build())}
  else if (dtype == "accent3") 
    {ss.getSpreadsheetTheme().setConcreteColor(app.ThemeColorType.ACCENT3, app.newColor().setRgbColor(colour).build())}
  else if (dtype == "accent4") 
    {ss.getSpreadsheetTheme().setConcreteColor(app.ThemeColorType.ACCENT4, app.newColor().setRgbColor(colour).build())}
  else if (dtype == "accent5") 
    {ss.getSpreadsheetTheme().setConcreteColor(app.ThemeColorType.ACCENT5, app.newColor().setRgbColor(colour).build())}
  else if (dtype == "accent6") 
    {ss.getSpreadsheetTheme().setConcreteColor(app.ThemeColorType.ACCENT6, app.newColor().setRgbColor(colour).build())}
  else 
    {Logger.log("Error. Unknown input.")};
};

//Sets the value for a certain user property (specified by the type and then hexideciaml code)
function setColourProperty(type,colour) {
  sp = PropertiesService.getUserProperties();
  sp.setProperty(type, colour);
};

//Pulls the value of a certain property
function getColour(type) {
  var property = PropertiesService.getUserProperties().getProperty(type);
  return property;
}; 
