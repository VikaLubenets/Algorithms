async function asyncCats({ urls, fetcher, maximumRetryCount }) {
    const result = [];
    let index = 0;

    async function fetchUrl(url) {
        try {
            const response = await fetcher(url);
            result.push(url);
        } catch (error) {
            if (maximumRetryCount > 0) {
                maximumRetryCount--;
                await fetchUrl(url);
            }
        }
    }

    async function fetchAll(promises) {
        const results = [];
        let promisesCompleted = 0;

        return new Promise((resolve, reject) => {
            promises.forEach(async (promise, index) => {
                try {
                    const val = await promise;
                    results[index] = val;
                    promisesCompleted += 1;
                    if (promisesCompleted === promises.length) {
                        resolve(results);
                    }
                } catch (error) {
                    reject(error);
                }
            });
        });
    }

    async function fetchUrls() {
        while (index < urls.length) {
            const chunk = urls.slice(index, index + 10);
            index += chunk.length;

            const promises = chunk.map(url => fetchUrl(url));
            const nonEmptyPromises = promises.filter(promise => promise);
            await fetchAll(nonEmptyPromises);

            if (index < urls.length) {
                await new Promise(resolve => setTimeout(resolve, 100));
            }
        }
    }

    await fetchUrls();
    return result;
}

module.exports = asyncCats;
