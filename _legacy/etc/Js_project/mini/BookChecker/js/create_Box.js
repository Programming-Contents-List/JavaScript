import { get_create_Element } from './create_Element.js';

//parent : 객체 클래스명 생성 및 부모자식 연결 함수
export function get_create_Box(class_name, element, parent) {
  const element_box = get_create_Element(`${element}`);
  // appendChild
  parent.appendChild(element_box);
  element_box.className = `${class_name}`;
  console.log(element_box.className);
  return element_box;
}