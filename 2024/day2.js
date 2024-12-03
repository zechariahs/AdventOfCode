var util = require("../util.js")

function extractNumbers(strInput, strDelimiter) {

    if(strInput.trim() === '') {
        return [];
    }

    // Split the input into two parts - the "first" word and "rest"
    const [first, ...rest] = strInput.split(strDelimiter);

    // Check the "first" word
    const isNumber = !isNaN(first);

    // console.log(`${first}\t\t${rest}`);

    // Recursively call this function to process the remainder of the input
    const restNumbers = extractNumbers(rest.join(strDelimiter), strDelimiter);

    return isNumber ? [Number(first), ...restNumbers] : restNumbers;

}

/**
 * 
 * @param {Array} lstInputData 
 */
function loadData(lstInputData) {

    lstData = [];

    lstInputData.forEach((strLine, idx) => {

        lstData[lstData.length] = parseLine(strLine);

    });

    return lstData;

}

function parseLine(strLine) {

    return extractNumbers(strLine, " ");
    
}

/**
 * 
 * @param {Array} lstReports 
 */
function countSafeReports(lstReports) {

    var intCountOfSafeReports = 0;

    // console.log(`Checking ${lstReports.length} reports...`);
    
    lstReports.forEach((lstCurrReport, idx) => {

        var boolUnsafe = false;
        var intDirection = 0;
        var intPrevLevel = 0;
        
        // Calculate the deltas between each level
        // in the report.
        lstCurrReport.forEach((intCurrLevel, idx) => {

            if(idx > 0) {

                var intDelta = intCurrLevel - intPrevLevel;

                if(idx == 1) {
                    // Second level so we can determine directionality.
                    if(intCurrLevel > intPrevLevel) {
                        intDirection = 1;
                    } else if(intCurrLevel < intPrevLevel) {
                        intDirection = -1;
                    }
                }

                if(intDelta == 0) {
                    // console.log(`Unsafe: Level hasn't changed -> ${intCurrLevel} - ${intPrevLevel} = ${intDelta}`);
                    boolUnsafe = true;
                } else if(intDelta > 0 && intDirection < 0) {
                    // console.log(`Unsafe: Level went up but other(s) went down -> ${intCurrLevel} - ${intPrevLevel} = ${intDelta}`);
                    boolUnsafe = true;
                } else if(intDelta < 0 && intDirection > 0) {
                    // console.log(`Unsafe: Level went up but other(s) went up -> ${intCurrLevel} - ${intPrevLevel} = ${intDelta}`);
                    boolUnsafe = true;
                } else if(Math.abs(intDelta) < 1 || Math.abs(intDelta) > 3) {
                    // console.log(`Unsafe: Level changed by less than 1 or more than 3 -> ${intCurrLevel} - ${intPrevLevel} = ${intDelta}`);
                    boolUnsafe = true;
                }

            }

            intPrevLevel = intCurrLevel;
            

        });

        if(!boolUnsafe) {
            intCountOfSafeReports++;
        } 
        // else {
        //     console.log(`SAFE: ${lstCurrReport.toString()} and direction is ${intDirection}`);
        // }

        boolUnsafe = false;
        intDirection = 0;

    });

    return intCountOfSafeReports;

}




module.exports = {countSafeReports, loadData, parseLine};