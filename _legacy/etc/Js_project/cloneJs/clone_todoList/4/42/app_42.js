//form의 submit event를 감지하게 만드는 것이다.

const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#login-form input");

onLoginSubmit = (event) => {//여기서 event라는 argument는 기본적이 eventObject의 정보를 담아서 보여준다.
  event.preventDefault();//어떤 event의 기본 행동이든지 발생되지 않도록 막는 것 -> event argument랑 기본 f의 argument는 다르다.
  //누군가 for을 submit 하면 브라웆는 기본적으로 페이지를 새로고침 하도록 되어 있다.
  console.log(event);
  console.log(loginInput.value);
}

function mytest(test){
  console.log("test : ", test);
}mytest();

loginForm.addEventListener("submit", onLoginSubmit);
console.log("loginForm :", loginForm);
