let money = 10;

function getMoney() {
  console.log(`bank Getmoney : ${money}`);
  return money;
}

function setMoney(setMoney) {
  money = setMoney;
  if (setMoney < 0) {
    money = 0;
  }
  console.log(`bank Setmoney : ${money}`);
}

export { getMoney, setMoney };
