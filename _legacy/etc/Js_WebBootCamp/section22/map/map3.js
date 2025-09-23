const movies = [
  {
    title: 'Amadeus',
    score: 99
  },
  {
    title: 'Stand By Me',
    score: 85
  },
  {
    title: 'Parasite',
    score: 95
  },
  {
    title: 'Aline',
    score: 90
  }
]
//map과 forEach의 차이는?
const titles = movies.map(function (movie) {
  console.log(`${movie.title}`);
  return movie.title;
})