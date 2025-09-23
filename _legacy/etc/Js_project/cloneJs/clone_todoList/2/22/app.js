// const title = document.getElementById("something");
// title.innerText = "Got you!";
// console.log(title.className);

//단순한 hello class를 가지고 오는 것
const hellos = document.getElementsByClassName("hello");
console.log(hellos);

//여기선 div 태그 안에 있는 h1을 불러오는 것
const title = document.getElementsByTagName("h1"); //h1 태그 모두를 가지고 오는 모습이다.
console.log(title);

const mytitle = document.querySelectorAll(".hello h1");//querySelecotr은 element를 CSS방식으로 검색할 수 있다.-> css selector
//const mytitle = document.getElementsByClassName("hello");는 const mytitle = document.querySelectorAll(".hello")과 같다. ->id도 마찬가지이다.
console.log(mytitle);//결과는 오로지 첫번째 .hello h1만 나온다. 모두 나오게 한다면 querySelectorAll을 하면 된다

