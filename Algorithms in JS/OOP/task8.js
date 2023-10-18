// Необходимо написать аналог Object.create с использованием new function

function objectCreate(prototype) {
    function F() {} // Создаем пустую функцию
    F.prototype = prototype; // Устанавливаем прототип этой функции
    return new F(); // Возвращаем новый объект, созданный с помощью этой функции
}


console.log(Object.getPrototypeOf(objectCreate({a: 1})))