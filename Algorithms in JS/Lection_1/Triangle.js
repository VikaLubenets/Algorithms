const { createInterface } = require('readline');
const lines = [];

createInterface({
  input: process.stdin,
  output: process.stdout
}).on('line', (line) => {
  lines.push(line.toString().trim().split(' ').map(Number));
}).on('close', () => {
  const numbers = [...lines[0], ...lines[1], ...lines[2]];

  function isTrianglePossible(arr) {
    const [a, b, c] = arr;

    if (a + b > c && a + c > b && b + c > a) {
      return 'YES';
    } else {
      return 'NO';
    }
  }

  console.log(isTrianglePossible(numbers));
});