import React from 'react'
import clsx from 'clsx'
const PagiItem = ({ children }) => {
    return (
        <div className={clsx('hover:rounded-full cursor-pointer w-10 h-10 flex justify-center ', !Number(children) && 'items-end pb-2 hover:non', Number(children) && 'items-center hover:bg-gray-300 hover:text-white')}>
            {children}
        </div>
    )
}

export default PagiItem
