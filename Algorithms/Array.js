//linear search

function linearSearch(arr, target){
    let index = -1;

    for(let i = 0; i <arr.length; i++){
        if(arr[i] === target){
            index = i;
            return index
        }
    }

    return index
}

let arrTest1 = [1, 8, 10, 34, 4, 9]
console.log(linearSearch(arrTest1, 9))

// binary search

function binarySearch(arr, target, start, end){
    let count = 0;

    while (start <= end) {
        const middle = Math.floor((start + end) / 2);
        count += 1;

        if (arr[middle] === target) {
            console.log('binary search count: ', count)
            return middle;
        } else if (arr[middle] > target) {
            end = middle - 1;
        } else {
            start = middle + 1;
        }
    }
    return -1;
}

let arrTest2 = [1, 2, 3, 4, 5, 7, 9, 11]
console.log(binarySearch(arrTest2, 9, 0, arrTest2.length - 1))