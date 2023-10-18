const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let n, m;
let noms = [];

rl.on('line', (line) => {
    if (!n) {
        [n, m] = line.split(' ').map(Number);
    } else {
        noms = line.split(' ').map(Number);
        const stolenNoms = [];

        noms.sort((a, b) => b - a);

        for (const denom of noms) {
            if (n >= denom) {
                const count = Math.min(2, Math.floor(n / denom));
                n -= count * denom;
                for (let i = 0; i < count; i++) {
                    stolenNoms.push(denom);
                }
            }
        }

        if (n === 0) {
            console.log(stolenNoms.length);
            console.log(stolenNoms.join(' '));
        } else {
            console.log(-1);
        }

        rl.close();
    }
});