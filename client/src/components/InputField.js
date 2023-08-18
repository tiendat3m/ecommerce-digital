import React, { useState } from 'react'

const InputField = ({value, setValue, nameKey, type, invalidFields, setInvalidFields}) => {
    return (
        <div className='w-full relative '>
           {value.trim() !== '' &&  
           <label 
                htmlFor={nameKey}
                className='absolute top-[-6px] left-[12px] text-[10px] bg-white px-1 block animate-slide-top-sm'
            >
                {nameKey?.slice(0, 1).toUpperCase() + nameKey?.slice(1)}
            </label>}
            <input 
                type={type || 'text'}
                className='px-4 py-2 rounded-sm border outline-none w-full mb-[15px] placeholder:text-sm placeholder:italic'
                placeholder={nameKey?.slice(0, 1).toUpperCase() + nameKey?.slice(1)}
                value={value}
                onChange={e => setValue(prev => ({...prev, [nameKey]: e.target.value}))}
            />
        </div>
    )
}

export default InputField
