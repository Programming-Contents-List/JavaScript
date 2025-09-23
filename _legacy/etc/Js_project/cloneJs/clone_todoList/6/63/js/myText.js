const myText0 = document.querySelector("#myText0");
myText0.innerText = "https://mblogthumb-phinf.pstatic.net/MjAxNzEwMjNfMjQ4/MDAxNTA4NzYyNDIwNzAy.ToBzPJ49uU-Q0yylpEm68Yu6NeVgtvoDWoZJJ5M07Dcg.OtuXrEsECNsCrW4VMXS1mVidgTxDoDuFBSxGE5uy0iAg.JPEG.knicjin/20171023_001.jpg?type=w800";

const myImg = document.createElement("img");
myImg.src = "https://mblogthumb-phinf.pstatic.net/MjAxNzEwMjNfMjM2/MDAxNTA4NzYyNDI4NjQ0.CIFJ8XUrD8u0lynITia9J63UZ7floHSwSH6akney_sIg.iPy1BXxKiaiaWGiE8Zj8tFGqfmWfY_FQcFnRWgvT8gAg.JPEG.knicjin/20171023_024.jpg?type=w800"

document.body.appendChild(myImg);

const crtText = document.createElement("h3");
crtText.innerHTML = "이것은 내가 js를 통해서 createElement한 h3이다. 이미지는 네이버 블로그 src를 통해 output하였다. 아직 js에서 생성한 tag의 id나 class를 create하는 방법을 모른다.";
document.body.appendChild(crtText);
