console.log("async_0");
//1.async
//async function
async function fetchUser() {
  return 'ellie';
}

const user = fetchUser();
user.then(console.log);//이렇게 표기가 되는 것.. 어떻게 되는거지?
// console.log(user);

//2.await
//setTimeout으로 변경해서 해보기
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function getApple() {
  await delay(1000);
  return 'Apple';
}

async function getBanana() {
  await delay(1000);
  return 'Banana';
}

//위 함수와 동일하다
/*function getBanana() {
  return delay(3000)
    .then(() => 'Banana');
}*/

// function pickFruits() {
//   return getApple().then(apple => {
//     return getBanana().then(banana => `${apple} + ${banana}`);
//   })
// }

async function pickFruits() {
  const apple = await getApple();
  const banana = await getBanana();
  return `${apple} + ${banana}`;
}
pickFruits().then(console.log);