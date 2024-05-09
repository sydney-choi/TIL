## Diijkstra 알고리즘이란?

출발 노드 한 지점을 기준으로 다른 모든 노드로 가는 각각의 최단거리를 계산하는 알고리즘

다음과 같은 과정을 반복한다.

1. 출발 지점을 지정한다.

2. 그래프에서 현재 노드에서 갈 수 있는 경로 중 가장 거리가 짧은 노드를 선택한다.

3. 해당 노드를 거친 거리가 기존 노드의 최단거리 보다 짧다면 최단거리를 갱신한다.

4. 이후 반복

```js
// graph: 인덱스마다 각각의 노드를 가지는 이차원 배열.
// d: 현재 각 노드의 최단 거리를 저장하는 배열이며 초깃값으로 Infinity를 가진다.
const graph = Array.from({ length: n + 1 }, () => []);
const d = Array.from({ length: n + 1 }, () => Infinity);

// 그래프 초기화
for (const v of arr) {
  const [from, to, dist] = v;
  graph[from].push([to, dist]);
}

// 방문 노드 목록을 저장할 큐
const queue = [];
// 출발 지점에 대한 초기화
queue.push([start, 0]);
d[start] = 0;

while (queue.length !== 0) {
  // 큐에서 가장 짧은 거리를 가진 방문 노드를 꺼낸다.
  const [curNode, dist] = queue.pop();

  // 현재 최단 거리보다 꺼내온 방문 노드의 거리가 더 길다면 스킵.
  if (d[curNode] < dist) continue;

  // 가장 가까운 노드가 방문 가능한 노드를 탐색
  // 이때 기존 노드의 최단거리(dist) + 가져온 노드에서 목표 노드의 거리(v[1])이 목표 노드의 기존 최단거리보다 짧을 경우 최단거리를 갱신한다.
  // 그리고 큐에 [타켓 노드, 방금 갱신된 최단거리]를 삽입하여 위 과정을 반복
  for (const v of graph[curNode]) {
    const node = v[0];
    const cost = dist + v[1];

    if (cost < d[node]) {
      queue.push([node, cost]);
      queue.sort((a, b) => a[1] - b[1]); // 이때 정렬을 통하여 이후 과정이 반복되더라도 pop()으로 가장 가까운 노드를 반환하도록 설정한다.
      d[node] = cost;
    }
  }
}
```

**하지만 이때, 정렬로 인해서 시간 복잡도에 문제가 생기게 된다.**

## 반복된 정렬로 인해 발생하는 비용

위에서도 볼 수 있다시피 가장 가까운 노드를 가져오기 위해서 sort 메서드를 활용해 정렬을 수행한다. 하지만 정렬을 반복적으로 실행할 경우 성능상 문제는 더욱 커진다. 만약 현재 큐에서 정렬해야할 노드가 몇만개라면...? 방문해야하는 노드의 개수가 늘어날수록 정렬에서 걸리는 시간과 메모리 또한 기하급수적으로 늘어날 것이다. 이러한 현상을 해결하기 위해서 우선순위 큐라는 자료구조를 사용해야한다.

## 우선순위 큐(Priority Queue)

비로소 큐라고 한다면 먼저 들어온 요소가 먼저 나가는, 즉 **선입선출(FIFO, First In Fist Out)**의 원칙을 지키는 것이 도리이다. 하지만 우선순위 큐의 경우 먼저 들어온 것과는 상관이 없이 정해놓은 우선순위에 따라서 값을 반환한다.
그래서 우선순위 큐를 어떻게 구현하냐? 여기서 힙이라는 자료구조가 등장한다.

## 힙(Heap)이란?

힙(Heap)이란 (완전 이진 트리(Complete Binary Tree))[https://www.geeksforgeeks.org/complete-binary-tree/]로 이루어진 자료구조이다.

## 자바스크립트로 최소 힙 만들기

```js
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
    // 현재 인덱스를 마지막 인덱스로 설정한다.
    let checkedIdx = this.heap.length - 1;

    while (checkedIdx > 0) {
      let parentIdx = Math.floor((checkedIdx - 1) / 2);

      // 부모 인덱스의 요소와 값을 비교한다. ->부모의 값이 더 작다면 두 요소의 위치를 바꾸고 현재 인덱스를 부모 인덱스로 교체한다.
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

    const value = this.heap[0];
    this.heap[0] = this.heap.pop();
    let currentIdx = 0;

    while (currentIdx < this.size()) {
      // 인덱스의 좌우측 자식 노드의 인덱스를 계산
      let left = currentIdx * 2 + 1;
      let right = left + 1;

      // 좌측 인덱스 자식이 없는 경우 해당 노드가 현재 트리 분포의 끝이라는 의미이니 정렬을 종료
      if (!this.heap[left]) break;

      // 좌우측 자식 노드 중 더 작은 노드의 인덱스를 가져온다.
      // 만약 우측 자식이 없을 시 왼쪽 자식을 할당하며 우측 자식이 있을 시 각 자식 노드의 값을 비교
      let smaller =
        this.heap[right] !== undefined
          ? this.heap[left][1] <= this.heap[right][1]
            ? left
            : right
          : left;

      //  더 작은 자식 노드의 값이 더 작다면 두 노드의 위치를 바꾸고, 아닐 경우 정렬 로직을 종료
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
```
