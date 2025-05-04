/** 

WHY:
  * A problem that I often face is that I forget to add a meeting room to an event or that a meeting room has declined after adding it (for whatever reason). 
  * Therefore, I want a script that will scan my future events and send me reminders if this is the case. 

SOLUTION:
  * This script will check whether future events have meeting rooms that have declined or if events have people invited without a meeting room. 

INSTRUCTIONS: 
  * You can enable or disable that the script looks for 1) meetings with declined rooms or 2) events with missing rooms.
  * Edit the constants at the start of the script to customise the settings. 
  * Edit the script URL if you want the link to work. 

*/

const CHECK_DECLINED_ROOMS = true;       // Set to false to skip checking for declined room events
const CHECK_MISSING_ROOMS = true;        // Set to false to skip checking for events missing a room

const DAYS_INTO_THE_FUTURE = 14;    // How many days into the future should the script scan. 
const MINIMUM_GUEST_NUMBER = 2;     // Only scan for events missing a room that have a minimum of X people invited
const SCRIPT_URL = 'https://script.google.com/home/projects/SCRIPT_ID/edit'; // Update this to your own script link

function findDeclinedRoomEventsAndEmail() {
  let calendar = CalendarApp.getDefaultCalendar();
  let now = new Date();
  let future = new Date(now);
  future.setDate(future.getDate() + DAYS_INTO_THE_FUTURE); // Look 14 days ahead

  let events = calendar.getEvents(now, future);
  let declinedEvents = [];
  let userOwnedEventsWithoutRoom = [];
  const userEmail = Session.getActiveUser().getEmail();

  for (let event of events) {
    let guests = event.getGuestList(true); // Include resource guests
    let roomGuests = guests.filter(g => isRoomResource(g.getEmail()));

    // Collect declined room events
    if (CHECK_DECLINED_ROOMS && roomGuests.length > 0) {
      let allRoomsDeclined = roomGuests.every(g =>
        g.getGuestStatus() === CalendarApp.GuestStatus.NO
      );
      if (allRoomsDeclined) {
        declinedEvents.push({
          title: event.getTitle(),
          start: event.getStartTime(),
          end: event.getEndTime()
        });
      }
    }

    // Collect events owned by user, with 2+ guests, and no room
    if (
      CHECK_MISSING_ROOMS &&
      event.getCreators().includes(userEmail) &&
      guests.length >= MINIMUM_GUEST_NUMBER &&
      roomGuests.length === 0
    ) {
      userOwnedEventsWithoutRoom.push({
        title: event.getTitle(),
        start: event.getStartTime(),
        end: event.getEndTime()
      });
    }
  }

  // Send email if we found anything
  if (declinedEvents.length > 0 || userOwnedEventsWithoutRoom.length > 0) {
    let html = buildEmailBody(declinedEvents, userOwnedEventsWithoutRoom);
    let subject = `⚠️ Meeting room summary: (${declinedEvents.length} declined, ${userOwnedEventsWithoutRoom.length} missing rooms)`;

    GmailApp.sendEmail(userEmail, subject, '', {
      htmlBody: html
    });
  } else {
    Logger.log('No matching events in the next 14 days.');
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
    </tr>
  `).join('');

  let missingRoomRows = missingRoomEvents.map(e => `
    <tr>
      <td>${e.title}</td>
      <td>${formatDate(e.start)}</td>
      <td>${formatDate(e.end)}</td>
    </tr>
  `).join('');

  return `
    <h3>Events with declined rooms:</h3>
    ${declinedEvents.length > 0 ? `
    <table border="1" cellpadding="6" cellspacing="0" style="border-collapse: collapse;">
      <thead>
        <tr style="background-color: #f2f2f2;">
          <th>Title</th>
          <th>Start</th>
          <th>End</th>
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
  return Utilities.formatDate(date, Session.getScriptTimeZone(), "EEE, MMM d yyyy, HH:mm");
};
