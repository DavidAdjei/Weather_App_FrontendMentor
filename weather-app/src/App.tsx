import { Header } from './components/main/Header'
import { Intro } from './components/main/Intro'
import { HourlyForecast } from './components/main/HourlyForcast'
import MainBanner from './components/main/MainBanner'
import { useWeather } from './hooks/useWeather'
import DailyForcast from './components/main/DailyForcast'
import type { Location, WeatherUnits } from './types/types'
import { useEffect, useState } from 'react'
import ApiError from './components/main/ApiError'

function App() {
  const [units, setUnits] = useState<WeatherUnits>({
    temperature: 'celsius',
    windspeed: 'kmh',
    precipitation: 'mm'
  })

  const [location, setLocation] = useState<Location | null>(null)
  const [error, setError] = useState<string | null>(null)

  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' })
  const [selectedDay, setSelectedDay] = useState<string>(today)

  const defaultLocation: Location = {
    city: "Accra",
    country: "Ghana",
    latitude: 5.6037,
    longitude: -0.1870,
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      pos => {
        setLocation({
          city: "",
          country: "",
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude
        })
      },
      () => {
        setLocation(defaultLocation)
      }
    )
  }, [])

  // ✅ Call hook at top level (NOT inside useEffect)
  const {
    currentData,
    hourlyData,
    hourlyLoad,
    loading,
    dailyData
  } = useWeather(units, selectedDay, setLocation, setError, location)

  const isAnyTrue = loading || hourlyLoad

  if (error) {
    return (
      <div className='w-full min-h-screen bg-blue-700 flex flex-col'>
        <Header units={units} setUnits={setUnits} />
        <ApiError />
      </div>
    )
  }

  return (
    <div className='w-full min-h-screen bg-blue-700 flex flex-col'>
      <Header units={units} setUnits={setUnits} />
      <Intro setLocation={setLocation} />

      <main className='w-full flex justify-center px-5 md:px-20 pb-10'>
        <div className='w-full max-w-7.5xl grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-6'>

          {/* LEFT SIDE */}
          <div className='flex flex-col gap-6'>
            <MainBanner
              loading={loading}
              units={units}
              weather={
                currentData && location
                  ? {
                    city: location.city,
                    country: location.country,
                    temperature: currentData.temp,
                    humidity: currentData.humidity,
                    wind: currentData.wind,
                    feelsLike: currentData.feelsLike
                  }
                  : undefined
              }
            />

            <div>
              <span className='text-2xl text-neutral-50 font-bold'>
                Daily Forecast
              </span>
              <DailyForcast
                dailyData={dailyData || undefined}
                loading={loading}
                units={units}
              />
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className='w-full'>
            <HourlyForecast
              hourlyData={hourlyData || undefined}
              selectedDay={selectedDay}
              setSelectedDay={setSelectedDay}
              loading={isAnyTrue}
              units={units}
            />
          </div>
        </div>
      </main>
    </div>
  )
}

export default App