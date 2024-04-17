const { createInterface } = require('readline');
const numbers = [];

createInterface({
    input: process.stdin,
    output: process.stdout
}).on('line', (line) => {
    numbers.push(Number(line.trim()));
}).on('close', () => {
    const [a, b, c] = numbers;

    function solveTheEquation(a, b, c) {
        if (a === 0) {
            if (b === c ** 2) {
                console.log("MANY SOLUTIONS");
            } else {
                console.log("NO SOLUTION");
            }
        } else {
            const x = (c ** 2 - b) / a;

            console.log(Number.isInteger(x) ? x : "NO SOLUTION");
        }
    }

    solveTheEquation(a, b, c);
});