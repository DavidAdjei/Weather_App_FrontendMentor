import BgToday from "../../assets/images/bg-today-large.svg"
import { getWeatherIcon } from "../mini/HourlyComp"

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
  weather: CurrentWeather
}

export default function MainBanner({ weather }: MainBannerProps) {
  return (
    <section className="w-full flex flex-col gap-6">

      {/* Weather Banner */}
      <div
        className="w-full h-77 rounded-2xl p-6 md:p-8 flex items-center justify-between bg-cover bg-center"
        style={{ backgroundImage: `url(${BgToday})` }}
      >

        {/* Location */}
        <div>
          <h2 className="text-neutral-0 text-4xl font-semibold">
            {weather.city}, {weather.country}
          </h2>

          <p className="text-neutral-300 text-sm mt-1">
            {new Date().toLocaleDateString(undefined, {
              weekday: "long",
              month: "short",
              day: "numeric",
              year: "numeric"
            })}
          </p>
        </div>

        {/* Temperature */}
        <div className="flex items-center gap-6">
          <img
            src={getWeatherIcon(weather.weathercode)}
            alt="weather icon"
            className="w-12 h-12 md:w-16 md:h-16"
          />

          <span className="text-5xl md:text-6xl font-bold text-neutral-0">
            {Math.round(weather.temperature)}°
          </span>
        </div>

      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

        <div className="bg-neutral-800 rounded-xl p-4">
          <p className="text-neutral-300 text-sm">Feels Like</p>
          <p className="text-neutral-0 text-xl font-semibold">
            {Math.round(weather.feelsLike)}°
          </p>
        </div>

        <div className="bg-neutral-800 rounded-xl p-4">
          <p className="text-neutral-300 text-sm">Humidity</p>
          <p className="text-neutral-0 text-xl font-semibold">
            {weather.humidity}%
          </p>
        </div>

        <div className="bg-neutral-800 rounded-xl p-4">
          <p className="text-neutral-300 text-sm">Wind</p>
          <p className="text-neutral-0 text-xl font-semibold">
            {weather.wind} km/h
          </p>
        </div>

        <div className="bg-neutral-800 rounded-xl p-4">
          <p className="text-neutral-300 text-sm">Precipitation</p>
          <p className="text-neutral-0 text-xl font-semibold">
            0 mm
          </p>
        </div>

      </div>

    </section>
  )
}