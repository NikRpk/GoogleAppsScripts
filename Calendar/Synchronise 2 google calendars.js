// Credits go to Will Roman - https://medium.com/@willroman/auto-block-time-on-your-work-google-calendar-for-your-personal-events-2a752ae91dab
/* Calendar Sync
This is a mini tool that copies events from one calendar into another one. This can be useful if you have a work calendar and personal one and want to block time between the two without having to fully move into only one calendar.

---- Instructions ----
1. Create a new Apps Script.
2. Please copy the contents of the sync.js file into that file.
3. Update the calendar IDs (To find your Google Calendar ID, open your Google Calendar, navigate to "My Calendars", select the desired calendar, and then go to "Settings and Sharing". Under "Integrate calendar", you'll find the "Calendar ID", which is typically an email address associated with your calendar.)
4. Set a trigger to run this script every few minutes (would suggest 10 mins).
*/


function sync() {
  var primary_cal = "CALENDAR_ID_1"
  var ids = [
    "CALENDAR_ID_2", 
    "CALENDAR_ID_3",
    "CALENDAR_ID_4"
    ]

  for (id in ids) {
    var id = ids[id]
    var secondaryCal=CalendarApp.getCalendarById(id);
    var today=new Date();
    var enddate=new Date();
    enddate.setDate(today.getDate()+30); // how many days in advance to monitor and block off time
    var secondaryEvents = secondaryCal.getEvents(today,enddate);

    var primaryCal=CalendarApp.getCalendarById(primary_cal);

    var primaryEvents=primaryCal.getEvents(today,enddate);
    Logger.log(primaryEvents)

    var stat=1;
    var evi, existingEvents;

    for (ev in secondaryEvents)
    {
      stat=1;
      evi=secondaryEvents[ev];
      
      for (existingEvents in primaryEvents) // if the secondary event has already been blocked in the primary calendar, ignore it
        {
          if ((primaryEvents[existingEvents].getStartTime().getTime()==evi.getStartTime().getTime()) && (primaryEvents[existingEvents].getEndTime().getTime()==evi.getEndTime().getTime()))
          {
              stat=0;
              break;
          }
        }
      
      if (stat==0) continue;
      var d = evi.getStartTime();
      var n = d.getDay();
      Logger.log("d = "+d+" / n = "+n)

      if (evi.isAllDayEvent()) continue;
      
      if (n==1 || n==2 || n==3 || n==4 || n==5 || n==6 || n==7 ) // Remove certain days if you don't want them to be checked (e.g. weekends). 1 is Sunday
      {
        Logger.log("new event")
        var newEvent = primaryCal.createEvent('Block / Personal',evi.getStartTime(),evi.getEndTime()); // change the Booked text to whatever you would like your merged event titles to be
        // alternative version below that copies the exact secondary event information into the primary calendar event
        // var newEvent = primaryCal.createEvent(evi.getTitle(),evi.getStartTime(),evi.getEndTime(), {location: evi.getLocation(), description: evi.getDescription()});  
        newEvent.removeAllReminders(); // so you don't get double notifications. Delete this if you want to keep the default reminders for your newly created primary calendar events
      };
    };
  };
};
