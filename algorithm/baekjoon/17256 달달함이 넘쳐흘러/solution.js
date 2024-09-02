const fs = require("fs");
const filePath =
  process.platform === "linux" ? "/dev/stdin" : `${__dirname}/input.txt`;
let input = fs.readFileSync(filePath).toString().trim().split("\n");
const [ax, ay, az] = input.shift().split(" ").map(Number);
const [cx, cy, cz] = input.shift().split(" ").map(Number);

console.log(cx - az, cy / ay, cz - ax);
