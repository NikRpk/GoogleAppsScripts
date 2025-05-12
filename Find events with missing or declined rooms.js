/** 

INSTALL VIDEO: https://drive.google.com/file/d/1RW_lUNJFlkyOpOog92XgRSSALlCg60kP/view?usp=sharing

PROBLEM:
  * A problem that I often face is that I forget to add a meeting room to an event or that a meeting room has declined after adding it (for whatever reason). 
  * Therefore, I want a script that will scan my future events and send me reminders if this is the case. 

SOLUTION:
  * This script will check whether future events have meeting rooms that have declined or if events have people invited without a meeting room. 

INSTRUCTIONS: 
  * You can enable or disable that the script looks for 1) meetings with declined rooms or 2) events with missing rooms.
  * Edit the constants at the start of the script to customise the settings. 
  * Edit the script URL if you want the link to work. 

INSTALLATION: 
  * Create a Google Apps script in your Google Drive Folder. 
  * Paste this code. Update the settings (like SCRIPT_URL and WEEKDAYS_ONLY). 
  * Click save (small save icon) at the top. 
  * Select "createDailyTrigger" at the top (very likely that this is already preselected). 
  * Click run at the top. This will create the trigger so that the script runs every morning between 06:00 and 07:00.
  * Accept all the popups coming up asking to accept permissions. 
  * Verify that you got your first email.

*/

// SETTINGS
const CHECK_DECLINED_ROOMS = true;      // Set to false to skip checking for declined room events
const CHECK_MISSING_ROOMS = true;       // Set to false to skip checking for events missing a room

const DAYS_INTO_THE_FUTURE = 14;    // How many days into the future should the script scan. 
const MINIMUM_GUEST_NUMBER = 2;     // Only scan for events missing a room that have a minimum of X people invited (includes organizer)
const SCRIPT_URL = 'https://script.google.com/home/projects/1AztX3pTCO-XGvgllsMN0Rsf17c-pAbnGtA_cFrABnsD6udUNpueZKwmS/edit'; // Update this to the link of this page
const WEEKDAYS_ONLY = true;

// Installing the trigger (only needed once)
function createDailyTrigger() {
  // Delete any existing triggers for the function (optional, but good practice)
  const triggers = ScriptApp.getProjectTriggers();
  for (const trigger of triggers) {
    if (trigger.getHandlerFunction() === 'findDeclinedRoomEventsAndEmail') {
      ScriptApp.deleteTrigger(trigger);
    }
  }

  // Create a new daily trigger that runs between 6 AM and 7 AM
  ScriptApp.newTrigger('findDeclinedRoomEventsAndEmail')
      .timeBased()
      .atHour(6) // You can adjust this if you want it to run anytime between 6 and 7
      .everyDays(1)
      .create();

  Logger.log('Daily trigger set to run at 6 AM.');
  findDeclinedRoomEventsAndEmail();
};

// The script that checks for the missing rooms
function findDeclinedRoomEventsAndEmail() {
  let now = new Date();
  let dayOfWeek = now.getDay(); // Sunday is 0, Monday is 1, ..., Saturday is 6

  // Check if it's a weekend (Saturday or Sunday)
  if ((dayOfWeek === 0 || dayOfWeek === 6) && WEEKDAYS_ONLY === true) {
    Logger.log('Today is a weekend. Skipping meeting room check.');
    return; // Exit the function if it's a weekend
  };

  let calendar = CalendarApp.getDefaultCalendar();
  let future = new Date(now);
  future.setDate(future.getDate() + DAYS_INTO_THE_FUTURE);

  let events = calendar.getEvents(now, future);
  let declinedEvents = [];
  let userOwnedEventsWithoutRoom = [];
  const userEmail = Session.getActiveUser().getEmail();

  for (let event of events) {
    let allGuests = event.getGuestList(true); // Include resource guests
    let roomGuests = allGuests.filter(g => isRoomResource(g.getEmail()));
    let humanAttendees = event.getGuestList(false).map(g => g.getEmail()); // Get email addresses of human attendees

    // Collect declined room events
    if (CHECK_DECLINED_ROOMS && roomGuests.length > 0) {
      let allRoomsDeclined = roomGuests.every(g =>
        g.getGuestStatus() === CalendarApp.GuestStatus.NO
      );
      if (allRoomsDeclined) {
        declinedEvents.push({
          title: event.getTitle(),
          start: event.getStartTime(),
          end: event.getEndTime(),
          attendees: humanAttendees // Add attendees list
        });
      }
    }

    // Collect events owned by user, with MINIMUM_GUEST_NUMBER (including organizer) or more, and no room
    // Note: event.getGuestList(false) does not include the organizer unless they explicitly invited themselves.
    // event.getGuestList(true) includes organizer if they are on the guest list.
    // For MINIMUM_GUEST_NUMBER, we consider the total number of people involved.
    // The original script used guests.length which is allGuests.length here.
    if (
      CHECK_MISSING_ROOMS &&
      event.getCreators().includes(userEmail) && // Check if the user is the creator
      (allGuests.filter(g => !isRoomResource(g.getEmail())).length + (event.getCreators().includes(userEmail) ? 1 : 0) >= MINIMUM_GUEST_NUMBER) && // Ensure minimum number of human participants
      roomGuests.length === 0
    ) {
      // Get human attendees again, ensuring organizer is included if they are the creator
      let attendeesForMissingRoom = event.getGuestList(false).map(g => g.getEmail());
      // Add organizer if not already listed as a guest
      if (!attendeesForMissingRoom.includes(userEmail) && event.getCreators().includes(userEmail)) {
          // This logic might be tricky as getGuestList(false) might already include the organizer if they are an attendee.
          // A simpler way for "missing rooms" is to just list the guests who are actual invitees.
          // The MINIMUM_GUEST_NUMBER check ensures there are enough people.
      }

      userOwnedEventsWithoutRoom.push({
        title: event.getTitle(),
        start: event.getStartTime(),
        end: event.getEndTime(),
        attendees: humanAttendees // Add attendees list
      });
    }
  }

  // Send email if we found anything
  if (declinedEvents.length > 0 || userOwnedEventsWithoutRoom.length > 0) {
    let html = buildEmailBody(declinedEvents, userOwnedEventsWithoutRoom);
    let subject = `Meeting room summary: (${declinedEvents.length} declined, ${userOwnedEventsWithoutRoom.length} missing rooms)`;

    GmailApp.sendEmail(userEmail, subject, '', {
      htmlBody: html
    });
  } else {
    Logger.log('No matching events in the next ' + DAYS_INTO_THE_FUTURE + ' days requiring room attention.');
  }
}

function isRoomResource(email) {
  return email.includes('@resource.calendar.google.com');
}

function buildEmailBody(declinedEvents, missingRoomEvents) {
  let declinedRows = declinedEvents.map(e => `
    <tr>
      <td>${e.title}</td>
      <td>${formatDate(e.start)}</td>
      <td>${formatDate(e.end)}</td>
      <td>${e.attendees.length > 0 ? e.attendees.join('<br>') : '<i>No human guests listed</i>'}</td>
    </tr>
  `).join('');

  let missingRoomRows = missingRoomEvents.map(e => `
    <tr>
      <td>${e.title}</td>
      <td>${formatDate(e.start)}</td>
      <td>${formatDate(e.end)}</td>
      <td>${e.attendees.length > 0 ? e.attendees.join('<br>') : '<i>No human guests listed</i>'}</td>
    </tr>
  `).join('');

  return `
    <p>Good morning!<p>
    <h3>Events with declined rooms:</h3>
    ${declinedEvents.length > 0 ? `
    <table border="1" cellpadding="6" cellspacing="0" style="border-collapse: collapse;">
      <thead>
        <tr style="background-color: #f2f2f2;">
          <th>Title</th>
          <th>Start</th>
          <th>End</th>
          <th>Guests</th>
        </tr>
      </thead>
      <tbody>
        ${declinedRows}
      </tbody>
    </table>` : `<p>✅ No events have declined rooms.</p>`}

    <h3>Events without a room:</h3>
    ${missingRoomEvents.length > 0 ? `
    <table border="1" cellpadding="6" cellspacing="0" style="border-collapse: collapse;">
      <thead>
        <tr style="background-color: #f2f2f2;">
          <th>Title</th>
          <th>Start</th>
          <th>End</th>
          <th>Guests</th>
        </tr>
      </thead>
      <tbody>
        ${missingRoomRows}
      </tbody>
    </table>` : `<p>✅ None of your events are missing a room.</p>`}

    <p style="margin-top: 20px; font-size: 12px;">
      <a href="${SCRIPT_URL}" target="_blank">
        View or manage the script and triggers.
      </a>
    </p>
  `;
};

function formatDate(date) {
  return Utilities.formatDate(date, Session.getScriptTimeZone(), "EEE, MMM d, HH:mm");
};
