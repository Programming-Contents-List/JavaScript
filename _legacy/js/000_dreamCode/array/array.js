//1.Declaration
const arr1 = new Array();
const arr2 = [1, 2];

//2. index position
const fruits = ['apple', 'banana'];
console.log(fruits);
console.log(fruits.length);
console.log(fruits[0]);
console.log(fruits[1]);
console.log(fruits[2]);
console.log(fruits[fruits.length - 1]);
//3. Looping over an array
//a. for
for (let i = 0; i < fruits.length; i++) {
  console.log(fruits[i]);
}
//b. for of
for (let fruit of fruits) {
  console.log(fruit);
}
//c.forEach()
fruits.forEach((fruit, index) => {
  console.log(fruit, index);
});

//4.Addtion, deletion, copy
//push
fruits.push('peach', 'orange');
console.log(fruits);

//pop
fruits.pop();
fruits.pop();
console.log(fruits);
console.clear();
//unshift : add an item to the beginning
console.log('unshift');
console.log(fruits);//Before
fruits.unshift('lemon', 'strawberry')
console.log(fruits);//After

//shift : remove an item from the beginning
console.log('shift')
console.log(fruits);//Before
fruits.shift();
fruits.shift();
console.log(fruits);//After
console.log();
//splice: remove an item by index position
console.clear();
console.log('splice 1');
console.log(fruits);//Before
fruits.push('strawberry', 'peach', 'orange');
console.log(fruits);//After

console.log('splice 2');
fruits.splice(1);//지정 부분 까지 제거
fruits.push('banana', 'strawberry', 'peach', 'orange');
console.log(fruits);//Before
fruits.splice(1, 3);// 지정 범위 부분 까지 제거
console.log(fruits);//After

console.log('splice 3');
fruits.splice(1);
fruits.push('banana', 'strawberry', 'peach', 'orange');
console.log(fruits);
fruits.splice(1, 3, 'lemon', 'grapes');//지정한 해당 배열을 제거한 후 추가 될 값
console.log(fruits);

//contact : combine to arrays
console.clear();
console.log('contact'); console.log(fruits);
const fruits2 = ['avocado', 'coconut']
console.log(fruits2);
const newFruits = fruits.concat(fruits2);
console.log(newFruits);

//indexOf&includes&lastIndexOf : find the index
console.clear();
console.log(fruits);
console.log('indexOf');
console.log(fruits.indexOf('grapes'));
console.log(fruits.indexOf('apple'));
console.log(fruits.indexOf('avocado'));
console.log('includes');
console.log(fruits.includes('grapes'));
console.log(fruits.includes('apple'));
console.log(fruits.includes('avocado'));
console.log('lastIndexOf');
fruits.push('apple');
console.log(fruits);
console.log(fruits.indexOf('apple'));
console.log(fruits.lastIndexOf('apple'));
