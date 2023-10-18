const readline = require('readline');

function countWords(s) {
    const word = "sheriff";
    const sheriffLetterCount = {};

    for (const letter of word) {
        sheriffLetterCount[letter] = (sheriffLetterCount[letter] || 0) + 1;
    }

    let minSheriffCount = Infinity;

    const sLetterCount = {};

    for (const letter of s) {
        sLetterCount[letter] = (sLetterCount[letter] || 0) + 1;
    }

    for (const letter of word) {
        const sheriffLetterCountInS = sLetterCount[letter] || 0;
        const sheriffLetterCountInWord = sheriffLetterCount[letter];
        if (sheriffLetterCountInWord) {
            minSheriffCount = Math.min(minSheriffCount, Math.floor(sheriffLetterCountInS / sheriffLetterCountInWord));
        }
    }

    return minSheriffCount;
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.on('line', (input) => {
    const result = countWords(input);
    console.log(result);
});
