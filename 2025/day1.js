const min = 0;
const max = 99;
const countValue = 0;
let count = 0;
let rows = 0;

function rotate(startingPosition, direction, steps, countAll=false) {

    let writeLog = (1 === 2) &&(rows%1000 === 0 || (rows > 99 && rows < 201));
    
    let multiplier = direction === 'R' ? 1 : -1;
    let clicks = steps * multiplier;
    let newPosition = (startingPosition + clicks) % 100;

    if (newPosition < 0) {
        newPosition += 100;
    }    
    
    
    if(countAll) {
        let fullSpins = Math.floor(steps / 100);
        let partialSpins = steps % 100;

        if(writeLog) {
            console.log(`\n\t\t\tClicks: ${clicks}, Spins: ${fullSpins}`);
        }
        
        if (fullSpins >= 1) {
            count += fullSpins ;
        } 
        if(partialSpins > 0 && newPosition !== countValue) {
            // No full spins, check partial
            if(direction === 'R' && startingPosition !== countValue &&newPosition < startingPosition) {
                count++;
            } else if(direction === 'L' && startingPosition !== countValue && newPosition > startingPosition) {
                count++;
            }
        }
    }
    
    
    
    if (newPosition === countValue) {
        // Landed on zero.
        count++;
    }
    


    if (writeLog) {
        console.log(`\t\t${rows}. ${startingPosition} --> ${direction}${steps} --> ${newPosition} (Count: ${count})`);
    }      

    return newPosition;

}

function processData(lstInputData, intInitialPosition, countAll=false) {
    
    let currentPosition = intInitialPosition;
    count = 0;
    rows = 0;
    
    lstInputData.forEach(instruction => {
        let direction = instruction.charAt(0);
        let steps = parseInt(instruction.slice(1), 10);
        currentPosition = rotate(currentPosition, direction, steps, countAll);
        rows++;        

        // console.log(`Current Position: ${currentPosition}, Count: ${count}`);


    });
    return count;
}

module.exports = { rotate, processData };