import React, { useRef, useEffect, memo } from 'react'
import { AiFillStar } from 'react-icons/ai'
const VoteBar = ({ number, ratingCount, ratingTotal }) => {

    const percentRef = useRef()
    useEffect(() => {
        const percent = Math.round(ratingCount * 100 / ratingTotal) || 0
        percentRef.current.style.cssText = `right: ${100 - percent}%`
    }, [ratingCount, ratingTotal])

    return (
        <div className='flex items-center gap-2 text-sm text-gray-500 p-1'>
            <div className='flex w-[10%] items-center justify-center gap-1 text-smm' >
                <span>{number}</span>
                <AiFillStar color='orange' />
            </div>
            <div className='w-[75%]'>
                <div className='w-full h-[6px] rounded-l-full relative rounded-r-full bg-gray-200'>
                    <div ref={percentRef} className=' bg-red-500 inset-0 absolute rounded-r-full rounded-l-full '></div>
                </div>
            </div>
            <div className='w-[15%]'>
                <div className='text-xs text-gray-400 flex justify-end'>{`${ratingCount || 0} Reviewers`}</div>
            </div>
        </div>
    )
}

export default memo(VoteBar)
