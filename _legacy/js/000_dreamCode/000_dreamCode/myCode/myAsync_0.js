//delivery

function Delay(name) {
  const randTime = (Math.floor(Math.random() * 5) + 1) * 1000
  console.log(`예상시간:${randTime}`)
  return new Promise((res, rej) => {
    setTimeout(() => { res(`${name} is Arrive!! ${randTime / 1000}s`) }, randTime);
  });
}

async function delivery(name) {
  console.log(`${name} is Start!`)
  const delay = await Delay(name);
  return delay
}

// async function order() {
//   const delivery_1 = await delivery('delivery_1');
//   const delivery_2 = await delivery('delivery_2');
//   const delivery_3 = await delivery('delivery_3');
//   console.log(`${delivery_1}, ${delivery_2}, ${delivery_3}`)
//   return 'Done!!'
// }

// order().then(message => {
//   console.log(message)
// })

const delivery_1 = delivery('delivery_1');
delivery_1.then(console.log);
const delivery_2 = delivery('delivery_2');
delivery_2.then(console.log);
const delivery_3 = delivery('delivery_3');
delivery_3.then(console.log);


function order() {
  const delivery_1 = delivery('delivery_1');
  delivery_1.then(console.log);
  const delivery_2 = delivery('delivery_2');
  delivery_2.then(console.log);
  const delivery_3 = delivery('delivery_3');
  delivery_3.then(console.log);
  // console.log(`${delivery_1}, ${delivery_2}, ${delivery_3}`)
  return 'Done!!'
}

// function Race() {
//   return Promise.race([delivery('delivery_1'), delivery('delivery_2'), delivery('delivery_3')])
// }
// Race().then(console.log);