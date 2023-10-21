const { createInterface } = require('readline')

const lines = [];
createInterface({
    input: process.stdin,
    output: process.stdout
}).on('line', (line) => {
    lines.push(line.toString().trim().split(' '))
}).on('close', () => {

    const graph = {};
    const n = lines[0][0];
    const start = lines[lines.length - 1][0];
    const end = lines[lines.length - 1][1];

    for (let i = 1; i <= n; i++) {
        graph[i] = [];
        for (let j = 1; j <= n; j++) {
            if (lines[i][j - 1] === 1) {
                graph[i].push(j);
            }
        }
    }

    function bfs(graph, start, end) {
        const queue = [start];
        const visited = new Array(n + 1).fill(false);
        const distances = new Array(n + 1).fill(0);

        while (queue.length > 0) {
            const current = queue.shift();

            if (current === end) {
                return distances[current];
            }

            for (const neighbor of graph[current]) {
                if (!visited[neighbor]) {
                    visited[neighbor] = true;
                    queue.push(neighbor);
                    distances[neighbor] = distances[current] + 1;
                }
            }
        }

        return -1;
    }

    const result = bfs(graph, start, end);
    console.log(result);
})