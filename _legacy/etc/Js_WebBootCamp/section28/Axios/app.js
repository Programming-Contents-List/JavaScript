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
console.log("START!!");//먼저 처리한다.

getStarWarsPerson(5);