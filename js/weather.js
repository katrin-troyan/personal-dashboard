const API_KEY = "4a3780ef199f88fa4085e2b84a9bc338";
const CITY = "Vinnytsia";
const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}&units=metric&lang=uk`;

const temperatureElement = document.querySelector(".temperature");
const descriptionElement = document.querySelector(".weather-description");
const locationElement = document.querySelector(".weather-location");

function displayWeather(data) {
  const temp = Math.round(data.main.temp);
  const description = data.weather[0].description;
  const location = data.name;

  temperatureElement.textContent = `${temp}°C`;
  descriptionElement.textContent = description;
}

async function fetchWeather() {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`Помилка: ${response.status}`);
    }
    const data = await response.json();

    displayWeather(data);
  } catch (error) {
    console.error("Помилка при отриманні даних погоди:", error);
  }
}

function initWeather() {
  fetchWeather();
  setInterval(fetchWeather, 30 * 60 * 1000);
}
initWeather();
