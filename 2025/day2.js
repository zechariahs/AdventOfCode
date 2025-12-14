


function processData(strInputData, strDelimiter=";") {

    let lstInvalids = [];
    let sum = 0;

    // Split input data into individual range strings
    let lstData = strInputData.split(strDelimiter).map(item => {
        let temp = item.trim();
        return temp;
    });

    // Process each range
    lstData.forEach(range  => {
        let lstBounds = range.split("-").map(num => parseInt(num, 10));
        // console.log(`Range: ${lstBounds[0]} to ${lstBounds[1]}`);

        for(let i = lstBounds[0]; i <= lstBounds[1]; i++) {
            
            let currVal = i.toString();
            
            if (currVal.length%2 == 0) {

                let midPoint = currVal.length/2;
                let leftHalf = currVal.slice(0, midPoint);
                let rightHalf = currVal.slice(midPoint);

                if (leftHalf === rightHalf) {
                    lstInvalids.push(i);
                }
            }
            else {
                // Do nothing - numbers with an odd length are valid.
            }


        }

    });

    lstInvalids.forEach(invalidNum => {
        sum += invalidNum
    });
    return sum;
    
}

module.exports = {processData };