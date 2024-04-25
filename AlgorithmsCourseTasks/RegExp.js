//class RegExp;

// literal - /.../

const exp = new RegExp('\\d+', 'i')

// виртуальная машина делегирует создает рег
// отдельному движку регулярных выражений

exp.test('6') // true
exp.text('a') // false

const exp2 = /[a-z]/i 
const exp3 = /\d+/i

// ## Необходимо написать регулярное выражение

// Которое при вызове test на строке будет давать false, если в строке есть символы отличные от латинских, цифр, подчеркивания и знака $.

const myRegExp = /^[\w$]+/i

// ```js
console.log(myRegExp.test('привет')); // false
// ```

