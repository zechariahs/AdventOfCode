/**
 * Copyright (c) 2025 by Zechariah Schwenk, All Rights Reserved.
 * Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://opensource.org/licenses/MIT
 */

const min = 0;
const max = 99;
const countValue = 0;
let count = 0;
let rows = 0;

/**
 * Rotates a position on a circular track and counts occurrences of landing on a specific value.
 * @param {number} startingPosition 
 * @param {string} direction Must be 'R' or 'L'
 * @param {number} steps 
 * @param {boolean} countAll Whether to count all occurrences of passing the count value (countValue).
 * @returns {number}
 */
function rotate(startingPosition, direction, steps, countAll=false) {

    // Determine whether to write debug logs.
    let writeLog = (1 === 2) &&(rows%1000 === 0 || (rows > 99 && rows < 201));
    
    // Controls the direction of rotation.
    let multiplier = direction === 'R' ? 1 : -1;
    // Calculate the number of positions to move.
    let clicks = steps * multiplier;
    // Calculate the new position on the track.
    let newPosition = (startingPosition + clicks) % 100;

    // Adjust for computers being linear and not circular.
    if (newPosition < 0) {
        newPosition += 100;
    }    
    
    // Count occurrences of landing on or passing the countValue.
    if(countAll) {
        // The number of full spins completed.
        let fullSpins = Math.floor(steps / 100);
        // The remaining steps after full spins.
        let partialSpins = steps % 100;

        if(writeLog) {
            console.log(`\n\t\t\tClicks: ${clicks}, Spins: ${fullSpins}`);
        }
        
        if (fullSpins >= 1) {
            count += fullSpins ;
        } 
        if(partialSpins > 0 && newPosition !== countValue) {
            // No full spins, check partial
            if(direction === 'R' && startingPosition !== countValue &&newPosition < startingPosition) {
                count++;
            } else if(direction === 'L' && startingPosition !== countValue && newPosition > startingPosition) {
                count++;
            }
        }
    }
    
    
    
    if (newPosition === countValue) {
        // Landed on zero.
        count++;
    }
    


    if (writeLog) {
        console.log(`\t\t${rows}. ${startingPosition} --> ${direction}${steps} --> ${newPosition} (Count: ${count})`);
    }      

    return newPosition;

}

/**
 * Processes a list of movement instructions and counts occurrences of landing 
 * on a specific value.
 * 
 * @param {Array} lstInputData 
 * @param {number} intInitialPosition 
 * @param {boolean} countAll - Whether to count all occurrences of passing the 
 *  count value (countValue) or just when it is the stopping position.
 * @returns {number} - The total number of times a specific value was landed on 
 *  or passed.
 */
function processData(lstInputData, intInitialPosition, countAll=false) {
    
    let currentPosition = intInitialPosition;
    count = 0;
    rows = 0;
    
    lstInputData.forEach(instruction => {
        let direction = instruction.charAt(0);
        let steps = parseInt(instruction.slice(1), 10);
        currentPosition = rotate(currentPosition, direction, steps, countAll);
        rows++;        

        // console.log(`Current Position: ${currentPosition}, Count: ${count}`);


    });
    return count;
}

module.exports = { rotate, processData };