$(document).ready(function () {
  $.ajax({
    type: "GET",
    url: "sendPage.jsp?page=1&no=3&name=user01",
    dataType: "text",
    contentType: "application/x-www-form-urlencoded;charset=UTF-8",
    error: function () {
      console.log('통신실패!!');
    },
    success: function (data) {
      console.log("통신데이터 값 : " + data);
    }
  });
});

function sendData() {

  var data = {};
  data.email = $('#email').val();
  data.phone = $('#phone').val();

  var jsonStr = JSON.stringfy(data);

  $.ajax({
    type: 'post',
    url: url,
    data: jsonStr,
    contentType: "application/json; charset=utf-8",
    error: onError,
    success: onSuccess
  });
}