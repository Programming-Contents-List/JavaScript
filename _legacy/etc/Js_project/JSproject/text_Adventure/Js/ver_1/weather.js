//https://ksyy.tistory.com/175
const API_KEY = "bc4e65baf81a66e7314e7db6dc80a301";

function onGeoOk(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  fetch(url)
    .then(respones => respones.json())
    .then(data => {
      const weather = document.querySelector("#weather");
      const city = document.querySelector("#city");
      const temp = document.querySelector("#temp");
      const weatherIcon = document.querySelector("#weatherImg");

      city.innerText = data.name; console.log(city);
      let WEATHER = weather.innerText = `${data.weather[0].main}`; console.log(WEATHER)
      temp.innerText = `/ ${data.main.temp}`
      //날짜에 따른 이미지 변경
      // weatherIcon.src = data.weather[0].icon;
      // console.log(data.weather)
      // console.dir(data.weather)
      // if (WEATHER === "Clouds") {
      //   // weatherIcon.src = `https://i.pinimg.com/originals/74/88/ab/7488abee3d4ff789e7bd30e66679ccf9.png`
      //   weatherIcon.src = data.weather[0].icon
      // }
      const iconCode = data.weather[0].icon;
      const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;
      weatherIcon.src = iconUrl;

    });
}

function onGeoError() {
  alert("Can't find you. No Weather for you.")
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
//
