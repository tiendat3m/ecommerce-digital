import React from 'react'

const ProductInfo = ({ title, sub, icon }) => {
    return (
        <div className='flex items-center gap-3 mb-[10px] border p-[10px]'>
            <span className='p-2 rounded-full bg-gray-700 text-white'>{icon}</span>
            <div className='flex flex-col'>
                <span className='text-sm'>{title}</span>
                <span className='text-xs opacity-70'>{sub}</span>
            </div>
        </div>
    )
}

export default ProductInfo
