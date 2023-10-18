const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

let n, s;
let arrPrices = [];

rl.on('line', line => {
    if (!n && !s) {
        const [quantatyStr, moneyStr] = line.split(' ');
        n = parseInt(quantatyStr);
        s = parseInt(moneyStr);
    } else {
        const prices = line.split(' ').map(Number);
        arrPrices = [...arrPrices, ...prices];
    }
})

rl.on('close', () => {
    arrPrices.sort((a, b) => b - a);
    let maxPrice = 0;

    for (let i = 0; i < n; i++) {
        if (s >= arrPrices[i]) {
            maxPrice = arrPrices[i];
            break;
        }
    }

    console.log(maxPrice);
})