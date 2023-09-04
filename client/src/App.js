import React, { useState } from 'react';
import SearchBar from './components/SearchBar';

function App({ isNightMode }) {
    const [weatherData, setWeatherData] = useState(null);
    const [forecastData, setForecastData] = useState(null);
    const [unit, setUnit] = useState("F");
    const { REACT_APP_OPEN_WEATHER_API_KEY: apiKey } = process.env;

    const getWeatherData = async (city) => {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
            const data = await response.json();
            setWeatherData(data);
        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
    };

    const getForecastData = async (city) => {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`);
            const data = await response.json();
            setForecastData(data);
        } catch (error) {
            console.error("Error fetching forecast data:", error);
        }
    };

    const getDailyForecast = (forecastList) => {
        const currentDate = new Date();
        const uniqueDays = new Set();

        return forecastList.filter((forecast) => {
            const forecastDate = new Date(forecast.dt * 1000);
            if (forecastDate.getDate() !== currentDate.getDate() && !uniqueDays.has(forecastDate.getDate())) {
                uniqueDays.add(forecastDate.getDate());
                return true;
            }
            return false;
        }).slice(0, 5);
    };

    const kelvinToCelsius = (kelvin) => (kelvin - 273.15).toFixed(1);
    const kelvinToFahrenheit = (kelvin) => ((kelvin - 273.15) * 9/5 + 32).toFixed(1);

    const toggleUnit = () => {
        setUnit(prevUnit => prevUnit === "C" ? "F" : "C");
    };

    const themeClass = isNightMode ? "bg-dark text-light" : "bg-light text-dark";

    return (
      <div className={`container mt-5 ${themeClass} rounded-container`}>
            <SearchBar onSearch={city => {
                getWeatherData(city);
                getForecastData(city);
            }} />

            <div className="d-flex justify-content-between align-items-center mt-3">
                <button className="btn btn-outline-secondary" onClick={toggleUnit}>
                    Switch to {unit === "F" ? "Celsius" : "Fahrenheit"}
                </button>
            </div>

            <div className="d-flex justify-content-center flex-wrap mt-4">
                {forecastData && getDailyForecast(forecastData.list).map((day, index) => (
                    <div key={index} className="card m-2" style={{ width: "12rem" }}>
                        <div className="card-body text-center">
                            <h6 className="card-title">{new Date(day.dt * 1000).toLocaleDateString()}</h6>
                            <img src={`http://openweathermap.org/img/w/${day.weather[0].icon}.png`} alt="Weather icon" className="mb-3" />
                            <p className="card-text">{day.weather[0].description}</p>
                            <h4>{unit === "C" ? kelvinToCelsius(day.main.temp) : kelvinToFahrenheit(day.main.temp)}°{unit}</h4>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;
