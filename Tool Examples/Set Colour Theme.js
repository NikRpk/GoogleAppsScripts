// This sets the theme colours for any spreadsheet where you run it!

function setHF_ColourScheme() {
  var app = SpreadsheetApp;
  var ss = app.getActiveSpreadsheet();
  var colour_set = ss.getSpreadsheetTheme().setConcreteColor
  var set_type = app.ThemeColorType
  var newColor = app.newColor().setRgbColor

  var text = newColor("#000000").build();
  var background = newColor("#ffffff").build();
  var accent1 = newColor("#96dc14").build();
  var accent2 = newColor("#009646").build();
  var accent3 = newColor("#ff5f64").build();
  var accent4 = newColor("#d9d9d9").build();
  var accent5 = newColor("#00a0e6").build();
  var accent6 = newColor("#1464ff").build();

  colour_set(set_type.TEXT, text);
  colour_set(set_type.BACKGROUND, background);
  colour_set(set_type.ACCENT1, accent1);
  colour_set(set_type.ACCENT2, accent2);
  colour_set(set_type.ACCENT3, accent3);
  colour_set(set_type.ACCENT4, accent4);
  colour_set(set_type.ACCENT5, accent5);
  colour_set(set_type.ACCENT6, accent6);
};
