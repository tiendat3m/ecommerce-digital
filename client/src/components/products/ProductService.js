import React, { memo } from 'react'

const ProductService = ({ title, sub, icon }) => {
    return (
        <div className='flex p-[10px] items-center border gap-3 mb-[10px]'>
            <span className='p-2 bg-gray-700 rounded-full text-white'>{icon}</span>
            <div className='flex flex-col'>
                <span className='text-sm text-gray-600'>{title}</span>
                <span className='text-xs opacity-70'>{sub}</span>
            </div>
        </div>
    )
}

export default memo(ProductService)
