//1. 정해진 프로퍼티
function makePerson(name, age) {
  return {
    name,
    age,
  };
}

const person = makePerson('elile', 30);
console.log(person);

//2. constructor function
function Person(name, age) {
  this.name = name;
  this.age = age;
}
const person2 = new Person('elile', 30);
console.log(person);

//3. for..in / for..of
for (key in ellie) {
  console.log(key);
}

const array = [1, 2, 3, 4];
for (value of array) {
  console.log(value);
}

//4. cloning
const user = { name: 'elile', age: 20 };
const user2 = user;
user2.name = 'coder';
console.log(user);

//5. assign

// const user3 = {};
// Object.assign(user3, user);
// console.log(user3);

const user3 = Object.assign(user3, user);
console.log(user3);
