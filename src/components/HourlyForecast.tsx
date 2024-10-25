import React from 'react';
import { WeatherData } from '../types';

interface HourlyForecastProps {
  weather: WeatherData;
}

export function HourlyForecast({ weather }: HourlyForecastProps) {
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
      <h2 className="text-2xl font-bold text-white mb-4">Hourly Forecast</h2>
      <div className="overflow-x-auto">
        <div className="flex space-x-6 min-w-max">
          {weather.hourly.time.slice(0, 24).map((time, index) => (
            <div key={time} className="text-white text-center">
              <p className="text-sm opacity-70">
                {new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
              <p className="text-xl font-bold my-2">{weather.hourly.temperature_2m[index]}°C</p>
              <p className="text-sm opacity-70">{weather.hourly.wind_speed_10m[index]} km/h</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}