// Returns a date that is x units from the inputted one. 
// Enter a type in form of a letter (w: week, d: day, h: hour, m: minute)
// Enter negative numbers to go back 

// Leftover function from testing.
function DateFromDate(date,type,x){
  // x = number of units to add or subtract and date = start date
  switch (type) {
    case "w": 
      var result = new Date(date.getTime()+x*(7*24*3600*1000));
      break;
    case "d": 
      var result = new Date(date.getTime()+x*(24*3600*1000));
      break;
    case "h": 
      var result = new Date(date.getTime()+x*(3600*1000));
      break;
    case "m": 
      var result = new Date(date.getTime()+x*(60*1000));
      break;
  };
  return result
};
