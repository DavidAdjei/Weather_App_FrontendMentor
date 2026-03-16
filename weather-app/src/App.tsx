import { Header } from './components/main/Header'
import { Intro } from './components/main/Intro'
import { HourlyForecast } from './components/main/HourlyForcast'
import MainBanner from './components/main/MainBanner'
import { useWeather } from './hooks/useWeather'
import DailyForcast from './components/main/DailyForcast'
import type { WeatherUnits } from './types/types'
import { useState } from 'react'
import ApiError from './components/main/ApiError'

function App() {
  const [units, setUnits] = useState<WeatherUnits>({
    temperature: 'celsius',
    windspeed: 'kmh',
    precipitation: 'mm'
  })
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' })
  const [selectedDay, setSelectedDay] = useState<string>(today)
  const { currentData, hourlyData, hourlyLoad, location, loading, error, dailyData, setLocation } =
    useWeather(units, selectedDay)

  const isAnyTrue = loading || hourlyLoad
  // if (loading) return <p className="text-white p-10">Loading weather...</p>
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

      {/* Main content container */}
      <main className='w-full flex justify-center px-5 md:px-20 pb-10'>
        {/* Responsive grid */}
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
                    weathercode: currentData.weathercode,
                    humidity: currentData.humidity,
                    wind: currentData.wind,
                    feelsLike: currentData.feelsLike
                  }
                  : undefined
              }
            />
            <div>
              <span className='text-2xl text-neutral-50 font-bold'>
                Daily Forcast
              </span>
              <DailyForcast
                dailyData={dailyData ? dailyData : undefined}
                loading={loading}
              />
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className='w-full'>
            <HourlyForecast
              hourlyData={hourlyData ? hourlyData : undefined}
              selectedDay={selectedDay}
              setSelectedDay={setSelectedDay}
              loading={isAnyTrue}
            />
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
