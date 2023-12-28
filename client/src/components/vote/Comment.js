import React, { memo } from 'react'
import moment from 'moment'
import { FaUserCircle } from 'react-icons/fa'
import { renderStarFromNumber } from 'utils/helpers'
const Comment = ({ name, comment, updatedAt, star }) => {
    return (
        <div className='flex gap-4'>
            <div className='flex-none'>
                <span><FaUserCircle size={25} color='#007BA7' /></span>
            </div>
            <div className='flex flex-col flex-auto gap-2'>
                <div className='flex justify-between items-center'>
                    <h3 className='font-semibold'>{name}</h3>
                    <span className='text-xs text-gray-500 italic'>{moment(updatedAt)?.fromNow()}</span>
                </div>
                <div className='flex flex-col gap-2 pl-4 text-sm border border-gray-300 bg-gray-100 py-2'>
                    <span className='flex items-center gap-1'>
                        <span className='font-semibold'>Vote: </span>
                        <span className='flex items-center gap-1'>{renderStarFromNumber(star)?.map((el, index) => (
                            <span key={index}>{el}</span>
                        ))}</span>
                    </span>
                    <span className='flex gap-1'>
                        <span className='font-semibold'>Comment: </span>
                        <span className='flex items-center gap 1'>{comment}</span>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default memo(Comment)
