console.log("async");
//1.async

//normal function
/*function fetchUser() {
  return 'ellie'
}*/

//promise function
/*function fetchUser() {
  return new Promise((resolve, reject) => {
    resolve('ellie');
  })
}*/

//promise function2
function fetchUser() {
  return new Promise((resolve) => {
    resolve('ellie');
  })
}

//async function
/*async function fetchUser() {
  return 'ellie';
}*/

const user = fetchUser();
user.then(console.log);//이렇게 표기가 되는 것.. 어떻게 되는거지?
// console.log(user);