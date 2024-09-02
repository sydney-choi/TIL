const fs = require("fs");
const filePath =
  process.platform === "linux" ? "/dev/stdin" : `${__dirname}/input.txt`;
let input = fs.readFileSync(filePath).toString().trim().split("\n");
const [x, y, w, h] = input.shift().split(" ").map(Number);

console.log(Math.min(x, y, w - x, h - y));
