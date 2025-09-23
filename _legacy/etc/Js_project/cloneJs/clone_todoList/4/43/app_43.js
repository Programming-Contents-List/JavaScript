//이번 강의와 4-2()의 강의 때 이밴트의 원리와 구동 방식을 너무 잘 설명하고 있다. 여러번 들어도 손색이 없다.
const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#login-form input");

const link = document.querySelector("a");

onLoginSubmit = (event) => {
  event.preventDefault();
  console.log(event);
  console.log(loginInput.value);
}

handleLinkClick=(event)=>{
  event.preventDefault();
  console.dir(event);
  //console.log(event); //pointevet가 출력된다. 이것은 MouseEvent와 다르지 않다. 오히려 pointEvent가 기능이 훨 많다.
  //alert("Click!!");
}

loginForm.addEventListener("submit", onLoginSubmit);
link.addEventListener("click", handleLinkClick)