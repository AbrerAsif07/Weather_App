import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { SearchBar } from './components/SearchBar';
import { CurrentWeather } from './components/CurrentWeather';
import { HourlyForecast } from './components/HourlyForecast';
import { MapSelector } from './components/MapSelector';
import { WeatherData } from './types';

function App() {
  const [coords, setCoords] = useState({ lat: 51.5074, lon: -0.1278 }); // Default to London
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchWeather();
  }, [coords]);

  const fetchWeather = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }
      const data = await response.json();
      setWeather(data);
    } catch (error) {
      setError('Failed to load weather data. Please try again.');
      console.error('Error fetching weather:', error);
    }
    setLoading(false);
  };

  const handleSearch = (lat: number, lon: number) => {
    setCoords({ lat, lon });
  };

  if (loading && !weather) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-white animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-6">
      <div className="max-w-4xl mx-auto">
        <SearchBar onSearch={handleSearch} />
        
        {error && (
          <div className="bg-red-500/20 backdrop-blur-md text-white p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        <MapSelector coords={coords} onLocationSelect={handleSearch} />

        {weather && (
          <>
            <CurrentWeather weather={weather} />
            <HourlyForecast weather={weather} />
          </>
        )}
      </div>
    </div>
  );
}

export default App;