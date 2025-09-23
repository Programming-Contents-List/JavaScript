const getHen = () => {
  const value = new Promise((resolve, reject) => {
    setTimeout(() => resolve(`Chicken`), 1000);
  })
  return value;
}
const getEgg = hen => {
  const value = new Promise((resolve, reject) => {
    setTimeout(() => resolve(`${hen} => Egg`), 1000);
  })
  return value;
}
const cook = egg => {
  const value = new Promise((resolve, reject) => {
    setTimeout(() => resolve(`${egg} => meal`), 1000);
  })
  return value;
}

getHen()//
  .then(getEgg)
  .then(hen => getEgg(hen))
  .then(egg => cook(egg))
  .then(meal => console.log(meal));