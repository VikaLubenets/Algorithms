const { createInterface } = require('readline');

const lines = [];
createInterface({
    input: process.stdin,
    output: process.stdout
}).on('line', (line) => {
    lines.push(line.toString().trim());
}).on('close', () => {
    

});