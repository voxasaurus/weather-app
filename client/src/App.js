import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import { animated } from '@react-spring/web';
import { useSpring } from '@react-spring/core';

function WeatherIcon({ src, alt }) {
    const bounce = useSpring({
        from: { transform: 'scale(0.8)' },
        to: { transform: 'scale(1)' },
        config: { tension: 300, friction: 10 },
    });

    return <animated.img style={bounce} src={src} alt={alt} />;
}

function App({ isNightMode }) {
    const [weatherData, setWeatherData] = useState(null);
    const [forecastData, setForecastData] = useState(null);
    const [unit, setUnit] = useState("F");
    const { REACT_APP_OPEN_WEATHER_API_KEY: apiKey } = process.env;

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                getWeatherDataByCoords(position.coords.latitude, position.coords.longitude);
                getForecastDataByCoords(position.coords.latitude, position.coords.longitude);
            }, error => {
                console.error("Error obtaining location:", error);
                getWeatherData("Orlando");
                getForecastData("Orlando");
            });
        } else {
            console.error("Geolocation is not supported by this browser.");
            getWeatherData("Orlando");
            getForecastData("Orlando");
        }
    }, []);

    const topCities = ["New York", "London", "Tokyo", "Paris", "Sydney"];
    const handleCityClick = (city) => {
        getWeatherData(city);
        getForecastData(city);
    };

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

    const getWeatherDataByCoords = async (lat, lon) => {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`);
            const data = await response.json();
            setWeatherData(data);
        } catch (error) {
            console.error("Error fetching weather data by coordinates:", error);
        }
    };

    const getForecastDataByCoords = async (lat, lon) => {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`);
            const data = await response.json();
            setForecastData(data);
        } catch (error) {
            console.error("Error fetching forecast data by coordinates:", error);
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
            <h2 className="text-center mt-3">{weatherData && weatherData.name}</h2>
            <div className="d-flex justify-content-center align-items-center mt-3">
                 <button className="btn btn-outline-secondary" onClick={toggleUnit}>
                    Switch to {unit === "F" ? "Celsius" : "Fahrenheit"}
                </button>
            </div>
            <div className="d-flex justify-content-center flex-wrap mt-2">
                {topCities.map(city => (
                    <button
                        key={city}
                        className="btn btn-outline-info m-1"
                        onClick={() => handleCityClick(city)}>
                        {city}
                    </button>
                ))}
            </div>
            <div className="d-flex justify-content-center flex-wrap mt-4">
                {forecastData && getDailyForecast(forecastData.list).map((day, index) => (
                    <div key={index} className="card m-2" style={{ width: "12rem" }}>
                        <div className="card-body text-center">
                            <h6 className="card-title">{new Date(day.dt * 1000).toLocaleDateString()}</h6>
                            <WeatherIcon src={`http://openweathermap.org/img/w/${day.weather[0].icon}.png`} alt="Weather icon" className="mb-3" />
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
