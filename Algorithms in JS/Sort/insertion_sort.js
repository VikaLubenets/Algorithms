
let count = 0;

function insertionSort(arr){

    for(let i = 1; i < arr.length; i++){
        for(let j = i - 1; j >= 0 && arr[j] > arr[j+1]; j--){
            let temp = arr[j]
            arr[j] = arr[j + 1]
            arr[j + 1] = temp
            count++
        }
    }


    return arr
}

const arr = [
    0, 3, 2, 5, 6, 8, 23, 9, 4, 2, 1, 2, 9, 6, 4, 1, 7, -1, -5, 23, 6, 2, 35, 6,
    3, 32, 9, 4, 2, 1, 2, 9, 6, 4, 1, 7, -1, -5, 23, 9, 4, 2, 1, 2, 9, 6, 4, 1, 7,
    -1, -5, 23,
  ];

console.log("length", arr.length);
console.log(insertionSort(arr)); // O(n*n)
console.log("count = ", count);