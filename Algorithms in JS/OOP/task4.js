// Необходимо создать функцию-конструктор, которая создает пользователя с заданным именем (имя и фамилия) и возрастом.
// А также, необходимо определить функции, sayName (возвращает полное имя) и has18 (true, если есть 18)

function User (name, surname, age) {
    this.name = name;
    this.surname = surname;
    this.age = age;
    this.sayName = () => {
        console.log(`${this.name} ${this.surname}`)
    }
    this.has18 = () => {
        if(this.age >= 18){
            console.log('true')
        } else {
            console.log('false')
        }
    }
}

const user = new User('Andrey', 'Kobets', 32);

user.has18() // true

user.sayName() // 'Andrey Kobets'