'use strict'
//1.producer : 수행하고 싶은 기능들
const promise = new Promise((resolve, reject) => {
  console.log('doing something..')
  setTimeout(() => {
    //resolve('ellie', console.log('ellie'));
    reject(new Error('no network'));
  }, 2000);
});

//2.consumers:then, catch, finally
//resolve가 되면 then에 넘겨 받아 다음 구문이 실행
promise
  .then(value => {
    console.log(`value : ${value}`);
  })
  .catch(error => {
    console.log(error);
  })
  .finally(() => {
    console.log('finally')
  })

//3. Promise chaining
const fetchNumber = new Promise((resolve, reject) => {
  setTimeout(() => resolve(1), 1000);
});

fetchNumber
  .then(num => num * 2)
  .then(num => num * 3)
  .then(num => {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(num - 1), 1000);
    });
  })
  .then(num => console.log(num));

//4.Error Handling
const getHen = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(`Chicken`), 1000);
  })

const getEgg = hen =>
  new Promise((resolve, reject) => {
    // setTimeout(() => resolve(`${hen} => Egg`), 1000);
    setTimeout(() => reject(new Error(`error! ${hen} => Egg`)), 1000);
  })

const cook = egg =>
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(`${egg} => meal`), 1000);
  })


getHen()//
  .then(getEgg)
  .catch(error => {
    return 'bread';
  })
  // .then(hen => getEgg(hen))
  .then(egg => cook(egg))
  .then(meal => console.log(meal));