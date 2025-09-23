const mouse = document.querySelector(".mouse");

document.addEventListener("mousemove", (e) => {
  mouse.style.left = e.clientX + "px";
  mouse.style.top = e.clientY + "px";
})

