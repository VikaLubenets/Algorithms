// 1. Multiply by 2
// 2. Remove negative numbers
// 3. Sum positive numbers
const input = [1, -4, 12, -3, 29, -150];

input.map(el => el * 2)
     .filter(el => el > 0)
     .sort((a, b) => a - b)
     .reduce(((acc, el) => acc + el), 0)