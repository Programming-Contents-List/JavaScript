document.querySelector("#student-list").addEventListener("click", (e) => {
  if (e.target.classList.contains("student")) {
    console.log("학생 버튼 클릭");
  }
});
