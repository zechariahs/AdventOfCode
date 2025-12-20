function processData(lstInputData, numMaxBatteries=2, debug=false) {

    let numTotalJolts = 0;

    // Iterate through each bank.
    lstInputData.forEach(strBank => {
        
        let lstEnabledBatteries = [];
        let lstSelectedIndices = [];
        let lstOriginalBank = strBank.split('').map(num => parseInt(num));        
        let lstTrackingBank = lstOriginalBank.map(num => num);
        let numSelectedNumIndex = 0;

        if (debug) console.log(`\nProcessing Bank:\t${strBank} `);

        // const digits = bank.split('');
        const numTotalAvailableBatteries = lstOriginalBank.length;
        // const neededDigits = 12;
    
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

    /*
    lstInputData.forEach(strBank => {
        
        let lstEnabledBatteries = [];
        let lstSelectedIndices = [];
        let lstOriginalBank = strBank.split('').map(num => parseInt(num));        
        let lstTrackingBank = lstOriginalBank.map(num => num);
        let lstTrackingBank2 = lstOriginalBank.map(num => num);
        let numSelectedNumIndex = 0;

        let numMax = 1;
        let numCurrMax = 0;

        let strBankForDebug = '';
        lstOriginalBank.forEach((num, idx) => {
            strBankForDebug += `${num} `.padStart(3, ' ');
        });

        // if (debug) console.log(`\nProcessing Bank:\t${strBank} `);
        if (debug) console.log(`\nProcessing Bank:         ${strBankForDebug}`);

        let strIndicesForDebug = '';
        lstOriginalBank.forEach((num, idx) => {
            strIndicesForDebug += `${idx} `.padStart(3, ' ');
        });
        if (debug) console.log(`\tIndices:         ${strIndicesForDebug}`);
        
        for(let numLoopCount = 0; numLoopCount < numMaxBatteries && lstSelectedIndices.length <= numMaxBatteries; numLoopCount++) {
            
            // if (numBattery > 0) {
            //     lstTrackingBank[numSelectedNumIndex] = 0;
            // }
            
            // if (debug) console.log(`\tOriginal Bank: ${lstOriginalBank}`);
            // if (debug) console.log(`\tTracking Bank: ${lstTrackingBank}`);       

            lstOriginalBank.forEach((num, idx) => {
                
                if(!lstSelectedIndices.includes(idx)) {
                    
                    // Not used, should it be selected?

                    // Look at the remaining numbers in the tracking bank.
                    lstOriginalBank.forEach((num2, idx2) => {
                        
                        if(!lstSelectedIndices.includes(idx2) && idx2 !== idx) {
                            if(num2 > num) {
                                if(lstOriginalBank.length - idx > numMaxBatteries - lstSelectedIndices.length) {
                                    // Can skip value @ idx
                                    if(debug) console.log(`\t\tIdx ${idx} (${num}) can be skipped for ${idx2} (${num2})`);
                                    break;
                                } else {
                                    // Must select value @ idx
                                    lstSelectedIndices.push(idx);
                                }
                            }                        
                        }
                        
                        
                    });
                            


                } else {
                    // Nothing, already used.
                }
            
            });
            
            
            // let num = lstOriginalBank[numLoopCount];

            

            //     if(num < lstTrackingBank[0] && lstOriginalBank.length - numLoopCount - 1 > numMaxBatteries - lstSelectedIndices.length) {
            //         // skip
            //     } else {
            //         lstSelectedIndices.push(numLoopCount);
            //     }

            
            
            if(numMax < 10) {
                numMax++;            
            }
            

            if(debug) {
                let strSelectedForDebug = '';

                lstOriginalBank.forEach((num, idx) => {
                    if(lstSelectedIndices.includes(idx)) {
                        strSelectedForDebug += `X`.padStart(3, ' ');
                    } else {
                        strSelectedForDebug += ` `.padStart(3, ' ');
                    }
                });

                if (debug) console.log(`\t${numLoopCount.toString().padStart(3, ' ')}. Selected:  ${strSelectedForDebug}; ${numMax + 1}; (${lstSelectedIndices.length})`);
            }
            
            
        }
        
        // Numeric order.
        lstSelectedIndices.sort((a, b) => a - b);

        if(debug) console.log(`\tSelected Indices: ${lstSelectedIndices}`);

        lstSelectedIndices.forEach(numIndex => {
            lstEnabledBatteries.push(lstOriginalBank[numIndex]);            
        });

        numTotalJolts += parseInt(lstEnabledBatteries.join(''));
        if (debug) console.log(`\tEnabled Batteries: ${lstEnabledBatteries}, Joined: ${lstEnabledBatteries.join()}, Jolts: ${numTotalJolts}\n`);        

    });
    */


    return numTotalJolts;

}

module.exports = {processData};