/**
 * Finds or creates a specific nested subfolder. Adapt the function handle different levels of sub folders
 * @param {string} subFolderName The name of the final subfolder to get.
 * @return {Folder} The target subfolder.
 */
function findWeeklyExportFolder(subFolderName, sub2FolderName, sub3FolderName) {
  const parentFolder = DriveApp.getFolderById(FOLDER_ID);
  
  // Sequentially get or create each folder in the path
  const subFolder = getOrCreateFolder(parentFolder, subFolderName);
  const sub2Folder = getOrCreateFolder(subFolder, sub2FolderName);
  const sub3Folder = getOrCreateFolder(sub2Folder, sub3FolderName);
  
  return sub3Folder;
};

/**
 * A helper function to safely find a folder by name inside a parent folder,
 * or create it if it doesn't exist.
 * @param {Folder} parentFolder The folder to search within.
 * @param {string} folderName The name of the folder to find or create.
 * @return {Folder} The found or newly created folder.
 */
function getOrCreateFolder(parentFolder, folderName) {
  const folders = parentFolder.getFoldersByName(folderName);
  
  if (folders.hasNext()) {
    // If the folder exists, return it
    return folders.next();
  } else {
    // If it doesn't exist, create it and return the new folder
    return parentFolder.createFolder(folderName);
  }
};
