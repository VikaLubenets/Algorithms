const { createInterface } = require('readline');

const lines = [];
createInterface({
    input: process.stdin,
    output: process.stdout
}).on('line', (line) =>{
    lines.push(line.toString().trim().split(' '))
}).on('close', () => {
    const [ n ] = lines[0].map(Number);
    const matrix = lines.slice(1).map(row => row.map(Number));
    let hasCycle = false;
    let cycle = [];

    function dfs(node, parent, visited, currentCycle) {
        visited[node] = true;
        currentCycle.push(node);
        for (let i = 0; i < matrix[node].length; i++) {
            if (matrix[node][i] === 1) {
                if (!visited[i]) {
                    dfs(i, node, visited, currentCycle);
                } else if (i !== parent && currentCycle.length > 2 && currentCycle.includes(i)) {
                    hasCycle = true;
                    const start = currentCycle.indexOf(i);
                    cycle = currentCycle.slice(start);
                    return;
                }
            }
        }
        currentCycle.pop();
    }

    const visited = new Array(n).fill(false);
    for (let i = 0; i < n; i++) {
        if (!visited[i]) {
            dfs(i, -1, visited, []);
        }
        if (hasCycle) break;
    }

    if (hasCycle) {
        console.log('YES');
        console.log(cycle.length);
        console.log(cycle.reverse().join(' '));
    } else {
        console.log('NO');
    }
});