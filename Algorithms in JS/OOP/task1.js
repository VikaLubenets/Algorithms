// Необходимо добавить все строкам в JavaScript метод capitalize, который делает первую букву в строке заглавной

String.prototype.capitalize = function() {
    let str = this;
    return str[0].toUpperCase() + str.slice(1)
};

console.log("foo".capitalize()) // Foo