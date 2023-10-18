let count = 0;

function selectionSort(arr){
    for(let i = 0; i < arr.length; i++){
        let min = i;

        for(let j = i+1; j < arr.length; j++){
            if(arr[min] > arr[j]) {
                min = j
            }
            count++
        }

        let temp = arr[i]
        arr[i] = arr[min]
        arr[min] = temp
    }

    return arr
}

const arr = [
    0, 3, 2, 5, 6, 8, 23, 9, 4, 2, 1, 2, 9, 6, 4, 1, 7, -1, -5, 23, 6, 2, 35, 6,
    3, 32, 9, 4, 2, 1, 2, 9, 6, 4, 1, 7, -1, -5, 23, 9, 4, 2, 1, 2, 9, 6, 4, 1, 7,
    -1, -5, 23,
  ];

console.log("length", arr.length);
console.log(selectionSort(arr)); // O(n*n)
console.log("count = ", count);