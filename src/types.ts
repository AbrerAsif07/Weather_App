export interface WeatherData {
  current: {
    temperature_2m: number;
    wind_speed_10m: number;
    time: string;
  };
  hourly: {
    time: string[];
    temperature_2m: number[];
    relative_humidity_2m: number[];
    wind_speed_10m: number[];
  };
}