import { useEffect, useState } from 'react'
import axios from 'axios';
import { HourlyComp } from './components/mini/HourlyComp';

function App() {
  const [hourlyData, setHourlyData] = useState({});
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const getData = async () => {
      setLoading(true)
      const { data } = await axios.get("https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m");
      
      const {time, temperature_2m} = data;
      const now = new Date();
      const nowIso = now.toISOString().slice(0, 13)
      console.log({nowIso});

      const startIndex = time.findIndex(t => t.startsWith(nowIso));

      const next8 = {
        time: time.slice(startIndex, startIndex + 8),
        temp: temperature_2m.slice(startIndex, startIndex + 8)
      }
      console.log({ next8 });
      setHourlyData(next8)
      return data;
    }
    getData()
  }, [hourlyData])

  return (
    <div className='flex py-10 bg-cyan-900'>
      {/* <HourlyComp/> */}
    </div>
  )
}

export default App
