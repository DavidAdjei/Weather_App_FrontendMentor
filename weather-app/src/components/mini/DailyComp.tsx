import type { WeatherUnits } from "../../types/types"
import { getWeatherIcon } from "./HourlyComp"

type DailyCompProps = {
  day: string
  maxTemp: number
  minTemp: number
  units: WeatherUnits
}

export default function DailyComp({
  day,
  units,
  maxTemp,
  minTemp
}: DailyCompProps) {

  const avrtemp = (maxTemp + minTemp)/2
  return (
    <div className="flex flex-col items-center justify-between bg-neutral-800 rounded-xl px-4 py-4 flex-1 min-w-25 max-w-45 h-32.5">

      <span className="text-neutral-300 text-sm font-medium">
        {day}
      </span>

      <img
        src={getWeatherIcon(avrtemp, units.temperature)}
        alt="weather icon"
        className="w-14 h-14"
      />

      <div className="flex gap-2 text-sm font-semibold w-full justify-between">
        <span className="text-neutral-0">{Math.round(maxTemp)}°</span>
        <span className="text-neutral-300">{Math.round(minTemp)}°</span>
      </div>

    </div>
  )
}