class DSU {
    constructor(n) {
        this.parent = Array.from({ length: n }, (_, i) => i);
        this.rank = Array(n).fill(0);
        this.size = Array(n).fill(1);
    }

    find(x) {
        if (this.parent[x] !== x) {
            this.parent[x] = this.find(this.parent[x]);
        }
        return this.parent[x];
    }

    union(x, y) {
        const rootX = this.find(x);
        const rootY = this.find(y);
        if (rootX !== rootY) {
            if (this.rank[rootX] < this.rank[rootY]) {
                this.parent[rootX] = rootY;
                this.size[rootY] += this.size[rootX];
            } else if (this.rank[rootX] > this.rank[rootY]) {
                this.parent[rootY] = rootX;
                this.size[rootX] += this.size[rootY];
            } else {
                this.parent[rootY] = rootX;
                this.rank[rootX]++;
                this.size[rootX] += this.size[rootY];
            }
        }
    }
}

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let n, m;
const queries = [];
const results = [];

rl.on('line', (line) => {
    if (!n) {
        [n, m] = line.split(' ').map(Number);
    } else {
        queries.push(line.split(' ').map(Number));
    }
});

rl.on('close', () => {
    const dsu = new DSU(n);

    for (let i = 0; i < m; i++) {
        const [type, x, y] = queries[i];
        if (type === 1) {
            dsu.union(x - 1, y - 1);
        } else if (type === 2) {
            results.push(dsu.find(x - 1) === dsu.find(y - 1) ? 'YES' : 'NO');
        } else if (type === 3) {
            const rootX = dsu.find(x - 1);
            const rootY = dsu.find(y - 1);
            results.push(rootX === rootY ? String(dsu.size[rootX]) : '1');
        }
    }

    console.log(results.join('\n'));
});