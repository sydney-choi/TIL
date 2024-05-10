// ✔ 알고리즘 : 다익스트라

// ✔ 노드간 거리를 저장하는 2차원 배열로 문제를 풀면 시간초과가 발생하므로 우선순위큐(최소힙)을 사용해야 한다.

class PriorityQueue {
  constructor() {
    this.heap = [];
  }

  size() {
    return this.heap.length;
  }

  swap(idx1, idx2) {
    [this.heap[idx1], this.heap[idx2]] = [this.heap[idx2], this.heap[idx1]];
  }

  push(data) {
    if (this.size() === 0) {
      this.heap.push(data);
      return;
    }

    // 배열의 가장 마지막에 데이터를 push한다.
    this.heap.push(data);
    // 현재 인덱스를 가장 마지막 인덱스로 설정한다.
    let checkedIdx = this.heap.length - 1;

    while (checkedIdx > 0) {
      let parentIdx = Math.floor((checkedIdx - 1) / 2);

      // 부모 인덱스의 요소와 값을 비교한다
      // 부모의 값이 더 크다면 두 요소의 위치를 바꾸고 현재 인덱스를 부모 인덱스로 교체한다 : min tree
      if (this.heap[parentIdx][1] > this.heap[checkedIdx][1]) {
        this.swap(parentIdx, checkedIdx);
        checkedIdx = parentIdx;
      } else {
        break;
      }
    }
  }

  pop() {
    if (this.size() === 0) return;
    if (this.size() === 1) return this.heap.pop();

    // 실제로 삭제되어야 할 root 노드를 삭제하고, 구조상 없어져야 하는 마지막 노드를 root 자리로 옮긴다.
    const value = this.heap[0];
    this.heap[0] = this.heap.pop();
    let currentIdx = 0;

    // 마지막 노드를 root로 옮겼으니 max tree의 조건에 부합하지 않을 가능성이 매우 크다.
    // 따라서 다시 max tree의 형태를 갖추도록 하는 작업이 필요하다.
    while (currentIdx < this.size()) {
      // 인덱스의 좌우측 자식 노드의 인덱스를 계산
      let left = currentIdx * 2 + 1;
      let right = left + 1;

      // 좌측 인덱스의 자식이 없는 경우, 해당 노드가 현재 트리 분포의 끝이라는 의미이니 정렬을 종료한다.
      if (!this.heap[left]) break;

      // 좌우측 자식 노드 중 더 작은 노드의 인덱스를 가져온다.
      // 만약 우측 자식이 없을 시 왼쪽 자식을 할당하며 우측 자식이 있을 시 각 자식 노드의 값을 비교
      let smaller =
        this.heap[right] !== undefined
          ? this.heap[left][1] <= this.heap[right][1]
            ? left
            : right
          : left;

      // 자식 노드의 값이 더 작다면 두 노드의 위치를 바꾸고 아닐 경우 정렬 로직을 종료
      if (this.heap[smaller][1] < this.heap[currentIdx][1]) {
        this.swap(smaller, currentIdx);
        currentIdx = smaller;
      } else {
        break;
      }
    }

    return value;
  }
}

const fs = require("fs");
const filePath =
  process.platform === "linux" ? "/dev/stdin" : `${__dirname}/input.txt`;
let input = fs.readFileSync(filePath).toString().trim().split("\n");

//  input ['5 6', '1', '5 1 1', '1 2 2', '1 3 3', '2 3 4', '2 4 5', '3 4 6']
const [v, e] = input.shift().split(" ").map(Number);
const start = Number(input.shift());
const graph = Array.from({ length: v + 1 }, () => []);
const d = Array.from({ length: v + 1 }, () => Infinity);
const visited = Array.from({ length: v + 1 }, () => false);
const priorityQueue = new PriorityQueue();

//그래프 초기화
for (let i of input) {
  const [from, to, weight] = i.split(" ").map(Number);
  graph[from].push([to, weight]);
}

// 출발 지점에 대한 초기화
priorityQueue.push([start, 0]);
d[start] = 0;

while (priorityQueue.size()) {
  // 큐에서 가장 짧은 거리를 가진 방문 노드를 꺼낸다.
  // min tree로 정렬되어 있으므로 root node가 가장 작은 값이다
  const [curNode, dist] = priorityQueue.pop();

  // 현재 최단거리 노드보다 꺼내온 방문 노드의 거리가 더 길다면 스킵
  if (d[curNode] < dist) continue;

  // 가장 가까운 노드가 방문 가능한 노드를 탐색
  // 이때 기존 노드의 최단거리(dist) + 가져온 노드에서 목표 노드의 거리(v[1])이 목표 노드의 기존 최단거리보다 짧을 경우 최단거리를 갱신한다.
  // 그리고 큐에 [타켓 노드, 방금 갱신된 최단거리]를 삽입하여 위 과정을 반복
  for (const v of graph[curNode]) {
    const node = v[0];
    const cost = dist + v[1];

    if (cost < d[node]) {
      d[node] = cost;
      priorityQueue.push([node, cost]);
    }
  }
}

console.log(
  d
    .slice(1)
    .map((e) => (e === Infinity ? "INF" : e))
    .join("\n")
);
