const { createInterface } = require('readline');
const numbers = [];

createInterface({
    input: process.stdin,
    output: process.stdout
}).on('line', (line) => {
    numbers.push(line.toString().trim());
}).on('close', () => {
    const addNum = numbers[0];
    const existNums = [numbers[1], numbers[2], numbers[3]];

    function formatNumber(num) {
        let formattedNum = num.replace(/[-()]/g, '').replace('+7', '8');
        if (formattedNum.length === 7 && formattedNum.slice(0, 4) !== '8495') {
            formattedNum = '8495' + formattedNum;
        } else if (formattedNum.length === 8) {
            formattedNum = formattedNum.replace('8', '8495');
        }
        return formattedNum;
    }

    function hasNumber(num) {
        const formattedNum = formatNumber(num);
        existNums.forEach(existingNum => {
            const formattedExistingNum = formatNumber(existingNum);
            const result = formattedNum === formattedExistingNum ? 'YES' : 'NO';
            console.log(result);
        });
    }

    hasNumber(addNum);
});
