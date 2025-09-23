console.log("async_0");
//1.async
//async function
// async function fetchUser() {
//   return 'ellie';
// }

// const user = fetchUser();
// user.then(console.log);
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

/**/async function pickFruits() {
  const apple = await getApple();
  const banana = await getBanana();
  return `${apple} + ${banana}`;
}
//여기서는 apple 1초 + banana 1초 해서 2초 이지만 아래는 1초만에 생성이된다.

/*async function pickFruits() {
  const applePromise = getApple();
  const bananaPromise = getBanana();
  const apple = await applePromise;
  const banana = await bananaPromise;
  return `${apple} + ${banana}`;
}*/
pickFruits().then(console.log);

//3.useful Promise APIs
// function pickAllFruits() {
//   return Promise.all([getApple(), getBanana()])
//     .then(fruits => fruits.join(' + '));
// }

// pickAllFruits().then(console.log);

// function pickOnlyOne() {
//   return Promise.race([getApple(), getBanana()]);
// }
// pickOnlyOne().then(console.log);