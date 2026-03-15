import { useState } from 'react'
import Drop from '../../assets/images/icon-dropdown.svg'

type Props = {
  selectedDay: string
  setSelectedDay: (day: string) => void
}

const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
]

export default function DayDropdown ({ selectedDay, setSelectedDay }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <div className='relative z-10'>
      {/* Button */}
      <button
        onClick={() => setOpen(!open)}
        className='z=20 flex items-center gap-4 justify-between bg-neutral-800 text-neutral-200 px-2 py-1 md:px-4 md:py-2 rounded-lg hover:bg-neutral-700 transition text-sm md:text-base'
      >
        <span>{selectedDay}</span>
        <img src={Drop} alt='dropdown' className='w-3 h-3 md:w-5 md:h-5' />
      </button>

      {/* Dropdown */}
      {open && (
        <div className='z-60 absolute right-2.5 p-1.5 mt-2 w-35 bg-neutral-800 rounded-lg shadow-lg overflow-hidden'>
          {days.map(day => (
            <button
              key={day}
              onClick={() => {
                setSelectedDay(day)
                setOpen(false)
              }}
              className={`w-full text-left px-3 py-2 text-sm hover:bg-neutral-700 ${
                selectedDay === day
                  ? 'bg-neutral-700 text-white'
                  : 'text-neutral-300'
              }`}
            >
              {day}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
