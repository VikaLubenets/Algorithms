const { createInterface } = require('readline');
const numbers = [];

createInterface({
    input: process.stdin,
    output: process.stdout
}).on('line', (line) => {
    numbers.push(Number(line.trim()));
}).on('close', () => {
    const [K1, M, K2, P2, N2] = numbers;

    const calcFloorAndEntrance = () => {
      const appAmountPerFloor = Math.ceil(K1 / M);
      const entranceForK1 = Math.ceil(K1 / (M * P2));
      const floorInEntranceForK1 = Math.ceil(K1 / M) % P2 || P2;

      if (K1 > M * P2 || (K1 - 1) % M + 1 !== N2) {
          console.log("-1 -1");
      } else {
          console.log(`${entranceForK1} ${floorInEntranceForK1}`);
      }
  };

  calcFloorAndEntrance();
});