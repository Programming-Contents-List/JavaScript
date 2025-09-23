const btn = document.querySelector("#v2");
btn.onclick = function () {
  console.log("YouClickedMw")
  console.log("I HOPE IT WORKED!")
}

function scream() { console.log("stop") }

btn.onmouseenter = scream;