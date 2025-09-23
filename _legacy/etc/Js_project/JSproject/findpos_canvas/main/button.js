//button 동작 구현 script
import { ran } from "./random.js";
import * as get_id from "./get_id.js"

//get_id
// let btn = document.querySelector('#btn');
// let pos = document.querySelector('#position_value');
// let color = document.querySelector('#color_value');

//ran_value_ctrl
let ran_value = () => {
  //position value
  let x = ran(10);
  let y = ran(10);

  //color value
  let color_x = ran(10);
  let color_y = ran(10);

  // edited text
  //pos_ran_value
  get_id.pos.innerHTML = `position : ${x} : ${y}`;
  //color_ran_value
  get_id.color.innerHTML = `color : ${color_x} : ${color_y}`;
}

//event함수에서 화살표 함수가 필요하고 필요하지 않은 상황을 명확히 알 필요가 있다.
btn.addEventListener('click', ran_value);