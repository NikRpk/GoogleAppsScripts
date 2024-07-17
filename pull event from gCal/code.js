// This mini-tool queries a google calendar and can pull the events + information back into google sheets.

function pullEvents() {
  var ss = SpreadsheetApp.getActive();
  var sheet = ss.getSheetByName("Your Sheet");
  var calendarID = sheet.getRange("Location of your Calendar ID").getValue();
  var eventCal = CalendarApp.getCalendarById(calendarID);

  info = [];
  var now = new Date();
  // specify the number of milliseconds here to specify what time frame you want to look in
  var yesterday = new Date(now.getTime() - (24 * 60 * 60 * 1000));
  var events = eventCal.getEvents(yesterday, now);

  if (events.length == 0) {
    return Logger.log("No events found")
  }

  for (var counter = 0; counter < events.length; counter += 1) {
    var title = events[counter].getTitle();
    //formats the day. Feel free to adapt to a different format to maybe also include time
    var date = Utilities.formatDate(events[counter].getStartTime(), "GMT+1", "dd/MM/yyyy");
    // duration in hours. Feel free to adapt
    var duration = (events[counter].getEndTime() - events[counter].getStartTime()) / (1000 * 60 * 60);
    // the guest list is an object where each guest has multiple attributes such as name, email, status, etc.
    var guests = events[counter].getGuestList();
    var guest_number = guests.length;

    var emails = [];
    var guest_names = [];
    var status = [];
    var accepted = 0

    // this cycles through all of the guests and gets their email, name, and status
    if (guests.length != "") {
      for (var counter2 = 0; counter2 < guests.length; counter2 += 1) {
        emails.push(guests[counter2].getEmail());
        guest_names.push(guests[counter2].getName());
        status.push(guests[counter2].getGuestStatus());
        if (guests[counter2].getGuestStatus() == "YES") {accepted += 1};
      };
    };
    if (accepted == 0)
      {var attendance = 0}
    else
      {var attendance = accepted / guest_number};
    info.push([title,date,duration,guest_number,accepted,attendance,emails.join(", ")])
  };

  var sheet_log = ss.getSheetByName("Your Log Sheet");
  var rows = info.length;
  var columns = info[0].length;

  var range = sheet_log.getRange("A:A").getValues();
  var row = getLastRowSpecial(range);
  sheet_log.getRange(row + 1, 1, rows, columns).setValues(info);
};

// there are a lot more things you can pull from each event. See the link below for a complete list
// https://developers.google.com/apps-script/reference/calendar/calendar-event#getGuestList()
