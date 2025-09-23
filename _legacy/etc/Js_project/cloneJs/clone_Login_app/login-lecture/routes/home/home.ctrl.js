"use strict"

const home = (req, res) => {
  res.render("home/index");//index.ejs를 렌더
}

const login = (req, res) => {
  res.render("home/login")
}

module.exports = {
  // 오브젝트는 key와 value로 이루어져 있다.
  home,  // home : home
  login,  // login : login
}