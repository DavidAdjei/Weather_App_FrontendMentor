import Check from '../../assets/images/icon-checkmark.svg'
import type { WeatherUnits } from '../../types/types'

type Props = {
  units: WeatherUnits
  updateUnit: (forWhat: keyof WeatherUnits, value: string) => void
  name: string
  value: string
  forWhat: keyof WeatherUnits
}

export default function UnitButton({
  units,
  updateUnit,
  name,
  value,
  forWhat
}: Props) {
  const isActive = units[forWhat] === value

  return (
    <button
      onClick={() => updateUnit(forWhat, value)}
      className={`w-full text-left px-3 py-2 rounded-md text-neutral-200 hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-500 flex justify-between md ${isActive ? 'bg-neutral-700 text-white' : 'text-neutral-300'
        }`}
    >
      <span>{name}</span>
      {units[forWhat] === value && <img src={Check} alt='Check' />}
    </button>
  )
}
