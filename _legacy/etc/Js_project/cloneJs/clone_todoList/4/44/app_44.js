const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#login-form input");
//const myText = document.querySelector("h1");//나는 그냥 h1태그를 가지고 왔지만 여기선 id로 가지고 온다.
const greeting = document.querySelector("#greeting");
//const reText = document.querySelector("h1.hidden"); //-> 클래스를 지운다고 굳이 클래스를 또 따로 불러올 필요가 없다. 
//결과적으론 greeting에서 id로 지정을 했기때문에 또 다시 호출 할 필요는 없다.

const HIDDEN_CLASSNAME = "hidden";

onLoginSubmit = (event) => {
  //loginForm.add
  event.preventDefault();
  console.log(event);

  const username = loginInput.value;
  console.log(username);
  //css 클래스 이름으로..
  loginForm.classList.add(HIDDEN_CLASSNAME);  //form을 숨기는 것
  
  greeting.innerText = `Hello, ${username}`;   // = greeting.innerText = "Hello, " + username;//=> myText.innerText = username;        //사용자 이름 h1에 대입
  greeting.classList.remove(HIDDEN_CLASSNAME);//=> reText.classList.remove("hidden");  //기존 h1의 크랠스 네임 왜 숨기냐면 자리 차지
  
  
 
  
}

loginForm.addEventListener("submit", onLoginSubmit);