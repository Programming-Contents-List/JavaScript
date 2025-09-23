const images = [
  "0.jpg",
  "1.jpg",
  "2.jpg"
];

const chosenImage = images[Math.floor(Math.random()*images.length)];
console.log(chosenImage);

//자바스크립튼에서 HTML을 추가하기 즉, 만들어서 input하기
const bgImage = document.createElement("img");
bgImage.src = `img/${chosenImage}`;
console.log(bgImage);
//태그를 생성했으니 이제 body태그에 넣기
document.body.appendChild(bgImage);