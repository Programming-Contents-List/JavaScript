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
  //myColor = "blue";  
    const currentColor = h1.style.color;//기본값
  let newColor;                       //변경되는 값
  //===는 값이 일치함을 확인 하는 것  
  if(currentColor === "blue"){
    newColor = "tomato";
  } else{newColor = "blue";}
  h1.style.color = newColor;
}

//작동함
function handleTitleClick0(){
  let currentColor = h1.style.color;  
  //nothing ->string을 집어 넣은 것이지 프로퍼티들이 있거나 그런것은 아니다.
  //currentColor에는 h1.style.color가 들어 있으니 값변경이 바로 되지 않나?
  console.log("inside : ", currentColor);

  if(currentColor === "blue"){
    currentColor = "tomato";//블루이면 클릭시 토마토

  } else{
    currentColor = "blue";//블루가 아니라면 클릭시 토마토
    console.log("else : ",currentColor);
  }
  h1.style.color = currentColor;//이게 무조건 있어야함
}

//작동함
function handleTitleClick0_1(){
  let currentColor = h1.style.color;  //nothing
  //currentColor에는 h1.style.color가 들어 있으니 값변경이 바로 되지 않나?
  console.log("inside : ", currentColor);

  if(currentColor === "blue"){
    //*keyPoint=
    currentColor = h1.style.color = "tomato";//블루이면 클릭시 토마토

  } else{
    //*keyPoint=
    currentColor = h1.style.color = "blue";//블루가 아니라면 클릭시 토마토

    console.log("else : ",currentColor);
  }
  //h1.style.color = currentColor;//이게 무조건 있어야함
}

console.log("outside : ",h1.style.color);

//작동안함
//h1.style.color = "black"; console.log(h1.style.color);
function handleTitleClick1(){
  let currentColor = h1.style.color;
  console.log(currentColor);
  currentColor = "blue";  
  //currentColor안에 h1의 color를 넣었지만 아니다. string타입의 값이 넣어진 것 뿐이다.
  console.log(currentColor);
}

h1.addEventListener("click", handleTitleClick1);

