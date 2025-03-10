// Logging and user interface 
/** Custom logger that logs the message to both the console and triggers a popup for the user if it is an error. For alerts, it will trigger a toast in the user UI. 
 * @param {string} type - The type of message. Accepts 'Error', 'Alert', 'Update', 'Success'
 * @param {string} [fncName] - The name of the function where this is being called.
 * @param {string} message - The message to be displayed
 * @param {*} [output] - The output from the function 
 * @param {string} [url] - URL of the output file. 
 */
function logger(type, fncName, message, output, url) {
    let timeTakenSecs = Number((new Date() - timeStamp) / 1000).toFixed(1);
    timeStamp = new Date();

    Logger.log(
        "----  " + type + "  ----\n" +
        "Function name: " + fncName  + "()\n" +
        "Message: " + message  + "\n" +
        "Output: " + output + "\n" +
        "Runtime: " + timeTakenSecs + "s"
    );

    if (type === "Error") {
        userMessage(type, fncName, message, url)
    };

    if (type === "Alert") {
        let ss = SpreadsheetApp.getActiveSpreadsheet();

        ss.toast(`${message}`,"Alert",5);
    };
};

// Needs to have timeStamp defined as a global variable at script initiation 
// let timeStamp = new Date();