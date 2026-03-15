import { useState } from 'react'
import Unit from '../../assets/images/icon-units.svg'
import Drop from '../../assets/images/icon-dropdown.svg'
import type { WeatherUnits } from '../../types/types'
import UnitButton from './UnitButton'

type Props = {
  units: WeatherUnits
  setUnits: (units: WeatherUnits) => void
}

export default function UnitsDropdown ({ units, setUnits }: Props) {
  const [open, setOpen] = useState(false)

  const updateUnit = (key: keyof WeatherUnits, value: string) => {
    setUnits({
      ...units,
      [key]: value
    } as WeatherUnits)
  }

  const data = [
    {
      title: 'Temperature',
      forWhat: 'temperature' as keyof WeatherUnits,
      content: [
        {
          name: 'Celsius (°C)',
          value: 'celsius'
        },
        {
          name: 'Fahrenheit (°F)',
          value: 'fahrenheit'
        }
      ]
    },
    {
      title: 'Wind Speed',
      forWhat: 'windspeed' as keyof WeatherUnits,
      content: [
        {
          name: 'km/h',
          value: 'kmh'
        },
        {
          name: 'mph',
          value: 'mph'
        }
      ]
    },
    {
      title: 'Precipitation',
      forWhat: 'precipitation' as keyof WeatherUnits,
      content: [
        {
          name: 'Millimeters (mm)',
          value: 'mm'
        },
        {
          name: 'Inches (in)',
          value: 'inch'
        }
      ]
    }
  ]

  return (
    <div className='relative'>
      {/* Button */}
      <button
        onClick={() => setOpen(!open)}
        className='flex items-center gap-1 md:gap-2 bg-neutral-800 text-neutral-200 px-2 py-1 md:px-4 md:py-2 rounded-lg hover:bg-neutral-700 transition text-sm md:text-base'
      >
        <img src={Unit} alt='settings' className='w-3 h-3 md:w-5 md:h-5' />

        <span>Units</span>

        <img src={Drop} alt='dropdown' className='w-3 h-3 md:w-5 md:h-5' />
      </button>

      {/* Dropdown */}
      {open && (
        <div className='z-40 absolute right-0 mt-3 w-64 bg-neutral-800 rounded-xl p-4 shadow-lg flex flex-col gap-4'>
          <p className='text-neutral-200 text-sm font-semibold'>
            Switch to Imperial
          </p>
          {data.map((dt, i) => (
            <div key={i}>
              <p className='text-neutral-400 text-xs mb-1'>{dt.title}</p>
              {dt.content.map((val, index) => (
                <UnitButton
                  key={index}
                  units={units}
                  updateUnit={updateUnit}
                  name={val.name}
                  value={val.value}
                  forWhat={dt.forWhat}
                />
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
