const fs = require('fs');

/**
 * 
 * @param {*} strInput 
 */
function identifyMulCommands(strInput) {

    const regex = /(?:[^\w\s])?mul\(\s*-?\d+(\.\d+)?\s*,\s*-?\d+(\.\d+)?\s*\)/g;

    const matches = strInput.match(regex);
    console.log(matches);
    return matches;
}

function performMultiplication(strCommand) {

    const regex = /-?\d+(\.\d+)?/g;

    const matches = strCommand.match(regex);

    console.log(`\t#performMultiplication(${strCommand}) => ${matches}`);

    return matches[0] * matches[1];



}

function readFromFile (strFilename) {

    return new Promise((resolve, reject) => {
        
        fs.readFile(strFilename, 'utf8', (err, data) => {

            if(err) {
                console.log(`Error reading file ${strFilename}:`, err);
                reject(err);
            }

            resolve(data);
    
        });
    
    });
}

async function calculate(strFilename) {

    var lstCommands = [];

    await readFromFile(strFilename).then((fileData) => {
        lstCommands = identifyMulCommands(fileData);
    });

    var nbrSum = 0;

    lstCommands.forEach(element => {
        
        nbrSum += performMultiplication(element);

    });

    return nbrSum;

}

module.exports = {calculate, identifyMulCommands, performMultiplication};