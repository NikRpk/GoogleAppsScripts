/**
 * getFormattedDate        Get the current date. You can pass a format to the function if needed, otherwise it defaults to just the day    
 * getColIndex             Get the column index of a named column out of a 2D array
 * getRequiredSheet        Get a sheet based on the sheet name. Checks if it exists. 
 * openSlackChannel        Open a redirect to a support slack channel
 * 
 */

/**
 * Gets the current date and time and formats it as a string.
 * This function is useful for generating timestamps in a specific format.
 * The format used is "dd.MM.yyyy HH:mm:ss".
 *
 * @return {string} The current date and time formatted as "dd.MM.yyyy HH:mm:ss".
 */
function getFormattedDate(format) {
  const ft = format || "dd.MM.yyyy"; 
  var now = new Date();
  var formattedDate = Utilities.formatDate(now, "Europe/Berlin", ft);
  return formattedDate;
};

/**
 * Finds the zero-based index of a specific header within an array of headers.
 * This function is case-sensitive.
 *
 * @param {string[]} headers - An array of strings representing the header row of a dataset.
 * @param {string} header - The specific header string to find the index of.
 * @returns {number} The zero-based index of the header in the headers array.
 * @throws {Error} Throws an error if the specified header is not found in the array,
 * preventing potential downstream errors from using an index of -1.
 */
function getColIndex(headers, header) {
  const index = headers.indexOf(header);

  if (index === -1) {
    throw new Error(`Could not find '${header}' in the header row ${headers}`)
  }
  return index;
};

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

/** 
 * Opens a redirect link to the help channel for the tool on Slack
 * Needs the ID of the channel that should open. Ideally it should be a public channel to ensure everyone can post.  
 */
function openSlackChannel() {
  const CHANNEL_ID = "C08J62M0V2A";   // Update to your channel
  
  const ui = SpreadsheetApp.getUi();

  ui.alert(`Please post a message in the slack channel and someone will help you. \n\nClick Ok to open the channel.`, ui.ButtonSet.OK_CANCEL)

  const url = `https://slack.com/app_redirect?channel=${CHANNEL_ID}`;  // Change to your desired link
  const html = `<script>window.open("${url}");google.script.host.close();</script>`;
  const uiHTML = HtmlService.createHtmlOutput(html)
      .setWidth(50)
      .setHeight(50);
  ui.showModalDialog(uiHTML, "Opening Link...");
};
