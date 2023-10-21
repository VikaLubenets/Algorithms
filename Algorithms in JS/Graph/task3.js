const a = {
    b: {
        c: {
            n:5
        }
    },

    g: {
        u: 0
    },

    w: 10
}

function dfs(obj){

    for(let key in obj){
        const val = obj[key]

        if(typeof val === 'number'){
            console.log(val)
        }

        dfs(val)
    }
}

dfs(a)