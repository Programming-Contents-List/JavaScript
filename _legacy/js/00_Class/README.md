# JS의 class와 React의 연관성    
* 리액트에서 컴포넌트를 생성할 때 사용된다.    
* class는 컴포넌트를 생성하는 두 방법 중 하나이다.    
* 클래스가 자바스크립트 객체를 위한 청사진이다.    

> 클래스는 생성자 함수(constructor(){})와 비슷하고     
> 상속은 프로토타입(prototype=속성)과 비슷하다. 
> > 프로퍼터니는 클래스와 객체에 추가되는 변수, 매소드는 클래스와 객체에 추가되는 함수같은 것
---------------------------------------------------------------
>Properties are like "variables attached to classes/objects"     
* Variables
```
 //ES6
 class test{
  constructor() {
    this.myProperty = 'value';
  }
 }
```
```
 //ES7
 myProperty = 'value'; //생성자 호출이 필요 없다.
```

* Method
```
 //ES6
 class test{
  myMethod(){...}
 }
```
```
 //ES7
 myMethod = () =>{...}
```
---------------------------------------------------------------

