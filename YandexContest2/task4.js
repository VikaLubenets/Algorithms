// module.exports = 
function change (text, changeLang) {
        const buffer = [];
        let result = '';
        let currentLang = false;
        let tempBuffer = '';
        let firstB = true;
        let firstL = true;
        let firstV = true;
      
        try {
          for (let i = 0; i < text.length; i++) {
            let char = text[i];
      
            if (char === '[') {
              const closeBracketIndex = text.indexOf(']', i);
              if (closeBracketIndex !== -1) {
                const command = text.slice(i + 1, closeBracketIndex);
                i = closeBracketIndex;
      
                if (command === 'l' && firstL) {
                  currentLang = !currentLang;
                  firstL = false;
                } else if (command === 'v' && firstV) {
                  result += buffer.join('');
                  buffer.length = 0;
                  firstV = false;
                } else if (command === 'b' && firstB) {
                  if (buffer.length > 0) {
                    buffer.pop();
                  } else if (result.length > 0) {
                    result = result.slice(0, -1);
                  }
                  firstB = false;
                }
      
                buffer.push(...new Set(tempBuffer));
                tempBuffer = '';
              }
            } else if (char === '_') {
              continue;
            } else {
              if (currentLang) {
                  char = changeLang(char);
              }
              tempBuffer += char;
            }
          }
      
          if (tempBuffer.length > 0) {
            buffer.push(...new Set(tempBuffer));
          }
      
          if (buffer.length > 0) {
            result += buffer.join('');
          }
      
          return result;
        } catch (error) {
          console.log('Произошла ошибка:', error.message);
        }
      }
  
function changeLang(char) {
    const langMap = {
      // Английский на Русский
      'a': 'ф',
      'b': 'и',
      'c': 'с',
      // и так далее...
  
      // Русский на Английский
      'ф': 'a',
      'и': 'b',
      'с': 'c',
      // и так далее...
    };
  
    // Проверяем, в каком языке символ и возвращаем его аналог
    if (/[a-zA-Z]/.test(char)) {
      return langMap[char.toLowerCase()] || char;
    } else if (/[а-яА-Я]/.test(char)) {
      for (const key in langMap) {
        if (langMap[key] === char.toLowerCase()) {
          return key;
        }
      }
    }
  
    // Если символ не найден в словаре, возвращаем его как есть
    return char;
  }
  
  console.log(change("[_][v][v]погладь котапогладь кота", changeLang));

//   function hasDuplicateWords(str) {
//     const words = str.split(' ');
//     const wordCount = {};
  
//     for (const word of words) {
//       // Приводим слово к нижнему регистру перед проверкой
//       const lowercaseWord = word.toLowerCase();
//       if (wordCount[lowercaseWord]) {
//         return true; // Есть повторяющееся слово
//       }
//       wordCount[lowercaseWord] = true;
//     }
  
//     return false; // Нет повторяющихся слов
//   }
  
//   const str1 = "погладь котапогладь кота";
//   const str2 = "это пример текста с повторяющимися словами это";
  
//   console.log(hasDuplicateWords(str1)); // true
//   console.log(hasDuplicateWords(str2)); // true