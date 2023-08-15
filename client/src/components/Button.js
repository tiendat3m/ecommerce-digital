import React from 'react'

const Button = ({name, handleOnclick, style, }) => {
    return (
        <button>
            <span>{name}</span>
        </button>
    )
}

export default Button
