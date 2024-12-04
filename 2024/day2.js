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
 * @param {Array} lstCurrReport 
 * @param {boolean} problemDampenerEnabled 
 */
function isReportSafe(lstCurrReport, problemDampenerEnabled) {

    var boolSafe = true;
    var intDirection = 0;
    var intPrevLevel = 0;
    var intCountOfUnsafeLevels = 0;
    
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
                boolSafe = false;
                intCountOfUnsafeLevels++;
            } else if(intDelta > 0 && intDirection < 0) {
                // console.log(`Unsafe: Level went up but other(s) went down -> ${intCurrLevel} - ${intPrevLevel} = ${intDelta}`);
                boolSafe = false;
                intCountOfUnsafeLevels++;
            } else if(intDelta < 0 && intDirection > 0) {
                // console.log(`Unsafe: Level went up but other(s) went up -> ${intCurrLevel} - ${intPrevLevel} = ${intDelta}`);
                boolSafe = false;
                intCountOfUnsafeLevels++;
            } else if(Math.abs(intDelta) < 1 || Math.abs(intDelta) > 3) {
                // console.log(`Unsafe: Level changed by less than 1 or more than 3 -> ${intCurrLevel} - ${intPrevLevel} = ${intDelta}`);
                boolSafe = false;
                intCountOfUnsafeLevels++;
            }

        }

        intPrevLevel = intCurrLevel;
        

    });

    if(!boolSafe && problemDampenerEnabled) {

        console.log(`${lstCurrReport} is unsafe; dampening...`)
        return dampener(lstCurrReport, 0, 0);

    }
    
    return boolSafe;


}

/**
 * 
 * @param {Array} lstCurrReport 
 * @param {Number} intCountOfRemoved 
 * @param {Number} intRemoveAtIndex 
 * @returns true or false whether the report is unsafe based on the dampening algorithm
 */
function dampener(lstCurrReport, intCountOfRemoved, intRemoveAtIndex) {

    // console.log(`\t#dampener(${lstCurrReport}, ${intCountOfRemoved}, ${intRemoveAtIndex})`);
    
    if((intRemoveAtIndex + 1) > lstCurrReport.length) {
        // console.log(`\tReturning false.`);
        return false;
    }

    var lstTrimmedReport = JSON.parse(JSON.stringify(lstCurrReport));
    lstTrimmedReport.splice(intRemoveAtIndex, 1);
    
    // console.log(`\t\tChecking ${lstTrimmedReport}`);

    if(isReportSafe(lstTrimmedReport, false)) {
        // console.log(`\tReturning true.`);
        return true;
    } else {
        return dampener(lstCurrReport, ++intCountOfRemoved, ++intRemoveAtIndex);
    }

    

}

/**
 * 
 * @param {Array} lstReports 
 * @param {boolean} problemDampenerEnabled
 */
function countSafeReports(lstReports, problemDampenerEnabled) {

    var intCountOfSafeReports = 0;

    // console.log(`Checking ${lstReports.length} reports...`);
    
    lstReports.forEach((lstCurrReport, idx) => {

        if(isReportSafe(lstCurrReport, problemDampenerEnabled)) {
            intCountOfSafeReports++;
        }

    });

    return intCountOfSafeReports;

}




module.exports = {countSafeReports, loadData, parseLine};