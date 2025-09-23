> href ="#"는 e.preventDefault()의 역할을 대신한다. 아래 설명을 참고하자.
* index.html
```
<a href="#" class="btn btn-warning btn-sm edit">Edit</a>
<a href="#" class="btn btn-danger btn-sm delete">Delete</a>
```
* app.js
```
document.querySelector("#student-list").addEventListener("click", (e) => {
  // e.preventDefault();
  target = e.target;
  if (target.classList.contains("delete")) {
    target.parentElement.parentElement.remove();//?
    showAlert("Student Data Deleted", "danger");//=>Bootstrap
  }
  // clearFields();
});
```
---------------------------------------
> href(하이퍼링크)에 #이 있고 없고의 차이로 app.js의 e.preventDefault(); 필요 여부가 다르다.
> >  href(하이퍼링크)란 무엇인가.    
> > > href는 특정 주소를 적어 이동을 하거나 특정 위치나 태그로 이동 할 수 있는 기능이다. 우선 href ="#"을 쓰는 경우는 아래와 같다.     
1. 클릭 이벤트 발생시 페이지 전환 되지 않도록 하기 위해     
2. 최상단으로 이동 목적으로       
3. href = "#;"은 최상단으로 이동하지 않고 이벤트가 수행하기 위해     
[reference about href](https://velog.io/@muchogusto/a-href-%EB%AC%B4%EC%97%87%EC%9D%84-%EC%9D%98%EB%AF%B8)
> >  (e)=>{}는 무엇이가.      
> > >    이벤트 객체에는 다양한 속성과 메서드가 있으며, 이를 통해 발생한 이벤트의 세부 정보를 확인하고 처리할 수 있습니다. 직접 event객체 변수를 만들지 않고 함수내에서 해당 객체(class,id)를 통해 찾아내는 것이다.
1. 이벤트 버블링
2. 이벤트 객체(e) 
[What is DOM URL](https://www.codestates.com/blog/content/dom-javascript)     
[What is Event URL](https://www.zerocho.com/category/JavaScript/post/57432d2aa48729787807c3fc)

---------------------------------------
* app.js
```
document.querySelector("#student-list").addEventListener("click", (e) => {
  // e.preventDefault();
  target = e.target;
  if (target.classList.contains("delete")) {
    target.parentElement.parentElement.remove();//?
    showAlert("Student Data Deleted", "danger");//=>Bootstrap
    clearFields();
  }

});
```
> 위 코드에서 parentElement의 역할은 무엇인가.
> > 

---------------------------------------
> addEventListener("click",fn)과 addEventListener("submit",fn)의 차이
> > 