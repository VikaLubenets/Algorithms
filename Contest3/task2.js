// B. Починить ответ
// Ограничение времени	2 секунды
// Ограничение памяти	64.0 Мб
// Ввод	стандартный ввод или input.js
// Вывод	стандартный вывод или output.txt
// Необходимо написать функцию, которая вернет целую (корректную) строку с сервера. Однако сервер может вернуть фрагмент строки с дефектами.

// Для запроса к серверу следует использовать fetch, URL сервера доступен из константы API_URL. Сервер отвечает в формате JSON, имеющем следующую структуру:

// {
//     "data": "some_string"
// }
// Необходимо использовать fetch, чтобы с минимальным количеством запросов получить полную строку.

// Ваша функция должна вернуть строку, состоящую только из допустимых символов: ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789

// Пример:

// function solution() {
//     fetch(API_URL).json(); // "a**",
//     fetch(API_URL).json(); // "*b*",
//     fetch(API_URL).json(); // "**c",

//     return "abc";
// }

// module.exports = solution;




async function solution() {
  let fullString = '';

  while (true) {
      const response = await fetch(API_URL);
      const jsonResponse = await response.json();

      const cleanedString = jsonResponse.data.replace(/[^a-zA-Z0-9]/g, '');

      fullString += cleanedString;

      if (!/[^\w]/.test(jsonResponse.data)) {
          break;
      }
  }

  return fullString;
}

module.exports = solution;