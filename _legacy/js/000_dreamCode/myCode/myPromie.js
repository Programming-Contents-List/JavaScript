//promise의 원형을 잘 보여주기 위해 변수에 저장하며 사용
//promise는 기본적으로 화살표기법을 사용한다.
console.log("test")

//여기서 함수로 작성했지만 화살표기법으로 변수에 바로 담아 낼 수도 있다.
function print() {
  const print = new Promise((res) => {
    res("res");
  })
  return print;
}
//위 코드를 간략하게 줄이면 아래와 같다. 
function print() {
  return new Promise((res) => {
    res("res");
  })
}


const printer = print();//화살표 함수로 짧고 정갈하게 바꿀 수 있다.
printer.then(console.log('print')); //=> print가 정상적으로 실행이 되었기 때문에 then구문이 실행된 것이다.

printer.then(function (success) { console.log(`success => ${success}`) })
//then안 success는 resolve()의 호출에서 제공되는 값이다.

// const use = print();
// use.then(console.log);//콜백함수에 집중해야한다.
