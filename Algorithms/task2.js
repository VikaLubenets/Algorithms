const { createInterface } = require("readline");

const lines = [];
createInterface({
  input: process.stdin,
  output: process.stdout,
}).on("line", (line) => {
  lines.push(line.toString().trim());
}).on("close", () => {

    let graph = {};
    const [vertexesN, edgesN] = lines[0];

    for(let i = 1; i < lines.length; i++){
        const [v1, v2] = line[i];
        if (!graph[v1]) graph[v1] = [];
        if (!graph[v2]) graph[v2] = [];
        graph[v1].push(v2);
        graph[v2].push(v1);
    }
    
    const components = [];
    const visited = {};

    function dfs(node, component) {
        if (visited[node]) return;
        visited[node] = true;
        component.push(node);
        graph[node].forEach(neighbor => {
            dfs(neighbor, component);
        });
    }

    for (let key in graph) {
        if (!visited[key]) {
            let component = [];
            dfs(key, component);
            components.push(component);
        }
    }

    console.log(components.length + '\n');
    components.forEach(component => {
        console.log(component.length + '\n');
        console.log(component.join(' ') + '\n');
    });
});

