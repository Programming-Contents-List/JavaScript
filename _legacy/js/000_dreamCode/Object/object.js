//1.리터럴과 프로퍼티
//object = {key : value}
const name = 'ellie';
const age = 4;

function print(name, age) {
  console.log(name);
  console.log(age);
}

print(name, age);

//=>관리하기 힘들다, 오브젝트로 변환하면 아래와 같다.
const ellie = { name: 'ellie', age: 4 };

function print(person) {
  console.log(person.name);
  console.log(person.age);
}

print(ellie);

const obj1 = {};//object literal
const obj2 = new Object();//object constructor