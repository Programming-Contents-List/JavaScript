var selectedRow = null;

//show alerts
function showAlert(message, className) {
  const div = document.createElement("div");
  div.className = `alert alert-${className}`;
  div.appendChild(document.createTextNode(message));
  const container = document.querySelector(".container");
  const main = document.querySelector(".main");
  container.insertBefore(div, main);

  setTimeout(() => document.querySelector(".alert").remove(), 3000);
}

//Clear All Fields
function clearFields() {
  document.querySelector("#firstName").value = "";
  document.querySelector("#lastName").value = "";
  document.querySelector("#rollNo").value = "";
}

//Add Data
document.querySelector("#student-form").addEventListener("submit", (e) => {
  e.preventDefault();

  //Get Form Values
  const firstName = document.querySelector("#firstName").value;
  const lastName = document.querySelector("#lastName").value;
  const rollNo = document.querySelector("#rollNo").value;

  //validate
  if (firstName == "" || lastName == "" || rollNo == "") {
    showAlert("Please fill in all fields", "danger");
  }
  else {
    if (selectedRow == null) {//selectedRow가 특정 값을 지정, 정의되지 않았다면 if문 실행
      const list = document.querySelector("#student-list");
      const row = document.createElement("tr");//부모,그룹
      // clearFields();
      row.innerHTML =
        `<td>${firstName}</td>
        <td>${lastName}</td>
        <td>${rollNo}</td>
        <td>
          <a href="#" class="btn btn-warning btn-sm edit">Edit</a>
          <a href="#" class="btn btn-danger btn-sm delete">Delete</a>
        </td>
      `;
      list.appendChild(row);//전체 list에 row(부모 -> group)를 첨부
      selectedRow = null;
      showAlert("Student Added", "success")
    }
    else {//특정 로우가 지정 되었을 때
      console.log("edited")
      selectedRow.children[0].textContent = firstName;  //value
      console.log(selectedRow.nodeName);
      console.log(selectedRow.children[0].nodeName)
      selectedRow.children[1].textContent = lastName;   //value
      selectedRow.children[2].textContent = rollNo;     //value
      selectedRow = null;
      showAlert("Student Info Edited", "info");
    }

    clearFields();
  }
});

// Edit Data
document.querySelector("#student-list").addEventListener("click", (e) => {//parent searching
  // e.preventDefault();
  //document.querySelector("#student-list")에 있는 버튼들을 지정하는 방식에대한 코드...
  console.log("edit")
  target = e.target;
  if (target.classList.contains("edit")) {//child searching
    selectedRow = target.parentElement.parentElement;
    document.querySelector("#firstName").value = selectedRow.children[0].textContent;
    document.querySelector("#lastName").value = selectedRow.children[1].textContent;
    document.querySelector("#rollNo").value = selectedRow.children[2].textContent;
  }
});

// Delete date
document.querySelector("#student-list").addEventListener("click", (e) => {
  // e.preventDefault();
  target = e.target;
  if (target.classList.contains("delete")) {
    target.parentElement.parentElement.remove();//?
    const name = target.parentElement.parentElement.nodeName;
    console.log(name);
    showAlert("Student Data Deleted", "danger");//=>Bootstrap
    clearFields();
  }

});