# Class를 이용한 계산기 만들기
단순히 함수를 이용하지 않고 class를 이용해서 클래스 내무에 있는 함수에 접근해서 기능을 수행하는 방식으로 제작했다.     
뿐만아니라 export와 import를 사용해서 한 스크립트에 하나의 함수를 담아 유지 보수가 유용하게 구성하였다.

해당 파일과 구성은 아래와 같다.

### 구성
<img src="./img/struct.JPG" width="450px" height="300px" title="파일 구성 img" alt=""></img><br/>

> Calculator.js
```
import { add } from "./add.js";
import { multiply } from "./multiply.js";
import { divide } from "./divide.js";
import { subtract } from "./subtract.js";
import { clear } from "./clear.js";

export class Calculator {
  constructor(number) {
    this.result = number;
  }

  add(number) {
    add.call(this, number);
    //add.bind(this)(number);
  };

  subtract(number) {
    subtract.call(this, number);
  };

  multiply(number) {
    multiply.call(this, number);
  };

  divide(number) {
    divide.call(this, number);
  };

  clear() {
    clear.call(this, number);
  };
}
```
해당 클래스에서 함수들을 적용하는 방식은 위와 같이 구성하였다. JAVA와 달리 필요 함수를 불러오기 위해서는 import된 함수를 call을 통해서 값을 가져 와야한다.      
[ref-link]:https://offbyone.tistory.com/140     
    
## call 함수
```
export class Calculator {
  ...
add(number) {
    add.call(this, number);
    //add.bind(this)(number);
  };
  ...
}
```
여기서 this는 class의 add를 가리킨다. 그로 인해 class의 number의 인자값을 import한 해당 add함수에게 전달해주는 것이다.   
   
여기서 문제점은 call을 통해서 재귀적으로 자신을 불러오는 방식이다. 그래서 호출 할 때문제가 발생할 수 있다.     
    
그렇다면 import, export를 통해서 JAVA와 같은 클래스를 만들어서 적재적소한 유지 보수가 용이한 구성을 어떻게 짤 수 있을까?    
    
## 스코프(scope)
스코프(Scope)는 변수와 함수의 접근성과 가시성을 정의하는 규칙의 집합이다. 스코프는 변수와 함수가 선언된 위치에 따라 해당 변수와 함수가 어디서 접근 가능한지를 결정한다.   
   
1. 글로벌 스코프 (Global Scope)
2. 지역 스코프 (Local Scope)
3. 블록 스코프(let과 var의 스코프 유효 범위가 다르다.)   
   
## 재귀함수
재귀 함수(Recursive Function)는 함수가 자기 자신을 호출하는 프로그래밍 기법이다. 쉽게 말해, 함수 내부에서 함수가 자기 자신을 호출하는 방식이다.   
    
1. 팩토리얼 계산 (Factorial)
2. 피보나치 수열 (Fibonacci)