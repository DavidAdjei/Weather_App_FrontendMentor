import { HourlyComp } from '../mini/HourlyComp'
import DayDropdown from '../mini/DayDropdown'
import type { HourlyWeather, WeatherUnits } from '../../types/types'

type HourlyForecastProps = {
  hourlyData?: HourlyWeather
  selectedDay: string
  setSelectedDay: (day: string) => void
  loading: boolean
  units: WeatherUnits
}

export const HourlyForecast = ({
  hourlyData,
  selectedDay,
  setSelectedDay,
  loading,
  units
}: HourlyForecastProps) => {
  if (!hourlyData || !hourlyData.time?.length || loading) {
    return (
      <aside className='bg-neutral-800 rounded-2xl p-6 w-full lg:w-90 xl:w-120'>
        <div className='flex items-center justify-between mb-5'>
          <h2 className='text-neutral-0 font-semibold text-xl'>
            Hourly forecast
          </h2>
        </div>

        <div className='flex flex-col gap-3 animate-pulse'>
          {[...Array(7)].map((_, i) => (
            <div key={i} className='h-15 rounded-lg bg-neutral-700' />
          ))}
        </div>
      </aside>
    )
  }

  const hourlyList = hourlyData.time.map((t, index) => ({
    time: new Date(t).toLocaleTimeString([], { hour: 'numeric' }),
    temp: hourlyData.temp[index],
    code: hourlyData.weathercode[index]
  }))

  return (
    <aside className='bg-neutral-800 rounded-2xl p-6 w-full lg:w-90 xl:w-120'>
      <div className='flex items-center justify-between mb-5'>
        <h2 className='text-neutral-0 font-semibold text-xl'>
          Hourly forecast
        </h2>
        <DayDropdown
          selectedDay={selectedDay}
          setSelectedDay={setSelectedDay}
        />
      </div>

      <div
        className='flex flex-col gap-3 max-h-133 overflow-y-auto pr-1 scrollbar-width-thin 
            [&::-webkit-scrollbar]:w-1.5
            [&::-webkit-scrollbar-track]:bg-neutral-800
            [&::-webkit-scrollbar-thumb]:bg-neutral-700
            [&::-webkit-scrollbar-thumb]:rounded-full"'
      >
        {hourlyList.map((hour, index) => (
          <HourlyComp
            key={index}
            time={hour.time}
            temp={Math.round(hour.temp)}
            unit={units.temperature}
          />
        ))}
      </div>
    </aside>
  )
}