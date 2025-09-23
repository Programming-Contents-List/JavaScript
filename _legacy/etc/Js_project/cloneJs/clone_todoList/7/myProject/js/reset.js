const resetBtn = document.querySelector(".reset");
console.log(resetBtn);
function reset() {
  console.log(`reset => ${localStorage.getItem("username")}`);
  localStorage.clear();
  location.reload();
}
resetBtn.addEventListener("click", reset);