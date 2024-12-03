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

module.exports = {readData};