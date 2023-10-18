// Необходимо сделать конкретному массиву метод toString, который возвращает первый элемент .. последний.

function addToString (arr) {
    if(arr.length === 0){
        return []
    } else if(arr.length === 1){
        return arr[0]
    } else {
        return [arr[0], arr[arr.length - 1]]
    }
}

Array.prototype.toString = function(){
    return this.join('..')
}

// 1..4
console.log(addToString([1, 2, 3, 4]).toString())

// 1
console.log(addToString([1]).toString())

//
console.log(addToString([]).toString())