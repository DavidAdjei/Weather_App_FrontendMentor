import { useEffect, useState } from 'react'
import axios from 'axios';
import { Header } from './components/main/Header';
import { Intro } from './components/main/Intro';
import { HourlyForecast } from './components/main/HourlyForcast';

function App() {
  const [hourlyData, setHourlyData] = useState({});
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const getData = async () => {
      setLoading(true)
      const { data } = await axios.get("https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,weathercode&hourly=temperature_2m,weathercode");

      const { hourly } = data;
      const { time, temperature_2m, weathercode } = hourly;
      const now = new Date();
      const nowIso = now.toISOString().slice(0, 13)

      const startIndex = time.findIndex(t => t.startsWith(nowIso));

      const next8 = {
        time: time.slice(startIndex, startIndex + 8),
        temp: temperature_2m.slice(startIndex, startIndex + 8),
        code: weathercode.slice(startIndex, startIndex + 8)
      }
      console.log({ next8 });
      setHourlyData(next8)
      return data;
    }
    getData()
  }, [])

  return (
    <div className="w-full min-h-lvh flex bg-blue-700 flex-col">
      <Header />
      <Intro />
      <HourlyForecast hourlyData={hourlyData}/>
    </div>
  )
}

export default App
