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
  console.log(li.id);
  //흠..멀까.. 순서대로 지워지지 않는다.
  // const myvalue = li;
  // toDos.pop(myvalue);
  // localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));

}

function paintToDo(newTodo){
  const li = document.createElement("li");
  li.id = newTodo.id;//li태그의 id가 Date.now와 같은 아이디가 된다. 구별할 수 있게 된다.
  const span = document.createElement("span");
  const button = document.createElement("button");
  button.innerText="x";
  button.addEventListener("click", deleteTodo)

  li.appendChild(span);
  li.appendChild(button);
  span.innerText = newTodo.text;
  toDoList.appendChild(li)
  console.log(li);
}

function handleToDoSubmit(event){
  event.preventDefault();
  const newTodo = toDoInput.value;
  toDoInput.value = "";
  const newTodoObj = {
    text:newTodo,
    id : Date.now(),
  };
  toDos.push(newTodoObj);
  paintToDo(newTodoObj);
  saveToDos()
}

toDoForm.addEventListener("submit", handleToDoSubmit);


const savedToDos = localStorage.getItem(TODOS_KEY);
console.log(`savedToDos: ${savedToDos}`);

if(savedToDos !== null){
  const parseToDos = JSON.parse(savedToDos);
  toDos = parseToDos;
  parseToDos.forEach(paintToDo);
}

//localstorage는 데이터베이스가 아니다. 콘솔에서 toDos 배열을 보면 데이터베이스이다.
//localstorage는 toDos배열을 복사해둔 곳이다.