import React, { memo, useState, useEffect } from 'react'
import { createSearchParams, useNavigate, useParams } from 'react-router-dom'
import icons from '../utils/icons'
import { colors } from '../utils/constants'

const {MdKeyboardArrowDown} = icons

const SearchItem = ({name, activeClick, changeActiveFilter, type = 'checkbox'}) => {
    const [selected, setSelected] = useState([])
    const { category } = useParams()
    const navigate = useNavigate()
    const handleSelect = (e) => {
        const alreadyEl = selected.find(el => el === e.target.value) 
        if(alreadyEl) setSelected(prev => prev.filter(el => el  !== e.target.value))
        else setSelected(prev => [...prev, e.target.value])
        // changeActiveFilter(null)
    }
    useEffect(() => {
        if(selected.length > 0) {
            navigate({
                pathname: `/${category}`,
                search: createSearchParams({
                    color: selected.join(',')
                }).toString()
            })
        }else {
            navigate(`/${category}`)
        }
    }, [selected])
    return (
        <div 
            className='p-3 text-xs text-gray-500 cursor-pointer border-gray-800 border flex justify-between items-center relative'
            onClick={() => changeActiveFilter(name)}
        >
            <span className='mr-4 capitalize'>
                {name}
            </span>
            <MdKeyboardArrowDown/>
            {activeClick === name && <div className='absolute border top-[calc(100%+1px)] left-0 bg-white w-fit p-4 z-50 min-w-[150px]'>
                {type === 'checkbox' && <div className=''>
                    <div className='py-4 items-center flex justify-between gap-8 border-b'>
                        <span 
                            onClick={(e) => {
                                e.stopPropagation()
                            }}  
                            className='whitespace-nowrap'>{`${selected.length} Selected`}
                        </span>
                        <span 
                            onClick={(e) => {
                                e.stopPropagation()
                                setSelected([])
                            }} 
                            className='underline hover:text-main'>
                            Reset
                        </span>
                    </div>
                    <div onClick={e => e.stopPropagation()} className='flex flex-col gap-2 mt-4 '>
                        {colors.map((el, index) => (
                           <div className='flex items-center gap-4' key={index}>
                                <input
                                    type="checkbox" 
                                    onChange={handleSelect}
                                    id={el}
                                    value={el}
                                    checked={selected?.some(selectedItem => selectedItem === el)}
                                    // className='form-checkbox'
                                />
                                <label className='capitalize text-gray-700' htmlFor={el}>{el}</label>
                           </div>
                        ))} 
                    </div>
                </div>}
            </div>}
        </div>
    )
}

export default memo(SearchItem)
