import { useEffect, useState } from 'react'
import BgToday from '../../assets/images/bg-today-large.svg'
import BgMobile from '../../assets/images/bg-today-small.svg'
import { getWeatherIcon } from '../mini/HourlyComp'
import type { WeatherUnits } from '../../types/types'
import Condition from '../mini/Condition'

type CurrentWeather = {
  city: string
  country: string
  temperature: number
  weathercode: number
  humidity: number
  wind: number
  feelsLike: number
}

type MainBannerProps = {
  weather?: CurrentWeather
  loading?: boolean
  units?: WeatherUnits
}

export default function MainBanner ({
  weather,
  loading,
  units
}: MainBannerProps) {
  const [bgImage, setBgImage] = useState(
    window.innerWidth < 1028 ? BgMobile : BgToday
  )

  useEffect(() => {
    const handleResize = () => {
      setBgImage(window.innerWidth < 1028 ? BgMobile : BgToday)
    }

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  if (loading || !weather) {
    return (
      <section className='w-full flex flex-col gap-6 animate-pulse'>
        {/* Banner Skeleton */}
        <div className='w-full h-77 rounded-2xl bg-neutral-800 flex items-center justify-center'>
          <div className='flex flex-col items-center gap-2 text-neutral-300'>
            <div className='flex gap-2 text-xl'>
              <span>.</span>
              <span>.</span>
              <span>.</span>
            </div>
            <p>Loading...</p>
          </div>
        </div>

        {/* Stats Skeleton */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          {['Feels Like', 'Humidity', 'Wind', 'Precipitation'].map(
            (data, i) => (
              <Condition key={i} name={data} value='-' />
            )
          )}
        </div>
      </section>
    )
  }

  return (
    <section className='w-full flex flex-col gap-6'>
      <div
        className='w-full min-h-77 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between bg-cover bg-center'
        style={{
          backgroundImage: `url(${bgImage})`
        }}
      >
        <div>
          <h2 className='text-neutral-0 text-4xl font-semibold'>
            {weather.city}, {weather.country}
          </h2>

          <p className='text-neutral-300 text-sm mt-1'>
            {new Date().toLocaleDateString(undefined, {
              weekday: 'long',
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            })}
          </p>
        </div>

        <div className='flex items-center gap-6'>
          <img
            src={getWeatherIcon(weather.weathercode)}
            alt='weather icon'
            className='w-12 h-12 md:w-16 md:h-16'
          />

          <span className='text-5xl md:text-6xl font-bold text-neutral-0'>
            {Math.round(weather.temperature)}°
          </span>
        </div>
      </div>

      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {[
          { name: 'Feels Like', value: `${Math.round(weather.feelsLike)}°` },
          { name: 'Humidity', value: `${weather.humidity}%` },
          { name: 'Wind', value: `${weather.wind} ${units?.windspeed}` },
          {
            name: 'Precipitation',
            value: `0 ${units?.precipitation === 'mm' ? 'mm' : 'In'}`
          }
        ].map((data, i) => (
          <Condition key={i} name={data.name} value={data.value} />
        ))}
      </div>
    </section>
  )
}
