function solution(N, M, s, t, trails) {
    const graph = {};

    for (let i = 1; i <= N; i++) {
        graph[i] = [];
    }

    for (let i = 0; i < M; i++) {
        const [u, v] = trails[i];
        graph[u].push(v);
        graph[v].push(u);
    }

    function bfs(start, end) {
        const queue = [];
        const visited = new Array(N + 1).fill(false);
        const parent = new Array(N + 1).fill(-1);

        queue.push(start);
        visited[start] = true;

        while (queue.length > 0) {
            const node = queue.shift();

            if (node === end) {
                return parent;
            }

            for (const neighbor of graph[node]) {
                if (!visited[neighbor]) {
                    queue.push(neighbor);
                    visited[neighbor] = true;
                    parent[neighbor] = node;
                }
            }
        }

        return null;
    }

    const romaParent = bfs(s, t);
    if (romaParent === null) {
        return false;
    }

    const romaPath = [];
    let current = t;
    while (current !== s) {
        romaPath.push(current);
        current = romaParent[current];
    }
    romaPath.push(s);

    const dimaParent = bfs(t, s);
    if (dimaParent === null) {
        return false;
    }

    const dimaPath = [];
    current = s;
    while (current !== t) {
        dimaPath.push(current);
        current = dimaParent[current];
    }
    dimaPath.push(t);

    return [romaPath.reverse(), dimaPath.reverse()];
}

module.exports = solution;