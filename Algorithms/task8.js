const { createInterface } = require('readline');

const lines = [];
createInterface({
    input: process.stdin,
    output: process.stdout
}).on('line', (line) => {
    lines.push(line.toString().trim());
}).on('close', () => {
    const dic = {
        '}': '{',
        ')': '(',
        ']': '['
    }

    const stack = [];
    const keys = Object.keys(dic);

    for (const el of lines[0]) {
        if (keys.includes(el)) {
            if (stack.length === 0 || stack[stack.length - 1] !== dic[el]) {
                console.log('no');
                return;
            } else {
                stack.pop();
            }
        } else {
            stack.push(el);
        }
    }

    if (stack.length === 0) {
        console.log('yes');
    } else {
        console.log('no');
    }
})