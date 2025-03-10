/** Create a new Google Sheet in a specific folder. 
 * @param {string} name           The name of the new folder.
 * @param {Folder Id} folderId    The id of the parent folder; where the folder should be created in. 
 * @return {spreadsheet}          The newly created spreadsheet object. 
 */
function createSheet(name, folderId) {
  testVariableTypes("createSheet", [[name, "string"], [folderId, "folderId"]]);

  let folder = DriveApp.getFolderById(folderId);

  let spreadsheet = SpreadsheetApp.create(name); // Create the sheet
  let file = DriveApp.getFileById(spreadsheet.getId()); // Get the file object
  
  file.moveTo(folder);

  logger('Update', "createSheet()", `Spreadsheet erstellt: "${spreadsheet.getName()}" \nIm Ordner: "${folder.getName()}"\Ordner URL: ${folder.getUrl()}`);
  return spreadsheet;
};

/** Create a folder in another Google Drive Folder
 * @param {string} name                     The name of the new folder.
 * @param {Folder Id} folderId              The id of the parent folder; where the folder should be created in. 
 * @return {Google Drive Folder} newFolder  The folder object. 
 */
function createFolder(name, folderId) {
  testVariableTypes("Input: createFolder" , [[name, "string"], [folderId, "folderId"]]);

  let parentFolder = DriveApp.getFolderById(folderId);
  let newFolder = parentFolder.createFolder(name); // Create folder inside parent

  logger('Update', "createFolder", `Ordner erstellt: "${newFolder.getName()}"\nOrdner URL: ${newFolder.getUrl()}`);
  return newFolder;
};





  