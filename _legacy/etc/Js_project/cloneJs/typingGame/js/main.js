//사용변수
const GAMETIME = 3;
let score = 0;
let time = GAMETIME;//기본시간이 9초
//단어의 길이에 따라서 time의 길이가 변동 될 수 있도록 제작
let isplaying = false;
let timeInterval;


//클래스를 가지고 만드는 것이다.
//모두 클래스이지만 각기 다른 변수를 사용?한다
//왜때문인가. 차이가 무엇인가 누구는 value이고 누구는 innerHTMl이고...
const wordInput = document.querySelector('.word-input');//querySelector?역할은 무엇인가 이렇게 변수 값으로 받아야하는 이유는 무엇인가.
const wordDisplay = document.querySelector('.word-display');
//console.log(worldInput);
const scoreDisplay = document.querySelector('.score');
const timeDisplay = document.querySelector('.time');
//클래스이름을 불러오기도 하고 태그 명으로 불러서 변수로 담아 낼 수도 있다.
const button = document.querySelector('.button');

// wordInput.addEventListener(
//   'input',

//   ()=>{
//     //worldInput.value;
//     // console.log(wordInput.value.toLowerCase() === wordDisplay.innerText.toLowerCase());
//       //wordInput.value : input기능안에 발생되는 value들을 log로 찍는 것
//       //wordDisplay.innerHTML : wordDisplay 안에(inner) 어떤 HTML이 있는지 받아오는 명령어(현재는 Hello)->HTML로 사용하면 div나 여럭 기능들이 콘솔로그에 그대로 반영 따라서 innerText로 변경한다.

//     if(wordInput.value.toLowerCase() === wordDisplay.innerText.toLowerCase()) {

//       score++;
//       //여기서 if문이 true가 되면 '획득점수'에 score가 반영이되어야한다.

//       scoreDisplay.innerHTML = score;//wordDisplay.innerHTML = score; 이렇게 사용해도 되는거 아닌가? => 변화는 된다.

//       //정답이 될 경우 초기화가 되게 한다.
//       //if()
//       wordInput.value = '';
//       {//맞았 을 때 3초 증가
//       //time += 3;
//       }
//       time = 9;
//     }
//   }
// )//wordInput.addEventListener


//31분부터 코드가 꼬임.. 왜인지 모르겠음

wordInput.addEventListener(
  'input',

  () => {

    if (wordInput.value.toLowerCase() === wordDisplay.innerText.toLowerCase()) {
      score++;
      scoreDisplay.innerHTML = score;
      wordInput.value = "";
      time = GAMETIME;
    }
  }
)//wordInput.addEventListener

//시간 카운트다운하는 함수
function countDown() {
  time > 0 ? time-- : isplaying = false;//isplaying은 게임 일시정지와도 같다.
  //만약에 isplaying이 false이면..
  if (!isplaying) {
    clearInterval(timeInterval);
    //clearInterval 함수는 무슨 역할?
  }
  timeDisplay.innerText = time;
}

//버튼 활성화 기능? -> 정확히 무슨 역할이지?
function buttonChange(text) {
  button.innerText = text;
  text === '게임시작' ? button.classList.remove('loading') : button.classList.add('loading')
}

function run() {
  isplaying = true;
  time = GAMETIME;
  timeInterval = setInterval(countDown, 1000);
}

//1초마다 setInterver안에 들어 있는 함수를 실행시켜주는 함수
buttonChange("게임시작");

