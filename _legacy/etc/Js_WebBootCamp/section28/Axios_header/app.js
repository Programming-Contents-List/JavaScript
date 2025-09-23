// // fetch('https://swapi.dev/api/planets/1/');
// axios.get('https://swapi.dev/api/planets/1/')
//   .then(res => {
//     console.log("RESPONSE", res);
//   })
//   .catch((e) => {
//     console.log("ERROR!", e);
//   })

const getStarWarsPerson = async (id) => {
  try {
    const res = await axios.get(`https://swapi.dev/api/planets/${id}/`);
    console.log(res.data);
  } catch (e) {
    console.log("ERROR", e);
  }
}

const jokes = document.querySelector("#jokes");
const button = document.querySelector('button');

const addNewJoke = async () => {
  const jokeText = await getDadJoke();
  // console.log(jokeText);
  const newLI = document.createElement('LI');
  newLI.append(jokeText);
  jokes.append(newLI);
}
const getDadJoke = async () => {
  try {
    const config = { headers: { Accept: 'application/json' } }//쿼리문자열?
    const res = await axios.get('https://icanhazdadjoke.com/', config)
    // console.log(res.data.joke);
    return res.data.joke;
  } catch (e) {
    return "NO JOKE AVAILABLE!! SORRY :("
  }

}
button.addEventListener('click', addNewJoke);

console.log("START!!");//먼저 처리한다.
