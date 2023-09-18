import React from 'react'
import icons from '../utils/icons'
import { colors } from '../utils/constants'

const { MdKeyboardArrowDown } = icons

const SearchItem = ({ name, activeClick, changeActiveFilter, type }) => {
    return (
        <div className='p-3 border text-xs text-gray-500 flex justify-between items-center relative cursor-pointer'>
            <span
                onClick={() => changeActiveFilter(name)}
                className='capitalize flex gap-2'
            >
                {name}
                <MdKeyboardArrowDown size={18} />
            </span>
            {activeClick === name && <div className='absolute border top-[calc(100%+1px)] left-0 bg-white w-fit min-w-[150px] z-50 p-4'>
                {type &&
                    <div>
                        {colors?.map(el => (
                            <div>
                                <input type="checkbox"
                                    value={el}
                                    id={el}
                                />
                                <label htmlFor={el}>{el}</label>
                            </div>
                        ))}
                    </div>
                }
            </div>}
        </div>
    )
}

export default SearchItem
