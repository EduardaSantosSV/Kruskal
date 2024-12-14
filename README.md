// Eduarda dos Santos // Disciplina: Algoritmos e Estruturas de Dados II

__Desafio:__
Implementar a funcionalidade de geração de AGM no primeiro trabalho de grafos, mostrando a Árvore Geradora Mínima resultante da execução do Algoritmos de Kruskal. 

__Implementação do código:__
O código recebe como entrada um grafo não direcionado, representado por uma lista de adjacência, onde os vértices e as arestas são definidos pelo usuário. 
A lógica central utiliza o algoritmo de Kruskal para encontrar a Árvore Geradora Mínima (AGM). Para isso, ordena as arestas pelo peso, adiciona as menores arestas à AGM e usa conjuntos disjuntos para evitar ciclos,
garantindo que todos os vértices sejam conectados com o menor custo total. Ao final, exibe o grafo completo e a AGM, com as arestas escolhidas e o peso mínimo total.
