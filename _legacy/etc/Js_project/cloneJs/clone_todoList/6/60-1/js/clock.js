const clock = document.querySelector("h2#clock");

getClock =()=>{
  const date = new Date();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  clock.innerText = `${hours}:${minutes}:${seconds}`;
  
}
getClock();
setInterval(getClock, 1000);

//"1".padStart(2,"0"); //=> "1"의 문자열이 2자리여야하고 비어 있을 경우엔 "0"을 넣는다.
//padStrart와 padEnd를 알았다. 0을 넣는 것을 굳이 if문과 같은 조건문을 사용하지 않고 빠르게 구현이 가능하다.