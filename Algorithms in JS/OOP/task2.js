// Необходимо добавить все массивам в JavaScript метод filterMap, который принимает 2 функции: фильтр и map

// [9, 16]

Array.prototype.filterMap = function(filterFn, mapFn){
    let arr = [...this];

    return arr.reduce((acc, current) => {
        if (filterFn(current)) {
            acc.push(mapFn(current));
        }
        return acc;
    }, []);
}

console.log([1, 2, 3, 4].filterMap((el) => el > 2, (el) => el ** 2))