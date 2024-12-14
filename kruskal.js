/*
Aluna: Eduarda dos Santos
Matrícula: 22201985

O código conecta todos os vértices do grafo com o menor custo total e adiciona arestas mais leves enquanto evita ciclos, garantindo que o grafo permaceça uma árvore.
*/
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

class Grafo {
    constructor() {
        this.vertices = new Array(20).fill(null).map(() => []);
        this.arestas = [];
    }

    adicionarAresta(v1, v2, peso) {
        if (peso <= 0) {
            console.log('O peso da aresta deve ser um valor positivo!');
            return;
        }
        if (!this.vertices[v1].some(aresta => aresta.vertice === v2)) {
            this.vertices[v1].push({ vertice: v2, peso: peso });
            this.arestas.push({ v1, v2, peso }); 
        }
        if (!this.vertices[v2].some(aresta => aresta.vertice === v1)) {
            this.vertices[v2].push({ vertice: v1, peso: peso });
        }
    }

    mostrarGrafo() {
        console.log('Dados armazenados no grafo:');
        for (let i = 0; i < 20; i++) {
            if (this.vertices[i].length > 0) {
                console.log(`Vértice ${i}:`);
                this.vertices[i].forEach(aresta => {
                    console.log(`  Conectado ao vértice ${aresta.vertice} com peso ${aresta.peso}`);
                });
            }
        }
    }

    kruskalAGM() {
        const disjointSet = new DisjointSet(20);
        const arestasOrdenadas = this.arestas.sort((a, b) => a.peso - b.peso);

        const agm = [];
        let pesoTotal = 0;

        arestasOrdenadas.forEach(({ v1, v2, peso }) => {
            if (disjointSet.find(v1) !== disjointSet.find(v2)) {
                disjointSet.union(v1, v2);
                agm.push({ v1, v2, peso });
                pesoTotal += peso;
            }
        });

        console.log('\nÁrvore Geradora Mínima (AGM):');
        agm.forEach(({ v1, v2, peso }) => {
            console.log(`Aresta: (${v1}, ${v2}), Peso: ${peso}`);
        });
        console.log(`Peso total da AGM: ${pesoTotal}`);
    }
}

class DisjointSet {
    constructor(size) {
        this.parent = Array.from({ length: size }, (_, i) => i);
        this.rank = Array(size).fill(0);
    }

    find(v) {
        if (this.parent[v] !== v) {
            this.parent[v] = this.find(this.parent[v]); 
        }
        return this.parent[v];
    }

    union(v1, v2) {
        const root1 = this.find(v1);
        const root2 = this.find(v2);

        if (root1 !== root2) {
            if (this.rank[root1] > this.rank[root2]) {
                this.parent[root2] = root1;
            } else if (this.rank[root1] < this.rank[root2]) {
                this.parent[root1] = root2;
            } else {
                this.parent[root2] = root1;
                this.rank[root1]++;
            }
        }
    }
}

function lerEntrada(question) {
    return new Promise(resolve => rl.question(question, resolve));
}

async function main() {
    const grafo = new Grafo();

    const numVertices = await lerEntrada('Digite o número de vértices (máximo 20): ');
    const vertices = parseInt(numVertices);

    if (vertices < 1 || vertices > 20) {
        console.log('Número de vértices inválido! O número deve estar entre 1 e 20.');
        rl.close();
        return;
    }

    for (let i = 0; i < vertices; i++) {
        const arestas = await lerEntrada(`Digite o número de arestas para o vértice ${i}: `);
        const numArestas = parseInt(arestas);

        for (let j = 0; j < numArestas; j++) {
            const v2 = await lerEntrada(`Digite o vértice de destino para a aresta ${j + 1} de ${i}: `);
            const peso = await lerEntrada(`Digite o peso da aresta de ${i} para ${v2}: `);
            const pesoNum = parseInt(peso);

            grafo.adicionarAresta(i, parseInt(v2), pesoNum);
        }
    }

    grafo.mostrarGrafo();
    grafo.kruskalAGM();
    rl.close();
}

main();
