import React, { useState } from 'react';
import axios from 'axios';
import { Cloud, CloudRain, CloudSnow, CloudLightning, Sun, CloudDrizzle, Wind, Droplets, Search } from 'lucide-react';

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  // Get weather icon based on description
  const getWeatherIcon = (description) => {
    const desc = description?.toLowerCase() || '';
    if (desc.includes('clear')) return <Sun className="w-16 h-16 text-yellow-400" />;
    if (desc.includes('rain')) return <CloudRain className="w-16 h-16 text-blue-400" />;
    if (desc.includes('snow')) return <CloudSnow className="w-16 h-16 text-gray-200" />;
    if (desc.includes('thunder')) return <CloudLightning className="w-16 h-16 text-yellow-500" />;
    if (desc.includes('drizzle')) return <CloudDrizzle className="w-16 h-16 text-blue-300" />;
    if (desc.includes('cloud')) return <Cloud className="w-16 h-16 text-gray-400" />;
    return <Sun className="w-16 h-16 text-yellow-400" />;
  };

  // Get background class based on weather and time
  const getBackgroundClass = (description, temp) => {
    const desc = description?.toLowerCase() || '';
    if (desc.includes('clear')) return 'bg-gradient-to-br from-blue-400 to-blue-600';
    if (desc.includes('rain')) return 'bg-gradient-to-br from-gray-700 to-gray-900';
    if (desc.includes('snow')) return 'bg-gradient-to-br from-blue-100 to-blue-300';
    if (desc.includes('thunder')) return 'bg-gradient-to-br from-gray-800 to-gray-900';
    if (desc.includes('cloud')) return 'bg-gradient-to-br from-gray-400 to-gray-600';
    if (temp > 25) return 'bg-gradient-to-br from-orange-400 to-red-600';
    if (temp < 0) return 'bg-gradient-to-br from-blue-200 to-blue-400';
    return 'bg-gradient-to-br from-blue-400 to-blue-600';
  };

  const fetchWeather = async () => {
    try {
      // const BACKEND_URL = process.env.REACT_APP_NODE_ENV === 'production' 
      //   ? 'http://weather-backend-service:5000'
      //   : 'http://localhost:5000';
      
      const response = await axios.get(`/api/weather`, {
        params: { city }
      });
      
      setWeather(response.data);
      setError(null);
    } catch (error) {
      console.error('API Error:', error);
      setError('Failed to fetch weather data');
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 flex items-center justify-center p-4 
      ${weather ? getBackgroundClass(weather.description, weather.temperature) : 'bg-gradient-to-br from-blue-400 to-blue-600'}`}>
      <div className="max-w-md w-full">
        <div className="bg-white/90 backdrop-blur-md p-8 rounded-xl shadow-2xl">
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Weather Forecast</h1>
          
          {/* Search Section */}
          <div className="flex gap-2 mb-6">
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter city name"
              className="flex-grow px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onKeyPress={(e) => e.key === 'Enter' && fetchWeather()}
            />
            <button
              onClick={fetchWeather}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 flex items-center gap-2"
            >
              <Search className="w-4 h-4" />
              Search
            </button>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          {weather && (
            <div className="text-center space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{weather.cityName}</h2>
                <div className="flex justify-center items-center">
                  {getWeatherIcon(weather.description)}
                </div>
                <p className="text-5xl font-bold text-gray-800 my-4">
                  {weather.temperature}°C
                </p>
                <p className="text-xl text-gray-600 capitalize">{weather.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center justify-center gap-2">
                    <Droplets className="w-5 h-5 text-blue-500" />
                    <span className="text-gray-600">Humidity</span>
                  </div>
                  <p className="text-xl font-semibold text-gray-800">{weather.humidity}%</p>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center justify-center gap-2">
                    <Wind className="w-5 h-5 text-blue-500" />
                    <span className="text-gray-600">Wind Speed</span>
                  </div>
                  <p className="text-xl font-semibold text-gray-800">{weather.windSpeed} m/s</p>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Attribution */}
        <div className="text-center mt-4 text-white/80 text-sm">
          © 2024 Weather Forecast App
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;