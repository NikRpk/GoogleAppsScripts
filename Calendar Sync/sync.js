// instructions can be found here: https://medium.com/@willroman/auto-block-time-on-your-work-google-calendar-for-your-personal-events-2a752ae91dab

function sync() {
  var ids = [
    "75c8a605d048754291388648490189efef3d2c73f9602899634ff71e0024834f@group.calendar.google.com", 
    "nsropke@gmail.com"
    ]

  for (id in ids) {
    var id = ids[id]
    var secondaryCal=CalendarApp.getCalendarById(id);
    var today=new Date();
    var enddate=new Date();
    enddate.setDate(today.getDate()+30); // how many days in advance to monitor and block off time
    var secondaryEvents = secondaryCal.getEvents(today,enddate);

    //var primaryCal=CalendarApp.getCalendarById('c_0lt30tm9u4i8vfhnbtc3lo4urg@group.calendar.google.com');
    var primaryCal=CalendarApp.getCalendarById('niklas.roepke@hellofresh.de');

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
      
      if (n==1 || n==2 || n==3 || n==4 || n==5 || n==6 || n==7 ) // skip weekends. Delete this if you want to include weekends
      {
        Logger.log("new event")
        var newEvent = primaryCal.createEvent('Block / Personal',evi.getStartTime(),evi.getEndTime()); // change the Booked text to whatever you would like your merged event titles to be
        // alternative version below that copies the exact secondary event information into the primary calendar event
        // var newEvent = primaryCal.createEvent(evi.getTitle(),evi.getStartTime(),evi.getEndTime(), {location: evi.getLocation(), description: evi.getDescription()});  
        newEvent.removeAllReminders(); // so you don't get double notifications. Delete this if you want to keep the default reminders for your newly created primary calendar events
      }
    }
  }


  var id="nsropke@gmail.com"; // CHANGE - id of the secondary calendar to pull events from
      
  

}
