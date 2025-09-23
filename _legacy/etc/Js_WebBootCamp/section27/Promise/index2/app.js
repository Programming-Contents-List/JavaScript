// const delayedColorChange = (newColor, delay, doNext) => {
//   setTimeout(() => {
//     document.body.style.backgroundColor = newColor;
//     console.log(`test ${doNext}`);
//     doNext && doNext();
//   }, delay)
// }

// delayedColorChange('olive', 1000, () => {
//   delayedColorChange('orange', 1000, () => {
//     delayedColorChange('yellow', 1000, () => {
//       delayedColorChange('green', 1000, () => {
//         delayedColorChange('blue', 1000,);
//       })
//     })
//   })
// });

const DelayedColorChange = (color, delay) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      document.body.style.backgroundColor = color;
      resolve();
    }, delay)
  })
}

DelayedColorChange('red', 1000)
  .then(() => DelayedColorChange('orange', 1000))
  .then(() => DelayedColorChange('green', 1000))
  .then(() => DelayedColorChange('yellow', 1000))
  .then(() => DelayedColorChange('orange', 1000))
  .then(() => DelayedColorChange('#006d77', 1000))
  .then(() => DelayedColorChange('violet', 1000))
