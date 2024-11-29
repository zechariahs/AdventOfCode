const fs = require('fs');
const readline = require('readline');
const day1Input = [];

function calculate(inputArr) {

    const matchFirst = /\d/;
    const matchLast = /\d(?!.*\d)/;
    
    let sum = 0;
    let outputArr = [];

    inputArr.forEach((item, idx) => {

        
        var first = item.match(matchFirst)[0];
        var last = item.match(matchLast)[0];
        var temp = `${first}${last}`;
        
        // console.log(`${item} -> ${temp}`);

        outputArr[outputArr.length] = temp;

    });

    outputArr.forEach((item, idx)=> {
        sum += Number(item);
    });

    // console.log(`Sum is ${sum}`);

    return sum;

}

function solve() {
    return new Promise((resolve, reject) => {
        var result = 0;
        
        const fileStream = fs.createReadStream('2023/day1_input.txt');
    
        const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
        });
    
        rl.on('line', (line) => {
            //console.log(`Line from file: ${line}`);
            day1Input[day1Input.length] = line;
        });
    
        rl.on('close', () => {
            // console.log('Finished reading the file.');
            resolve(calculate(day1Input));

        });
    })
}


module.exports = {calculate, solve};