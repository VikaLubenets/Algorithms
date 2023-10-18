// Необходимо написать функцию возвращающую Promise, который зареджектится через заданное количество миллисекунд.
// Вторым аргументов функция принимает объект ошибки.

function rejectAfterSleep(sec, error){
    return new Promise(function (resolve, reject) {
        setTimeout(() => reject(error), sec)
    })
}

rejectAfterSleep(200, 'boom!').catch((err) => {
    console.log(err);
  });
