//function to find out the last row number of a range 
// Usage as follows below:
    var range = sheet.getRange("A2:A").getValues();
    var lastRow = getLastRowSpecial(range);

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