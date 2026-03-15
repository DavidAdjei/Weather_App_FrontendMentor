import { useState } from 'react'
import Unit from '../../assets/images/icon-units.svg'
import Drop from '../../assets/images/icon-dropdown.svg'
import type { WeatherUnits } from '../../types/types'


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

          {/* Temperature */}
          <div>
            <p className='text-neutral-400 text-xs mb-1'>Temperature</p>

            <button
              onClick={() => updateUnit('temperature', 'celsius')}
              className={`w-full flex justify-between px-3 py-2 rounded-md ${
                units.temperature === 'celsius'
                  ? 'bg-neutral-700 text-white'
                  : 'text-neutral-300'
              }`}
            >
              Celsius (°C)
              {units.temperature === 'celsius' && '✓'}
            </button>

            <button
              onClick={() => updateUnit('temperature', 'fahrenheit')}
              className={`w-full flex justify-between px-3 py-2 rounded-md ${
                units.temperature === 'fahrenheit'
                  ? 'bg-neutral-700 text-white'
                  : 'text-neutral-300'
              }`}
            >
              Fahrenheit (°F)
              {units.temperature === 'fahrenheit' && '✓'}
            </button>
          </div>

          {/* Wind */}
          <div>
            <p className='text-neutral-400 text-xs mb-1'>Wind Speed</p>

            <button
              onClick={() => updateUnit('windspeed', 'kmh')}
              className={`w-full flex justify-between px-3 py-2 rounded-md ${
                units.windspeed === 'kmh'
                  ? 'bg-neutral-700 text-white'
                  : 'text-neutral-300'
              }`}
            >
              km/h
              {units.windspeed === 'kmh' && '✓'}
            </button>

            <button
              onClick={() => updateUnit('windspeed', 'mph')}
              className={`w-full flex justify-between px-3 py-2 rounded-md ${
                units.windspeed === 'mph'
                  ? 'bg-neutral-700 text-white'
                  : 'text-neutral-300'
              }`}
            >
              mph
              {units.windspeed === 'mph' && '✓'}
            </button>
          </div>

          {/* Precipitation */}
          <div>
            <p className='text-neutral-400 text-xs mb-1'>Precipitation</p>

            <button
              onClick={() => updateUnit('precipitation', 'mm')}
              className={`w-full flex justify-between px-3 py-2 rounded-md ${
                units.precipitation === 'mm'
                  ? 'bg-neutral-700 text-white'
                  : 'text-neutral-300'
              }`}
            >
              Millimeters (mm)
              {units.precipitation === 'mm' && '✓'}
            </button>

            <button
              onClick={() => updateUnit('precipitation', 'inch')}
              className={`w-full flex justify-between px-3 py-2 rounded-md ${
                units.precipitation === 'inch'
                  ? 'bg-neutral-700 text-white'
                  : 'text-neutral-300'
              }`}
            >
              Inches (in)
              {units.precipitation === 'inch' && '✓'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
