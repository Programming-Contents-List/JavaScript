"use strict"

//모듈
const express = require("express");
const app = express();

//라우팅
const home = require("./routes/home"); //./routes/에서 가서 index.js가 const home에 담기고 이것이 app.use(미들웨어)에 등록이 된다.

//앱 세팅
app.set("views", "./views");
app.set("view engine", "ejs");

app.use("/", home);  //use -> 미들웨어를 등록하고 사용한다는 뜻이다.

module.exports = app;