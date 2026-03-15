export type WeatherUnits = {
  temperature: 'celsius' | 'fahrenheit'
  windspeed: 'kmh' | 'mph'
  precipitation: 'mm' | 'inch'
}

export type DailyWeather = {
  time: string[]
  weathercode: number[]
  maxTemp: number[]
  minTemp: number[]
}

export type CurrentWeather = {
  time: string
  temp: number
  weathercode: number
  humidity: number
  wind: number
  feelsLike: number
}

export type HourlyWeather = {
  time: string[]
  temp: number[]
  weathercode: number[]
}
