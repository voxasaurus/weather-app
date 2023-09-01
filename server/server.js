const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 5000;
const API_KEY = "23a0d3f670f8d07296758717bebba6f0";

app.use(cors());  // Allow CORS for all routes

app.get('/weather', async (req, res) => {
    const city = req.query.city;
    try {
        const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
        res.json(weatherResponse.data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch weather data" });
    }
});

app.get('/forecast', async (req, res) => {
    const city = req.query.city;
    try {
        const forecastResponse = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`);
        res.json(forecastResponse.data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch forecast data" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
