//https://ksyy.tistory.com/175
const API_KEY = "bc4e65baf81a66e7314e7db6dc80a301";

function onGeoOk(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  fetch(url)
    .then(respones => respones.json())
    .then(data => {
      const weather = document.querySelector("#weather span:first-child");
      const city = document.querySelector("#weather span:last-child");
      // const weathericonCode = data.weather[0].icon;
      const weatherIcon = document.querySelector("#weatherImg");
      // weatherIcon.src = `./img/weather/${data.weather[0].main}.png`
      city.innerText = data.name;
      weather.innerText = `${data.weather[0].main} / ${data.main.temp}`;
      console.log(data.weather[0].main);
    });
}

function onGeoError() {
  alert("Can't find you. No Weather for you.")
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);