const toDoForm = document.getElementById("todo-form");
const toDoInput = toDoForm.querySelector("input");           //toDoForm을 주목
//const toDoInput =  document.querySelector("#todo-form input") 과 같은 것이다.
const toDoList = document.getElementById("todo-list");        //ul

const toDos = [];//무제는 localStorage에 array를 저장할 수 없다.

const TODOS_KEY = "todos";

function saveToDos(){
  //localStorage.setItem("todos", toDos);
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));//입력값 하나하나(한 앤터 한 앤터?)마다 string으로 하나의 JSON Object로 만든다.
  // toDos 내 Object 자체를 string으로 변환하고 localStorage로 값을 저장
  {
  //JSON.stringify는 무슨 역할? :stringify 메소드는 json 객체를 String 객체로 변환시켜 줍니다.
  //->JSON을 string으로 변환하고 싶을 떄
  //JSON.parse()는  string 객체를 json 객체로 변환
}
  {
  //이둘의 차이는?
  //console.log(toDos); //=> ex.1,2,3,4,5
  // JSON.parse(localStorage.getItem("todos"));
  // JSON.stringify(localStorage.getItem("todos"));
  // JSON.stringify(localStorage.getItem(toDos)); //-> 존재하지 않음 localStorage에 toDos라는 값을 대입이 불가?
  // //JSON.stringify(toDos);와 같은 것이 아니다.
  // JSON.stringify(toDos);                  //
  // localStorage.getItem("todos");          //localStorage의 toDos라는 해당 key 값
  // localStorage.getItem(toDos);            //localStorage에 toDos라는 값을 대입이 불가?하기에 null
}

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

function sayHello(item){
  console.log("this is turn of", item);
}

const savedToDos = localStorage.getItem(TODOS_KEY);
console.log(`savedToDos: ${savedToDos}`);
if(savedToDos !== null){
  const parseToDos = JSON.parse(savedToDos);
  console.log(`parseToDos: ${parseToDos}`);
  parseToDos.forEach(sayHello);
}

//왜 toDos를 바로 사용하면 안되는가라는 의문이 들었다. 그 이유는 우리가 '새로고침'을 통해서 모든 입력과 아웃풋 값이 리셋이 된다. 다시말해서, 투두리스트 인풋창에
//값을 넣으면 지금 값을 넣었을 때 console.log(toDos);를 출력하면 (1,2,3,4를 입력했다고 가정하자) 1,2,3,4,가 localStorage에 저장됨과 동시에 콘솔 창에 출력이 된다.
//그리고 '새로고침'을 했을 때 다시 console.log(toDos);를 하면 '[]'이 출력된다.
//그래서 localStorage에 접급하기 위해선 getItem을 통해서 접근해야한다.


