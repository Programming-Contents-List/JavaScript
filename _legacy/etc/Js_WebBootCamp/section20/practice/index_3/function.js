function sumArray(num) {
  let sum = 0;
  for (let i = 0; i < num.length; i++) {
    sum += num[i];
  }
  console.log(sum);
  return sum;
}
sumArray([1, 2, 3]) // 6
sumArray([2, 2, 2, 2]) // 8
sumArray([50, 50, 1]) // 101