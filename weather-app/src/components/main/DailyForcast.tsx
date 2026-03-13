import DailyComp from '../mini/DailyComp'

type DailyWeather = {
  time: string[]
  weathercode: number[]
  maxTemp: number[]
  minTemp: number[]
}

type DailyWeatherProp = {
  dailyData: DailyWeather
}

export default function DailyForcast({ dailyData }: DailyWeatherProp) {
  return (
    <div className="flex flex-wrap gap-4 mt-4 w-full">
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