const http = require("http");
const app = http.createServer((req, res) => {
  //express를 사용해야하는 이유
  res.writeHead(200, { "Content-Type": "text/html; charset-utf-8" });//적용이 안된다
  if (req.url === '/') {
    res.end("here is a root : 한글");
  } else if (req.url === '/login') {
    res.end("here is login page");
  }
});

app.listen(3001, () => {
  console.log("http server")
})