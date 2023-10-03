import React, { memo } from 'react'

const Button = ({ children, handleOnclick, style, fw, type = 'button' }) => {
    return (
        <button
            type={type}
            className={style ? style : `px-4 py-2 rounded-md text-white bg-main mb-4 outline-none ${fw ? 'w-full' : 'w-fit'}`}
            onClick={() => { handleOnclick && handleOnclick() }}
        >
            {children}
        </button>
    )
}

export default memo(Button)
