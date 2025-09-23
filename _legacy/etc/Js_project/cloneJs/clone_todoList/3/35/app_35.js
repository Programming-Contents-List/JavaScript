//check version
const ver = document.location.href;
alert("Success version!! : "+ ver);
console.log(ver);
const checkVer = document.querySelector("h3.ver");
checkVer.style.color = "skyblue";
checkVer.innerText = "Location is " + ver;


//nickco
const h1 = document.querySelector("div.hello:first-child h1");


function handleTitleClick(){
  h1.style.color = "blue";
}

function handleMouseEnter(){
  h1.innerText = "Mouse is here!"
  console.log("mouse is here!");
}

function handleMouseLeave(){
  h1.innerText = "Mouse is gone!"
  console.log("mouse is gone!");
}

function handleWindowResize(){
  document.body.style.backgroundColor = "tomato";
}

handleWindowCopy = () =>{
  alert("copier!!");
}

h1.addEventListener("click", handleTitleClick);
//=h1.onclick = handleTitleClick;
h1.addEventListener("mouseenter", handleMouseEnter);
//=h1.onmouseenter = handleMouseEnter;
h1.addEventListener("mouseleave", handleMouseLeave);
//.addEventListener를 권장한다. 이유는 .removeEventListener를 사용해서 제거할 수 있다.


//window와 document의 차이는? https://developer-talk.tistory.com/125
//window는 브라우저 창 document는 HTML 문서객체 -> document in window
window.addEventListener("resize", handleWindowResize);
window.addEventListener("copy", handleWindowCopy);//화살표 함수 사용 하지만 기존 함수 사용시 변환된 글자 색이 다름
window.addEventListener("offline", handleWindowOffline = () =>{alert("Woops! Wifi is Offline")}); //화살표 함수를 활용해 한줄로 요약
window.addEventListener("online", handleWindowOnline = () =>{alert("Yesss! Wifi is Online")});


