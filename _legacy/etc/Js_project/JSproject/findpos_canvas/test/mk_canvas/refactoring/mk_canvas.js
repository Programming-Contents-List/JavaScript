import { ran } from "../random.js";
import { create_shape_A_type } from "../create_shape.js";
import { create_shape_B_type } from "../create_shape.js";
import { shape_delete } from "../create_shape.js";

//create_zone
//-------------------------------get_id_area
//canvas를 id로 가져온다.
let canvas = document.getElementById("myCanvas");
//btn_area
let btn_1 = document.querySelector('#btn_1');
let btn_2 = document.querySelector('#btn_2');
let btn_3 = document.querySelector('#btn_3');
//random_btn
let ran_btn = document.querySelector('#ran_btn');
//delete_btn
let btn_delete = document.querySelector('#btn_delete');
//--------------------------------------canvas_property_area
//canvas의 type을 2d형식으로 지정한다.
let ctx = canvas.getContext("2d");

//--------------------------------------create_canvas_shape_area
//ctx.rect(x,y,width,height)
// let shape_1 = () => {
//   ctx.beginPath();
//   ctx.rect(20, 40, 50, 50);
//   ctx.fillStyle = "#FF0000";
//   ctx.fill();
//   ctx.closePath();
// }

// let shape_2 = () => {
//   ctx.beginPath();
//   ctx.arc(240, 160, 20, 0, Math.PI * 2, false);
//   ctx.fillStyle = "green";
//   ctx.fill();
//   ctx.closePath();
// }

// let shape_3 = () => {
//   ctx.beginPath();
//   ctx.rect(160, 10, 100, 40);
//   ctx.strokeStyle = "rgba(0, 0, 255, 0.5)";
//   ctx.stroke();
//   ctx.closePath();
// }

//canvas delete 하는 함수
// let shape_delete = () => {
//   ctx.clearRect(0, 0, canvas.width, canvas.height);
// }

//--------------------------------------btn_event_area
// btn_1.addEventListener('click', () => { shape_1(20, 40, 50, 50); });
// btn_2.addEventListener('click', shape_2);
// btn_3.addEventListener('click', shape_3);


ran_btn.addEventListener('click', () => { create_shape_A_type(ran(480), ran(320), ran(50), ran(50)) });

btn_delete.addEventListener('click', () => { shape_delete })

//https://developer.mozilla.org/ko/docs/Games/Tutorials/2D_Breakout_game_pure_JavaScript/Create_the_Canvas_and_draw_on_it