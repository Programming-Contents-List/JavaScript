const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#login-form input");//<form
const greeting = document.querySelector("#greeting");           //<h1

const HIDDEN_CLASSNAME = "hidden";
const USERNAME_KEY = "username";

onLoginSubmit = (event) => {
  event.preventDefault();
  const username = loginInput.value;
  loginForm.classList.add(HIDDEN_CLASSNAME);//loginForm은 숨김
  localStorage.setItem(USERNAME_KEY, username);//localStorage에 저장
  paintGreetings(username);

}

paintGreetings = (username) => {
  greeting.innerText = `Hello, ${username}`;
  greeting.classList.remove(HIDDEN_CLASSNAME);
}

const savedUsername = localStorage.getItem(USERNAME_KEY);

if (savedUsername === null) {
  loginForm.classList.remove(HIDDEN_CLASSNAME);
  loginForm.addEventListener("submit", onLoginSubmit);
} else {
  paintGreetings(savedUsername);
}