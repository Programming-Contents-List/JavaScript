//ref : https://developer.mozilla.org/ko/docs/Games/Tutorials/2D_Breakout_game_pure_JavaScript/Move_the_ball

//공을 움직이게 할 요소
//html에서 canvas태그를 찾아준다.
let canvas = document.getElementById("myCanvas");
//렌더링 컨텍스트 타입을 지정하는 하나의 파라메터를 가진다. 2d는 이차원 평면을 의미한다.
let ctx = canvas.getContext("2d");
let x = canvas.width / 2; //공의 x 위치의 값을 정의하는 변수
console.log(canvas.width); //index.html에서 설정한 width값을 확인
let y = canvas.height - 30; //공의 y 위치의 값을 정의하는 변수
console.log(canvas.height); //index.html에서 설정한 height값을 확인
let dx = 2;
let dy = -2;

//실질적으로 공이 움직이게 하는 함수 구현
function drawBall() {
  ctx.beginPath();//도형을 그릴 수있게 해주는 함수
  ctx.arc(x, y, 10, 0, Math.PI * 2); //arc는 원형을 그릴 수 있는 함수
  ctx.fillStyle = "#0095DD"; //css property
  ctx.fill(); //배열의 모든 요소를 정적으로 변경
  ctx.closePath(); //시작과 끝을 연결하는 함수
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);//clearRect함수는 setInterval함수로 프레임워크가 돌아가는 동안 찍힌 위치들의 도형들을 제거하는 영역이다.
  drawBall();
  x += dx; //x의 방향을 정하는 코드이다. +이기에 우향으로 
  y += dy; //y의 방향을 정하는 코드이다. -이기에 상향으로
}

//setInterval 함수를 통해서 프레임워크가 실시간으로 동작하는 함수.
setInterval(draw, 10);