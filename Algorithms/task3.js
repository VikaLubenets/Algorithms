const { createInterface } = require('readline');

const lines = [];
createInterface({
    input: process.stdin,
    output: process.stdout
}).on('line', (line) => {
    lines.push(line.toString().trim().split(' '))
}).on('close', () => {

    const graph = {};
    const [studensNum, pairsNum] = lines[0].map(Number);

    for(const line of lines.slice(1)){
        const [v1, v2] = line;
        if(!graph[v1]) graph[v1] = [];
        if(!graph[v2]) graph[v2] = [];
        graph[v1].push(v2);
        graph[v2].push(v1);
    }

    const colors = {};
    let isBipartite = true;

    function dfs(node, color) {
        colors[node] = color;
        for (const neighbor of graph[node]) {
            if (colors[neighbor] === undefined) {
                dfs(neighbor, 1 - color);
            } else if (colors[neighbor] === color) {
                isBipartite = false;
            }
        }
    }

    for (let node in graph) {
        if (colors[node] === undefined) {
            dfs(node, 0);
        }
    }

    if (isBipartite) {
        console.log('YES');
    } else {
        console.log('NO');
    }

})