import { Component } from 'react'
import type { ReactNode } from 'react'
import { HourlyComp } from '../mini/HourlyComp'
import DayDropdown from '../mini/DayDropdown'
// ----------------------------
// Types
// ----------------------------
export type HourlyData = {
  time: string[]
  temp: number[]
  weathercode: number[]
}

type HourlyForecastProps = {
  hourlyData?: HourlyData
  selectedDay: string
  setSelectedDay: (day: string) => void
  loading: boolean
}

// ----------------------------
// Error Boundary
// ----------------------------
class ForecastErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false }

  static getDerivedStateFromError () {
    return { hasError: true }
  }

  componentDidCatch (error: Error, info: unknown) {
    console.error('HourlyForecast error:', error, info)
  }

  render () {
    if (this.state.hasError) {
      return (
        <aside className='bg-neutral-800 rounded-2xl p-6 w-full md:w-[320px] text-red-400'>
          Something went wrong loading the forecast.
        </aside>
      )
    }

    return this.props.children
  }
}

// ----------------------------
// HourlyForecast Component
// ----------------------------
export const HourlyForecast = ({
  hourlyData,
  selectedDay,
  setSelectedDay,
  loading
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
          {[...Array(8)].map((_, i) => (
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
            code={hour.code}
          />
        ))}
      </div>
    </aside>
  )
}

// ----------------------------
// Export with Error Boundary
// ----------------------------
export const HourlyForecastWithBoundary = (props: HourlyForecastProps) => (
  <ForecastErrorBoundary>
    <HourlyForecast {...props} />
  </ForecastErrorBoundary>
)
