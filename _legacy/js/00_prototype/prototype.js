// 객체 리터럴을 사용하여 객체 생성
let person = {
  name: "John", // name 프로퍼티
  age: 30,      // age 프로퍼티
  isMale: true  // isMale 프로퍼티
};

// 점 표기법으로 프로퍼티 접근
console.log(person.name);   // 출력: "John"
console.log(person.age);    // 출력: 30
console.log(person.isMale); // 출력: true

// 대괄호 표기법으로 프로퍼티 접근
console.log(person['name']);   // 출력: "John"
console.log(person['age']);    // 출력: 30
console.log(person['isMale']); // 출력: true

//생성자함수를 이용한 객체 생성
function Person(name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.sayHello = function () {
  console.log(`Hello, my name is ${this.name} and I'm ${this.age} years old.`);
};

// Person 생성자 함수를 사용하여 객체 생성
let person1 = new Person("John", 30);
let person2 = new Person("Alice", 25);

// 객체의 메서드 호출
person1.sayHello(); // 출력: "Hello, my name is John and I'm 30 years old."
person2.sayHello(); // 출력: "Hello, my name is Alice and I'm 25 years old."
