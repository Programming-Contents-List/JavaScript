import { ran } from "../random.js";
import { create_shape_A_type } from "../create_shape.js";
import { create_shape_B_type } from "../create_shape.js";
import { shape_delete } from "../create_shape.js";

//create_zone
//-------------------------------get_id_area

//btn_area
let ran_btn = document.querySelector('#ran_btn');//random_btn
let btn_delete = document.querySelector('#btn_delete');//delete_btn

//--------------------------------event_area
ran_btn.addEventListener('click',
  () => {
    //ctx.rect(x,y,width,height)
    create_shape_A_type(ran(480), ran(320), ran(50), ran(50))
  });

btn_delete.addEventListener('click',
  () => { shape_delete(); console.log("delete") })