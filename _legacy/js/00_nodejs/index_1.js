const express = require('express')
const app = express()
const port = 3000

app.use(express.json())//?
//post는 주소창에서 불러오는 것이 아니라 Axios, Fetch를 이용할때 post형식으로 요청한다.
//post와 get의 차이는 무엇인가?
app.post('/user/:id', (req, res) => {
  const p = req.params;
  console.log(p);
  const b = req.body;
  console.log(b);
  res.send({ 'message': 'HelloWord' });
})

app.listen(port, () => {
  console.log(`Contact ${port}`)
})