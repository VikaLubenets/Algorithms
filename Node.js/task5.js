function canDivideIntoStates(graph, x, n) {
    const visited = new Array(n + 1).fill(false);
    let numStates = 0;

    function dfs(node) {
        if (visited[node]) return;
        visited[node] = true;

        for (const neighbor of graph[node]) {
            if (!visited[neighbor] && neighbor > x) {
                dfs(neighbor);
            }
        }
    }

    for (let i = 1; i <= n; i++) {
        if (!visited[i]) {
            numStates++;
            dfs(i);
        }
    }

    return numStates === 1; // Вернем true, если количество штатов равно 1
}

function findMaxX(graph, n, m) {
    let left = 0;
    let right = Math.pow(10, 9);

    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        if (canDivideIntoStates(graph, mid, n)) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }

    return left;
}

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const inputLines = [];
let currentLine = 0;

rl.on('line', (line) => {
    inputLines.push(line.trim());
});

rl.on('close', () => {
    const [n, m] = inputLines[0].split(' ').map(Number);

    const graph = new Array(n + 1).fill(null).map(() => []);

    for (let i = 1; i <= m; i++) {
        const [v, u, w] = inputLines[i].split(' ').map(Number);
        graph[v].push(u);
        graph[u].push(v);
    }

    const maxX = findMaxX(graph, n, m);
    console.log(maxX);
});
