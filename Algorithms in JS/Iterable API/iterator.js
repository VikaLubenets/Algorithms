const a = {
    a: 1,
    b: 2,

    [Symbol.iterator]() {
        let cursor = 0;
        const keys = Object.keys(this)

        return {
            next: () => {
                const currentCursor = cursor;
                cursor++

                return {
                    value: this[keys[currentCursor]],
                    done: currentCursor >= keys.length
                }
            }
        }
    }
}

function Tree(value, left, right){
    return {
        value,
        left,
        right,

        [Symbol.iterator]() {

            let state = 0
            let cursor = undefined

            return {

                [Symbol.iterator](){
                    return this
                },

                next: () => {
                    if(state === 0){
                        state++

                        return {
                            value: this.value,
                            done: false
                        }
                    }

                    if(state === 1){
                        if(!this.left){
                            state++
                        } else {
                            cursor = cursor || this.left[Symbol.iterator]()
                            const result = cursor.next();

                            if(result.done){
                                cursor = null;
                                state++;
                            } else {
                                return result
                            }
                        }
                    }

                    if(state === 2){
                        if(!this.right){
                            state++
                        } else {
                            cursor = cursor || this.left[Symbol.iterator]()
                            return cursor.next();                      
                        }
                    }

                    return {value: undefined, done: true}
                }
            }
        }
    }
}
 
const tree = Tree(2, 
    Tree(1, Tree(4), Tree(5)),
    Tree(3, Tree(5), Tree(6))
);

//генератор это удобная фабрика создания конечных автоматов

function* generator(obj) {
    for(const key in obj){
        yield {
            value: obj[key],
            done: false
        }
    }
}

function Tree2(value, left, right){
    return{
        value,
        left, 
        right,

        *[Symbol.iterator](){
            yield this.value

            if(this.left){
                yield* this.left
            }

            if(this.right){
                yield* this.right
            }
        }
    }
}

function* intoIter(obj){
    if(!obj){
        return undefined
    }

    if(obj[Symbol.iterator] != null){
        yield* obj[Symbol.iterator]();
        return
    }

    if(typeof obj === 'object'){
        for(const key in obj){
            yield obj[key];
        }
        return
    }

    yield obj
}

class MyIterator{
    constructor(iter){
        this.iter = iter;
    }

    *[Symbol.iterator]() {
        yield* this.iter
    }

    filter(fn){
        const {iter} = this;

        const newIter = (function*() {
            for(let el of iter){
                if(fn(el)){
                    yield el;
                }
            }
        })();

        return new MyIterator(newIter);
    }

    map(fn) {
        const {iter} = this;

        const newIter = (function*() {
            for(let el of iter){
                yield fn(el);
            }
        })();

        return new MyIterator(newIter);
    }

    take(n){
        const {iter} = this;
        if(n <= 0){
            return
        }

        const newIter = (function*() {
            for(let el of iter){
                yield el;
                n--;
                if(n <= 0){
                    return
                }
            }
        })();

        return new MyIterator(newIter);
    }

    enumerate() {
        const {iter} = this;

        const newIter = (function*() {
            let i = 0;
            for(let el of iter){
                yield [i, el];
                i++;
            }
        })();

        return new MyIterator(newIter);
    }
}

const iter = new MyIterator([1,2,3,4])
console.log(iter.filter((el) => el > 2))

function* genRandom() {
    while(true){
        yield Math.random();
    }
}

