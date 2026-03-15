type Props ={
    name: string
    value: string
}
export default function Condition ({name, value}: Props) {
  return (
    <div className='bg-neutral-800 rounded-xl p-4 flex flex-col gap-7'>
      <p className='text-neutral-300 text-sm'>{name}</p>
      <p className='text-neutral-0 text-xl font-semibold'>
        {value}
      </p>
    </div>
  )
}
