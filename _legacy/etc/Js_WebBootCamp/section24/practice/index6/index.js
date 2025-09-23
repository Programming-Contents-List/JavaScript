let allColors = document.querySelectorAll('span');
let colorName = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
for (let i = 0; i < allColors.length; i++) {
  allColors[i].style.color = colorName[i];
}