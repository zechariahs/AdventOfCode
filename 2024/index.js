const fs = require('fs');
const readline = require('readline');

function parseLine(strLine) {
    const regex = /\d+/g;
    const lstNumbers = strLine.match(regex);
    return lstNumbers ? lstNumbers.map(Number) : [];
}

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

function loadData(lstInputData) {
    
    var lstData = [[],[]]
    
    lstInputData.forEach((line, lineIndex) => {
        
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

function calculate(lstInputData) {

    var lstLHS = lstInputData[0];
    var lstRHS = lstInputData[1];

    lstLHS = Object.values(lstLHS);
    lstRHS = Object.values(lstRHS);

    lstLHS = lstLHS.sort((a, b) => a - b);
    lstRHS = lstRHS.sort((a, b) => a - b);

    var intSum = 0;

    lstLHS.forEach((element, index) => {

        intSum += Math.abs(element - lstRHS[index]);

    });

    return intSum;

}

function calculateSimilarityScore(lstInputData) {

    var lstLHS = lstInputData[0];
    var lstRHS = lstInputData[1];

    lstLHS = Object.values(lstLHS);
    lstRHS = Object.values(lstRHS);

    lstLHS = lstLHS.sort((a, b) => a - b);
    lstRHS = lstRHS.sort((a, b) => a - b);

    var intScore = 0;

    lstLHS.forEach((lhsElement, lhsIdx) => {

        var intCount = 0;

        lstRHS.forEach((rhsElement, rhsIdx) => {

            if(lhsElement == rhsElement) {
                intCount++;
            }

        });

        intScore += (lhsElement * intCount);

    });

    return intScore;

}

module.exports = {calculate, calculateSimilarityScore, loadData, parseLine, readData};