const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let vertexesNum, edgesNum;
let graph = {};
let firstVert;

rl.on('line', line => {
  if (!vertexesNum) {
    [vertexesNum, edgesNum] = line.split(' ').map(Number);
  } else {
    const [v1, v2] = line.split(' ').map(Number);
    if (!graph[v1]) graph[v1] = [];
    if (!graph[v2]) graph[v2] = [];
    graph[v1].push(v2);
    graph[v2].push(v1);

    if(!firstVert){
        firstVert = v1
      }
  }
});

rl.on('close', () => {
  let visited = new Set();
  let result = [];

  function dfs(obj) {
    for(let key in obj){
        const val = obj[key]
        visited.add(val)

        if(typeof val === 'number'){
            result.push(val)
        }

        dfs(val)
    }
  }

  dfs(graph);
  result.sort((a, b) => a - b);
});