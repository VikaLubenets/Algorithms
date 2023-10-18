const a = {
    a:1,
    b:2,
}

function objToIter(obj){

}

const aIter = objToIter(a);

for(let el = aIter.next(); !el.done; el = el.next()){
    console.log(el.value);
}