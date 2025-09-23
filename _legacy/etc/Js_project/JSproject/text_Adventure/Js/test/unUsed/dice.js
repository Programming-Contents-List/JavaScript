// import {buy} from './update';??
//자바스크립트에서 자바스크립트 호출
//다이스는 이동 횟수를 의미..

const dice = document.querySelector("#dice"); //주사위 숫자 기입
const dic_btn = document.querySelector("#dic_btn");

//게임 진행 조건
//day = 5 퀘스트 생성
//day = 1 작업 생성

//랜덤으로 주사위 만들기
//DICE함수
function dicePlay() {
  console.log("check");
  //dice의 여러 상태의 조건에따라 실행이 되고 안되고를 만들어야한다.
  let DICE = Math.floor((Math.random() * 9) + 1);
  let PRICE = 0;
  dice.innerText = `Dice : ${DICE}`;
  store(DICE, PRICE);
  console.log(DICE);
}

//update.js BUTTON VALUE
//relate STORE BTN
const BUY = document.querySelector("#buy");
const SALE = document.querySelector("#sale");
const MONEY = document.querySelector("#money");
//store 조건

const item = document.querySelector("#item");
console.log(item);
const price = document.querySelector("#price");
// const price

//다이스 조건
//STORE함수
function store(_dice_, _price_) {
  if ((_dice_ % 2) == 0) {
    _price_ = _dice_ * 1.5;
    //새로운 랜덤 숫자 발생
    let itemdice = Math.floor((Math.random() * 9));
    console.log(`${itemdice}-STORE IS OPEN!! COME ON IN!!`)
    //아이템 종류
    switch (itemdice) {
      case 0:
        price.innerText = `가격 : ${_price_}c`; item.innerText = "BOOM!!";
        console.log(`${itemdice}: ${_price_}c-->꽝`);
        break;
      case 1:
        price.innerText = `가격 : ${_price_}c`; item.innerText = "아이템 : 도끼(M+5)";
        console.log(`${itemdice}: ${_price_}c-->도끼(M+5)`);
        break;
      case 2:
        price.innerText = `가격 : ${_price_}c`; item.innerText = "아이템 : 삽(M+3)";
        console.log(`${itemdice}: ${_price_}c-->삽(M+3)`);
        break;
      case 3:
        price.innerText = `가격 : ${_price_}c`; item.innerText = "아이템 : 빵(HP+3)";
        console.log(`${itemdice}: ${_price_}c-->빵(HP+3)`);
        break;
      case 4:
        price.innerText = `가격 : ${_price_}c`; item.innerText = "아이템 : 포션(HP+5)";
        console.log(`${itemdice}: ${_price_}c-->포션(HP+5)`);
        break;
      case 5:
        price.innerText = `가격 : ${_price_}c`; item.innerText = "아이템 : 돼지(HP + 15)";
        console.log(`${itemdice}: ${_price_}c-->돼지(HP+15)`);
        break;
      case 6:
        price.innerText = `가격 : ${_price_}c`; item.innerText = "아이템 : 검(POW+10)";
        console.log(`${itemdice}: ${_price_}c-->검(POW+10)`);
        break;
      case 7:
        price.innerText = `가격 : ${_price_}c`; item.innerText = "아이템 : 창(POW+8)";
        console.log(`${itemdice}: ${_price_}c-->창(POW+8)`);
        break;
      case 8:
        price.innerText = `가격 : ${_price_}c`; item.innerText = "아이템 : 독(Poison_False)";
        console.log(`${itemdice}: ${_price_}c-->독(Poison_False)`);
        break;
      case 9:
        price.innerText = `가격 : ${_price_}c`; item.innerText = "아이템 : 부적(Stamina)";
        console.log(`${itemdice}: ${_price_}c-->부적(Stamina)`);
        break;
    }
  }
  else {
    price.innerText = "CLOSE"; item.innerText = "CLOSE";
    console.log("STORE IS CLOSE..SEE YOU!!");
  }
}

dic_btn.addEventListener("click", dicePlay);
