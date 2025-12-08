const min = 0;
const max = 99;
const countValue = 0;
let count = 0;
let rows = 0;

function rotate(startingPosition, direction, steps, countAll=false) {

    let multiplier = direction === 'R' ? 1 : -1;

    let newPosition = (startingPosition + (steps * multiplier)) % 100;

    if(newPosition < startingPosition && newPosition > 0 && direction === 'R' && countAll) {
        // crossed 0
        count++;
    }   
    
    if (newPosition < 0) {
        newPosition += 100;
    }
    
    if(countAll) {
        
        let clicks = (startingPosition + steps);

        if(clicks > 100) {

            let spins = Math.floor(clicks / 100);
            
            // console.log(`\t\tClicks: ${clicks}, Spins: ${spins}`);

            if (spins >= 1) {
                count += spins - 1;
                
                
                
            }
        }
        
    }
    
    if (newPosition === countValue) {
        count++;
    }

    if (rows%1000 === 0 || (rows > 100 && rows < 200)) {
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