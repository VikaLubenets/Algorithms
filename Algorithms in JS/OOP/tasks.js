//Task 1 string.capitalize
// Необходимо добавить все строкам в JavaScript метод capitalize, который делает первую букву в строке заглавной

String.prototype.capitalize = function() {
    return this[0].toUpperCase() + this.slice(1)
}

console.log("foo".capitalize()) // Foo

//Task 2 array.filterMap
// Необходимо добавить все массивам в JavaScript метод filterMap, который принимает 2 функции: фильтр и map

Array.prototype.filterMap = function(fnFilter, fnMap){
    let arr = [...this]
    
    return arr.reduce((acc, current) => {
        if (fnFilter(current)) {
            acc.push(fnMap(current));
        }
        return acc;
    }, []);
}

// [9, 16]
console.log([1, 2, 3, 4].filterMap((el) => el > 2, (el) => el ** 2))

//Task 3 Кастомный toString
// Необходимо сделать конкретному массиву метод toString, который возвращает первый элемент .. последний.

// // 1..4
addToString([1, 2, 3, 4]).toString()

// // 1
addToString([1]).toString()

// //
addToString([]).toString()

//Task 4 User
// Необходимо создать функцию-конструктор, которая создает пользователя с заданным именем (имя и фамилия) и возрастом.
// А также, необходимо определить функции, sayName (возвращает полное имя) и has18 (true, если есть 18)

// const user = new User('Andrey', 'Kobets', 32);

// user.has18() // true

// user.sayName() // 'Andrey Kobets'

//Task 5 User #2
// Необходимо создать функцию-конструктор, которая создает пользователя с заданным именем (имя и фамилия) и возрастом.
// А также, необходимо определить функции, sayName (возвращает полное имя) и has18 (true, если есть 18)

// const user = new User({
//   fname: 'Andrey',
//   lname: 'Kobets',
//   age: 32
// });

// user.has18() // true

// user.sayName() // 'Andrey Kobets'

//Task 6 Object.create
// Необходимо написать аналог Object.create с использованием __proto__

// objectCreate({a: 1})

//Task 7 Object.create #2
// Необходимо написать аналог Object.create с использованием Object.setPrototypeOf

// objectCreate({a: 1})

//Task 8 Object.create #3
// Необходимо написать аналог Object.create с использованием new function

// objectCreate({a: 1})

//Task 9 Наследование
// Необходимо сделать класс денег у которого входным параметром является количество денег.
// Также создать класс для Доллара, Евро и рубля, которые наследуются от денег.
// В качестве параметра конструктор доллара они смогут также принимать не только число,
// но и экземпляр другого класса дочернего от денег - в таком случае, вторым параметром можно будет передать курс конвертации.
// Курс конвертации можно менять с помощью метода.
// Задание нужно сделать 2-мя способами: с помощью ES6 class и с помощью функций.

// const rub = new Rub(100);

// rub.get(); // 100

// const dollar = new Dollar(rub, 75);

// dollar.get() // 1.3

// Надо сделать так, чтобы метод setMod можно было "чейнить"
// dollar.setMod(80).get() // 1.2

//Task 10 Класс для хранения данных вида "ключ-значение" в локальном хранилище
// Необходимо написать класс KVStorage, который бы реализовывал базовый CRUD API для работы с локальным хранилищем.
// Первым параметром конструктор класса должен получать "движок" или "стратегию", где именно хранить данные.
// Движки следует хранить как статические свойства класса. Методы класса должны возвращать Promise.
// Следует реализовать 2 движка: localStorage и IndexedDB.

// const storage = new KVStorage(KVStorage.localStorage);

// storage.set('foo', {bla: 1}).then(async () => {
//   console.log(await storage.get('foo'));
// });

//Task 11 Использование паттерна "builder" для эффективной записи в локальное хранилище
// С помощью специальных статических методов наполняем внутренний буффер,
// а затем сразу все инициализируем (вызов create)

// const storage = KVStorage
//   .storage(KVStorage.localStorage)
//   .set('foo', {bla: 1})
//   .set('bar', {bar: 2})
//   .create();


//Task 12 Класс EventEmitter c поддержкой "всплытия" и "погружения"
// Необходимо написать класс EventEmitter с методами on/off/emit,
// который поддерживает механизм погружения и всплытия событий подобно нативному EventTarget.
// Методы должн on возвращать ссылку, которую можно передать в off, для удаляения обработчика.
// Допускается также удалять обработчики по имени события.

// const parent = new EventEmitter();
// const ev = new EventEmitter(parent);

// ev.emit('foo', {bla});

// parent.on.capture('foo', (e) => {
//   console.log(1);
// });

// ev.on.capture('foo', (e) => {
//   console.log(2);
// });

// ev.on('foo', (e) => {
//   console.log(3);
// });

// parent.on('foo', (e) => {
//   console.log(4);
// });