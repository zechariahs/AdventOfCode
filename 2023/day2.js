var games = [];
var gameTemplate = {
    number: null,
    draws: {},
};

var drawTemplate = {
    blue: null,
    green: null,
    red: null
}

function getData() {
    return new Promise((resolve, reject) => {
        
        var inputData = [];

        const fileStream = fs.createReadStream('2023/day2_input.txt');
    
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

function serializeData(inputData) {

    const colors = [
        'blue',
        'red',
        'green'
    ];

    //const regex = /\b\d+\s*(red|blue|green|yellow|black|white|orange|purple|pink|brown)\b/gi;
    const regex = new RegExp(`(${sortedKeys.join('|')})`, 'gi');
    
    inputData.forEach(element => {
        
        var newGame = gameTemplate;
        var strElement = String(element);

        var firstColon = strElement.indexOf(":");
        var gameInfo = strElement.substring(0, firstColon);

        var startPos = firstColon;
        
        for(i = startPos; i > 0; i = strElement.indexOf(';', i)) {

            var strDraw = strElement.substring(startPos, i);



        }

    });

}

async function solve() {

    await getData().then(sourceData => {

    });

}
