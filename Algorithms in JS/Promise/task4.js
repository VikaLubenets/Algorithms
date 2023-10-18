//Необходимо написать функцию, которая идентична Promise.all.

Promise.all = function(iter) {
    const results = [];
    const promises = Array.from(iter);

    if (promises.length === 0) {
        return Promise.resolve([]);
    }

    return new Promise((resolve, reject) => {
        let resolvedCount = 0;

        for (const promise of promises) {
            Promise.resolve(promise)
                .then(result => {
                    results.push(result);
                    resolvedCount++;

                    if (resolvedCount === promises.length) {
                        resolve(results);
                    }
                })
                .catch(error => {
                    reject(error);
                });
        }
    });
};