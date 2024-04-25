// search

function linearSearch(arr, el){
    for(let i = 0; i < arr.length; i++){
        if(arr[i] === el){
            return i
        }
    }

    return -1
}

function binarySearch(arr, el){
    let start = 0;
    let end = arr.length - 1;
    let middle;
    let found = false;

    while(start <= end && !found){
        middle = Math.floor((start + end) / 2);

        if(arr[middle] === el){
            found = true;
            return middle
        } else if(arr[middle] > el) {
            end = middle - 1
        } else {
            start = middle + 1
        }
    }

    return -1
}

function reqursiveBinarySearch(arr, el, start, end){
    if (start > end) {
        return false;
    }

    let middle =  Math.floor((start + end) / 2);

    if(el === arr[middle]){
        return middle
    } else if(el < arr[middle]){
       return reqursiveBinarySearch(arr, el, start, middle - 1)
    } else {
        return reqursiveBinarySearch(arr, el, middle + 1, end)
    }
}

//sort

function selectionSort(arr){
    for(let i = 0; i < arr.length; i++){
        let minIndex = i;
        for(let j = i + 1; j < arr.length; j++){
            if(arr[j] < arr[minIndex]){
                minIndex = j;
            }
        }
        let temp = arr[i];
        arr[i] = arr[minIndex];
        arr[minIndex] = temp;
    }

    return arr
}

function bubbleSort(arr){
    for(let i = arr.length - 1; i > 0; i--){
        for(let j = 0; j < i; j++){
            if(arr[j] > arr[j + 1]){
                let temp = arr[j]
                arr[j] = arr[j + 1]
                arr[j + 1] = temp
            }
            count++
        }
    }

    return arr
}

function quickSort(arr){
    if(arr.length === 1){
        return arr[0]
    }
    let pivotIndex = Math.floor(arr.length / 2)
    let pivot = arr[pivotIndex];
    let less = [];
    let greater = [];

    for(let i = 0; i < arr.length; i++){
        if(i === pivotIndex){
            continue
        }

        if(arr[i] > pivot){
            greater.push(arr[i])
        } else {
            less.push(arr[i])
        }
    }
    
    return [...quickSort(less), pivot, ...quickSort(greater)]
}


//tree

function sumOfTree(tree){
    let sum;
    tree.forEach(node => {
        sum += node.value;
        if(!tree.next){
            return node.value
        }
        sum += sumOfTree(tree.next)
    })
    return sum;
}


//graph

const graph = {};
graph.a = ['b', 'c']
graph.b = ['f']
graph.c = ['d', 'e']
graph.d = ['f']
graph.e = ['f']
graph.f = ['g']

function bfs(graph, start, end){
    let queue = [start]

    while(queue.length > 0){
        const node = queue.shift();

        if(!graph[node]){
            graph[node] = [];
        }

        if(graph[node].includes(end)){
            return 'yes'
        } else {
            queue = [...queue, ...graph[node]]
        }
    }

    return false
}

console.log(bfs(graph, 'a', 'f'))


const graph2 = {};
graph2.a = {b: 2, c: 1}
graph2.b = {f: 7}
graph2.c = {d: 5, e: 2}
graph2.d = {f: 2}
graph2.e = {f: 1}
graph2.f = {g: 1}
graph2.g = {}

function deikstraSearch(graph, start, end){
    const costs = {};
    const visited = [];
    let neighbors = {};

    Object.keys(graph).forEach((node) => {
        if(node !== start){
            let val = graph[start][node];
            costs[node] = val || 10000000
        }
    })

    let node = findNodeLowestCost(costs, visited);

    while(node){
        const cost = costs[node];
        neighbors = graph[node];
        Object.keys(neighbors).forEach(node => {
            let newCost = cost + neighbors[node];
            if(newCost < costs[node]){
                costs[node] = newCost
            }
        })
        visited.push(node)
        node = findNodeLowestCost(costs, visited);
    }

    function findNodeLowestCost(costs, visited){
        let lowestCost = 10000000;
        let lowestNode;

        Object.keys(costs).forEach(node => {
            let cost = costs[node];
            if(cost < lowestCost && !visited.includes(node)){
                lowestCost = cost;
                lowestNode = node;
            }
        })

        return lowestNode
    }

    return costs
}

console.log(deikstraSearch(graph2, 'a', 'f'))

//cache

function cache(fn){
    let cache = new Map();

    return function(n) {
        if(cache.has(n)){
            return cache.get(n)
        }

        const res = fn(n);
        cache.add(n, res);
        return res
    }
}

