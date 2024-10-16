function solution1(s) {
  const stack = [];
  const char = {
    "(": ")",
  };
  for (const str of s) {
    if (stack.length === 0) {
      stack.push(str);
    } else if (char[stack[stack.length - 1]] === ")") {
      stack.pop();
    }
  }

  return stack.length === 0;
}

solution1("(())()");

// 10진수를 2진수로 변환하기
function solution2(n) {
  const stack = [];
  while (n > 0) {
    const reminder = n % 2;
    stack.push(reminder);
    n = Math.floor(n / 2);
  }

  let binary = "";
  while (stack.length > 0) {
    binary += stack.pop();
  }

  return binary;
}

console.log(solution2(27));
