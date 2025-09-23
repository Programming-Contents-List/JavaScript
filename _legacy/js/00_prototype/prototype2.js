function Person(name, age) {
  this.name = name;
  this.age = age;
}

let person1 = new Person("John", 30);

let person2 = {
  name: "Alice",
  age: 25,
  isMale: true
};

console.log(person1.name);
console.log(person2.name);

// function myFunction(name) {
//   let elements = document.querySelector(name);
//   console.log(elements);
// }
