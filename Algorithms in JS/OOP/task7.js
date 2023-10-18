// Необходимо написать аналог Object.create с использованием Object.setPrototypeOf
function objectCreate(prototype){
    const obj = {};
    Object.setPrototypeOf(obj, prototype)
    return obj;
}

console.log(Object.getPrototypeOf(objectCreate({a: 1})))