const crebtn = document.querySelector('#cre');//create btn
const delbtn = document.querySelector('#del');//delete btn
const btnDiv = document.querySelector('#btnDiv');//
let creElement = [];

function add() {//btn
  creElement.push(crEate('button'));
  console.log(creElement);
  console.dir(creElement);
  console.log('Create!!')
  btnDiv.append(creElement);
}

crebtn.addEventListener('click', add);//