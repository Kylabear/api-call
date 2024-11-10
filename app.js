const apiKey = 'f04ad0b2958e4a33ef0239479073e6a9';
let currentPage = 0;
const cities = ["New York", "London", "Tokyo", "Paris", "Sydney", "Philippines","China","Switzerland","Canada","Vietnam","South korea", "Thailand"];

function fetchWeather(location = cities[currentPage]) {
  const userLocation = document.getElementById('location').value.trim();
  const queryLocation = location || (userLocation ? userLocation : cities[currentPage]);    
  const url = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${location}`;

  fetch(url)
    .then(response => {
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return response.json();
    })
    .then(data => {
      if (data.error) {
        alert(`Error: ${data.error.info}`);
        return;
      }
      displayWeather(data);
    })
    .catch(error => console.error('Error fetching weather data:', error));
}

function displayWeather(data) {
    const weatherDisplay = document.getElementById('weatherDisplay');
    weatherDisplay.innerHTML = `
      <h2 class="text-xl font-bold">${data.location.name}, ${data.location.country}</h2>
      <p>Temperature: ${data.current.temperature}°C</p>
      <p>Weather: ${data.current.weather_descriptions[0]}</p>
      <p>Wind Speed: ${data.current.wind_speed} km/h</p>
    `;
    weatherDisplay.classList.remove('hidden');
  }
  
  function paginate(direction) {
    document.getElementById('location').value = '';
    if (direction === 'next') {
        currentPage = (currentPage + 1) % cities.length;
      } else if (direction === 'prev') {
        currentPage = (currentPage - 1 + cities.length) % cities.length;
      }
      fetchWeather();
    }
  