import React from 'react';
import { Cloud, Wind, Droplets } from 'lucide-react';
import { WeatherData } from '../types';

interface CurrentWeatherProps {
  weather: WeatherData;
}

export function CurrentWeather({ weather }: CurrentWeatherProps) {
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-6">
      <h2 className="text-3xl font-bold text-white mb-4">Current Weather</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="flex items-center space-x-3 text-white">
          <Cloud className="w-8 h-8" />
          <div>
            <p className="text-sm opacity-70">Temperature</p>
            <p className="text-2xl font-bold">{weather.current.temperature_2m}°C</p>
          </div>
        </div>
        <div className="flex items-center space-x-3 text-white">
          <Wind className="w-8 h-8" />
          <div>
            <p className="text-sm opacity-70">Wind Speed</p>
            <p className="text-2xl font-bold">{weather.current.wind_speed_10m} km/h</p>
          </div>
        </div>
        <div className="flex items-center space-x-3 text-white">
          <Droplets className="w-8 h-8" />
          <div>
            <p className="text-sm opacity-70">Humidity</p>
            <p className="text-2xl font-bold">{weather.hourly.relative_humidity_2m[0]}%</p>
          </div>
        </div>
      </div>
    </div>
  );
}