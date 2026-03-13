import { useEffect, useState } from "react"
import axios from "axios"

type CurrentWeather = {
  time: string
  temp: number
  weathercode: number
  humidity: number
  wind: number
  feelsLike: number
}

type HourlyWeather = {
  time: string[]
  temp: number[]
  weathercode: number[]
}

type DailyWeather = {
  time: string[]
  weathercode: number[]
  maxTemp: number[]
  minTemp: number[]
}

type Location = {
  city: string
  country: string
}

export const useWeather = () => {
  const [currentData, setCurrentData] = useState<CurrentWeather | null>(null)
  const [hourlyData, setHourlyData] = useState<HourlyWeather | null>(null)
  const [dailyData, setDailyData] = useState<DailyWeather | null>(null)
  const [location, setLocation] = useState<Location | null>(null)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {

    const fetchWeather = async (lat: number, lon: number) => {
      try {
        setLoading(true)

        const weatherUrl =
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
          `&current=temperature_2m,relative_humidity_2m,wind_speed_10m,apparent_temperature,weathercode` +
          `&hourly=temperature_2m,weathercode` +
          `&daily=weathercode,temperature_2m_max,temperature_2m_min` +
          `&timezone=auto`

        const { data } = await axios.get(weatherUrl)
        console.log({data})
        const { current, hourly, daily } = data

        // CURRENT WEATHER
        setCurrentData({
          time: current.time,
          temp: current.temperature_2m,
          weathercode: current.weathercode,
          humidity: current.relative_humidity_2m,
          wind: current.wind_speed_10m,
          feelsLike: current.apparent_temperature
        })

        // HOURLY WEATHER (NEXT 8 HOURS)
        const { time, temperature_2m, weathercode } = hourly

        const nowIso = new Date().toISOString().slice(0, 13)

        const startIndex = time.findIndex((t: string) =>
          t.startsWith(nowIso)
        )

        setHourlyData({
          time: time.slice(startIndex, startIndex + 8),
          temp: temperature_2m.slice(startIndex, startIndex + 8),
          weathercode: weathercode.slice(startIndex, startIndex + 8)
        })

        // DAILY WEATHER (NEXT 7 DAYS)
        setDailyData({
          time: daily.time.slice(0, 7),
          weathercode: daily.weathercode.slice(0, 7),
          maxTemp: daily.temperature_2m_max.slice(0, 7),
          minTemp: daily.temperature_2m_min.slice(0, 7)
        })

        // REVERSE GEOCODING
        const geoRes = await axios.get(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
        )

        setLocation({
          city: geoRes.data.city || geoRes.data.locality,
          country: geoRes.data.countryName
        })

      } catch (err) {
        console.error(err)
        setError("Failed to fetch weather")
      } finally {
        setLoading(false)
      }
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        fetchWeather(pos.coords.latitude, pos.coords.longitude)
      },
      () => {
        setError("Location permission denied")
      }
    )

  }, [])

  return {
    currentData,
    hourlyData,
    dailyData,
    location,
    loading,
    error
  }
}