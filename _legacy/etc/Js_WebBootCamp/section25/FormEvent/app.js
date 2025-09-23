const tweetForm = document.querySelector("#tweetForm");
const tweetContainer = document.querySelector("#tweets");
tweetForm.addEventListener("submit", function (e) {
  // const usernameInput = document.querySelectorAll("input")[0];
  // const tweetInput = document.querySelectorAll("input")[1];
  // console.log(tweetForm.elements.username.value);
  // console.log(tweetForm.elements.tweet.value);
  const usernameInput = tweetForm.elements.username;
  //tweetForm.elements.username.value;
  const tweetInput = tweetForm.elements.tweet;
  console.log(tweetForm.elements);
  //tweetForm.elements.tweet.value;
  e.preventDefault();

  addTweet(usernameInput.value, tweetInput.value);
  usernameInput.value = '';
  tweetInput.value = '';


  // const newTweet = document.createElement('li');
  // const bTag = document.createElement('b');
  // bTag.append(username);//<b>username</b>
  // newTweet.append(bTag);//<li><b>username</b></li>
  // newTweet.append(`- ${tweet}`);//<li><b>username</b> - ${tweet}</li>
  // console.log(newTweet);
  // tweetContainer.append(newTweet);
});

const addTweet = (username, tweet) => {
  const newTweet = document.createElement('li');
  const bTag = document.createElement('b');
  bTag.append(username);//<b>username</b>
  newTweet.append(bTag);//<li><b>username</b></li>
  newTweet.append(`- ${tweet}`);//<li><b>username</b> - ${tweet}</li>
  console.log(newTweet);
  tweetContainer.append(newTweet);

} 