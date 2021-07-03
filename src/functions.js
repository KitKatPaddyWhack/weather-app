let todaysDate = document.querySelector(".todays-date");
let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let dayOfWeek = days[now.getDay()];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let currentMonth = months[now.getMonth()];
let dayOfMonth = now.getDate();
let hours = (now.getHours() < 10 ? "0" : "") + now.getHours();
let minutes = (now.getMinutes() < 10 ? "0" : "") + now.getMinutes();

todaysDate.innerHTML = `${dayOfWeek}, ${dayOfMonth} ${currentMonth} ${hours}:${minutes}`;

function showWeather(response) {
  let temperatureRounded = Math.round(response.data.main.temp);
  let celsiusTempAccurate = document.querySelector(
    "#current-temperature-display"
  );
  celsiusTempAccurate.innerHTML = `${temperatureRounded}`;

  let humidity = document.querySelector(".humidity-percent");
  humidity.innerHTML = `${response.data.main.humidity}%`;

  let windSpeedRounded = Math.round(response.data.wind.speed);
  let windSpeed = document.querySelector(".wind-speed");
  windSpeed.innerHTML = `${windSpeedRounded} m/s`;
}

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#text-input");
  let h1 = document.querySelector("h1");
  h1.innerHTML = searchInput.value.toUpperCase();
  let apiKey = "ca59aacb9fbee84aa3a91b01d188e669";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeather);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

function displayFahrenheit(event) {
  event.preventDefault();
  let fahrenheitConversion = document.querySelector(
    "#current-temperature-display"
  );

  fahrenheitConversion.innerHTML = `50`;
}
let fahrenheitTemperature = document.querySelector("#fahrenheit-link");
fahrenheitTemperature.addEventListener("click", displayFahrenheit);

function showCoordWeather(response) {
  let h1 = document.querySelector("h1");
  h1.innerHTML = response.data.name.toUpperCase();
  let temperatureRounded = Math.round(response.data.main.temp);
  let celsiusTempAccurate = document.querySelector(
    "#current-temperature-display"
  );
  celsiusTempAccurate.innerHTML = `${temperatureRounded}`;

  let humidity = document.querySelector(".humidity-percent");
  humidity.innerHTML = `${response.data.main.humidity}%`;

  let windSpeedRounded = Math.round(response.data.wind.speed);
  let windSpeed = document.querySelector(".wind-speed");
  windSpeed.innerHTML = `${windSpeedRounded} m/s`;
}

function getLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "ca59aacb9fbee84aa3a91b01d188e669";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showCoordWeather);
}

function displayLocation() {
  navigator.geolocation.getCurrentPosition(getLocation);
}

let button = document.querySelector("button");
button.addEventListener("click", displayLocation);
