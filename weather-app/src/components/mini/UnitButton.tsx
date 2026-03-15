import Check from '../../assets/images/icon-checkmark.svg'
import type { WeatherUnits } from '../../types/types'

type Props = {
  units: WeatherUnits
  updateUnit: (forWhat: keyof WeatherUnits, value: string) => void
  name: string
  value: string
  forWhat: keyof WeatherUnits
}

export default function UnitButton ({
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
      className={`w-full flex justify-between px-3 py-2 rounded-md ${
        isActive ? 'bg-neutral-700 text-white' : 'text-neutral-300'
      }`}
    >
      <span>{name}</span>
      {units[forWhat] === value && <img src={Check} alt='Check' />}
    </button>
  )
}
