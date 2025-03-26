/** Pulls a joke from the witz API and displays it as a popup.
 */
function pullRandomJoke() {
  // Make a request to the WitzAPI
  const response = UrlFetchApp.fetch('https://witzapi.de/api/joke/?limit=1&language=de', {
    'method': 'get',
    'headers': {
      'accept': 'application/json'
    }
  });
  
  // Parse the JSON response
  const jsonResponse = JSON.parse(response.getContentText());

  // Extract joke text
  const jokeText = jsonResponse[0]["text"];
  
  // Create and show a popup with the joke
  const ui = SpreadsheetApp.getUi(); // Or DocumentApp, FormApp, etc. depending on your application
  ui.alert('Witz des Tages', jokeText, ui.ButtonSet.OK);
};
