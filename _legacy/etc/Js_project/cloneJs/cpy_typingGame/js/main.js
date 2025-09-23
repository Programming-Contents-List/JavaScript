const GAMETIME = 9;
let score = 0;
let time = GAMETIME;//기본시간이 9초
let isplaying = false;
let timeInterval;
let checkInterval;
let words = [];

const wordInput = document.querySelector('.word-input');//?
const wordDisplay = document.querySelector('.word-display');
const scoreDisplay = document.querySelector('.score');
const timeDisplay = document.querySelector('.time');
const button = document.querySelector('.button');

init();

function init(){
  buttonChange("게임로딩중...")
  getWords();
  wordInput.addEventListener('input',checkMatch);
}


//1초마다 setInterver안에 들어 있는 함수를 실행시켜주는 함수
//buttonChange("게임시작");

//게임실행
function run(){

  if(isplaying){//게임이 실행중이라면 리턴으로 아래 명령어가 실행이 안된다.
    return;
  }

  isplaying = true;
  time = GAMETIME;
  wordInput.focus();
  scoreDisplay.innerText = 0;

  timeInterval = setInterval(countDown,1000);
  checkInterval = setInterval(checkStatus, 50);

  buttonChange("게임중");
}



function checkStatus(){
  //여기 중요
  if(!isplaying && time === 0){
      buttonChange("게임시작");
      clearInterval(checkInterval);
  }
}

//단어 불러오기 -> 조금 감동적인 부분
function getWords(){
  //-> 라이브러리... axios
  axios.get('https://random-word-api.herokuapp.com/word?number=100')// 해당 주소

    .then(function (response) {
      // handle success
      //이부분은 어떻게 사용하는 건가?
      response.data.forEach((word) => {
        if(word.length < 10){
          words.push(word);
        }
      });
      
      buttonChange("게임시작");
      console.log(words);
      //words = response.data;
      //console.log(response.data);
    })

    .catch(function (error) {
      // handle error
      console.log(error);
    })
 
  //buttonChange("게임시작");
}


// 단어일치 체크
function checkMatch(){
    if(wordInput.value.toLowerCase() === wordDisplay.innerText.toLowerCase()) {
      wordInput.value = "";
      
      if(!isplaying){return;}

      score++;
      scoreDisplay.innerText = score;
      time = GAMETIME;
      
      const randomIndex = Math.floor(Math.random()*words.length);
      wordDisplay.innerText = words[randomIndex];
    }

}

//시간 카운트다운하는 함수
function countDown(){
   time > 0 ? time-- : isplaying = false;//isplaying은 게임 일시정지와도 같다.
   //만약에 isplaying이 false이면..
   if(!isplaying){
      clearInterval(timeInterval);
      //clearInterval 함수는 무슨 역할? clearInterval안에 있는 '함수(timeInterval)'가 사라진다.
   }
  timeDisplay.innerText = time;
}

//버튼 활성화 기능? -> 정확히 무슨 역할이지?
function buttonChange(text){
  button.innerText = text;
  text === '게임시작' ? button.classList.remove('loading') : button.classList.add('loading')
}


