console.log("btn_mgr.js : import!");
import { My_money } from "./money_Mgr.js";

const Btn_ctrl = document.querySelector(".Btn_ctrl")
const show_interface = document.querySelector(".show");

export const plus_btn = document.querySelector(".plus_btn").innerHTML = `+${My_money.money}`;
export const min_btn = document.querySelector(".min_btn").innerHTML = `-${My_money.money}`;
console.log(`My_money : ${My_money.money}`)

// console.log(`${plus_btn}/${min_btn}`)
Btn_ctrl.addEventListener("click", (e) => {
  e.preventDefault();
  let target = e.target;
  if (target.classList.contains('plus_btn')) {
    My_money.set_money(My_money.money + My_money.get_money());
    show_interface.innerHTML = `${My_money.get_money()}`

  } else if (target.classList.contains('min_btn')) {
    My_money.set_money(My_money.money - My_money.get_money());
    show_interface.innerHTML = `${My_money.get_money()}`

  } else if (target.classList.contains('check_My_money')) {
    alert(`${My_money.get_money()}`)
  }
});
