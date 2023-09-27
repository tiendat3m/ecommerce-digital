import React, { memo } from 'react'

const SelectQuantity = ({quantity, handleQuantity, handleChangeQuantity}) => {
    return (
        <div className='flex items-center'>
            <span className='p-2 border-r border-black cursor-pointer' onClick={() => handleChangeQuantity('minus')}>-</span>
            <input 
                type="text" 
                className='w-[50px] py-2 outline-none text-center'
                value={quantity}
                onChange={(e) => handleQuantity(e.target.value)} 
            />

            <span className='p-2 border-l border-black cursor-pointer' onClick={() => handleChangeQuantity('plus')}>+</span>
        </div>
    )
}

export default memo(SelectQuantity)
