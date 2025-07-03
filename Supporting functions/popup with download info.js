/**
 * Shows a custom dialog with a success message and a clickable link to the folder.
 * @param {string} fileName The name of the created file.
 * @param {string} folderUrl The URL of the folder containing the file.
 */
function downloadFilePopup(msg, folderUrl) {
  // Create a template object from the HTML file.
  const htmlTemplate = HtmlService.createTemplateFromFile('98. Popup box.html');

  // Attach the data to the template. These variables will be available
  //    as scriplets inside the HTML file.
  htmlTemplate.folderUrl = folderUrl;
  htmlTemplate.msg = msg.replace(/\n/g, '<br>');    // Replace the /n (page breaks) with <br> element tha signals a break in html.

  // Heuristic values for calculating height. You can adjust these as needed.
  const boxSize = calculatePopupBoxHeightInPx(msg);

  // Evaluate the template to get the final HTML content and set dimensions.
  const htmlOutput = htmlTemplate.evaluate()
    .setWidth(400)
    .setHeight(boxSize);

  Logger.log(`Download popup shown to user. Message: "${msg}" and folder link: ${folderUrl}.`)
  // 4. Show the dialog.
  SpreadsheetApp.getUi().showModalDialog(htmlOutput, 'Export Successful');
}; 

/**
 * Calculate the size of the popup box based on number of characters, expected lines as a result and line breaks.
 * @param {string} msg    The message that will populate the popup box
 * @returns {number}      The height of the popup in pixels
 */
function calculatePopupBoxHeightInPx(msg) {
  const avgCharsPerLine = 48;  // Estimated characters per line in a 400px wide box.
  const lineHeight = 22;       // Estimated pixel height of a single line of text.
  const baseHeight = 70;      // Base height for padding, title, the link, and buttons.

  let calculatedHeight = baseHeight; 
  
  const messageLines = msg.split('\n');
  messageLines.forEach(line => {
    // Find the number of lines based on text wrapping. Add in line breaks.
    const lineLen = line.length;

    if (lineLen > 0) {
      calculatedHeight += Math.ceil(line.length / avgCharsPerLine) * lineHeight;
    } else {
      calculatedHeight += lineHeight
    }
  });

  const boxSize = Math.max(90, Math.min(calculatedHeight, 600));
  return boxSize
};
