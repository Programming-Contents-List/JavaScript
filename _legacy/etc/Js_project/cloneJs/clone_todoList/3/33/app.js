const title = document.querySelector("div.hello:first-child h1");//:first-child h1이건 어떻게 사용하는 건지 잘 모르겠음.
//-> :first-child h1은 첫번째 h1만 해당 되는 것 이것을 제외하면 h1 전체를 지칭한다. -> 그럼 두번째는?
//const title = document.querySelector("div.hello");
function handleTilteClick(){
  //console.log("title was clicked!");
  title.style.color = "blue";
  title.innerHTML = "Example addEventListener"
}

const Click = function(){
  title.style.color = "red";
  title.innerHTML = "익명함수"
}//익명함수

const arrowClick = () => {
  title.style.color = "green";
  title.innerHTML = "Arrow";
}//화살표함수

title.addEventListener("click", handleTilteClick);
//"click"은 event 종류 중 하나의 이름이다. handleTilteClick은 listen되는 함수 대상이다.
console.dir(addEventListener);
console.log(addEventListener);