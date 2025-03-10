/** Opens a redirect link to the help channel for the tool on Slack
 */
function openLink() {
    const url = "https://slack.com/app_redirect?channel=";  // Change to your desired link or person
    const html = `<script>window.open("${url}");google.script.host.close();</script>`;
    const ui = HtmlService.createHtmlOutput(html);
    SpreadsheetApp.getUi().showModalDialog(ui, "Opening Link...");
  };
  
/** Triggers a workflow in Slack to post the error message in a channel.
 */
function reportErrorInSlack(fncName, msg) {
    const webhookUrl = "SLACK_WEBHOOK_LINK"
    const payload = {
        "msg": msg,
        "function": fncName,
        "datetime": new Date(),
        "user": Session.getActiveUser().getEmail(),
        "tool": "Verden scales tool | HelloFresh",
        "logLink": "ADD_LINK_TO_THE_SCRIPT_EXECUTION_LOG",
        "unfurl_links": false 
    };
    const options = {
        'method': 'post',
        'contentType': 'application/json',
        'payload': JSON.stringify(payload)
    };

    let response = UrlFetchApp.fetch(webhookUrl, options);
    Logger.log("Slack Response Content: " + response.getContentText()); 
    Logger.log("Error as posted in the slack group with following payload: " + JSON.stringify(payload, null, 2))
    throw new Error("Error was reported!");
}