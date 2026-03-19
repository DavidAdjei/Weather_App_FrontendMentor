import { useEffect, useState } from 'react'
import axios from 'axios'
import type { CurrentWeather, DailyWeather, HourlyWeather, Location, WeatherUnits } from '../types/types'

export const useWeather = (units: WeatherUnits, selectedDay: string, setLocation: (location: Location) => void, setError: (error: string) => void, location: Location
) => {
  const [currentData, setCurrentData] = useState<CurrentWeather | null>(null)
  const [hourlyData, setHourlyData] = useState<HourlyWeather | null>(null)
  const [dailyData, setDailyData] = useState<DailyWeather | null>(null)

  const [loading, setLoading] = useState(false)
  const [hourlyLoad, setHourlyLoad] = useState(false)

  useEffect(() => {
    if (!location) return;

    const fetchMainWeather = async () => {
      try {
        setLoading(true)

        const weatherUrl =
          `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}` +
          `&current=temperature_2m,relative_humidity_2m,wind_speed_10m,apparent_temperature,weathercode` +
          `&daily=weathercode,temperature_2m_max,temperature_2m_min` +
          `&temperature_unit=${units.temperature}` +
          `&windspeed_unit=${units.windspeed}` +
          `&precipitation_unit=${units.precipitation}` +
          `&timezone=auto`

        const { data } = await axios.get(weatherUrl)

        const { current, daily } = data

        setCurrentData({
          time: current.time,
          temp: current.temperature_2m,
          weathercode: current.weathercode,
          humidity: current.relative_humidity_2m,
          wind: current.wind_speed_10m,
          feelsLike: current.apparent_temperature
        })

        setDailyData({
          time: daily.time.slice(0, 7),
          weathercode: daily.weathercode.slice(0, 7),
          maxTemp: daily.temperature_2m_max.slice(0, 7),
          minTemp: daily.temperature_2m_min.slice(0, 7)
        })

        // ✅ prevent infinite loop
        if (!location.city || !location.country) {
          const geoRes = await axios.get(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${location.latitude}&longitude=${location.longitude}&localityLanguage=en`
          )

          setLocation({
            ...location,
            city: geoRes.data.city || geoRes.data.locality,
            country: geoRes.data.countryName,
          })
        }

      } catch (err) {
        console.log(err)
        setError('Failed to fetch weather')
      } finally {
        setLoading(false)
      }
    }

    fetchMainWeather()

  }, [units, location])

  type MapType = {
    date: Date
    time: string
    temp: number
    code: number
  }
  useEffect(() => {
    if (!location) return;

    const fetchHourlyWeather = async () => {
      try {
        setHourlyLoad(true)
        const weatherUrl =
          `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}` +
          `&hourly=temperature_2m,weathercode` +
          `&temperature_unit=${units.temperature}` +
          `&timezone=auto`

        const { data } = await axios.get(weatherUrl)

        const { time, temperature_2m, weathercode } = data.hourly

        const filtered = time
          .map((t: string, i: number) => ({
            date: new Date(t),
            time: t,
            temp: temperature_2m[i],
            code: weathercode[i]
          }))
          .filter(
            (hour: MapType) =>
              hour.date.toLocaleDateString('en-US', { weekday: 'long' }) ===
              selectedDay
          )

        setHourlyData({
          time: filtered.map((h: MapType) => h.time),
          temp: filtered.map((h: MapType) => h.temp),
          weathercode: filtered.map((h: MapType) => h.code)
        })
      } catch (err) {
        console.log(err)
        setError('Failed to fetch weather')
      } finally {
        setHourlyLoad(false)
      }
    }

    fetchHourlyWeather()
  }, [units, selectedDay, location, setError])

  return {
    currentData,
    hourlyData,
    dailyData,
    location,
    loading,
    hourlyLoad,
    setLoading,
  }
}
