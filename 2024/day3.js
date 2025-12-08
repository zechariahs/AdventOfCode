const fs = require('fs');

/**
 * 
 * @param {*} strInput 
 */
function identifyMulCommands(strInput) {

    const regex = /(?:[^\w\s])?mul\(\s*-?\d+(\.\d+)?\s*,\s*-?\d+(\.\d+)?\s*\)/g;

    const matches = strInput.match(regex);
    // console.log(matches);
    return matches;
}

function performMultiplication(strCommand) {

    const regex = /-?\d+(\.\d+)?/g; 

    const matches = strCommand.match(regex);

    // console.log(`\t#performMultiplication(${strCommand}) => ${matches}`);

    return matches[0] * matches[1];



}

function identifyCommands(strInput) {

    const regex = /(?:[^\w\s])?(mul\(\s*-?\d+(\.\d+)?\s*,\s*-?\d+(\.\d+)?\s*\)|do\(\s*\)|don't\(\s*\))/g;

    const matches = strInput.match(regex);
    // console.log(matches);
    return matches;

}

/**
 * 
 * @param {Array} lstCommands 
 */
function identifyEnabledCommands(lstCommands) {

    lstEnabledCommands = [];

    var boolEnabled = true;

    lstCommands.forEach((command) => {

        // console.log(`\t#identifyEnabledCommands() -> ${command}`)

        if(command.includes("do()")) {
            boolEnabled = true;
        } else if(command.includes("don't()")) {
            boolEnabled = false;
        } else {
            
            if(boolEnabled) {
                lstEnabledCommands[lstEnabledCommands.length] = command;
            }
            
            
        }

    });

    return lstEnabledCommands;

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

async function calculate(strFilename, boolEnabledOnly) {

    var lstCommands = [];

    await readFromFile(strFilename).then((fileData) => {
        
        if(boolEnabledOnly) {
            
            const lstAllCommands = identifyCommands(fileData);
            lstCommands = identifyEnabledCommands(lstAllCommands);
        } else {
            lstCommands = identifyMulCommands(fileData);
        }
        
        
    });

    var nbrSum = 0;

    lstCommands.forEach(element => {
        
        nbrSum += performMultiplication(element);

    });

    return nbrSum;

}

module.exports = {calculate, identifyEnabledCommands, identifyCommands, identifyMulCommands, performMultiplication};