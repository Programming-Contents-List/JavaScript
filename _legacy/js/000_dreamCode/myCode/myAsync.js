console.log('===CONTACT!!===')
function Delay(ms) {
  const delay = new Promise((res) => {
    setTimeout(function () { res('success!!!') }, ms)
  })
  return delay;
}
// const newDelay = Delay(3000);
// newDelay.then(success => { console.log(success) })

async function getApple() {
  const apple = await Delay(3000);
  console.log('get a Apple');
  return apple;
}

async function getApple() {
  const apple = await Delay(3000);
  // console.log('get a Apple');
  return 'get a Apple';
}

const Apple = getApple();
Apple.then(apple => console.log(apple))