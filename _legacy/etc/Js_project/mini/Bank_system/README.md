# Bank_System을 통한 다양한 구조

형태는 단순한 게임과 같은 방식을 취해야한다. 예를 들어서 입력값을 통해서 값이 전달 받고 
그것들을 통해서 클라이언트는 개인이 가지고 있는 값들을 자유롭게 보관하고 계산하는 시스템을
구축 하는 것이다. 단순한 형태이지만 굉장히 복작하면서도 관리를 하기 편한 structure를 구축하는
것이 목표다.
   
# 이 프로젝트의 목표이자 방향성
* LocalStorage를 통해서 구축하고 나중에는 mySql이나 MongoDB와 같은 dataBase로 data를 구축 한다.
* Mgr이라는 매니저먼트를 생성해서 값을 주고 받을 수 있는 통합 스크립트를 제작한다.
* Variable_Storage를 구축해서 import와 export를 통해서 값을 연결해준다.(해당 js파일들은 mjs파일들로 구축해본다.)
* 위와 같은 Storage를 구축하게 되면 html을 test와 같은 파일을 통해서 scripts를 통해서 붙혔다 때었다 할 수 있는 형태를 만들어 본다. 이는 css에도 같은 적용 방식을 한다.
* 필요한 input/output의 통로는 btn을 통한 click이나 submit과 같은 클릭 이에 더해서 radio type을 구성해서 값의 형태를 보고 전달 받는 모습 등..
* class와 property와 같은 방식의 구성은 어디에 적용을 해야할지 고민해본다.
* 이를 통해서 json파일을 구성하고 이를 업데이트 할 수 있는 구성을 제작해본다. import와 export를 통해서 정보를 주고 받는 통합시스템을 구축해보는 것
* JS의 Array를 다시 알아보면서 제작하고 적용해 본다.
* 어떤 API를 사용해볼지 고민해보자
* HTML다른 HTML include하는 방법 [Link] : <https://kay0426.tistory.com/27>
   
> 예를 들어서 money라는 값을 지속적으로 get과 set을 통해서 관리가 가능한지 프로그램을 통해서 구축을 해보는 것이다. LocalStorage를 통해서 구축하는 방식과 단순한 변수를 통합적으로 관리하는 Variable_Mgr.js를 통해서 array의 구조를 만들 수 있는 js의 원리를 이해야한다. js의 독특한 array 방식은 기본적으로 우리가 알고 있는 py나 JAVA와는 다른 형태를 띄고 있다. 이의 깊숙한 차이점을 생각하면서 이번 mini project를 통해서 여러 다양한 방식으로 프로그램을 구성하고 제작해본다.
     
      
프로퍼티를 사용해서 get과 set을 제작한다. 하지만 money의 값은 절대적인 값의 유지는 아니다.
[Link] : <https://github.com/4BFC/Js/blob/main/Js/00_getSet/getSet.js>
```
export const My_money = {
  money: 1000,//여기에서 money의 값이 저장되는 것인가?

  get_money(m) {
    console.log(m);
  },

  set_money(m) {
    My_money.money = m;
    console.log(`My_money.money : ${My_money.money}/m : ${m}`)

  },
}
```
    
## HTML을 분할 시도
* includeHTML.js를 활용한 분할 시도
index.html 코드
```
<body>
  <h1>BankSystem</h1>
  <section class="btn_Group" id="btn_Group">
    <div include-html="./html/btn.html" />
  </section>
...
```
    
includeHTML.js코드
```
function includeHTML(callback) {
  var z, i, elmnt, file, xhr;
  /*loop through a collection of all HTML elements:*/
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain atrribute:*/
    file = elmnt.getAttribute("include-html");
    //console.log(file);
    if (file) {
      /*make an HTTP request using the attribute value as the file name:*/
      xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
          if (this.status == 200) {
            elmnt.innerHTML = this.responseText;
          }
          if (this.status == 404) {
            elmnt.innerHTML = "Page not found.";
          }
          /*remove the attribute, and call this function once more:*/
          elmnt.removeAttribute("include-html");
          includeHTML(callback);
        }
      };
      xhr.open("GET", file, true);
      xhr.send();
      /*exit the function:*/
      return;
    }
  }
  // setTimeout(function () {
  //   callback();
  // }, 0);
}
```
> include를 사용했을 때는 addEventListener에 null 오류가 지속적으로 발생했다. 뿐만아니라 각 HTML에 사용 할 JS파일들을 index.html파일로 종속시켜야만 했다.
[LINK] : <https://www.w3schools.com/howto/howto_html_include.asp>
    
--------------------------------------------------------------
      
* < object data="" >를 활용한 분할 시도
```
<body>
  <h1>BankSystem</h1>
  <section class="btn_Group" id="btn_Group">
    <object type="text/html" data="./html/btn.html"></object>
  </section>

  <section class="show_Group" id="show_Gruop">
    <object type="text/html" data="./html/show_interface.html"></object>
  </section>

</body>
```
   
> < object data="" >를 사용했을 때는 include.js와는 달리  index.html파일에 모든 파일들을 종속 시키지 않고 각기 해당되는 HTML파일들 속에 js를 종속시켜야만 한다. < object data="" >방식이 더욱 유지 관리하기 변한 모습을 하고 있다.
   결과적으로 show_mgr.js를 import를 통해서 값을 전달하는 방식으로 하려했으나 값을 전달해오지 못하기에 show_interface.html을 btn.html로 옮기면서 btn_mgr.js파일을 하나로 합쳤다.
   
> 오류 코드 : btn_mgr.js:11 Uncaught TypeError: Cannot read properties of null (reading 'addEventListener') 
   
해당 오류가 지속적으로 일어난다. 그 이유는 무엇인지 파악을 해야한다. 우선적으론 html을 불러오는 것에 있어서 충돌이 일어나는 것으로 보여진다. 이를 해결하기 위해선 코드와 스크립트의 위치와 연결되어 있는 노드들의 흐름을 정리 해야할 것 같다. 또는 addEventListener를 다른 다른 함수로 발생시키게 하거나 고민 해볼 필요가 있다. Show_mgr의 스크립트 제작 이후로 충돌이 일어나고 있다. 이전의 코드로 돌아가서 정상적으로 작동을 시켜봐야할 필요가 있다.
   
 > 해결 : 우선적으로 index.html을 포함해서 btn.html과 show_interface.html에 모든 js코드들을 script로 입력해 놓았었다 거기에서 부터 HTML스크립트의 충돌문제가 있었던 것이다. 따라서 index.html파일에서만 모든 js파일들을 통합적으로 모아 놓았다. 하지만 문제는 show_interface의 null반환이 문제다.
 >> 특이점 : show_interface가 반응할 때는 처음으로 로드할 때 정상적으로 show_interface의 값을 가져온다. 하지만 새로고침을 했을 때는 값이 null로 변경이 된다.   
 >> 특이점 : show_mgr.js를 btn_mgr.js에 import만 해도 console.log()가 반응을 한다.
   
* 파일 도식화는 아래 이미지와 같다.
    
 <img src="./img/ver.1.JPG" width="600px" height="400px" title="files Diagram" alt=""></img><br/>
   
* export와 import를 포함한 파일 도식화는 아래 이미지와 같다.
    
<img src="./img/ver.1_import_Export.JPG" width="600px" height="400px" title="I/E files Diagram" alt=""></img><br/>
    