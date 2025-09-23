let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

//A_Type_figure
export let create_shape_A_type = (x, y, w, h) => {//ctx.rect(x,y,width,height)
  ctx.beginPath();
  ctx.rect(x, y, w, h);
  ctx.fillStyle = "#FF0000";
  ctx.fill();
  ctx.closePath();
}

//B_Type_figure
export let create_shape_B_type = (x, y, w, h) => {
  ctx.beginPath();
  ctx.rect(x, y, w, h);
  ctx.strokeStyle = "rgba(0, 0, 255, 0.5)";
  ctx.stroke();
  ctx.closePath();
}
//delete_figure
export let shape_delete = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}