//const loginForm = document.getElementById("login-form"); //=>//const loginForm = document.querySelector("#login-form");
//const loginInput = loginForm.querySelector("input"); //=>//const logininput = document.querySelector("input");
const loginInput = document.querySelector("#login-form input");
//const loginButton = loginForm.querySelector("button"); //=>//const btn = document.querySelector("button");
const loginButton = document.querySelector("#login-form button");
const mytext = document.querySelector("div:first-child h1");  //내가 입력한 값 출력하는 element

//console.log(loginForm);
console.log(loginInput);
console.log(loginButton);

// function handleLoginBtnClick(){console.log(loginInput);};

onLoginBtnClick = () => {
  console.dir(loginInput);
  mytext.innerHTML = loginInput.value;
  console.log("click");
};

loginButton.addEventListener("click", onLoginBtnClick);

//event를 확인하는 방법 on이후의 것들은 event이다. ->console.dir(loginButton); 태그명이 아닌 변수를 통한 element를 생성
//6:09