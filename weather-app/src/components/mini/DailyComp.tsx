import { getWeatherIcon } from "./HourlyComp"

type DailyCompProps = {
  day: string
  code: number
  maxTemp: number
  minTemp: number
}

export default function DailyComp({
  day,
  code,
  maxTemp,
  minTemp
}: DailyCompProps) {
  return (
    <div className="flex flex-col items-center justify-between bg-neutral-800 rounded-xl px-4 py-4 flex-1 min-w-30 max-w-45 h-32.5">

      <span className="text-neutral-300 text-sm font-medium">
        {day}
      </span>

      <img
        src={getWeatherIcon(code)}
        alt="weather icon"
        className="w-7 h-7"
      />

      <div className="flex gap-2 text-sm font-semibold w-full justify-between">
        <span className="text-neutral-0">{Math.round(maxTemp)}°</span>
        <span className="text-neutral-300">{Math.round(minTemp)}°</span>
      </div>

    </div>
  )
}