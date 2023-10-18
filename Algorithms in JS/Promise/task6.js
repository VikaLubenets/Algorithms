//Необходимо написать функцию, которая идентична Promise.race.

Promise.rase = function(promisesArray) {
    return new Promise((resolve, reject) => {
      promisesArray.forEach((promise) => {
        Promise.resolve(promise)
          .then(resolve)
          .catch(reject);
      });
    });
  };