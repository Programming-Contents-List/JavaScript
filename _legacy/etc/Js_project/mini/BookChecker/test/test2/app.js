//set은 나중에 만들어야함 한 스크립트를 구조화 시킨 후에 만들어야한다.

//객체 지정 함수
function get_Class(element) {
  const name = document.querySelector(`.${element}`);
  return name;
}

//버튼 함수
function get_ClickBtn(element, option, fn) {
  const name = element.addEventListener(`${option}`, fn);
  return name;
}

//객체 생성 함수
function get_create_Element(option) {
  const name = document.createElement(option);
  return name;
}

//local_storage set 함수
function set_local_Storage(key, value) {
  const name = window.localStorage.setItem(`${key}`, `${value}`)
  return name;
}

//입력칸 비우는 함수
function clearFields() {
  title.value = '';
  comment.value = '';
}

//객체 클래스명 생성 및 부모자식 연결 함수
//** create box를 innerHTML함수를 사용해서 변경할 수 있게 코드 변경edited_btn
//=> 이 함수를 조금 더 세분화 할 필요가 있다.
function get_create_Box_value(class_name, element, parent) {
  const element_box = get_create_Element(`${element}`);
  element_box.innerHTML = `
    <div class='title_box'>${title.value}</div>
    <div class='comment_box'>${comment.value}</div>
    <button class='delete_btn'>delete</button>
    <button class='edited_btn'>edited</button>
  `;
  // appendChild
  parent.appendChild(element_box);
  element_box.className = `${class_name}`;
  console.log(element_box.className);

  // local_Storage key와 value 지정 조건문
  // if (value === title.value) {
  //   set_local_Storage(title.value);
  // } else if (value === comment.value) {
  //   set_local_Storage(title.value, comment.value);
  // }

  return element_box;
}

//객체생성
function get_create_Box(class_name, element, parent) {
  const element_box = get_create_Element(`${element}`);
  // appendChild
  parent.appendChild(element_box);
  element_box.className = `${class_name}`;
  console.log(element_box.className);
  return element_box;
}

//객체 지정 함수를 통한 변수 선언
const title = get_Class('title');
const comment = get_Class('comment');
const input_btn = get_Class('input_btn');//input btn
const form_tag = get_Class('Create_box');//form tag
const list = get_Class('list');

//event를 사용해서 응용할 것
//클릭시 생성 및 함수 선언
get_ClickBtn(form_tag, 'submit', (e) => {
  e.preventDefault();
  console.log("submit");
  target = e.target;
  // console.log(`target : ${target.querySelector('.title').className}`);
  get_create_Box_value('box_backColor', 'div', list);
  clearFields();
})

get_ClickBtn(list, 'click', (e) => {
  target = e.target;
  // console.log("target,classList = " + target.classList);
  //삭제 버튼
  if (target.classList.contains("delete_btn")) {
    console.log(target.parentElement.className);
    if (confirm("정말 삭제 하시겠습니까?") == true) {
      target.parentElement.remove();
      alert("삭제 되었습니다.");
    } else {
      alert("취소 되었습니다.");
    }
    console.log("delete!!");
  }
  //편집 버튼
  else if (target.classList.contains("edited_btn")) {
    console.log("edited!!");
    alert("준비 중입니다.");
    //get_create_Box('edited_box',input,)
    //-> create_Box_value?
  }
})
