let range = {
    from: 1,
    to: 5
  };

  range[Symbol.iterator] = function(){
    return {
        current: this.from,
        end: this.to,

        next: () => {
            if(current <= end){
                return {value: this.current++, done: false}
            } else {
                return {value: undefined, done: true}
            }
        }
    }
  }

//Task 1a: objToIterator
// Написать функцию, которая принимает объект и возвращает итератор,
// который обходит объект по элементам. Генераторы использовать нельзя.

function objToIterator(obj){
    if(!obj){
        return undefined;
    }

    if(obj[Symbol.iterator] != null){
        return obj[Symbol.iterator]()
    }

    let state = 0;
    let keys = Object.keys(obj);

    return {
        next: () => {
            if(state < keys.length){
                return {value: obj[keys[state++]], done: false}
            } else {
                return {value: undefined, done: true}
            }
        },
        [Symbol.iterator]: function() { return this; }
    }
}


// [1, 2]
console.log(Array.from(objToIterator({a: 1, b: 2})));


//Task 1b: objToIterator 2
// Написать функцию, которая принимает объект и возвращает итератор,
// который обходит объект по элементам. Итератор должен создаваться с помощью генератора.

function* objToIterator2(obj){
    if(!obj){
        return undefined
    }

    if(obj[Symbol.iterator] != null){
        yield* obj[Symbol.iterator]();
        return
    }

    if(typeof obj === 'object'){
        for(const key in obj){
            yield obj[key];
        }
        return
    }

    yield obj
}

// // [2, 3]
console.log(Array.from(objToIterator2({a: 2, b: 3})));

// Task 2a: filter
// Написать функцию, которая принимает Iterable объект и функцию-фильтр и возвращает итератор,
// который обходит только те элементы, для которых фильтр вернул true. Генераторы использовать нельзя.

function filter(iter, fn){
    const iterator = iter[Symbol.iterator]();
    return {
        [Symbol.iterator]: function() {
            return {
                next: function() {
                    while (true) {
                        const { value, done } = iterator.next();
                        if (done) {
                            return { value: undefined, done: true };
                        }
                        if (fn(value)) {
                            return { value: value, done: false };
                        }
                    }
                }
            };
        }
    };
}

// [3, 4]
console.log(Array.from(filter(new Set([1, 2, 3, 4]), (el) => el > 2)));

// Task 2b: filter 2
// Написать функцию, которая принимает Iterable объект и функцию-фильтр и возвращает итератор,
// который обходит только те элементы, для которых фильтр вернул true. Итератор должен создаваться с помощью генератора.

function* filter2(iter, fn){
    for(let el of iter){
        if(fn(el)){
            yield el
        }
    }
}

// [3, 4]
console.log(Array.from(filter2(new Set([1, 2, 3, 4]), (el) => el > 2)));

// Task 3a: map
// Написать функцию, которая принимает Iterable объект и функцию отображения и возвращает итератор,
// который возвращает элементы, полученные с помощью функции отображения. Генераторы использовать нельзя.

function map(iter, fn){
    const iterator = iter[Symbol.iterator]();
    return {
        [Symbol.iterator]: function() {
            return {
                next(){
                    while(true){
                        const { value, done } = iterator.next();
                        if(done){
                            return {value: undefined, done: true}
                        } else {
                            return {value: fn(value), done: false}
                        }
                    }
                }
            }
        }
    }
}

// [2, 4, 6, 8]
console.log(Array.from(map(new Set([1, 2, 3, 4]), (el) => el * 2)));

// Task 3b: map 2
// Написать функцию, которая принимает Iterable объект и функцию отображения и возвращает итератор,
// который возвращает элементы, полученные с помощью функции отображения. Итератор должен создаваться с помощью генератора.

function* map2(iter, fn){
    for(let el of iter){
        yield fn(el)
    }
}

// [2, 4, 6, 8]
console.log(Array.from(map2(new Set([1, 2, 3, 4]), (el) => el * 2)));

// Task 4: on
// Написать функцию, которая принимает некоторый элемент и название события для прослушки и возвращает асинхронный итератор.
// Итератор будет возвращать новые элементы (объекты события) при срабатывании события.

function on(el, event) {
    return {
      [Symbol.asyncIterator]() {
        return {
          async next() {
            return new Promise((resolve) => {
              el.addEventListener(event, (e) => {
                resolve({ value: e, done: false });
              });
            });
          },
        };
      },
    };
  }

// (async () => {
//   for await (const e of on(document, 'click')) {
//     console.log(e);
//   }
// })();

// Task 5a:  enumerate
// Написать функцию, которая принимает Iterable объект и возвращает итератор,
// который возвращает пары вида [номер итерации, элемент.]. Генераторы использовать нельзя.

function enumerate(iter){
    let iterator = iter[Symbol.iterator]();
    let index = 0;
  
    return {
      [Symbol.iterator]() {
        return this;
      },
      next() {
        let { value, done } = iterator.next();
        if (done) {
          return { done: true };
        }
        let result = [index, value];
        index++;
        return { value: result, done: false };
      },
    };
}

// [[0, 1], [1, 2], [2, 3]]
console.log(Array.from(enumerate([1, 2, 3])));

// Task 5b: enumerate 2
// Написать функцию, которая принимает Iterable объект и возвращает итератор,
// который возвращает пары вида [номер итерации, элемент.]. Итератор должен создаваться с помощью генератора.

function* enumerate2(iter){
    if(!iter){
        return
    }

    let i = 0;
    for(const el of iter){
        yield [i++, el]
    }
}

// [[0, 1], [1, 2], [2, 3]]
console.log(Array.from(enumerate2([1, 2, 3])));

// Task 6a: take
// Написать функцию, которая принимает Iterable объект и максимальное количество итераций и возвращает итератор,
// который завершиться после достижения нужного количества итераций. Генераторы использовать нельзя.

function take(iter, n){
    return {
        [Symbol.iterator]() {
          const iterator = iter[Symbol.iterator]();
          let count = 0;
    
          return {
            next() {
              if (count >= n) {
                return { done: true };
              }
    
              const { value, done } = iterator.next();
    
              if (done) {
                return { done: true };
              }
    
              count++;
              return { value: value, done: false };
            },
          };
        },
      };
}


// [1, 2]
console.log(Array.from(take([1, 2, 3], 2)));

// Task 6b: take 2
// Написать функцию, которая принимает Iterable объект и максимальное количество итераций и возвращает итератор,
// который завершиться после достижения нужного количества итераций. Итератор должен создаваться с помощью генератора.

function* take2(iter, n){
    if(n <= 0){
        return 
    }

    for(const el of iter){
        if(n <= 0){
            return 
        }
        n--;
        yield el
    }
}

// [1, 2]
console.log(Array.from(take2([1, 2, 3], 2)));

// Task 7a: repeat
// Написать функцию, которая принимает Iterable объект и количество повторений и возвращает итератор,
// который продублирует все элементы из исходного заданное количество раз. Генераторы использовать нельзя.

function repeat(iter, n){
    return {
        [Symbol.iterator](){
            const iterator = iter[Symbol.iterator]();
            let count = 0;

            return {
                next(){
                    const {value, done} = iterator.next();

                    if(done){
                        return {value: undefined, done: true}
                    }
                    count++
                    return {value: value, done: false}
                }
            }
        }
    }
}

// [1, 2, 3, 1, 2, 3]
Array.from(repeat([1, 2, 3], 2));

// Task 7b: repeat 2
// Написать функцию, которая принимает Iterable объект и количество повторений и возвращает итератор,
// который продублирует все элементы из исходного заданное количество раз. Итератор должен создаваться с помощью генератора.

// [1, 2, 3, 1, 2, 3]
Array.from(repeat([1, 2, 3], 2));


// Task 8a: zip
// Написать функцию, которая принимает 2 и более Iterable объектов и возвращает итератор,
// который создаст кортежи из элементов исходных итераторов. Генераторы использовать нельзя.

// [[1, 2], [2, 3], [3, 4]]
Array.from(zip([1, 2, 3], [2, 3, 4]));

// Task 8b: zip 2
// Написать функцию, которая принимает 2 и более Iterable объектов и возвращает итератор,
// который создаст кортежи из элементов исходных итераторов. Итератор должен создаваться с помощью генератора.

// [[1, 2], [2, 3], [3, 4]]
Array.from(zip([1, 2, 3], [2, 3, 4]));

// Task 9a: flat и flatMap
// Нужно написать аналог flat и flatMap, но который возвращает итератор. Генераторы использовать нельзя.

// [1, 2, 2, 3, 3, 4]
Array.from(flat([[1, 2, 3], [2, 3, 4]]));

// Task 9b: flat и flatMap 2
// Нужно написать аналог flat и flatMap, но который возвращает итератор. Итератор должен создаваться с помощью генератора.

// [1, 2, 2, 3, 3, 4]
Array.from(flat([[1, 2, 3], [2, 3, 4]]));