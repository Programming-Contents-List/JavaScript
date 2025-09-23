const toDoForm = document.getElementById("todo-form");
const toDoInput = toDoForm.querySelector("input");           
const toDoList = document.getElementById("todo-list");        

let toDos = [];//const를 let으로

const TODOS_KEY = "todos";

function saveToDos(){
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function deleteTodo(event){
  const li = event.target.parentElement;
  li.remove();
  console.log(li);
  //흠..멀까..
  const myvalue = li;
  toDos.pop(myvalue);
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function paintToDo(newTodo){
  const li = document.createElement("li");
  const span = document.createElement("span");
  const button = document.createElement("button");
  button.innerText="x";
  button.addEventListener("click", deleteTodo)

  li.appendChild(span);
  li.appendChild(button);
  span.innerText = newTodo;
  toDoList.appendChild(li)
  console.log(li);
}

function handleToDoSubmit(event){
  event.preventDefault();
  const newTodo = toDoInput.value;
  toDoInput.value = "";
  toDos.push(newTodo);
  paintToDo(newTodo);
  saveToDos()
}

toDoForm.addEventListener("submit", handleToDoSubmit);


const savedToDos = localStorage.getItem(TODOS_KEY);
console.log(`savedToDos: ${savedToDos}`);

if(savedToDos !== null){
  const parseToDos = JSON.parse(savedToDos);
  toDos = parseToDos; // savedToDos에 값이 있다면 toDos의 시작은 parseToDos에 저장되어 있는 값으로 시작
  //->복원
  parseToDos.forEach(paintToDo);
}

// function sayHello(item){
//   console.log("this is turn of", item);
// }