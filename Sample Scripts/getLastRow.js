//function to find out the last non-blank row number of a range. It will include empty cells inbetween the first and last cell 
//the output is the number of rows of that range and not necessarily the row number (if the range is C3:C5, the output would 3 and not 5).
function getLastRowSpecial(range){
    var rowNum = 0;
    var blank = false;
    for(var row = 0; row < range.length; row++){
        if(range[row][0] === "" && !blank){
        rowNum = row;
        blank = true;
        }
        else if(range[row][0] !== ""){
        blank = false;
        };
    };
    return rowNum;
};

// Usage as follows below:
var range = sheet.getRange("A2:A").getValues();
var lastRow = getLastRowSpecial(range);
