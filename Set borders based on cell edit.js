/** 
INSTALLATION
 * Edit COLUMN_INDEX to fit your data
 * Edit rowRange to adjust for different table widths (do you want to highlight all columns)
 * Run script once to authorise it. 
*/

function onEdit(e) {
  const COLUMN_INDEX = 2; // Edit based on column B
  const sheet = e.range.getSheet();
  const col = e.range.getColumn();
  const row = e.range.getRow();

  Logger.log(`Edit detected at row ${row}, column ${col} on sheet ${sheet.getName()}`);

  // Only act on edits in column B
  if (col !== COLUMN_INDEX) {
    return;
  }

  const value = sheet.getRange(row, COLUMN_INDEX).getValue();
  Logger.log(`Value in C${row}: '${value}'`);

  const lastCol = sheet.getLastColumn();
  const rowRange = sheet.getRange(row, COLUMN_INDEX, 1, lastCol - 1); // Change COLUMN_INDEX if this is not the first column

  if (value !== null && value.toString().trim() !== "") {
    Logger.log(`Setting dashed middle border on row ${row}`);
    rowRange.setBorder(
      true, // top
      false, // left
      true, // bottom
      false, // right
      false,  // vertical (middle)
      false, // horizontal
      "#cccccc", // border colour
      SpreadsheetApp.BorderStyle.DASHED // border style type
    );
  } else {  // Removes borders again if the cell becomes empty
    Logger.log(`Clearing borders on row ${row}`);
    rowRange.setBorder(false, false, false, false, false, false);
  }
}
