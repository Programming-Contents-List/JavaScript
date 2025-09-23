//check version
const ver = document.location.href;
alert("Success version!! : "+ ver);
console.log(ver);
const checkVer = document.querySelector("h3.ver");
checkVer.style.color = "skyblue";
checkVer.innerText = "Location is " + ver;


//nickco
const h1 = document.querySelector("div.hello:first-child h1");
//const myColor = h1.style.color = "blue";  

function handleTitleClick(){
 //h1.className = "active";//h1(div.hello:first-child h1)의 클래스이름을 "active"라고 하고 이에 css가 반응을해서 css가 적용이 된다.
  //여기서 h1.className은 getter이면서 setter이다. getter인 이유는 css의 설정들을 가져올 수 있다. setter는 클래스 이름을 새롭게 재,정의 할 수 있기 때문이다.

  const clickedClass = "clicked sexy-font";//여기서 sexy-font는 유지하고 싶으면 어떻게 해야할까?
  if(h1.className === clickedClass){
    h1.className = "sexy-font"; //->내가 수정한 모습은 이렇다만 과연 이것이 좋은 방법일까? 
    //만약 새로운 클래스를 추가하고 계속해서 유지를 해야하는 것이라면 일일이 js에서 className관련 문법들은 모두 수정해야한다. ->아주 번거롭다.
  }else{
    h1.className = clickedClass;
  }
}

h1.addEventListener("click", handleTitleClick);

//여기서 javascript로 모든 classname을 변경하지는 않아야 한다.
