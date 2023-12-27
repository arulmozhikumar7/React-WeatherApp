// WeatherApp.js
import React, { useState } from 'react';
import axios from 'axios';
import './WeatherApp.css';
const WeatherApp = () => {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);

    const apiKey = 'b34bf1d992bf462f6b91850fd191f33e'; // Replace with your OpenWeatherMap API key

    const fetchWeatherData = async () => {
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
            );
            setWeatherData(response.data);
            setError(null);
        } catch (err) {
            setWeatherData(null);
            setError('City not found');
        }
    };
    const getBackgroundImage = () => {
        // Add logic here to determine the weather condition and return the corresponding background image URL
        if (weatherData && weatherData.weather && weatherData.weather[0]) {
            const weatherCondition = weatherData.weather[0].main.toLowerCase();
            console.log('Weather Condition:', weatherCondition);
            const lowerCaseCondition = weatherCondition.replace(/\s+/g, ' ');
            switch (lowerCaseCondition) {
                case 'haze':
                    return 'url(https://img.freepik.com/free-photo/view-istanbul-cloudy-weather-multiple-low-high-buildings-fog-turkey_1268-16463.jpg?w=1060&t=st=1703663112~exp=1703663712~hmac=586536c2e135396304dccf88ed45864e2e0232fb5b6272ea2aa0219531eaa566)';
                case 'clear':
                    return 'url(https://img.freepik.com/free-photo/white-cloud-blue-sky_74190-7728.jpg?w=900&t=st=1703663310~exp=1703663910~hmac=4e584053ba928584cec7277153e7b4a4887aee42a561931ec696a3ecdf10c5d9)';
                // Add more cases for other weather conditions as needed
                case 'clouds':
                    return 'url(https://cdn.pixabay.com/animation/2023/03/11/17/29/17-29-25-849_512.gif)';
                case 'mist':
                    return 'url(https://img.freepik.com/free-photo/aerial-shot-evergreen-pine-trees-gloomy-cloudy-sky_181624-29278.jpg?w=900&t=st=1703664116~exp=1703664716~hmac=c6b110ca1c767c72add8f4c42124d0d2def8d0ed1c862a317c77cd30363b5489)';
                case 'fog':
                    return 'url(https://img.freepik.com/free-photo/aerial-shot-evergreen-pine-trees-gloomy-cloudy-sky_181624-29278.jpg?w=900&t=st=1703664116~exp=1703664716~hmac=c6b110ca1c767c72add8f4c42124d0d2def8d0ed1c862a317c77cd30363b5489)';
                case 'rain':
                    return 'url(https://cdn.pixabay.com/animation/2023/02/15/02/20/02-20-04-915_512.gif)';
                case 'drizzle':
                    return 'url(https://img.freepik.com/free-photo/rain-effect-nature-background_23-2148099046.jpg?w=900&t=st=1703665001~exp=1703665601~hmac=a1c90648f1a2013ec21991d062e6a7077836761de31eabfb6c7fc6bcdd95f7ba)';
                case 'thunderstorm':
                    return 'url(https://i.pinimg.com/474x/43/e3/bb/43e3bbf7543927bd4fc1932c776e141a.jpg)';
                case 'snow':
                    return 'url(https://i.pinimg.com/736x/a5/5a/71/a55a7146e023948d53a1ccacb1da95ce.jpg)';
                default:
                    return 'url(default-background-image)';
            }
        }
        // Return a default background image if weather data is not available
        return 'url(default-background-image)';
    };
    return (
        <body>


            <div className="wrapper" style={{ backgroundImage: getBackgroundImage() }}>
                <h1>
                    <span>Weather App </span></h1>
                <div className='form'>
                    <input
                        type="text"
                        placeholder="Enter city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                    <button onClick={fetchWeatherData}>Get Weather</button>
                </div>
                {weatherData && (
                    <div>
                        <h2>{weatherData.name}</h2>
                        <p>Temperature: {weatherData.main.temp}°C</p>
                        <p>Humidity: {weatherData.main.humidity}%</p>
                        <p>Wind Speed: {weatherData.wind.speed} m/s</p>
                        <p>Weather: {weatherData.weather[0].description}</p>
                    </div>
                )}
                {error && <p id='error'>{error}</p>}

            </div>
        </body>
    );
};

export default WeatherApp;
