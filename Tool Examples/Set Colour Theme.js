// This sets the 

function setHF_ColourScheme() {
    var app = SpreadsheetApp;
    var spreadsheet = app.getActiveSpreadsheet();
    var text = app.newColor().setRgbColor("#000000").build();
    var background = app.newColor().setRgbColor("#ffffff").build();
    var accent1 = app.newColor().setRgbColor("#96dc14").build();
    var accent2 = app.newColor().setRgbColor("#009646").build();
    var accent3 = app.newColor().setRgbColor("#ff5f64").build();
    var accent4 = app.newColor().setRgbColor("#d9d9d9").build();
    var accent5 = app.newColor().setRgbColor("#00a0e6").build();
    var accent6 = app.newColor().setRgbColor("#1464ff").build();

    spreadsheet.getSpreadsheetTheme().setConcreteColor(app.ThemeColorType.TEXT, text);
    spreadsheet.getSpreadsheetTheme().setConcreteColor(app.ThemeColorType.BACKGROUND, background);
    spreadsheet.getSpreadsheetTheme().setConcreteColor(app.ThemeColorType.ACCENT1, accent1);
    spreadsheet.getSpreadsheetTheme().setConcreteColor(app.ThemeColorType.ACCENT2, accent2);
    spreadsheet.getSpreadsheetTheme().setConcreteColor(app.ThemeColorType.ACCENT3, accent3);
    spreadsheet.getSpreadsheetTheme().setConcreteColor(app.ThemeColorType.ACCENT4, accent4);
    spreadsheet.getSpreadsheetTheme().setConcreteColor(app.ThemeColorType.ACCENT5, accent5);
    spreadsheet.getSpreadsheetTheme().setConcreteColor(app.ThemeColorType.ACCENT6, accent6);
};
