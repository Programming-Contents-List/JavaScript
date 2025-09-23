import { get_create_Element } from './create_Element.js';
import { set_local_Storage } from './local_Storage.js';
import { title } from '../test/app.js';
import { comment } from '../test/app.js';
//child : 객체 클래스명 생성 및 부모자식 연결 함수
export function get_create_Box_value(class_name, value, element, parent) {
  const element_box = get_create_Element(`${element}`);
  element_box.innerHTML = value;
  // appendChild
  parent.appendChild(element_box);
  element_box.className = `${class_name}`;
  console.log(element_box.className);

  //local_Storage key와 value 지정 조건문
  if (value === title.value && title.value != comment.value) {
    set_local_Storage(title.value);
  } else if (value === comment.value) {
    set_local_Storage(title.value, comment.value);
  }

  return element_box;
}