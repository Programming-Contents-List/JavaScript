* 얕은 복사
> stack에 값을 복사하는 형태이다.
```
const number = 1;
const num2 = number;
console.log(num2);//1
```

* 깊은 복사
> stack의 값뿐만 아니라 Heap의 주소 값을 하나더 생성하는 것.
```
const person = {
  name: 'Max'
}
const secondPerson = {
  ...person
};

person.name = 'Manu';

console.log(secondPerson);
```