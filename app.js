const apiKey = 'https://weatherstack.com';
const weatherDisplay = document.getElementById('weatherDisplay');
const fetchWeatherButton = document.getElementById('fetchWeather');
const locationInput = document.getElementById('location');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');

let currentPage = 1;
let totalPages = 0;
let weatherData = null;
let currentLocation = '';

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
    weatherDisplay.classList.remove('hidden'); // Show the weather display
    weatherDisplay.innerHTML = `
        <h2 class="text-xl font-bold">Weather in ${location.name}, ${location.country}</h2>
        <p>Temperature: ${current.temperature}°C</p>
        <p>Weather: ${current.weather_descriptions[0]}</p>
        <p>Wind Speed: ${current.wind_speed} km/h</p>
    `;
    // Enable pagination buttons if applicable 
    prevButton.disabled = currentPage <= 1;
    nextButton.disabled = currentPage >= totalPages; // Adjust this based on your pagination logic
}

// Error handling function
function showError(message) {
    weatherDisplay.classList.remove('hidden'); // Show the error display
    weatherDisplay.innerHTML = `<p class="text-red-500">${message}</p>`;
}

// Pagination logic (stubbed for demonstration)
function paginate(direction) {
    // Implement pagination logic here if applicable
    if (direction === 'prev') {
        if (currentPage > 1) {
            currentPage--;
            fetchWeather(currentLocation); // Refetch the weather data for the same location
        }
    } else if (direction === 'next') {
        currentPage++;
        fetchWeather(currentLocation); // Refetch the weather data for the same location
    }
    
    // Update button states
    prevButton.disabled = currentPage <= 1;
    // Update nextButton.disabled based on your business logic
}

prevButton.addEventListener('click', () => paginate('prev'));
nextButton.addEventListener('click', () => paginate('next'));
