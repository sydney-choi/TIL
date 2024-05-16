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

    // 마지막 노드를 root로 옮겼으니 min tree의 조건에 부합하지 않을 가능성이 매우 크다.
    // 따라서 다시 min tree의 형태를 갖추도록 하는 작업이 필요하다.
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
const [N, M] = input.shift().split(" ").map(Number);

const graph = [];
for (let i = 0; i < N; i++) {
  const row = input.shift().split(" ").map(Number);
  graph.push(row);
}

// 플로이드
for (let k = 0; k < N; k++) {
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      // A 파티장에서 B 파티장으로 빨리 갈 수 있도록 직접 연결이 된 일방통행 도로를 만들었지만 A와 B가 아닌 다른 파티장을 경유해서 더 빨리 갈 수 있는 경우
      // 경유해서 가는 것으로 갱신
      if (graph[i][j] > graph[i][k] + graph[k][j]) {
        graph[i][j] = graph[i][k] + graph[k][j];
      }
    }
  }
}

for (let i = 0; i < M; i++) {
  const [start, end, time] = input.shift().split(" ").map(Number);
  if (graph[start - 1][end - 1] <= time) {
    console.log("Enjoy other party");
  } else {
    console.log("Stay here");
  }
}
