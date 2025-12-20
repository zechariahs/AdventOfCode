/**
 * Copyright (c) 2025 Zechariah Schwenk, All Rights Reserved.
 * Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://opensource.org/licenses/MIT
 */


/**
 * 
 * Processes a list of battery banks to determine the maximum possible "joltage."
 * 
 * @param {*} lstInputData Battery banks represented as strings of digits.
 * @param {*} numMaxBatteries Number of batteries that must be enabled from each bank.
 * @param {*} debug Whether to output debug information.
 * @returns {number} Total joltage calculated from the selected batteries from all banks.
 */
function processData(lstInputData, numMaxBatteries=2, debug=false) {

    let numTotalJolts = 0;

    // Iterate through each bank.
    lstInputData.forEach(strBank => {
        
        let lstOriginalBank = strBank.split('').map(num => parseInt(num));        
        
        if (debug) console.log(`\nProcessing Bank:\t${strBank} `);

        const numTotalAvailableBatteries = lstOriginalBank.length;
        let result = '';
        let currentInputIndex = 0;
    
        // Build the result one digit at a time
        for (let resultPosition = 0; resultPosition < numMaxBatteries; resultPosition++) {
            
            let numBatteriesStillNeeded = numMaxBatteries - resultPosition - 1;
            let numBestBatteryValue = '0';
            let numBestBatteryIndex = currentInputIndex;
        
            // Scan from current position to find the largest valid digit
            for (let inputIndex = currentInputIndex; inputIndex < numTotalAvailableBatteries; inputIndex++) {
                let numBatteriesAvailableAfter = numTotalAvailableBatteries - inputIndex - 1;
                
                // Can we use this digit and still have enough left?
                if (numBatteriesAvailableAfter >= numBatteriesStillNeeded) {
                    if (lstOriginalBank[inputIndex] > numBestBatteryValue) {
                        numBestBatteryValue = lstOriginalBank[inputIndex];
                        numBestBatteryIndex = inputIndex;
                    }
                }
            }
        
            // Add the best digit we found to our result
            result += numBestBatteryValue;
        
            // Move past the digit we just used
            currentInputIndex = numBestBatteryIndex + 1;
        }

        if(debug) console.log(`\t Result:\t${result}`);

        numTotalJolts += parseInt(result);

    });

    return numTotalJolts;

}

module.exports = {processData};