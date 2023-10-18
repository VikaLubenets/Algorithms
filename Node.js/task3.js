const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let n;
let JoeN, WinN;

rl.on('line', (line) => {
    if (!n) {
        n = parseInt(line);
    } else if (!JoeN) {
        JoeN = line.split(' ').map(Number);
    } else {
        WinN = line.split(' ').map(Number);

        let firstMismatchIndex = -1;
        let lastMismatchIndex = -1;

        for (let i = 0; i < n; i++) {
            if (JoeN[i] !== WinN[i]) {
                if (firstMismatchIndex === -1) {
                    firstMismatchIndex = i;
                }
                lastMismatchIndex = i;
            }
        }

        if (firstMismatchIndex === -1) {
            process.stdout.write("YES");
        } else {
            const subarray = JoeN.slice(firstMismatchIndex, lastMismatchIndex + 1);
            subarray.sort((x, y) => x - y);

            let isPossible = true;
            for (let i = firstMismatchIndex; i <= lastMismatchIndex; i++) {
                if (subarray[i - firstMismatchIndex] !== WinN[i]) {
                    isPossible = false;
                    break;
                }
            }

            if (isPossible) {
                process.stdout.write("YES");
            } else {
                process.stdout.write("NO");
            }
        }

        rl.close();
    }
});