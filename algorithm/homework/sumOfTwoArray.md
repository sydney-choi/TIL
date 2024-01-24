# 문제
두 정수를 더하는 프로그램을 작성해주세요.

num1, num2 배열의 원소는 0~9 일의 자리의 유효한 정수만 들어옵니다.

num1.length, num2.length 는 서로 다를 수 있으며, maxLength = 100 입니다.

# 생각해보기

배열의 요소를 합쳐서 더한 값을 결과 값으로 리턴한다.

# 해결방법

그냥 덧셈 보다 비트 연산자를 사용 하는 것이 더 빠르기 때문에 비트연산자를 이용해 덧셈했다.

더 좋은 풀이방법이 있을 것 같아서 더 생각해보다, 인간이 생각하는 것 처럼 올림을 이용한 방식으로 해결해보았다.

# 코드

풀이 1 : 비트 연산자를 이용한 덧셈
```
/*
 * input
 *  num1: [7,0,0,0]
 *  num2: [4,0,0,0]

 * output [1,1,0,0,0]
 */
 function solution(num1, num2) {  
  let a = num1.join('');
  let b = num2.join('');

  while(b != 0) {
    const carry = a & b;
    a ^= b;
    b = carry << 1;
  }

  return a.toString().split('');
}
```

풀이 2 : 올림을 이용한 덧셈 
```
function solution(num1, num2) {  
  const a = num1.reverse();
  const b = num2.reverse();
  const result = [];
  let carry = 0;

  let arrayOfMaxLength = a.length >= b.length ? a : b;
  let maxLength = arrayOfMaxLength.length;

  for (let i = 0; i < maxLength; i++) {
    const sum = (a[i] || 0) + (b[i] || 0) + carry;
    result.push(sum % 10);
    carry = Math.floor(sum / 10);
  }

  if(carry > 0) {
    result.push(carry);
  }

  return result.reverse();
}
```



