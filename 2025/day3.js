function processData(lstInputData) {

    let numTotalJolts = 0;
    
    
    lstInputData.forEach(strBank => {

        let lstOriginalBank = strBank.split('').map(num => parseInt(num));
        let lstFirstSort = lstOriginalBank.map(num => num);

        lstFirstSort.sort((a, b) => b - a);

        let firstNum = lstFirstSort[0];
        let firstNumIndex = lstOriginalBank.indexOf(firstNum);

        for(let x = 1; firstNumIndex === lstOriginalBank.length - 1; x++) {
        
            firstNum = lstFirstSort[x];
            firstNumIndex = lstOriginalBank.indexOf(firstNum);
        
        }

        let lstSecondSort = lstOriginalBank.slice(lstOriginalBank.indexOf(firstNum) + 1);


        lstSecondSort.sort((a, b) => b - a);

        let secondNum = lstSecondSort[0];
        let secondNumIndex = lstOriginalBank.indexOf(secondNum);

        console.log(`\tBank: ${lstOriginalBank}, First Sort: ${lstFirstSort}, Num: ${firstNum}, Second Sort: ${lstSecondSort}, Second Num: ${secondNum}`);

        numTotalJolts += parseInt(`${firstNum}${secondNum}`);
    });

    return numTotalJolts;

}

module.exports = {processData};