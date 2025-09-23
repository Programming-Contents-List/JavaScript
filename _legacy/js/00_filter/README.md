# filter
* code
```
const filter = (...args) => {
  return args.filter(el => el === 1); //el이 true인 것을 배열로 반환
}
```

* console's result
```
console.log(filter(1, 2, 3)); // [1] => 0번째 값 출력
```