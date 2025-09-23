const button = document.querySelectorAll('button');
let player1 = 0;
let player2 = 0;

let select = document.querySelector('select');
let limit = select.options[select.selectedIndex].value;
// console.log(limit);

function onChange() {
  limit = select.options[select.selectedIndex].value;
  reset();
  console.log(limit);
}

function EndGame(a, b) {
  if (!(a == b)) { }
  else {
    console.log("End Game");
    for (let i = 0; i < button.length - 1; i++) {
      button[i].disabled = true;
      button[i].disabled = true;
      button[i].id = 'hold';
    }
  }
}

function reset() {
  player1 = 0;
  player2 = 0;
  console.log(`player1 : ${player1}, player2 : ${player2}`);
  for (let i = 0; i < button.length; i++) {
    button[i].disabled = false;
    button[i].disabled = false;
    button[i].id = `button${i + 1}`;
  }
}

function score() {
  const h1 = document.querySelector('#score');
  h1.innerText = `${player1} to ${player2}`
}

button[0].addEventListener('click', () => {
  player1++;
  score();
  console.log(`player1 : ${player1} => ${limit}`);
  EndGame(player1, limit);
})

button[1].addEventListener('click', () => {
  player2++;
  score();
  console.log(`player2 : ${player2} => ${limit}`);
  EndGame(player2, limit);
})

button[2].addEventListener('click', () => {
  reset();
  score();
  console.log(`player1 : ${player1}, player2 : ${player2}`);
})

