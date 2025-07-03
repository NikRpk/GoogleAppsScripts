 * Shows a custom dialog with a success message and a clickable link to the folder.
 * @param {string} fileName The name of the created file.
 * @param {string} folderUrl The URL of the folder containing the file.
 */
function downloadFilePopup(msg, folderUrl) {
  // 1. Create a template object from the HTML file.
  const htmlTemplate = HtmlService.createTemplateFromFile('98. Popup box.html');

  //msg = msg.replace(/\n/g, '<br>');

  // 2. Attach the data to the template. These variables will be available
  //    as scriplets inside the HTML file.
  htmlTemplate.folderUrl = folderUrl;
  htmlTemplate.msg = msg.replace(/\n/g, '<br>');;
  const boxSize = Math.max(180, msg.length + 30);

  // 3. Evaluate the template to get the final HTML content and set dimensions.
  const htmlOutput = htmlTemplate.evaluate()
    .setWidth(400)
    .setHeight(boxSize);

  Logger.log(`Download popup shown to user. Message: "${msg}" and folder link: ${folderUrl}.`)
  // 4. Show the dialog.
  SpreadsheetApp.getUi().showModalDialog(htmlOutput, 'Export Successful');
}
