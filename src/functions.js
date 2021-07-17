let apiKey = "ca59aacb9fbee84aa3a91b01d188e669";
let city = "Tokyo";
let units = "metric";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
axios.get(apiUrl).then(showWeather);

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

function getForecast(coordinates) {
  let apiKey = "ca59aacb9fbee84aa3a91b01d188e669";
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(displayForecast);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = "";

  forecast.forEach(function (forecastDay, index) {
    if (index < 4)
      forecastHTML =
        forecastHTML +
        `<div class="col-3 days">
              <div class="card border-light mb-3" style="max-width: 18rem">
                <div class="card-body">
                  <h5 class="card-title">${formatDay(forecastDay.dt)}</h5>
                  <p class="daily-temp">${Math.round(
                    forecastDay.temp.min
                  )}°/${Math.round(forecastDay.temp.max)}°</p>
                  <p class="card-text">
                  <img src="http://openweathermap.org/img/wn/${
                    forecastDay.weather[0].icon
                  }@2x.png" /></p>
                </div>
              </div>
         </div>
           `;
  });
  forecastElement.innerHTML = forecastHTML;
}

function showWeather(response) {
  let celsiusTempAccurate = document.querySelector("#current-temperature");
  celsiusTempAccurate.innerHTML = Math.round(response.data.main.temp);

  celsiusTemperature = response.data.main.temp;

  let humidity = document.querySelector("#humidity-percent");
  humidity.innerHTML = `${response.data.main.humidity}%`;

  let windSpeedRounded = Math.round(response.data.wind.speed);
  let windSpeed = document.querySelector("#wind-speed");
  windSpeed.innerHTML = `${windSpeedRounded} m/s`;

  let weatherDescription = document.querySelector(
    "#current-weather-description"
  );
  weatherDescription.innerHTML = `${response.data.weather[0].description}`;

  let iconElement = document.querySelector("#main-weather-icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#text-input");
  let h1 = document.querySelector("h1");
  h1.innerHTML = searchInput.value.toUpperCase();

  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeather);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

let button = document.querySelector("button");
button.addEventListener("click", search);
