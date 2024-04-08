## depth first search (DFS)란?

> DFS(Depth First Search)는 트리나 그래프를 순회하는 데 사용되는 기술입니다. 여기서 역추적은 순회에 사용됩니다. 이 순회에서는 먼저 가장 깊은 노드를 방문한 다음 해당 노드의 형제 노드가 없으면 상위 노드로 역추적합니다.

<p align="center"><img src="https://velog.velcdn.com/images/cso6042/post/4fa0ef5d-3711-49c0-9d39-7d0d9cdd4541/image.jpeg" height="400px" width="300px"></p>

이 그래프를 예시로 들어보자.

a노드로 시작점(여기서 시작점은 어느 노드에서도 지정 가능)을 지정할 때, b노드로 방향을 잡았으면 그 다음 가야할 노드는 깊이 우선 탐색에 따라 d노드이다.

이 때 d노드는 더 이상 가야할 노드가 없으므로, c노드로가 e -> b 노드 순으로 순회한다.

시작점을 a노드로 잡았을 때, 결과적으로는 f노드엔 도달할 수 없다.

## breath first search (BFS)란?

> BFS(Breadth First Search)는 다음 깊이 수준의 정점으로 이동하기 전에 현재 깊이에서 그래프의 모든 정점을 탐색하는 그래프 순회 알고리즘입니다. 지정된 정점에서 시작하여 다음 수준의 이웃으로 이동하기 전에 모든 이웃을 방문합니다. BFS는 경로 찾기, 연결된 구성 요소 및 그래프의 최단 경로 문제에 대한 알고리즘에 일반적으로 사용됩니다.

<p align="center"><img src="https://velog.velcdn.com/images/cso6042/post/4fa0ef5d-3711-49c0-9d39-7d0d9cdd4541/image.jpeg" height="400px" width="300px"></p>

같은 그래프를 예시로 들어보자.

a노드로 시작점(여기서도 시작점은 어느 노드든지 가능)을 지정할 때, b노드로 방향을 잡았으면 그 다음 가야할 노드는 그 다음 이웃인 c노드 이다.

### 확인해보자!

아래의 경우 노드의 수가 더 많아 각각 어떤 식으로 탐색하는지 시각적으로 잘 확인할 수 있다.

<p align="center"><img alt="bfs" src="https://velog.velcdn.com/images/cso6042/post/cd4730a7-80b2-469b-b396-9efe37cb1b53/image.png" height="200px" width="200px">
<img alt="dfs" src="https://velog.velcdn.com/images/cso6042/post/46f28f12-0818-4b21-941d-1285446037fe/image.png" height="200px" width="200px"></p>

DFS의 경우, 깊이를 우선 탐색하므로 노드의 edge가 없을 때까지 한 방향으로 순회한다.

BFS의 경우, 지정된 노드에서 시작하여 인접한 모든 노드를 순회한다음, 다음 수준의 이웃으로 이동한다.

## 코드로 표현하기

DFS는 stack을, BFS는 queue를 이용한다.

### DFS

```js
//
const graph = {
  a: ["c", "b"],
  b: ["d"],
  c: ["e"],
  d: ["f"],
  e: [],
  f: [],
};

const depthFirstPrint = (graph, source) => {
  // 1. stack에 시작 노드를 넣어 초기화한다.
  const stack = [source];

  while (stack.length > 0) {
    // 2. stack에서 맨 "위" 요소를 꺼내 현재 노드라 정의한다.
    const current = stack.pop();
    console.log(current); // 'a' 'b' 'd' 'f' 'c' 'e'
    //3. 현재 노드의 이웃 노드를 순회하며, 이웃 노드를 stack에 넣는다.
    for (let neighbor of graph[current]) {
      stack.push(neighbor);
    }
  }
};
// 재귀를 사용
const depthFirstPrint = (graph, source) => {
  console.log(source); // 'a' 'c' 'e' 'b' 'd' 'f'
  for (let neighbor of graph[source]) {
    depthFirstPrint(graph, neighbor);
  }
};

depthFirstPrint(graph, "a");
```

### BFS

```js
const breadthFirstPrint = (graph, source) => {
  // 1. stack에 시작 노드를 넣어 초기화한다.
  const queue = [source];
  while (queue.length > 0) {
    // 2. stack에서 맨 "앞" 요소를 꺼내 현재 노드라 정의한다.
    const current = queue.shift();
    console.log(current); // 'a' 'c' 'b' 'e' 'd' 'f'
    for (let neighbor of graph[current]) {
      queue.push(neighbor);
    }
  }
};

breadthFirstPrint(graph, "a");
```

출처

[Graph Algorithms for Technical Interviews](https://www.youtube.com/watch?v=tWVWeAqZ0WU&t=143s)
