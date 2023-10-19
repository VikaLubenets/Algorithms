// Tsk 1: Необходимо написать функцию возвращающую Promise, который зарезолвится через заданное количество миллисекунд

function sleep(ms){
    return new Promise((resolve) => setTimeout(resolve, ms))
}

sleep(2000).then(() => {
    console.log('Я проснулся!');
  });

// Task 2: Необходимо написать функцию возвращающую Promise, который зареджектится через заданное количество миллисекунд.
// Вторым аргументов функция принимает объект ошибки.


function rejectAfterSleep(ms, err) {
    return new Promise((resolve, reject) => {
        setTimeout(() => reject(err), ms);
    });
}

rejectAfterSleep(2000, 'boom!').catch((err) => {
    console.log(err);
});


// Task 3: Необходимо написать функцию, которая принимает объект Promise и некоторое количество миллисекунд
// и возвращает новый Promise.
// Если переданный Promise не успевает зарезолвится до истечения этого времени,
// то результирующий Promise должен быть отклонён с ошибкой new Error('Timeout').

function timeout(obj, ms){
    const rejPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
            reject(new Error('Timeout!'))
        }, ms)
    })

    return Promise.race([obj, rejPromise])
}


timeout(sleep(1000), 100).then(console.log, console.log);

// Task 4: all
//Необходимо написать функцию, которая идентична Promise.all.

Promise.all = function(iter) {
    let results = [];
    let arr = Array.from(iter);

    return new Promise((resolve, reject) => {
        let count = 0;
        
        for(let el of arr){
            Promise.resolve(el).then((res) => {
                results[arr.indexOf(el)] = res;
                count++;
                if(count === arr.length){
                    resolve(results);
                }
            })
            .catch(err => {
                reject(err);
            });
        }
    });
};

Promise.all([
    new Promise(resolve => setTimeout(() => resolve(1), 3000)), // 1
    new Promise(resolve => setTimeout(() => resolve(2), 2000)), // 2
    new Promise(resolve => setTimeout(() => resolve(3), 1000))  // 3
  ]).then((res) => console.log(res));

//Task 5: allSettled
//Необходимо написать функцию, которая идентична Promise.allSettled.

Promise.allSettled = function(iter) {
    let results = [];
    let arr = Array.from(iter);

    return new Promise((resolve) => {
        let count = 0;
        
        for(let el of arr){
            Promise.resolve(el)
            .then((res) => {
                results[arr.indexOf(el)] = {value: res, status: 'fulfilled'};
            })
            .catch((err) => {
                results[arr.indexOf(el)] = {reason: err, status: 'rejected'};
            })
            .finally(() => {
                count++;
                if(count === arr.length){
                    resolve(results);
                }
            });
        }
    });
};

Promise.allSettled([
    new Promise(resolve => setTimeout(() => resolve(1), 3000)), // 1
    new Promise(resolve => setTimeout(() => resolve(2), 2000)), // 2
    new Promise((resolve, reject) => setTimeout(() => reject(3), 1000))  // 3
  ]).then((res) => console.log(res));

// Task 6: race
//Необходимо написать функцию, которая идентична Promise.race.

Promise.race = function(iter){
    const arr = Array.from(iter);

    return new Promise((res, rej) => {
        arr.forEach(el => {
            el.then((result) => res(result))
            .catch((error) => rej(error));
        });
    });
}

Promise.race([
    new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
    new Promise((resolve, reject) => setTimeout(() => reject(new Error("Ошибка!")), 2000)),
    new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
  ]).then(console.log);

//Task 7: once
//Необходимо написать функцию, которая бы добавлял обработчик события на заданный элемент и возвращала Promise.
// Promise должен зарезолвиться при срабатывании события. В качестве значения Promise должен возвращать объект события.

function once(el, event){
    return new Promise((resolve, reject) => {
        el.addEventListener(event, resolve)
    })
}

// once(document.body, 'click').then((e) => { console.log(e) });

// Task 8: promisify
// Необходимо написать функцию, которая бы принимала функцию ожидающую callback и возвращала новую функцию.
// Новая функция вместо callback должна возвращать Promise.
// Предполагается, что исходная функция принимает callback последним параметром, 
// т. е. если функция принимает другие аргументы,
// то они идут ДО callback. Сам callback первым параметром принимает объект ошибки или null,
// а вторым возвращаемое значение (если нет ошибки).

function promisify(fn) {
    return function(...args) {
        return new Promise((resolve, reject) => {
            fn(...args, (err, res) => {
                if(err){
                    reject(err)
                } else {
                    resolve(res)
                }
            })
        })
    }
}

function promisify2(f) {
    return function (...args) {
      return new Promise((resolve, reject) => {
        function callback(err, result) {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
  
        args.push(callback);
  
        f.call(this, ...args);
      });
    };
  };

// function openFile(file, cb) {
//     fs.readFile(file, cb);
//   }
  
//   const openFilePromise = promisify(openFile);
  
//   openFilePromise('foo.txt').then(
//     console.log,
//     console.error
//   );

// Task 9: allLimit
  // Необходимо написать статический метод для Promise, который бы работал как Promise.all,
  // но с возможностью задания лимита на выполнения "одновременных" задач.
  // В качестве первого параметра, метод должен принимать Iterable объект с функциями, которые возвращают Promise.
  // Сам метод также возвращает Promise.
  
  // Одновременно может быть не более 2-х запросов

function allLimit(iter, limit) {
    const promises = Array.from(iter);

    const groups = [];
    while (promises.length) {
        groups.push(promises.splice(0, limit));
    }

    const results = [];

    const allPromises = groups.map(group => Promise.all(group));

    return Promise.all(allPromises).then(resultArrays => {
        for (const resultArray of resultArrays) {
            results.push(...resultArray);
        }
        return results;
    });
}

  allLimit([
    fetch.bind(null, 'url1'),
    fetch.bind(null, 'url2'),
    fetch.bind(null, 'url3'),
    fetch.bind(null, 'url4')
  ], 2).then(([data1, data2, data3, data4]) => {
    console.log(data1, data2, data3, data4);
  });


  // Task 10:abortablePromise
  // Необходимо написать функцию, которая принимала бы некоторый Promise и экземпляр AbortController и 
  // возвращала бы новый.
  // Этот промис можно отменить с помощью использования переданного AbortController. При отмене промис режектится.
  
  var controller = new AbortController();

  function abortablePromise(promise, signal) {
      return new Promise((resolve, reject) => {

        signal.addEventListener('abort', () => {
            reject(new Error('Aborted'));
        });
          
        promise.then(resolve, reject);
      });
  }
  
  const myPromise = new Promise((resolve) => setTimeout(() => resolve('myPromise'), 2000));
  
  const abortable = abortablePromise(myPromise, controller.signal);

  abortable
    .then((result) => {
        console.log('Result:', result);
    })
    .catch((err) => {
        console.log('Aborted:', err.message);
    });

controller.abort();

  // Task 11:  nonNullable
  // Нужно написать функцию, которая принимает функцию и возвращает новую.
  // Новая функция в качестве результата возвращает Promise.
  // Если новой функции передать null в качестве аргументов, то промис должен быть зареджекчен.
  
  function nonNullable(fn) {
    return function(...args) {
        return new Promise((resolve, reject) => {
            for (arg of args) {
                if (!arg) {
                    reject('Arguments contain null');
                }
            }
            resolve(fn(...args));
        });
    };
}

  function sum(a, b) {
    return a + b;
  }
  
  function prod(a, b) {
    return a * b;
  }
  
  const sum2 = nonNullable(sum);
  const prod2 = nonNullable(prod);
  
  prod2(10, null).then(sum2).catch(console.error);


//   // Task 12: fetchWithRetry
//   // Необходимо написать обертку для fetch, с возможностью "перезапроса" в случае неудачи.
//   // Функция должна принимать параметр-функцию, которая получает какой по счету перезапрос и возвращать количество мс
//   // до следующего перезапроса или false. Если функция вернула false, то Promise запроса режектится с исходной ошибкой.
  
  fetchWithRetry('my-url', {
    retry: (i) => {
      if (i < 5) {
        return i * 1e3;
      }
  
      return false;
    }
  });

function fetchWithRetry(url, opts){
    let count = 0;

    return function innerFetch() {
        return fetch(url).catch((err) => {
            count++;
            if(!opts.retry){
                throw err
            } 

            const delay = opts.retry(count)

            switch(delay){
                case true: return innerFetch();
                case false: throw err;
                default: return new Promise((resolve) => {
                    setTimeout(() => resolve(innerFetch()), delay)
                   })
            }
        })
    }
}

function fetchWithRetry2(promiseFn, tries){
    return promiseFn().catch((err) => {
            if(tries <= 0){
                Promise.reject(err)
            }

            tries--;
            fetchWithRetry2(promiseFn, tries);
        })
}
  
//   // Task 13:syncPromise
//   // Необходимо написать функцию, которая по своему интерфейсу идентична конструктору Promise,
//   // но возвращала бы объект, в котором методы then, catch и finally выполнятся немедленно, 
//   // если промис уже зарезолвлен.
//   // Семaнтика работы методов в остальном должны быть идентична нативным промисам.

class SyncPromise{

    static resolve(val){
        if(val instanceof SyncPromise){
            return val;
        }

        return new SyncPromise((resolve) => {
            resolve(val);
        })
    }
    
    static reject(val){
        return new SyncPromise((resolve, reject) => {
            reject(val);
        })
    }

    static all(iter){
        const tasks = Array.from(iter);
        if(tasks.length === 0) {
            return SyncPromise.resolve([]);
        }

        return new SyncPromise((resolve, reject) => {
            const results = new Array(tasks.length);
            let done = 0;

            for(let i = 0; i < tasks.length; i++){
                tasks[i] = SyncPromise.resolve(tasks[i]);

                tasks[i]
                .then((res) => {
                    results[i] = res;
                    done++

                    if(done === tasks.length){
                        return resolve(results);
                    }
                })
                .catch(reject)
            }
        })
    }


    static allSettled(iter){
        const tasks = Array.from(iter);
        if(tasks.length === 0) {
            return SyncPromise.resolve([]);
        }

        return new SyncPromise((resolve, reject) => {
            const results = new Array(tasks.length);
            let done = 0;

            for(let i = 0; i < tasks.length; i++){
                tasks[i] = SyncPromise.resolve(tasks[i]);

                tasks[i]
                .then((res) => {
                    results[i] = {status: 'fulfilled', value: res};
                    done++

                    if(done === tasks.length){
                        return resolve(results);
                    }
                })
                .catch((reason) => {
                    results[i] = {status: 'rejected', value: reason};
                    done++

                    if(done === tasks.length){
                        return resolve(results);
                    }
                }
                )
            }
        })
    }

    static race(iter){

        const tasks = Array.from(iter);
        if(tasks.length === 0) {
            return SyncPromise.resolve([]);
        }

        return new SyncPromise((resolve, reject) => {
            for(let i = 0; i < tasks.length; i++){
                SyncPromise.resolve(tasks[i]).then(resolve, reject)
            }
        })
    }

    
    static any(iter){
        const tasks = Array.from(iter);
        if(tasks.length === 0) {
            return SyncPromise.resolve([]);
        }

        return new SyncPromise((resolve) => {
            for(let i = 0; i < tasks.length; i++){
                SyncPromise.resolve(tasks[i]).then(resolve)
            }
        })
    }

    constructor(fn){
        this.status = 'pending';
        this.value = undefined;
        this.reason = undefined;
        this.onFulfilled = [];
        this.onReject = [];

        const resolve = (value) => {
            if(this.status !== 'pending'){
                return;
            }

            if(value != null && typeof value.then === 'function'){
                value.then(resolve, reject);
                return;
            }
            this.status = 'fulfilled'
            this.value = value;

            for( const fn of this.onFulfilled){
                fn(this.value)
            }
        }
        const reject = (err) => {
            if(this.status !== 'pending'){
                return;
            }
            this.status = 'rejected';
            this.reason = err;

            for( const fn of this.onReject){
                fn(this.value)
            }

            queueMicrotask(() => {
                if(this.onReject.length === 0){
                    Promise.reject(this.reason);
                }
            })
        }
        try{
            fn(resolve, reject);
        } catch(err) {
            reject(err)
        }
    }

    then(onFulfilled, onReject){
        return new SyncPromise((resolve, reject) => {
            const wrappedResolve = () => {
                try{
                    resolve(onFulfilled ? onFulfilled(this.value) : this.value);
                } catch (err) {
                    reject(err);
                }
            }

            const wrappedReject = () => {
                if(onReject){
                    try{
                        resolve(onReject(this.reason))
                    } catch(err){
                        reject(err);
                    }
                } else {
                    reject(this.reason);
                }
            }

            if(this.status === 'fulfilled'){
                wrappedResolve();
                return;
            }

            if(this.status === 'rejected'){
                wrappedReject();
                return
            }

            this.onFulfilled.push(wrappedResolve)
            this.onReject.push(wrappedReject)
        })
    }

    catch(onReject){
        return new SyncPromise((resolve, reject) => {
            const wrappedReject = () => {
                if(onReject){
                    try{
                        resolve(onReject(this.reason))
                    } catch(err){
                        reject(err);
                    }
                } else {
                    reject(this.reason);
                }
            }

            if(this.status === 'fulfilled'){
                resolve(this.value)
            }

            if(this.status === 'rejected'){
                wrappedReject();
                return
            }

            this.onFulfilled.push(resolve);
            this.onReject.push(wrappedReject)
        })
    }

    finally(cb){
        return new SyncPromise((resolve, reject) => {
            const wrappedResolve = () => {
                try{
                    let res = cb();
                    if(typeof res.then === 'function'){
                        res = res.then(() => this.value);
                    } else {
                        res = this.value
                    }
                    resolve(res)
                } catch(err) {
                    reject(err);
                }
            }

            const wrappedReject = () => {
                try{
                    let res = cb();
                    if(typeof res.then === 'function'){
                        res = res.then(() => {
                            throw this.reason
                        });
                        resolve(res);
                    } else {
                        reject(this.reason);
                    }
                } catch(err) {
                    reject(err);
                }
            }

            if(this.status === 'fulfilled'){
                wrappedResolve();
                return;
            }

            if(this.status === 'rejected'){
                wrappedReject();
                return
            }

            this.onFulfilled.push(wrappedResolve)
            this.onReject.push(wrappedReject)
        })
    }
}

// Порядок в консоли: 1 2
const promise = new SyncPromise((resolve) => resolve(1)).then(console.log);
console.log(2);