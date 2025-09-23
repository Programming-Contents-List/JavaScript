const toDoForm = document.getElementById("todo-form");
const toDoInput = toDoForm.querySelector("input");           //toDoForm을 주목
//const toDoInput =  document.querySelector("#todo-form input") 과 같은 것이다.
const toDoList = document.getElementById("todo-list");        //ul

function paintToDo(newTodo){
  const li = document.createElement("li");    //li를 생성하고
  const span = document.createElement("span");//span을 생성하고
  li.appendChild(span);                       //li에 span을 붙인다
  span.innerText = newTodo;
  toDoList.appendChild(li)
  console.log(li);
}

function handleToDoSubmit(event){
  event.preventDefault();
  const newTodo = toDoInput.value;//값을 저장
  toDoInput.value = "";
  paintToDo(newTodo);
}

toDoForm.addEventListener("submit", handleToDoSubmit);