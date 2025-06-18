/**
 * Reports an error to a Slack channel using a dedicated Slack bot.
 * Additional context variables are appended as a code block at the end of the message, if provided.
 *
 * @param {string} fncName The name of the function where the error occurred.
 * @param {string} msg The error message.
 * @param {object} [contextVariables={}] An optional object containing additional key-value pairs
 * (variable names and their values) to include in the error report as a code block.
 */
function reportErrorInSlack(fncName, msg, contextVariables = {}) {
  const slackBotToken = PropertiesService.getUserProperties().getProperty("slackBotToken_apps_scripts_errors");
  const channelId = "C0920MAFEFN";       // Replace with the ID of your Slack channel (e.g., C12345ABC)

  const userEmail = Session.getActiveUser().getEmail();
  const toolName = "Verden Schichtreport";
  const logLink = "https://script.google.com/u/0/home/projects/1vNVfS7klUzzIzW8SCmG9xIuHqw1SUcB-_VsHrn8UsEKqDLsOabKHCBRB/executions";

  // --- Construct the main message text ---
  let mainMessageText = `
                    *New Error* | ${toolName}
                    >*Reported by:* ${userEmail}
                    >*Function:* ${fncName}
                    >*Error message:* ${msg}
                    <${logLink}|View the logs>
  `.split('\n') // Split the string into an array of lines
   .map(line => line.replace(/^\s+/, '')) // Remove leading whitespace from each line
   .join('\n') // Join the lines back into a single string
   .trim(); // Trim any remaining blank lines at the start/end

  // --- Append contextVariables as a code block if they exist ---
  if (Object.keys(contextVariables).length > 0) {
    let contextBlockContent = '\n\n*Context Variables:*\n```';
    try {
      contextBlockContent += JSON.stringify(contextVariables, null, 2);
    } catch (e) {
      contextBlockContent += `Failed to stringify context variables: ${e.message}`;
    }
    contextBlockContent += '\n```';
    mainMessageText += contextBlockContent;
  }

  const payload = {
    channel: channelId,
    text: mainMessageText, // Use the dynamically constructed message
    unfurl_links: false,
    unfurl_media: false,
    link_names: true
  };

  const options = {
    'method': 'post',
    'contentType': 'application/json',
    'headers': {
      'Authorization': 'Bearer ' + slackBotToken
    },
    'payload': JSON.stringify(payload)
  };

  try {
    const response = UrlFetchApp.fetch('https://slack.com/api/chat.postMessage', options);
    const responseData = JSON.parse(response.getContentText());

    if (responseData.ok) {
      Logger.log(`Error successfully posted to Slack (${channelId}) via bot.`);
    } else {
      Logger.log(`Failed to report error to Slack channel (${channelId}): ${responseData.error}`);
    }
  } catch (e) {
    Logger.log(`Error reporting to Slack: ${e.message}`);
  }

  throw new Error(`Error reported: ${msg}`); // Re-throw the original error after attempting to report
}

// Use this to set the slackBotToken (tied to a specific user) and then reference this in the reportErrorInSlack() function
function setUserProperties() {
  let newProperties = {};
  // Example: newProperties.slackBotToken_apps_scripts_errors = "xoxb-YOUR-BOT-TOKEN";
  // It's recommended to set this directly in the Apps Script Project Properties UI:
  // File > Project properties > Script properties tab > Add a new property
  // Key: slackBotToken_apps_scripts_errors
  // Value: xoxb-YOUR-SLACK-BOT-TOKEN

  const userProperties = PropertiesService.getUserProperties();
  userProperties.setProperties(newProperties);

  Logger.log(JSON.stringify(userProperties.getProperties(), null, 2));
};
