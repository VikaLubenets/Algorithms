const { createInterface } = require('readline');
const lines = [];

createInterface({
    input: process.stdin,
    output: process.stdout
}).on('line', (line) => {
  	const num = parseInt(line.trim());
    if (num === -2000000000) {
        processSequence();
        return;
    }
  	lines.push(num);
});

function processSequence() {
    let type = '';
    let isAscending = true;
    let isDescending = true;

    for (let i = 1; i < lines.length; i++) {
        if (lines[i] !== lines[i - 1]) {
            type = "RANDOM";
            break;
        }
    }

    for (let i = 1; i < lines.length; i++) {
        if (lines[i] < lines[i - 1]) {
            isAscending = false;
        }
        if (lines[i] > lines[i - 1]) {
            isDescending = false;
        }
        if(lines[i] === lines[i - 1]) {
          type = "CONSTANT";
        }
    }

    if (isAscending) {
        type = "ASCENDING";
    } else if (isDescending) {
        type = "DESCENDING";
    }

    console.log(type);
}