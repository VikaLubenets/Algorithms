let count = 0;

function shellSort(arr){
    let N = arr.length
    for(let gap = N / 2; gap > 0; gap /= 2){
        for(let i = gap; i < N; i++){
            for(let j = i; j > gap && arr[j - gap] > arr[j]; j -= gap){
                let temp = arr[j - gap]
                arr[j - gap] = arr[j]
                arr[j] = temp
                count++
            }
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
console.log(shellSort(arr)); // O(n*n)
console.log("count = ", count);