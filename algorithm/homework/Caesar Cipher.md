# 문제

[caesar-cipher-1](https://www.hackerrank.com/challenges/caesar-cipher-1/problem)

# 생각해보기

charCodeAt을 이용해 유니코드 숫자로 바꾼다.

바꾼 숫자에 k를 더한 숫자를 변수로 선언한다.

바꾼 숫자가 알파벳 유니코드에 해당하지 않는 경우는 그대로 다음 루프로 진행한다.

알파벳 유니코드에 해당하면서 k를 더한 유니코드 숫자가 'z(122)'또는 'Z(90)'이상인 경우,

k를더한 결과값에서 마지막 알파벳이 해당하는 유니코드 숫자를 빼주어 차이를 계산한다음, 26(알파벳의 개수)로 나눈 나머지값에 'a'또는 'A'가 해당되는 숫자를 더해준다.

# 해결방법

# 코드

```
const caesarCipher = (s, k) => {
    const array = s.split('');
    for(let i = 0; i < array.length; i++) {
        const currCharCode = array[i].charCodeAt();
        let result = currCharCode + k;
        if(currCharCode >= 97 && currCharCode <= 122) {
            if(result > 122) {
                result = (result - 122 - 1) % 26 + 97;

            }

        array[i] = String.fromCharCode(result);
    }

    if(currCharCode >= 65 && currCharCode <= 90) {
        if(result > 90) {
            result = (result - 90 - 1) % 26 + 65;
        }

        array[i] = String.fromCharCode(result);
    }
  }

  return array.join('');
}
```

# 다른 풀이

```

```

# 참고
