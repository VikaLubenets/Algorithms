// Необходимо сделать класс денег у которого входным параметром является количество денег.
// Также создать класс для Доллара, Евро и рубля, которые наследуются от денег.
// В качестве параметра конструктор доллара они смогут также принимать не только число,
// но и экземпляр другого класса дочернего от денег - в таком случае, вторым параметром можно будет передать курс конвертации.
// Курс конвертации можно менять с помощью метода.
// Задание нужно сделать 2-мя способами: с помощью ES6 class и с помощью функций.

function Money(num) {
    this.money = num;
}

Money.prototype.get = function() {
    return this.money;
};

function Dollar(childMoney, conversionRate) {
    this.money = (childMoney ? childMoney.get() / conversionRate : 0);
    this.currency = childMoney;
    this.conversionRate = conversionRate;
}

Dollar.prototype = Object.create(Money.prototype);

Dollar.prototype.setMod = function(param) {
    this.conversionRate = param;
    return this;
};

Dollar.prototype.get = function() {
    if (this.currency && this.conversionRate) {
        return (this.currency.get() / this.conversionRate).toFixed(1);
    } else {
        return Money.prototype.get.call(this);
    }
};

function Rub() {}

Rub.prototype = Object.create(Money.prototype);

function Euro() {}

Euro.prototype = Object.create(Money.prototype);


const rub = new Rub(100);
console.log(rub.get()) // 100

const dollar = new Dollar(rub, 75);

console.log(dollar.get()) // 1.3
// Надо сделать так, чтобы метод setMod можно было "чейнить"

console.log(dollar.setMod(80).get())  // 1.25