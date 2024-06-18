
document.addEventListener("DOMContentLoaded", function () {
    const searchBox = document.getElementById("searchbox");
    const errorDiv = document.querySelector(".error");
    const weatherIcon = document.querySelector(".weather-icon");
    const temperature = document.querySelector(".temp");
    const city = document.querySelector(".city");
    const humidity = document.querySelector(".humidity");
    const wind = document.querySelector(".wind");
    const myButton = document.getElementById("mybutton");

    const apiKey = 'dcb39f93b03ffbbf162877f98e654d57'; // Replace with your OpenWeatherMap API key

    document.getElementById("mybutton").addEventListener("click", function () {
        const cityName = searchBox.value.trim();
        if (cityName === "") {
            showError("Please enter a city name");
            return;
        }

        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('City not found');
                }
                return response.json();
            })
            .then(data => {
                updateWeather(data);
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
                showError('City not found');
            });
    });

    function updateWeather(data) {
        city.textContent = data.name;
        temperature.textContent = `${Math.round(data.main.temp)}°C`;
        humidity.textContent = `${data.main.humidity}%`;
        wind.textContent = `${data.wind.speed} km/h`;
        if(data.weather[0].main=="Clouds"){
            weatherIcon.src="assets/clouds.png";
                }
                else if(data.weather[0].main=="Clear"){
            weatherIcon.src="assets/clear.png";
                }
                else if(data.weather[0].main=="Rain"){
            weatherIcon.src="assets/Rain.png";
                }
                else if(data.weather[0].main=="Dizzle"){
            weatherIcon.src="assets/dizzle.png";
                }
               else if(data.weather[0].main=="Mist"){
            weatherIcon.src="assets/mist.png";
               }
             else if(data.weather[0].main=="Snow"){
            weatherIcon.src="assets/snow.png";
            }

        errorDiv.style.display = "none";
         document.querySelector(".weather").style.display = "block";
        }

    function showError(message) {
        errorDiv.textContent = message;
        errorDiv.style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }
});