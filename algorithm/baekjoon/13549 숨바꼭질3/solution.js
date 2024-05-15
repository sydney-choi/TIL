const fs = require("fs");
const filePath =
  process.platform === "linux" ? "/dev/stdin" : `${__dirname}/input.txt`;
const input = fs.readFileSync(filePath).toString().trim().split("\n");
const [start, end] = input[0].split(" ").map(Number); // [5, 17]

const solution = (start, end) => {
  const queue = [[start, 0]];
  const visited = new Set();
  visited.add(start);

  while (queue.length > 0) {
    const [node, time] = queue.shift();
    if (node === end) return time;

    // node * 2, node - 1, node + 1 요 순서가 꽤 중요..!? 왜..?
    for (const nextNode of [node * 2, node - 1, node + 1]) {
      if (nextNode >= 0 && nextNode <= 100000 && !visited.has(nextNode)) {
        visited.add(nextNode);
        if (nextNode === node * 2) {
          queue.unshift([nextNode, time]); // 시간을 증가x, 대신 큐 맨 앞으로
        } else {
          queue.push([nextNode, time + 1]);
        }
      }
    }
  }
};

console.log(solution(start, end));

// const queue = [[start, 0]];
//   const visited = new Set();
//   visited.add(start);

//   while (queue.length > 0) {
//     const [node, time] = queue.shift();
//     if (node === end) return time;

//     for (const nextNode of [node * 2, node + 1, node - 1]) {
//       console.log(nextNode);
//       if (nextNode >= 0 && nextNode <= 100000 && !visited.has(nextNode)) {
//         visited.add(nextNode);
//         if (nextNode === node * 2) {
//           queue.unshift([nextNode, time]); // 2X로 이동할 때는 시간을 증가시키지 않고, 우선순위를 반영하여 큐의 맨 앞에 넣어준다.
//         } else {
//           queue.push([nextNode, time + 1]);
//         }
//       }
//     }
//   }
