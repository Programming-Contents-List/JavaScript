const express = require('express')
const app = express()
const port = 3000;

//axios와 ajax의 차이는 무엇인가
//axios와 fetch를 살펴봐야한다.
app.get('/', (req, res) => {
  res.send('Hello World')
})
//라우팅 : /dog
app.get('/dog', (req, res) => {
  // res.send('<h1>dog</h1>')
  res.json({ 'sound': '멍멍' })
})
//라우팅 : /cat
app.get('/cat', (req, res) => {
  //res.send('cat')
  res.json({ 'sound': '냐옹' })
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})