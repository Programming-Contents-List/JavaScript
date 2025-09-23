//게임 진행 조건
//day = 5 퀘스트 생성
//day = 1 작업 생성
const item = document.querySelector("#item");
const price = document.querySelector("#price");

const power = document.querySelector("#power"); let POW = 10;
const hp = document.querySelector("#hp"); let HP = 100;
const work = document.querySelector("#work");
let WORK = 1;
let PRICE = 0;//STORE의 값을 return 받기 하기위한 price
let itemdice = 0;

//랜덤으로 주사위 만들기
//DICE함수
function dicePlay(dice) {
  //dice의 여러 상태의 조건에따라 실행이 되고 안되고를 만들어야한다.
  let DICE = Math.floor((Math.random() * 9) + 1);
  dice.innerText = `Dice : ${DICE}`;
  store(DICE);
  return (PRICE);
}
//STORE함수
function store(_dice_) {
  if ((_dice_ % 2) == 0) {
    PRICE = _dice_ * 1.5; //상품 가격 정하는 식

    //새로운 랜덤 숫자 발생
    itemdice = Math.floor((Math.random() * 9));
    console.log(`${itemdice}-STORE IS OPEN!! COME ON IN!!`)
    //아이템 종류
    switch (itemdice) {
      case 0:
        price.innerText = `가격 : 0c`; item.innerText = "BOOM!!";
        console.log(`${itemdice}: 0c-->꽝`);
        break;
      case 1:
        price.innerText = `가격 : ${PRICE}c`; item.innerText = "아이템 : 도끼(W+5)";
        console.log(`${itemdice}: ${PRICE}c-->도끼(W+5)`);
        break;
      case 2:
        price.innerText = `가격 : ${PRICE}c`; item.innerText = "아이템 : 삽(W+3)";
        console.log(`${itemdice}: ${PRICE}c-->삽(W+3)`);
        break;
      case 3:
        price.innerText = `가격 : ${PRICE}c`; item.innerText = "아이템 : 빵(HP+3)";
        console.log(`${itemdice}: ${PRICE}c-->빵(HP+3)`);
        break;
      case 4:
        price.innerText = `가격 : ${PRICE}c`; item.innerText = "아이템 : 포션(HP+5)";
        console.log(`${itemdice}: ${PRICE}c-->포션(HP+5)`);
        break;
      case 5:
        price.innerText = `가격 : ${PRICE}c`; item.innerText = "아이템 : 돼지(HP + 15)";
        console.log(`${itemdice}: ${PRICE}c-->돼지(HP+15)`);
        break;
      case 6:
        price.innerText = `가격 : ${PRICE}c`; item.innerText = "아이템 : 검(POW+10)";
        console.log(`${itemdice}: ${PRICE}c-->검(POW+10)`);
        break;
      case 7:
        price.innerText = `가격 : ${PRICE}c`; item.innerText = "아이템 : 창(POW+8)";
        console.log(`${itemdice}: ${PRICE}c-->창(POW+8)`);
        break;
      case 8:
        price.innerText = `가격 : ${PRICE}c`; item.innerText = "아이템 : 독(Poison_False)";
        console.log(`${itemdice}: ${PRICE}c-->독(Poison_False)`);
        break;
      case 9:
        price.innerText = `가격 : ${PRICE}c`; item.innerText = "아이템 : 부적(Stamina)";
        console.log(`${itemdice}: ${PRICE}c-->부적(Stamina)`);
        break;
    }
  }
  else {
    price.innerText = "CLOSE"; item.innerText = "CLOSE";
    console.log("STORE IS CLOSE..SEE YOU!!");
    //여기서 buy를 어떻게 하면.. update에서 활성화가 가능할까?
    const buy = document.querySelector("#buy");
    buy.disabled = true;
    //price의 가격을 지울지 고민중
  }
  return PRICE;
}//function store(_dice_) {

function getStore(myMoney) {
  myMoney -= PRICE;
  switch (itemdice) {
    case 0:
      price.innerText = `가격 : 0c`; item.innerText = "BOOM!!";
      console.log(`${itemdice}: 0c-->꽝`);
      break;
    case 1:
      WORK += 5;
      work.innerText = `노동력 : ${WORK}`;
      break;
    case 2:
      WORK += 3;
      work.innerText = `노동력 : ${WORK}`;
      break;
    case 3:
      HP += 3;
      hp.innerText = `HP : ${HP}`;
      break;
    case 4:
      HP += 5;
      hp.innerText = `HP : ${HP}`;
      break;
    case 5:
      HP += 15;
      hp.innerText = `HP : ${HP}`;
      break;
    case 6:
      POW += 10;
      power.innerText = `POW : ${POW}`;
      break;
    case 7:
      POW += 8;
      power.innerText = `POW : ${POW}`;
      break;
    case 8:
      price.innerText = `가격 : ${PRICE}c`; item.innerText = "아이템 : 독(Poison_False)";
      console.log(`${itemdice}: ${PRICE}c-->독(Poison_False)`);
      break;
    case 9:
      price.innerText = `가격 : ${PRICE}c`; item.innerText = "아이템 : 부적(Stamina)";
      console.log(`${itemdice}: ${PRICE}c-->부적(Stamina)`);
      break;
  }

  return myMoney;
}

function getWork() {//노동하기 버튼 함수
  WORK;
  return WORK;
}

function setWork(setWORK) {
  WORK = setWORK;
}

export { dicePlay, store, getStore, getWork };
