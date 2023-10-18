// Необходимо написать аналог Object.create с использованием __proto__

function objectCreate(prototype){
    return {__proto__: prototype};
}

console.log(Object.getPrototypeOf(objectCreate({a: 1})))