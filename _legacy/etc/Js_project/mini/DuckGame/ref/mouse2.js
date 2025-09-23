const circle = document.querySelector(".circle");

document.addEventListener("mousemove", (e) => { // mousemove이벤트를 이용해 움

  // 마우스의 좌표는 clientX와 clientY를 이용해 알수 있다. -> 브라우저 window의 좌표값 위치를 전달한다.

  // pageX, pageY와는 다름.

  const mouseX = e.clientX;

  const mouseY = e.clientY;

  circle.style.left = mouseX + 'px';

  circle.style.top = mouseY + 'px';

});