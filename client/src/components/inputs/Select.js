import clsx from 'clsx'
import React from 'react'
import { memo } from 'react'

const Select = ({ label, options = [], register, errors, id, validate, style, fullWidth, defaultValue }) => {
    return (
        <div className=' flex flex-col gap-2'>
            {label && <label htmlFor={id}>{label}</label>}
            <select className={clsx('form-select text-sm', fullWidth && 'w-full', style)} id={id} {...register(id, validate)}>
                <option value="">
                    --Choose--
                </option>
                {options?.map(el => (
                    <option value={el.code}>{el.value}</option>
                ))}
            </select>
            {errors[id] && <small className='text-xs text-main'>{errors[id]?.message}</small>}

        </div>
    )
}

export default memo(Select)