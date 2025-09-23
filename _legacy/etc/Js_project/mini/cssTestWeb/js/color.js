const color_form = document.querySelector(".color_form");
const color_input = document.querySelector(".color_input");
const color_txt = document.querySelector(".txt");
const color_Btn = document.querySelector(".color_Btn");
const color_Obj = document.querySelector(".color_object");
// console.dir(color_input);

//form태그를 사용해서 submit을 이용해야하는 구동 방식을 이해할 필요가 있다. 단순히 input을 이용하는 방식을 다시 생각해봐야 할 듯하다.
color_form.addEventListener('submit',
  function (e) {
    e.preventDefault();//콘솔창에서 값이 바로 사라지지 않게 한다.
    let inputColor = color_input.value;//input에 있는 value값을 가져오는 것
    console.log(inputColor);//콘솔로 확인하기
    color_txt.innerText = inputColor;//칼라 색상 값을 글자로 보여준는 것

    //스타일을 통해서 입력한 값의 헥스(HEX)색상을 적용
    color_Obj.style.background = inputColor;
    color_Btn.style.background = inputColor;
  }
);

//나중에 입력한 것들이 저장되고 기록이 남는 것으로 버튼이 생성이 되어도 재미있을 듯한다.
