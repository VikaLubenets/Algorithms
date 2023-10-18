// Необходимо написать функцию возвращающую Promise, который зарезолвится через заданное количество миллисекунд

function sleep(sec){
    return new Promise(function(resolve, reject){
        setTimeout(() => {
            resolve()
        }, sec)
    })
}

sleep(200).then(() => {
    console.log('Я проснулся!');
  });