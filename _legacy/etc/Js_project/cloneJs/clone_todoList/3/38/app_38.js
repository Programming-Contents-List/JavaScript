//check version
const ver = document.location.href;
alert("Success version!! : "+ ver);
console.log(ver);
const checkVer = document.querySelector("h3.ver");
checkVer.style.color = "skyblue";
checkVer.innerText = "Location is " + ver;


//nickco
const h1 = document.querySelector("div.hello:first-child h1");//이것은 중요
//test
function handleTitleClick_Test(){
  const clickedClass = "clicked";//clicked sexy-font 이렇게 작성하면 오류가난다.
  if(h1.classList.contains(clickedClass)){
    //DOMTokenList.contains(token)
    h1.className = ""; 
  }else{
    h1.className = clickedClass;
  }
}

function handleTitleClick1(){
  const clickedClass = "clicked";//clicked sexy-font 이렇게 작성하면 오류가난다.
  if(h1.classList.contains(clickedClass)){
    h1.classList.remove(clickedClass); 
  }else{
    h1.classList.add(clickedClass);
  }
}

function handleTitleClick(){
  h1.classList.toggle("clicked");
}

h1.addEventListener("click", handleTitleClick);
