// Необходимо написать функцию, которая принимает объект Promise и некоторое количество миллисекунд 
// и возвращает новый Promise.
// Если переданный Promise не успевает зарезолвится до истечения этого времени,
// то результирующий Promise должен быть отклонён с ошибкой new Error('Timeout').

function timeout(promise, sec) {
    const timeoutPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
            reject(new Error('Timeout'));
        }, sec);
    });

    return Promise.race([promise, timeoutPromise]);
}

timeout(fetch('url'), 500).then(console.log, console.log);

