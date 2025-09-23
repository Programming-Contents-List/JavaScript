console.log("input_mgr.js : import!")

import { My_money } from "./money_Mgr.js"
// import { plus_btn, min_btn } from "./btn_mgr.js";
const input_Ctrl = document.querySelector(".input_Ctrl");//input form
const input_data = document.querySelector(".input_data");//input value


input_Ctrl.addEventListener("submit", (e) => {
  e.preventDefault();
  // My_money.money = input_data.value;
  My_money.set_money(input_data.value);
  // plus_btn.innerHTML = `+${input_data.value}`;
  console.log(`Submit : ${My_money.get_money()}`);
})