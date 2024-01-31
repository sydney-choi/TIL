# 문제

input => [1,2,3,[4,[5,[6,7,8],9],10],11]

output => [1,2,3,4,5,6,7,8,9,10,11]

array를 플랫하게 만들어주세요.

# 생각해보기

배열을 순환하며 배열의 요소가 array타입인지 판단한다

array타입일 경우, 다시 재귀함수를 실행해 배열을 플랫하게 만든다.

# 해결방법

처음에 map을 써서 해봤으나 잘 안되서 reduce함수를 이용했다.

초깃값으로 빈 배열을 할당해 주는 것, 배열에 누적된 숫자를 계속 push해주는 것이 포인트

# 코드

```
function flatArray(array) {
    return array.reduce((acc, curr) => {
        Array.isArray(curr) ? acc.push(...flatArray(curr)) : acc.push(curr);
        return acc;
      }, []);
}
```

# 참고

재귀함수를 구현할 때는 마지막 종료조건을 생각할 것, 다시 함수로 돌아올 부분을 생각할 것!
