const { createInterface } = require('readline');
const numbers = [];

createInterface({
    input: process.stdin,
    output: process.stdout
}).on('line', (line) => {
    numbers.push(Number(line.trim()));
}).on('close', () => {
    const [w1, h1, w2, h2] = numbers;

    function findMinimalTableSize(w1, h1, w2, h2) {
        let l = [];
        l.push(Math.max(w1, w2) * (h1 + h2));
        l.push(Math.max(w1, h2) * (h1 + w2));
        l.push(Math.max(h1, w2) * (w1 + h2));
        l.push(Math.max(h1, h2) * (w1 + w2));

        const minArea = Math.min(...l);

        if (minArea === l[0]) {
            return `${Math.max(w1, w2)} ${h1 + h2}`;
        } else if (minArea === l[1]) {
            return `${Math.max(w1, h2)} ${h1 + w2}`;
        } else if (minArea === l[2]) {
            return `${Math.max(h1, w2)} ${w1 + h2}`;
        } else {
            return `${Math.max(h1, h2)} ${w1 + w2}`;
        }
    }

    console.log(findMinimalTableSize(w1, h1, w2, h2));
});

function findMinimalTableSize(w1, h1, w2, h2) {
  let l = [];
  l.push(Math.max(w1, w2) * (h1 + h2));
  l.push(Math.max(w1, h2) * (h1 + w2));
  l.push(Math.max(h1, w2) * (w1 + h2));
  l.push(Math.max(h1, h2) * (w1 + w2));

  const minArea = Math.min(...l);

  if (minArea === l[0]) {
    return `${Math.max(w1, w2)} ${h1 + h2}`;
  } else if (minArea === l[1]) {
      return `${Math.max(w1, h2)} ${h1 + w2}`;
  } else if (minArea === l[2]) {
      return `${Math.max(h1, w2)} ${w1 + h2}`;
  } else {
      return `${Math.max(h1, h2)} ${w1 + w2}`;
  }
}

console.log(findMinimalTableSize(...[10, 2, 2, 10]))