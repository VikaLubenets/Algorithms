const { createInterface } = require('readline');

const lines = [];
createInterface({
    input: process.stdin,
    output: process.stdout
}).on('line', (line) => {
    lines.push(line.toString().trim());
}).on('close', () => {

    const dic = {};

    for(let line of lines){
        for(let char of line){
            if(!dic[char]) dic[char] = 0;
            dic[char]++;
        }
    }

    const sortedCharMap = Object.keys(dic).sort();

    let maxCount = 0;
    for (const char of sortedCharMap) {
        maxCount = Math.max(maxCount, dic[char]);
    }

    for (let i = maxCount; i > 0; i--) {
        let row = '';
        for (const char of sortedCharMap) {
            const count = dic[char];
            if (count >= i) {
                row += '# ';
            } else {
                row += '  ';
            }
        }
        console.log(row);
    }

    let lastRow = '';
    for (const char of sortedCharMap) {
        lastRow += char + ' ';
    }
    console.log(lastRow);
});