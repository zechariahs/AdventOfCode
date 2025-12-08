const fs = require('fs');

var lastData = [[], []];

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

function solveForFile(strFilename) {
    readFromFile(strFilename).then(solveForData(data));
}

function solveForData(lstData) {

}