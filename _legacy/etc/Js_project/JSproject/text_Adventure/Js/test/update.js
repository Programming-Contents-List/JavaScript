//STANDARD VALUE
//시간
const clock = document.querySelector("#clock");
const day = document.querySelector("#day");
const time = document.querySelector("#time");

//시나리오
const WorkTm = document.querySelector("#WorkTm"); //스토리 내용 기입
const quest = document.querySelector("#quest"); //퀘스트 내용 기입

//버튼
const attack = document.querySelector("#atk");
const run = document.querySelector("#run");

const buy = document.querySelector("#buy");
//const sale = document.querySelector("#sale"); //sale.Style.Color = "gray";

//상황조건
const money = document.querySelector("#money");
buy.disabled = true;
// let MONEY = 0;

//------------------------------------------------------------------------function.js
import { dicePlay } from "./function.js";
import { getStore } from "./function.js";
import { getWork } from "./function.js";
import { getMoney, setMoney } from "./bank.js";

let myMoney = getMoney();//return값을 받기위한 변수
//그래서 myMoney는 set함수로 전달하기 위한 변수
//dice
const dice = document.querySelector("#dice");
const dic_btn = document.querySelector("#dic_btn");
let PRICE = 0;//상품 가격

//콜백함수에 주의
dic_btn.addEventListener("click", () => {
  buyMsg.innerText = "";
  if (getMoney() > 0) {
    buy.disabled = false;
    // let DICE = 0;//구매버튼을 눌렀을 시, dice의 주사위는 0
    PRICE = dicePlay(dice);
  }//여기가 조금 어색하다...
  //PRICE의 dicePlay는 
  //dicePlay(dice);
  //myMoney ;
  setMoney(myMoney -= 1);
  money.innerText = `Money : ${getMoney()}c`;
  console.log(getMoney());

  if (getMoney() < 0) {
    setMoney(getMoney() = 0);
    money.innerText = `Money : ${getMoney()}c`;
    const buyMsg = document.querySelector("#buyMsg");
    buyMsg.innerText = "주사위 더 이상 불가능";
  }
}
);

//구매버튼
function buyBtn() {
  const buyMsg = document.querySelector("#buyMsg");
  // console.log(`click ${PRICE} ${myMoney}`);
  if (!(getMoney() < PRICE)) {
    getStore(getMoney());
    setMoney(myMoney -= PRICE);
    money.innerText = `Money : ${getMoney()}c`;
    buyMsg.innerText = "구매완료";
    buy.disabled = true;

  } else {
    buyMsg.innerText = "구매불가";
    buy.disabled = true;
  }
}

buy.addEventListener("click", buyBtn);


//------------------------------------------------------------------------function.js

//------------------------------> update()
let daycount = 1;

function update() {

  const date = new Date();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  clock.innerText = `${hours}:${minutes}:${seconds}`;
  time.innerText = `Time : ${seconds}`;

  //퀘스트
  if (seconds === "00") {
    console.log("quest!!");// -> 함수 발생
    daycount += 1;
    // console.log("daycount" + daycount);
    day.innerText = `Day : ${daycount}`;
  }

  //시간 조건 노동
  if (!((daycount % 2) > 0)) {
    WorkTm.innerText = "노동하기"; //수락이나 버튼을 눌렀을 때 반응해서 money가 올라가게 만들기 이후에 액션들이 추가될 것

    //노동-button 생성
    const btn = document.createElement("button");
    btn.innerText = "수락";
    WorkTm.appendChild(btn);
    btn.addEventListener("click", () => {
      setMoney(myMoney += getWork());// MONEY;
      money.innerText = `Money : ${getMoney()}c`;
      console.log(`myMoney:${myMoney}`);
      console.log(`getMoney:${getMoney()}`);
      // console.log("myMoney" + myMoney);
    });
  } else if ((daycount % 2) > 0) {
    WorkTm.innerText = "NOT YET!";
    // console.log("NOT YET");
  }

  // console.log(`${daycount},${daycount % 2}`);
}//------------------------------> update()


setInterval(update, 1000);
