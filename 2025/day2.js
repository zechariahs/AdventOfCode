/**
 * Copyright (c) 2025 by Zechariah Schwenk, All Rights Reserved.
 * Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://opensource.org/licenses/MIT
 */

// Controls whether debug logging is enabled.
let debug = false;


/**
 * Processes input data to identify and sum invalid numbers based on specified criteria.
 * 
 * @param {string} strInputData - The input data string containing ranges of numbers.
 * @param {string} strDelimiter - The delimiter used to separate ranges in the input data.
 * @param {boolean} useAlternateAlgorithm - Flag to determine which invalidity checking algorithm to use.
 * @returns {number} - The sum of all identified invalid numbers.
 */
function processData(strInputData, strDelimiter=";", useAlternateAlgorithm=false) {

    let lstInvalids = [];
    let sum = 0;

    // Split input data into individual range strings
    let lstData = strInputData.split(strDelimiter).map(item => {
        let temp = item.trim();
        return temp;
    });

    // Process each range
    lstData.forEach(range  => {
        
        let lstBounds = range.split("-").map(num => parseInt(num, 10));
        
        // Iterate through the range and check each number
        for(let i = lstBounds[0]; i <= lstBounds[1]; i++) {
            
            let currVal = i.toString();
            
            // Track whether the current number has been previsouly identified as invalid.
            let boolIsInvalid = false;

            if(!useAlternateAlgorithm) {
                
                // The original algorithm: check for even-length numbers with identical halves.
                if (currVal.length%2 == 0) {

                    let midPoint = currVal.length/2;
                    let leftHalf = currVal.slice(0, midPoint);
                    let rightHalf = currVal.slice(midPoint);

                    if (leftHalf === rightHalf) {
                        lstInvalids.push(i);
                    }
                }
                else {
                    // Do nothing - numbers with an odd length are valid.
                }
            } else {

                // The alternate algorithm: check for numbers made up of repeated patterns.
                
                let length = currVal.length;
                let midPoint = length/2;

                // if (debug) console.log(`\n`);

                // Check for all possible pattern lengths up to half the length of the number.
                for(let patternLength = 0; patternLength <= midPoint; patternLength++) {
                
                    if(length%patternLength === 0) {

                        if (debug) console.log(`\tChecking number ${currVal} (${currVal.length}) with pattern length ${patternLength}`);

                        let lstToCompare = [];
                        
                        // Split the number into segments of the current pattern length.
                        for(let splitPoint = 0; splitPoint < length; splitPoint+=patternLength) {
                            lstToCompare.push(currVal.slice(splitPoint, splitPoint+patternLength));
                        }

                        // Compare the segments to see if they are all identical. 
                        // List must have at least 2 segments otherwise skip comparison 
                        // because it means the pattern length equals the number length.
                        if(lstToCompare.length >= 2) {

                            if (debug) console.log(`\t\tComparing segments: ${lstToCompare.join(", ")}`);

                            let allMatch = lstToCompare.every(val => val === lstToCompare[0]);
                            
                            if(allMatch) {
                                
                                
                                if(!boolIsInvalid) {
                                    boolIsInvalid = true;   
                                    if (debug) console.log(`\t\tAll segments match for number ${i}`);                                    lstInvalids.push(i);
                                }
                            }
                        }

                        
                    }       
                }

            }


        }

    });



    // Sum all identified invalid numbers.
    lstInvalids.forEach(invalidNum => {
        sum += invalidNum
    });
    return sum;
    
}

module.exports = {processData };