function highlightDifferencesBetweenSheets() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet1 = ss.getSheetByName("SHEET_1"); // Change as needed
  const sheet2 = ss.getSheetByName("SHEET_2"); // Change as needed

  const range1 = sheet1.getDataRange();
  const range2 = sheet2.getDataRange();

  range1.setBackground(null);
  range2.setBackground(null);

  const values1 = range1.getValues();
  const values2 = range2.getValues();

  const numRows = Math.max(values1.length, values2.length);
  const numCols = Math.max(values1[0].length, values2[0].length);

  // Prepare background color grids
  const backgrounds1 = Array.from({ length: numRows }, () => Array(numCols).fill(null));
  const backgrounds2 = Array.from({ length: numRows }, () => Array(numCols).fill(null));

  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      const val1 = values1[row]?.[col] ?? "";
      const val2 = values2[row]?.[col] ?? "";

      if (val1 !== val2) {
        backgrounds1[row][col] = "#fff59d"; // Light yellow
        backgrounds2[row][col] = "#fff59d";
      }
    }
  }
  Logger.log('Done calculating the differences.')

  // Apply background color grids in one operation
  sheet1.getRange(1, 1, numRows, numCols).setBackgrounds(backgrounds1);
  sheet2.getRange(1, 1, numRows, numCols).setBackgrounds(backgrounds2);

  Logger.log(`Highlighted the differences between the tabs in yellow.`)
};
