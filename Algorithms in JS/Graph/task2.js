class Vertex {
    constructor(lab){
        this.label = lab;
        this.isVisited = false;
    }
}

class Graph {
    constructor(){
        this.MAX_VERTS = 20;
        this.vertexList = [];
        this.adjMat = [];
        this.numVerts = 0;

        for(let i = 0; i < this.MAX_VERTS; i++){
            this.adjMat[i] = [];
            for(let j = 0; j < this.MAX_VERTS; j++){
                this.adjMat[i][j] = 0;
            }
        }
    }

    addVertex(lab){
        this.vertexList.push(new Vertex(lab));
        this.numVerts++;
    }

    addEdge(start, end){
        this.adjMat[start][end] = 1;
        this.adjMat[end][start] = 1;
    }

    displayVertex(v){
        console.log(this.vertexList[v].label);
    }

    getAdjUnvisitedVertex(v){
        for(let j = 0; j < this.numVerts; j++){
            if(this.adjMat[v][j] === 1 && this.vertexList[j].isVisited === false){
                return j;
            }
        }
        return -1;
    }

    dfs(){
        const stack = [];
        this.vertexList[0].isVisited = true;
        this.displayVertex(0);
        stack.push(0);

        while(stack.length > 0){
            let v = this.getAdjUnvisitedVertex(stack[stack.length - 1]);
            if(v === -1){
                stack.pop();
            } else {
                this.vertexList[v].isVisited = true;
                this.displayVertex(v);
                stack.push(v);
            }
        }

        for(let i = 0; i < this.numVerts; i++){
            this.vertexList[i].isVisited = false;
        }
    }

    bfs() {
        let queue = [];
        this.vertexList[0].isVisited = true;
        this.displayVertex(0);
        queue.push(0);
        let v2;
    
        while (queue.length > 0) {
            let v1 = queue.shift();
    
            while ((v2 = this.getAdjUnvisitedVertex(v1)) !== -1) {
                this.vertexList[v2].isVisited = true;
                this.displayVertex(v2);
                queue.push(v2);
            }
        }
    
        for (let i = 0; i < this.numVerts; i++) {
            this.vertexList[i].isVisited = false;
        }
    }
}


let graph = new Graph();
graph.addVertex('A'); // 0 (исходная вершина)
graph.addVertex('B'); // 1
graph.addVertex('C'); // 2
graph.addVertex('D'); // 3
graph.addVertex('E'); // 4

graph.addEdge(0, 1); // AB
graph.addEdge(1, 2); // BC
graph.addEdge(0, 3); // AD
graph.addEdge(3, 4); // DE

console.log("Visits: ");
graph.bfs();