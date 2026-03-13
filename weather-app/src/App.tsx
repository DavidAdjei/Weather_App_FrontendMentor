import { Header } from './components/main/Header'
import { Intro } from './components/main/Intro'
import { HourlyForecastWithBoundary } from './components/main/HourlyForcast'
import MainBanner from './components/main/MainBanner'
import { useWeather } from './hooks/useWeather'
import DailyForcast from './components/main/DailyForcast'

function App() {
  const { currentData, hourlyData, location, loading, error, dailyData } = useWeather()

  if (loading) return <p className="text-white p-10">Loading weather...</p>
  if (error) return <p className="text-white p-10">{error}</p>

  return (
    <div className="w-full min-h-screen bg-blue-700 flex flex-col">

      <Header />
      <Intro />

      {/* Main content container */}
      <main className="w-full flex justify-center px-5 md:px-20 pb-20">

        {/* Responsive grid */}
        <div className="w-full max-w-7.5xl grid grid-cols-1 lg:grid-cols-[3fr_1.2fr] gap-6">

          {/* LEFT SIDE */}
          <div className="flex flex-col gap-6">

            {currentData && location && (
              <MainBanner
                weather={{
                  city: location.city,
                  country:location.country,
                  temperature: currentData.temp,
                  weathercode: currentData.weathercode,
                  humidity: currentData.humidity,
                  wind: currentData.wind,
                  feelsLike: currentData.feelsLike
                }}
              />
            )}

            {
              dailyData && (
                <DailyForcast 
                  dailyData={dailyData}
                />
              )
            }

          </div>

          {/* RIGHT SIDE */}
          <div className="w-full">
            <HourlyForecastWithBoundary hourlyData={hourlyData} />
          </div>

        </div>
      </main>
    </div>
  )
}

export default App