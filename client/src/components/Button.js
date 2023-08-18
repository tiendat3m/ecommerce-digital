import React from 'react'

const Button = ({name, handleOnclick, style, iconsBefore, iconsAfter, fw}) => {
    return (
        <button 
            type='button'
            className={style ? style : `px-4 py-2 rounded-md text-white bg-main mb-4 ${fw ? 'w-full' : 'w-fit'}`}
            onClick={() => {handleOnclick && handleOnclick()}}
        >
            {iconsBefore}
            <span>{name}</span>
            {iconsAfter}
        </button>
    )
}

export default Button
