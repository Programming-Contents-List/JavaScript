const story = document.querySelector("#story"); //스토리 내용 기입
const quest = document.querySelector("#quest"); //퀘스트 내용 기입
const dice = document.querySelector("#dice"); //주사위 숫자 기입
const dic_btn = document.querySelector("#dic_btn");

//게임 진행 조건
//day = 5 퀘스트 생성
//day = 1 작업 생성

//clock요소 가져오는 변수
const isday = document.querySelector("#day");

//버튼
const attack = document.querySelector("#atk");
const run = document.querySelector("#run");
const buy = document.querySelector("#buy");
const sale = document.querySelector("#sale");

if ((isday % 2) == 0) {
  console.log("0");
} else { console.log("hi"); }

//랜덤으로 주사위 만들기
function dicePlay() {
  console.log("check");
  //dice의 여러 상태의 조건에따라 실행이 되고 안되고를 만들어야한다.
  let num = Math.floor((Math.random() * 9) + 1);
  dice.innerText = `Dice : ${num}`;

}

dic_btn.addEventListener("click", dicePlay);


