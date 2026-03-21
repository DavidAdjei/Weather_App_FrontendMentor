import Error from '../../assets/images/icon-error.svg'
import Retry from '../../assets/images/icon-retry.svg'

export default function ApiError () {
  function refreshPage (): void {
    window.location.reload()
  }
  return (
    <div className='w-full flex flex-col items-center pt-10 px-4'>
      <div role="alert" aria-live="assertive" className='w-full md:w-150 flex flex-col justify-center items-center gap-6'>
        <img
          src={Error}
          alt='Error'
          style={{ width: '40px', height: '40px' }}
        />
        <span id="error-heading" className='font-bold text-4xl text-neutral-100 text-center'>
          Something went wrong
        </span>
        <p className='text-xl text-neutral-50 text-center'>
          We couldn't connect to the sever (API error). Please try again in a
          few moments.
        </p>
        <button aria-describedby="error-heading" onClick={refreshPage} className='flex items-center gap-2 md:gap-4 bg-neutral-800 text-neutral-200 px-2 py-1 md:px-4 md:py-2 rounded-lg hover:bg-neutral-700 transition text-sm md:text-base'>
          <img src={Retry} alt="" aria-hidden="true" />
          <span>Retry</span>
        </button>
      </div>
    </div>
  )
}
