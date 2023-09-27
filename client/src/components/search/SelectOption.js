import React, { memo } from 'react'

const SelectOption = ({ icons }) => {
    return (
        <div className='w-10 h-10 bg-white border rounded-full flex justify-center items-center cursor-pointer shadow-md hover:bg-gray-800 hover:text-white hover:border-gray-800'>
            {icons}
        </div>
    )
}

export default memo(SelectOption)
