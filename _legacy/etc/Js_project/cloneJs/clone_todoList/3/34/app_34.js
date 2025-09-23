const title = document.querySelector("div.hello:first-child h1");
function handleTilteClick(){
  title.style.color = "blue";
}

function handleMouseEnter(){
  title.innerText = "Mouse is here!"
  console.log("mouse is here!");
}

function hanleMouseLeave(){
  title.innerText = "Mouse is gone!"
  console.log("mouse is gone!");
}

title.addEventListener("click", handleTilteClick);
title.addEventListener("mouseenter", handleMouseEnter);
title.addEventListener("mouseleave", hanleMouseLeave);
console.dir(title);



//이벤트를 찾는 가장 좋은 방법!!
//1 : 구글에서 찾고 싶은 element의 이름, 예를 들어 h1 element -> h1 html element mdn
//2 : console.log(~내가 원하는 element ex)title(변수명),h1이런 식 태그명은 안됨);
//  개발자 창에서 property중에 on이 앞에 붙어 있는 것들이 event이름이다.