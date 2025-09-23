const express = require('express');
const app = express();
const port = 4000;

app.get('/', (req, res) => {
  res.send(`Hello! Port:${port}!!`);
})

//params, query
//1.params
//http://localhost:4000/user/mytest
// app.get('/user/:id', (req, res) => {
//   const q = req.params;//params는 콜론뒤에 ':id'와 같이 들어간 값
//   console.log(q);
//   res.send(`Sending id is ${q.id}`);//?왜 안되는거지?
//   //q자체로는 req.params가 가지고 있는 광범위한 값들을 지칭하고 있기때문
//   // res.json({'userid' : q.id});
// })

//2.query
//http://localhost:4000/user/?q=mytest&name=test&type=my&id=mytt
app.get('/user/', (req, res) => {
  const q = req.query;//?가 들어가야 하는 값
  console.log(q);
  console.log(q.q)
  console.log(q.name)
  console.log(q.id)
  res.send(`Sending id is ${q.id}`);
})

app.listen(port, () => {
  console.log(`Contact Port ${port}`)
})

