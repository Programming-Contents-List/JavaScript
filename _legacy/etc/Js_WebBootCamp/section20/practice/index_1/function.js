// // array([1,2,3]);
// function array(num) {
//   // num = {}; 
//   console.log(num.length);
//   for (let i = 0; i < num.length; i++) {
//     console.log(`num${num.length - 1} => ${num[num.length - 1]}`);
//   }
// }

// array([1, 2, 3]);

// DEFINE YOUR FUNCTION BELOW:
function lastElement(num) {
  if (num.length !== 0) {
    console.log(num[num.length - 1]);
    return num[num.length - 1];
  }
  else {
    console.log(null);
    return null;
  }
}

lastElement([3, 5, 7]);
lastElement([1]);
lastElement([]);