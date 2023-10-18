//  task 1

var arr = [];

var i = 0;

for (; i++ < 3;){
    ( function(j){
        arr.push(
            function(){
                return j + j;
            }
        )
    })(i);
}

console.log(arr[0]()); // 8 - 2
console.log(arr[1]()); // 8 - 4

// task 2

log({
    a: {
        l: {
            u: 8
        },
        b: 1
    },

    b: {
        k: 2,
        m: {
            n: 0,
        }
    },

    h: 10
});

// in depth (recurtion)
function log(obj){

    for( let key in obj){
        if(!obj.hasOwnProperty(key)){
            continue
        }

        const val = obj[key];

        if(typeof val === 'number'){
            console.log(val);
        } else {
            log(val)
        }
    }
}

//in depth (loop)
// function log(obj){

//     let stack = [intoIter(obj)];

//     while(stack.length > 0){

//         const iter = stack.pop();

//         for(let val of iter){    
//             if(typeof val === 'number'){
//                 console.log(val)
//             } else {
//                 stack.push(iter);
//                 stack.push(intoIter(val));
//                 break
//             }
//         }
//     }

//     function intoIter(obj){
//         return Object.values(obj).values()
//     }

// }

// in breadth (loop)
// function log(obj){

//     let queue = [obj];

//     while(queue.length > 0){

//         const obj = queue.shift();

//         for(let key in obj){
//             if(!obj.hasOwnProperty(key)){
//                 continue
//             }
    
//             const val = obj[key];
    
//             if(typeof val === 'number'){
//                 console.log(val)
//             } else {
//                 queue.push(val);
//             }
//         }
//     }

// }


//task 3

fetchWithRetry(() => Promise.reject('boom!'), {
    retry: (i) => {
        console.log(i);
        if( i < 5) {
            return i * 1000;
        }
        return false
    }
})

function fetchWithRetry(fetcher, opts){
    let count = 0;

    return function innerFetch() {
        return fetcher().catch((err) => {
            count++;
            if(!opts.retry){
                throw err
            } 

            const delay = opts.retry(count)

            switch(delay){
                case true: return innerFetch();
                case false: throw err;
                default: return new Promise((resolve) => {
                    setTimeout(() => resolve(innerFetch()), delay)
                   })
            }

        })
    }

}
