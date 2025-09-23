//https://haeeeell.tistory.com/54
console.log('contact')

let canvas = document.querySelector('#canvas'); //canvas 설정하기 위해 html가져오기
let ctx = canvas.getContext('2d'); //canvas의 컨텍스트 2d 설정

//id="canvas" width="300" height="300
//canvas의 가로 및 세로의 반값 => ?
let x = canvas.width / 2;
let y = canvas.height / 2;

//box 도형 크기 설정
let rectWidth = 10;
let rectHeight = 10;

//움직일 도형의 시작점 정의
let rectX = (canvas.width - rectWidth) / 2;
let rectY = (canvas.height - rectHeight) / 2;

// 어떤 키가 눌렸는지 확인하는 boolean
let rightPressed = false;
let leftPressed = false;
let upPressed = false;
let downPressed = false;

//키가 눌렸을 때
function keyDownHandler(e) {
  if (e.key == 37 || e.key == "ArrowRight") {
    rightPressed = true;
  } else if (e.key == 39 || e.key == "ArrowLeft") {
    leftPressed = true;
  } else if (e.key == 38 || e.key == "ArrowUp") {
    upPressed = true;
  } else if (e.key == 40 || e.key == "ArrowDown") {
    downPressed = true;
  }

}
//키가 안눌렸을 때를 처리하지 않으면 키가 눌렸다고 계속해서 키가 인식된다. 한마드로 초기화를 해야한다.
function keyUpHandler(e) {
  if (e.key == 37 || e.key == "ArrowRight") {
    rightPressed = false;
  } else if (e.key == 39 || e.key == "ArrowLeft") {
    leftPressed = false;
  } else if (e.key == 38 || e.key == "ArrowUp") {
    upPressed = false;
  } else if (e.key == 40 || e.key == "ArrowDown") {
    downPressed = false;
  }
}

//event로 해당 키 조작
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

// 움직일 도형을 그리는 함수
function drawRect() {
  ctx.beginPath();
  //ctx.rect의 역할을 알아야함. => ?
  ctx.rect(rectX, rectY, rectWidth, rectHeight); //--2번째의 Y좌표가 지정이 안 되어 있어서, 위아래 이동이 안됐었음 
  ctx.strokeStyle = "lightgreen";

  // 채우기는 도형의 내부를 color나 gradient, img로 채움
  // stroke는 외곽선에 색을 칠함
  ctx.stroke();
  ctx.closePath();
}


// 먼저 전체 Canvas를 지움 > 모든 단일 프레임에 처음부터 모든 것을 그림 > 눌려진 키 변수 확인 
// 사각형을 그릴 때는 fillRect(), strokeRect(), clearRect()의 메서드 사용
// 모두 매개변수로 사각형의 x/y좌표, 너비/높이 4가지를 받음 (픽셀단위)
function draw() {
  //ctx.clearRect 무슨 뜻?
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawRect();

  if (rightPressed && rectX < canvas.width - rectWidth) {
    rectX += 5; //이동거리가 5씩
  }
  else if (leftPressed && rectX > 0) {
    rectX -= 5; //이동거리가 5씩
  }
  else if (downPressed && rectY < canvas.height - rectHeight) {
    rectY += 5; //이동거리가 5씩
  }
  else if (upPressed && rectY > 0) {
    rectY -= 5; //이동거리가 5씩
  }
}


// setInterval > 캔버스 내의 움직이는 오브젝트가 있을 때 사용하는 내장함수
setInterval(draw, 10);