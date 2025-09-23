console.log("==CONTACT!!==");

/*function Delay(ms) {
  const delay = new Promise((res) => { res(`'성공'=>${ms}`) })
  return delay;
}
const newDelay = Delay(1000);
newDelay.then(console.log)
*/
//위코드의 간결화
/* const Delay = (ms) => {
  return new Promise((res) => { res(`'성공'=>${ms}`) })
}
Delay(1000).then(console.log); */

/*
//아래코드는 오류를 발생시킨다.
function Delay(ms) {
  const delay = new Promise((res) => {
    setTimeout(res('success'), ms)
  })
  return delay;
}
const newDelay = Delay(3000);
newDelay.then(success => { console.log(success) })
// Delay(3000).then((result) => {
//   console.log(result);
//   // 실행할 코드 작성
// });
*/
//위코드는 실행착오이다.
function Delay(ms) {
  const delay = new Promise((res) => {
    setTimeout(function () { res('success') }, ms)
  })
  return delay;
}
const newDelay = Delay(3000);
newDelay.then(success => { console.log(success) })