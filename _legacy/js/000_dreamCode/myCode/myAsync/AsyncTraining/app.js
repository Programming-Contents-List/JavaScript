function count(delay) {
  return setInterval((count) => {
    count = 0;
    if (count < delay) { count++; }
  }, delay, delay)
}

//delay의 반환 값을 얻기 위해 따로 함수를 생성
function delay() {
  const delay = (Math.floor(Math.random() * 10)) * 1000;
  console.log(delay);//체크포인트
  return delay;
}
const delayTime = delay();

// const delay = () => { return (Math.floor(Math.random() * 10)) * 1000; };
let check = true;
function fakeServer() {
  //프로미스를 통한 접속 완료
  // console.log(delay);//체크포인트
  return new Promise((res) => {
    setTimeout(() => { res("CONTACT"), check = false; }, delayTime)
  }
  );
}

// function stop() {
//   console.log("stopped")
//   clearInterval(countDown)
// } let counting = 0;
// let countDown = setInterval(() => { counting += 1; console.log(counting, check); }, 1000);

// if (check === false) {
//   stop();
// }

async function conTact() {
  console.log('Contacting')
  return await fakeServer();
}

conTact().then(console.log);