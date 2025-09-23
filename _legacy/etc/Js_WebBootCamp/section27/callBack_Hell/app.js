// setTimeout(() => {
//   document.body.style.backgroundColor = 'red';
//   setTimeout(() => {
//     document.body.style.backgroundColor = 'orange';
//     setTimeout(() => {
//       document.body.style.backgroundColor = 'yellow';
//       setTimeout(() => {
//         document.body.style.backgroundColor = 'green';
//         setTimeout(() => {
//           document.body.style.backgroundColor = 'blue';
//         }, 1000)
//       }, 1000)
//     }, 1000)
//   }, 1000)
// }, 1000)

let i = 0;


const delayedColorChange = (newColor, delay, doNext) => {
  setTimeout(() => {
    document.body.style.backgroundColor = newColor;
    console.log(`test ${doNext}`);
    doNext && doNext();//doNext()가 정의가 안되어 있으면 오류 발생 그래서 애초에
    //doNext에서 (doNext안에 doNext()가 정의가 안되어 있으면 undefined이다) false를 호출하고 doNext()함수가 애초에 실행이 안되게 하는 것.

  }, delay)
}

// delayedColorChange('olive', 1000, () => { });


delayedColorChange('olive', 1000, () => {
  delayedColorChange('orange', 1000, () => {
    delayedColorChange('yellow', 1000, () => {
      delayedColorChange('green', 1000, () => {
        delayedColorChange('blue', 1000,);
      })
    })
  })
});
// const delayedColorChange = (newColor, delay, doNext) => {
//   setTimeout(() => {
//     document.body.style.backgroundColor = newColor;

//     doNext(); // doNext가 정의되어 있지 않은 경우 에러 발생
//   }, delay)
// }

// delayedColorChange('olive', 1000, () => {
//   console.log('olive');
// });
