let json = JSON.stringify(true);
console.log(json);//true

json = JSON.stringify(['apple', 'banana']);
console.log(json);


//object 만들기JSON화 시키기
//함수는 표현되지 않는다.
const rabbit = {
  name: 'tori',
  color: 'white',
  size: null,
  birthDate: new Date(),
  // Symbol: Symbol('id'),
  jump: () => { console.log(`${name} can jump`); }
};
//JSON.stringify
json = JSON.stringify(rabbit);
console.log(`1: ${json}`);

//Object의 원하는 property만 지정하고 싶다면 아래처럼 작성하면 된다.
json = JSON.stringify(rabbit, ['name', 'color', 'size']);
console.log(`2: ${json}`);

json = JSON.stringify(rabbit, (key, value) => {
  console.log(`3: key : ${key}/ value : ${value}`);//[object;object]는 제일 최상의 객체가 전달이 먼저 된다.
  return key === 'name' ? 'ellie' : value;
});
console.log(`4: ${json}`);