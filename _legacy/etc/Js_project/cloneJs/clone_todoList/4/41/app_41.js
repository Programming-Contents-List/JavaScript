const loginInput = document.querySelector("#login-form input");
const loginButton = document.querySelector("#login-form button");

const mytext = document.querySelector("div:first-child h1");  //내가 입력한 값 출력하는 element

console.log(loginInput);
console.log(loginButton);

onLoginBtnClick = () => {
  const username = loginInput.value;
  // if(username === ""){
  //   alert("plz, write your name");
  // }else if(username.length > 15){
  //   alert("your name is too long.");
  // }
  console.log(username);
}

loginButton.addEventListener("click", onLoginBtnClick);
