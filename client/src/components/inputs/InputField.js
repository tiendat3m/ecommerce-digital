import clsx from 'clsx'
import React, { memo } from 'react'

const InputField = ({ value, setValue, nameKey, type, invalidFields, setInvalidFields, style, fullWidth, placeholder, isHideLabel }) => {
    return (
        <div className={clsx('relative flex flex-col mb-2', fullWidth && 'w-full')}>
            {!isHideLabel && value?.trim() !== '' &&
                <label
                    htmlFor={nameKey}
                    className='absolute top-[-6px] left-[12px] text-[10px] bg-white px-1 block animate-slide-top-sm'
                >
                    {nameKey?.slice(0, 1)?.toUpperCase() + nameKey?.slice(1)}
                </label>}
            <input
                type={type || 'text'}
                className={clsx('px-4 py-2 rounded-sm border outline-none my-2 w-full placeholder:text-sm placeholder:italic', style)}
                placeholder={placeholder || nameKey?.slice(0, 1)?.toUpperCase() + nameKey?.slice(1)}
                value={value}
                onChange={e => setValue(prev => ({ ...prev, [nameKey]: e.target.value }))}
                onFocus={() => setInvalidFields && setInvalidFields([])}
            />
            {invalidFields && invalidFields?.some(el => el.name === nameKey) && <small className='text-[10px] text-main italic'>{invalidFields?.find(el => el.name === nameKey)?.mes}</small>}
        </div>
    )
}

export default memo(InputField)
