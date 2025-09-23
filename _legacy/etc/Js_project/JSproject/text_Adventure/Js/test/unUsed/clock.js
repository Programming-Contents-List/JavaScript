//시간
const clock = document.querySelector("#clock");
const day = document.querySelector("#day");
const time = document.querySelector("#time");

//시나리오
const story = document.querySelector("#story"); //스토리 내용 기입
const quest = document.querySelector("#quest"); //퀘스트 내용 기입

//버튼
const attack = document.querySelector("#atk");
const run = document.querySelector("#run");
const buy = document.querySelector("#buy");
const sale = document.querySelector("#sale");

//시계 만들기 -> update()
function update() {
  const date = new Date();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  let daycount = 1;

  clock.innerText = `${hours}:${minutes}:${seconds}`;
  time.innerText = `Time : ${seconds}`;

  // if (seconds === "00") {//===는 타입까지 맞아야한다.
  //   console.log("quest!!");
  //   daycount += 1;
  //   day.innerText = `Day : ${daycount}`;
  // }

  // if ((daycount % 2) === 0) {
  //   story.innerText = "노동하기";
  // } else if (!(daycount % 2) === 0) {
  //   story.innerText = "NOT YET!";
  //   console.log("NOT YET");
  // }

}

console.log(update());

setInterval(update, 1000);
