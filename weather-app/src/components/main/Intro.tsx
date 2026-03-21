import { useEffect, useState } from 'react'
import axios from 'axios'
import SearchIcon from '../../assets/images/icon-search.svg'
import Loading from '../../assets/images/icon-loading.svg'
import type { Location } from '../../types/types'

type Props = {
  setLocation: (location: Location) => void
}

type Loc = {
  name: string
  country: string
  latitude: string
  longitude: string
}

export const Intro = ({ setLocation }: Props) => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Location[]>([])
  const [loading, setLoading] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)

  useEffect(() => {
    if (!query) {
      setResults([])
      return
    }

    const delay = setTimeout(async () => {
      try {
        setLoading(true)

        const { data } = await axios.get(
          `https://geocoding-api.open-meteo.com/v1/search?name=${query}&count=5&language=en&format=json`
        )
        let responses = []
        if (data.results) {
          console.log({ results: data.results })
          const newData = data.results.map((loc: Loc) => ({
            city: loc.name,
            country: loc.country,
            latitude: loc.latitude,
            longitude: loc.longitude
          }))

          responses = newData
        }
        setResults(responses || [])
        setShowDropdown(true)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }, 400) // debounce

    return () => clearTimeout(delay)
  }, [query])

  useEffect(() => {
    const close = () => setShowDropdown(false)
    window.addEventListener('click', close)
    return () => window.removeEventListener('click', close)
  }, [])

  return (
    <section className='w-full flex flex-col items-center text-center mt-7 px-5 md:px-0 gap-6'>
      {/* Heading */}
      <h1 className='font-display text-4xl md:text-6xl text-neutral-0 leading-tight max-w-212.5'>
        How’s the sky looking today?
      </h1>

      {/* Search Area */}
      <div className='w-full max-w-212.5 mt-8 flex flex-col md:flex-row gap-4 mb-8 relative'>
        {/* Input */}
        <div className='flex items-center bg-neutral-800 rounded-xl px-4 py-3 flex-1 relative focus-within:ring-2 focus-within:ring-neutral-500 focus-within:bg-neutral-700 transition'>
          <img
            src={SearchIcon}
            alt='search'
            className='w-5 h-5 opacity-70 mr-3'
          />

          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            onFocus={() => results.length && setShowDropdown(true)}
            placeholder='Search for a place...'
            className='bg-transparent outline-none text-neutral-200 placeholder-neutral-300 w-full'
          />

          {/* Dropdown */}
          {showDropdown && (
            <div className='absolute left-0 top-14 w-full bg-neutral-800 rounded-xl shadow-lg overflow-hidden z-50'>
              {loading && (
                <div className='px-4 py-3 text-neutral-300 text-sm flex items-center gap-3'>
                  <img src={Loading} alt='Loading' />
                  <span>Search in progress</span>
                </div>
              )}

              {!loading &&
                results.map((city, i) => (
                  <button
                    type='button'
                    key={i}
                    className='w-full text-left px-4 py-3 hover:bg-neutral-700 text-neutral-200'
                    onClick={() => {
                      setLocation(city)
                      setShowDropdown(false)
                    }}
                  >
                    {city.city}, {city.country}
                  </button>
                ))}

              {!loading && results.length === 0 && (
                <div className='px-4 py-3 text-neutral-400 text-sm'>
                  No results
                </div>
              )}
            </div>
          )}
        </div>

        {/* Button */}
        <button className='bg-blue-500 hover:bg-blue-700 transition text-neutral-0 px-8 py-3 rounded-xl font-medium' type='button'>
          Search
        </button>
      </div>
    </section>
  )
}
