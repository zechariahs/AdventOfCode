const fs = require('fs');
const readline = require('readline');

const wordToNumber = {
    one: '1',
    two: '2',
    three: '3',
    four: '4',
    five: '5',
    six: '6',
    seven: '7',
    eight: '8',
    nine: '9'
};

function replace(text) {
    // Sort the keys
    const sortedKeys = Object.keys(wordToNumber).sort((a, b) => b.length - a.length);

    // Create a regex to match the keys (e.g., "one", "two")
    const regex = new RegExp(`(${sortedKeys.join('|')})`, 'gi');
    
    // console.log(regex);
    
    // Process the string iteratively
    let result = '';
    let i = 0;

    while (i < text.length) {
        
        let matched = false;

        // Try to match any word starting from the current index
        for (const word of sortedKeys) {
            if (text.slice(i, i + word.length).toLowerCase() === word) {
                result += wordToNumber[word]; // Add the corresponding number
                i += (word.length - 1); // Move the index forward by the length of the matched word
                matched = true;
                break; // Stop checking other words
            }
        }

        // If no match is found, append the current character and move forward
        if (!matched) {
        result += text[i];
        i++;
    }
  }

  return result;
}

function translate(inputArr) {
    
    let outputArr = [];
    
    inputArr.forEach((item, idx) => {
        
        const a = item;
        
        // console.log(`${a} ->`);
        
        const b = replace(item);

        // console.log(`${b}`);
        
        outputArr[outputArr.length] = b;
    });

    return outputArr;
}

function calculate(inputArr) {

    const matchFirst = /\d/;
    const matchLast = /\d(?!.*\d)/;

    let sum = 0;
    let outputArr = [];

    inputArr.forEach((item, idx) => {

        var replaced = replace(item);

        var first = replaced.match(matchFirst)[0];
        var last = replaced.match(matchLast)[0];
        var temp = `${first}${last}`;
        
        sum += Number(temp);
        
        // console.log(`${sum} = ${temp} <- ${replaced} <- ${item}`);

        outputArr[outputArr.length] = temp;

    });

    // outputArr.forEach((item, idx)=> {
    //     sum += Number(item);
    // });

    // console.log(`Sum is ${sum}`);

    return sum;
}

function getData() {
    return new Promise((resolve, reject) => {
        
        var inputData = [];

        const fileStream = fs.createReadStream('2023/day1_input.txt');
    
        const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
        });
    
        rl.on('line', (line) => {
            //console.log(`Line from file: ${line}`);
            inputData[inputData.length] = line;
        });
    
        rl.on('close', () => {
            // console.log('Finished reading the file.');
            resolve(inputData);
        });
    })
}

async function solve() {
    
    var sum = 0;
    
    await getData().then((inputData) => {
        // var temp = translate(inputData);
        sum = calculate(inputData);
    });

    console.log(sum);
    return sum;
}


module.exports = {calculate, replace, solve, translate};