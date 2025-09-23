//JSON.parse
console.log("START=======================");
const rabbit = {
  name: 'tori',
  color: 'white',
  size: null,
  birthDate: new Date(),
  // Symbol: Symbol('id'),
  jump: () => { console.log(`${this.name} can jump`); }
};

const json = JSON.stringify(rabbit);
// const obj = JSON.parse(json);
const obj = JSON.parse(json, (key, value) => {
  console.log(`key:${key}/ value:${value}`);
  console.log(new Date(value));//여기서 value가 string이다.
  console.log(`type : ${typeof (value)}`);//string
  console.log(`type : ${typeof (new Date(value))}`);//obj
  return key === 'birthDate' ? new Date(value) : value;
});

// let test = new Date('2023-05-08T08:05:28.839Z')
// console.log('test' + test);
// console.log(obj);
// rabbit.jump();
// json.jump();//error
// obj.jump();//error

console.log(rabbit.birthDate.getDate())
console.log(obj.birthDate.getDate())