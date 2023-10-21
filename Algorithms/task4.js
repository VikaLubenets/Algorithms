const { createInterface } = require('readline');

const lines = [];
createInterface({
    input: process.stdin,
    output: process.stdout
}).on('line', (line) => {
    lines.push(line.toString().trim().split(' '));
}).on('close', () => {

    const graph = {};
    const [verticesNum, edgesNum] = lines[0].map(Number);
    const vertexes = [];
    const inDegree = {};

    for (const line of lines.slice(1)) {
        const [v1, v2] = line;
        if (!graph[v1]) graph[v1] = [];
        if (!graph[v2]) graph[v2] = [];
        graph[v1].push(v2);
        if (!inDegree[v2]) inDegree[v2] = 0;
        inDegree[v2]++;
    }

    function dfs(node) {
        vertexes.push(node);
        delete graph[node];
        for (let key in graph) {
            const index = graph[key].indexOf(node);
            if (index > -1) {
                graph[key].splice(index, 1);
                inDegree[node]--;
                if (inDegree[node] === 0) {
                    dfs(key);
                }
            }
        }
    }

    for (let node in graph) {
        if (inDegree[node] === undefined) {
            dfs(node);
        }
    }

    if (vertexes.length === verticesNum) {
        console.log(vertexes.join(' '));
    } else {
        console.log(-1);
    }

});