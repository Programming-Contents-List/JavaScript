const toDoForm = document.getElementById("todo-form");
const toDoInput = toDoForm.querySelector("input");           //toDoForm을 주목
//const toDoInput =  document.querySelector("#todo-form input") 과 같은 것이다.
const toDoList = document.getElementById("todo-list");        //ul

const toDos = [];//무제는 localStorage에 array를 저장할 수 없다.

function saveToDos(){
  //localStorage.setItem("todos", toDos);
  localStorage.setItem("todos", JSON.stringify(toDos));//JSON.stringify(toDos)이거 왜하는건지 이해가 잘안감 -> 그냥 string을 arryString으로 받아준다.
  //console.log(typeof(~))해보았을 때 sting이라고 나오지만 localStorage에서 보여지는 것은 array형태인 String이다. -> object를 string으로 변환했다.
}

function deleteTodo(event){
  const li = event.target.parentElement;
  li.remove();
  //console.log(event.target);
}

function paintToDo(newTodo){
  const li = document.createElement("li");    //li를 생성하고
  const span = document.createElement("span");//span을 생성하고
  const button = document.createElement("button");
  button.innerText="x";
  button.addEventListener("click", deleteTodo)

  li.appendChild(span);                       //li에 span을 붙인다
  li.appendChild(button);
  span.innerText = newTodo;
  toDoList.appendChild(li)
  console.log(li);
}

function handleToDoSubmit(event){
  event.preventDefault();
  const newTodo = toDoInput.value;//값을 저장
  toDoInput.value = ""; //input을 비움
  toDos.push(newTodo);//toDos라는 배열에 push(삽입)
  paintToDo(newTodo);
  saveToDos()
}

toDoForm.addEventListener("submit", handleToDoSubmit);
