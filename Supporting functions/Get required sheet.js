/**
 * Attempts to get the Sheet Object from the active sheet. 
 * If this fails, it will throw an error visible in the logs and to the user. 
 * 
 * @param sheetName   The name of the sheet
  */
function getRequiredSheet(sheetName) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  if (!sheet) {
    throw new Error(`Required sheet '${sheetName}' not found. Please check the hidden tab "_fixedVariables" and update the input.`);
  };
  return sheet;
}; 
