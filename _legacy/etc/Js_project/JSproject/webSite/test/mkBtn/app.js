const crebtn = document.querySelector('#cre');//create btn
const btnDiv = document.querySelector('#btnDiv');//
let i = 0;

console.log('button');
console.log(crebtn);

function crEate(name) {//cre : btn
  const creElement = document.createElement('button');
  //프로퍼티의 값을 가져오는...
  creElement.id = creElement.innerText = `${name}${i++}`;
  return creElement;
}

function add() {//btn
  let creElement = crEate('button');
  // console.log(creElement);
  // console.dir(creElement);
  console.log('Create!!')
  btnDiv.append(creElement);
}

crebtn.addEventListener('click', add);