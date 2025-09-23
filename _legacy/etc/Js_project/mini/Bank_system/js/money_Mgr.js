import { money } from "./variable_Mgr.js"
//import한 머니가 업데이트가 되지 않아서다.
export const My_money = {
  money: money,//{ money },//배열을 사용한다.
  //여기에서 money의 값이 저장되는 것인가?

  get_money() {
    console.log(My_money.money);
    return My_money.money;
  },

  set_money(m) {
    My_money.money = m;
    console.log(`My_money.money : ${My_money.money}/m : ${m}`)
    return My_money.money;
  },
}

