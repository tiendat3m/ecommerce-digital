import React from 'react'

const Countdown = ({ unit, number }) => {
    return (
        <div className='bg-[#f4f4f4] w-full h-[63px] flex flex-col justify-center items-center rounded-md '>
            <span className='text-[18px] font-semibold'>{number}</span>
            <span className='text-gray-400 text-xs'>{unit}</span>
        </div>
    )
}

export default Countdown
