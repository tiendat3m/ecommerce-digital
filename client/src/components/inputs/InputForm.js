import clsx from 'clsx'
import React from 'react'
import { memo } from 'react'

const InputForm = ({ label, disabled, style, register, errors, id, validate, type = 'text', placeholder, fullWidth, defaultValue }) => {
    return (
        <div className={clsx('flex flex-col h-[70px] gap-2', style)}>
            {label && <label htmlFor={id}>{label}</label>}
            <input
                type={type}
                id={id}
                {...register(id, validate)}
                disabled={disabled}
                placeholder={placeholder}
                className={clsx('form-input my-auto text-sm max-h-[38px]', fullWidth && 'w-full')}
                defaultValue={defaultValue}
            />
            {errors[id] && <small className='text-xs text-main'>{errors[id]?.message}</small>}
        </div>
    )
}

export default memo(InputForm)
