let value = 10;
const filter = (...args) => {
  return args.filter(el => el === value);
}

console.log(filter(value, 2, 3));