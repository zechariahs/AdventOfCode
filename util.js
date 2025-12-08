const fs = require('fs');
const readline = require('readline');

/**
 * 
 * Create an array with data from a file. One element
 * in the array for every line in the file.
 * 
 * @param {String} strFilename 
 * @returns {Array}
 */
function readData(strFilename) {

    return new Promise((resolve, reject) => {
    
        var lstInputData = [];
        
        const fileStream = fs.createReadStream(strFilename);
        
        const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
        });

        rl.on('line', (line) => {
            // console.log(`Line from file: ${line}`);
            lstInputData[lstInputData.length] = line;
        });

        rl.on('close', () => {
            // console.log('Finished reading the file.');
            resolve(lstInputData);

        });
    });
}

/**
 * Creates a multi-dimensional array based on the input.
 * 
 * @param {List} lstInputData 
 * @param {Number} intBlockSize
 * @returns {List} A multi-dimensional array
 */
function loadData(lstInputData, intBlockSize = 1) {
    
    var lstData = [[],[]]
    
    lstInputData.forEach((line, lineIndex) => {
        
        Array.from(line);
        
        
        var lstNumbers = parseLine(line);

        // console.log(`${lineIndex} = ${line}`);

        lstNumbers.forEach((parsedNumber, parsedNumberIndex) => {

            // console.log(`\t${parsedNumberIndex} = ${parsedNumber}`);

            if((parsedNumberIndex)%2 == 0) {
                lstData[0][lineIndex] = Number(parsedNumber);
            } else {
                lstData[1][lineIndex] = Number(parsedNumber);
            }

        })
        
        

    });

    // console.log(lstData);

    return lstData;
}

module.exports = {readData};