//primitive type
//얕은 복사
const number = 1;
const num2 = number;
console.log(num2);//1
console.log(typeof (number));
console.log(typeof (num2));

//reference type
const person = {
  name: 'Max'
}
/*
//얕은 복사
const secondPerson = person;  //참조만 될 뿐

person.name = 'Manu';

console.log(secondPerson);  //not Max => Manu
*/

//깊은 복사
const secondPerson = {
  ...person
};

person.name = 'Manu';

console.log(secondPerson);