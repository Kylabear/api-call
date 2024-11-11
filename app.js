const apiKey = 'https://weatherstack.com/dashboard';
const weatherDisplay = document.getElementById('weatherDisplay');
const fetchWeatherButton = document.getElementById('fetchWeather');
const locationInput = document.getElementById('location');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');

let currentPage = 1;
let totalPages = 0;


fetchWeatherButton.addEventListener('click', () => {
  const location = locationInput.value;
  if (location) {
      fetchWeather(location);
  } else {
      showError('Please enter a location.');
  }
});

async function fetchWeather(location) {
  try {
      const response = await fetch(`http://api.weatherstack.com/current?access_key=${apiKey}&query=${location}`);
      
      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.success === false) {
          showError(data.error.info);
          return;
      }

      displayWeather(data);
  } catch (error) {
      showError('Error fetching data: ' + error.message);
  }
}

function displayWeather(data) {
  const { location, current } = data;
  weatherDisplay.innerHTML = `
      <h2>Weather in ${location.name}, ${location.country}</h2>
      <p>Temperature: ${current.temperature}°C</p>
      <p>Weather: ${current.weather_descriptions[0]}</p>
      <p>Wind Speed: ${current.wind_speed} km/h</p>
  `;
}

function showError(message) {
  weatherDisplay.innerHTML = `<p class="error">${message}</p>`;
}