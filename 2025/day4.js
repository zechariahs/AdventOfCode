/**
 * Copyright (c) 2025 Zechariah Schwenk, All Rights Reserved.
 * Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://opensource.org/licenses/MIT
 */

/**
 * Counts the number of accessible toilet paper rolls ('@') in the provided input data.
 * A roll is considered accessible if it has less than or equal to a specified number
 * of adjacent rolls. When multiple passes are allowed, counted rolls are marked to avoid double counting and
 * to potentially make other rolls accessible in subsequent passes.
 * 
 * @TODO : Refactor to make loop count dynamic.
 * 
 * @param {*} lstInputData 
 * @param {*} maxLoopCount 
 * @param {*} debug 
 * @returns 
 */
function processData(lstInputData, maxLoopCount=500,debug=false) {

    let numMaxAdjacentRolls = 3;
    let numAccessibleRolls = 0;

    for(let numLoopCount = 0; numLoopCount < maxLoopCount; numLoopCount++) {
    
    
        lstInputData.forEach((strRow, currY) => {
        
            let lstCurrRow = strRow.split("");

            if (debug) console.log(`Processing Row ${currY}: ${strRow}`);

            lstCurrRow.forEach((charCol, currX) => {
                
                let lstAdjacentLocations = [];

                let currLoc = {x: currX, y: currY, value: charCol};

                let block = "";

                // Only calculate adjacent locations for '@' characters (i.e., toiletpaper rolls)
                if(charCol === '@') {

                    // Populate previous row and next row
                    let lstPrevRow = lstInputData[currY - 1] ? lstInputData[currY - 1].split("") : null;
                    let lstNextRow = lstInputData[currY + 1] ? lstInputData[currY + 1].split("") : null;

                    if (debug) console.log(`Current Location: (${currX}, ${currY})`);

                    let lstAdjacentLocations = [];

                    // Northwest (x - 1, y - 1)
                    if (lstPrevRow && currX > 0) {
                        lstAdjacentLocations.push({x: currX - 1, y: currY - 1, value: lstPrevRow[currX - 1]});

                        if (debug) block += ` ${lstPrevRow[currX - 1]} `;

                    } else {
                        if (debug) block += ` _ `;
                    }

                    // North (y - 1)
                    if (lstPrevRow && currX < lstPrevRow.length) {
                        lstAdjacentLocations.push({x: currX, y: currY - 1, value: lstPrevRow[currX]});
                        if (debug) block += ` ${lstPrevRow[currX]} `;
                    } else {    
                        if (debug) block += ` _ `;
                    }       
                    
                    // Northeast (x + 1, y - 1)
                    if (lstPrevRow && currX < lstPrevRow.length - 1) {
                        lstAdjacentLocations.push({x: currX + 1, y: currY - 1, value: lstPrevRow[currX + 1]});
                        if (debug) block += ` ${lstPrevRow[currX + 1]} `;
                    } else {    
                        if (debug) block += ` _ `;
                    }

                    if (debug) block += "\n";
                    
                    // West (x - 1)
                    if (currX > 0) {
                        lstAdjacentLocations.push({x: currX - 1, y: currY, value: lstCurrRow[currX - 1]});
                        if (debug) block += ` ${lstCurrRow[currX - 1]} `;
                    }   else {      
                        if (debug) block += ` _ `;
                    }
                    
                    // CURRENT LOCATION
                    if (debug) block += ` ${currLoc.value} `;
                    
                    // East (x + 1)
                    if (currX < lstCurrRow.length - 1) {
                        lstAdjacentLocations.push({x: currX + 1, y: currY, value: lstCurrRow[currX + 1]});
                        if (debug) block += ` ${lstCurrRow[currX + 1]} `;
                    } else {    
                        if (debug) block += ` _ `;
                    }
                    
                    if (debug) block += "\n";
                    
                    // Southwest (x - 1, y + 1)
                    if (lstNextRow && currX > 0) {
                        lstAdjacentLocations.push({x: currX - 1, y: currY + 1, value: lstNextRow[currX - 1]});
                        if (debug) block += ` ${lstNextRow[currX - 1]} `;
                    } else {    
                        if (debug) block += ` _ `;
                    }

                    // South (y + 1)
                    if (lstNextRow && currX < lstNextRow.length) {
                        lstAdjacentLocations.push({x: currX, y: currY + 1, value: lstNextRow[currX]});
                        if (debug) block += ` ${lstNextRow[currX]} `;
                    } else {    
                        if (debug) block += ` _ `;
                    }

                    // Southeast (x + 1, y + 1)
                    if (lstNextRow && currX < lstNextRow.length - 1) {
                        lstAdjacentLocations.push({x: currX + 1, y: currY + 1, value: lstNextRow[currX + 1]});
                        if (debug) block += ` ${lstNextRow[currX + 1]} `;
                    } else {    
                        if (debug) block += ` _ `;
                    }

                    if (debug) console.log(`\n${block}\n`);

                    let numRollsFound = 0;

                    lstAdjacentLocations.filter(loc => loc.value === "@").forEach(loc => {
                        
                        numRollsFound++;
                    });

                    if(numRollsFound <= numMaxAdjacentRolls) {
                        
                        if (debug) console.log(`Accessible Roll Found at (${currX}, ${currY}) with ${numRollsFound} adjacent rolls.\n`);
                        
                        numAccessibleRolls++;
                        
                        if(maxLoopCount > 1) {
                            let lstTempRow = lstInputData[currY].split("");
                            lstTempRow[currX] = "O"; // Mark as 'O' to indicate it's been counted
                            lstInputData[currY] = lstTempRow.join("");
                        }
                    }
                }
                
            
            });
        
        });

    }

    return numAccessibleRolls;

}

module.exports = {processData};