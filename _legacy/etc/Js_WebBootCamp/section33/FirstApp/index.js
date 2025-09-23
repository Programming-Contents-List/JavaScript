const express = require("express");
const app = express();

// app.use((req, res) => {
//   console.log("WE GOT A NEW REQUEST!!")
//   res.send('<h1>This is my webpage!!</h1>')
// })
app.get('/', (req, res) => {
  res.send('<h1>Welcome my HOMEPAGE!!</h1>');
  // console.log("CAT REQUEST!!!");
})

app.get('/r/:subreddit', (req, res) => {
  const { subreddit } = req.params
  res.send(`<h1>Browsing the ${subreddit}subreddit</h1>`);
})

app.get('/r/:subreddit/:postId', (req, res) => {
  const { subreddit, postId } = req.params
  res.send(`<h1>Viewing Post ID: ${postId} on the ${subreddit} subreddit</h1>`);
})

app.post('/catss', (req, res) => {
  res.send('POST REQUEST TO /cats!! ')
})
app.get('/cats', (req, res) => {
  res.send('MEOW!!');
  // console.log("CAT REQUEST!!!");
})

app.get('/dogs', (req, res) => {
  res.send("WOOF!");
})

app.get('/search', (req, res) => {
  const { q } = req.query;
  if (!q) {
    res.send("NOTHING FOUND!!");
  }
  res.send(`<h1>Search results for: ${q}</h1>`);
  // console.log(req.query);
})

app.get('*', (res, req) => {
  res.send("i don't know that path!");
})

app.listen(8080, () => {
  console.log("LISTENING ON PORT 8080!")
})