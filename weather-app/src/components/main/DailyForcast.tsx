import DailyComp from '../mini/DailyComp'

type DailyWeather = {
  time: string[]
  weathercode: number[]
  maxTemp: number[]
  minTemp: number[]
}

type DailyWeatherProp = {
  dailyData?: DailyWeather
  loading: boolean
}

export default function DailyForcast ({ dailyData, loading }: DailyWeatherProp) {
  if (loading || !dailyData) {
    return (
      <div className='flex flex-wrap gap-4 mt-4 w-full'>
        {[...Array(7)].map((_, i) => (
          <div key={i} className='flex flex-col items-center justify-between bg-neutral-800 rounded-xl px-4 py-4 flex-1 min-w-30 max-w-40 h-32.5'></div>
        ))}
      </div>
    )
  }
  return (
    <div className='flex flex-wrap gap-4 mt-4 w-full'>
      {dailyData?.time.map((date, i) => (
        <DailyComp
          key={date}
          day={new Date(date).toLocaleDateString('en-US', { weekday: 'short' })}
          code={dailyData.weathercode[i]}
          maxTemp={dailyData.maxTemp[i]}
          minTemp={dailyData.minTemp[i]}
        />
      ))}
    </div>
  )
}
