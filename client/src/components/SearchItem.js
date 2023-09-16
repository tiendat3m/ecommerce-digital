import React, { memo, useState, useEffect } from 'react'
import { createSearchParams, useNavigate, useParams } from 'react-router-dom'
import icons from '../utils/icons'
import { colors } from '../utils/constants'
import { apiGetProducts } from '../apis'
import { formatMoney } from '../utils/helpers'
import useDebounce from '../hooks/useDebounce'

const {MdKeyboardArrowDown} = icons

const SearchItem = ({name, activeClick, changeActiveFilter, type = 'checkbox'}) => {
    const [bestPrice, setBestPrice] = useState(null)
    const [selected, setSelected] = useState([])
    const { category } = useParams()
    const navigate = useNavigate()
    const [price, setPrice] = useState({
        from: '',
        to: ''
    })
    const handleSelect = (e) => {
        const alreadyEl = selected.find(el => el === e.target.value) 
        if(alreadyEl) setSelected(prev => prev.filter(el => el  !== e.target.value))
        else setSelected(prev => [...prev, e.target.value])
        // changeActiveFilter(null)
        
    }
    const fetchBestProductPrice = async() => {
        const response = await apiGetProducts({sort: '-price', limit: 1})
        if(response.success) setBestPrice(response?.products[0]?.price)
    }
    useEffect(() => {
        if(type === 'input') fetchBestProductPrice()
    }, [type])

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

    const debouncePriceFrom = useDebounce(price.from, 500)
    const debouncePriceTo = useDebounce(price.to, 500)

    useEffect(() => {
        const data = {}
        if(Number(price.from) > 0) data.from = price.from
        if(Number(price.to) > 0) data.to = price.to
        navigate({
            pathname: `/${category}`,
            search: createSearchParams(data).toString()
        })
    }, [debouncePriceFrom, debouncePriceTo])
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
                {type === 'checkbox' && 
                    <div 
                        onClick={(e) => {
                            e.stopPropagation()
                        }}
                    >
                        <div  className='py-4 items-center flex justify-between gap-8 border-b'>
                            <span className='whitespace-nowrap'>
                                {`${selected.length} Selected`}
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
                        <div className='flex flex-col gap-2 mt-4 '>
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
                {type === 'input' && 
                    <div 
                        onClick={(e) => {
                        e.stopPropagation()
                    }}  
                    >
                        <div className='py-4 items-center flex justify-between gap-8 border-b'>
                        <div className='flex flex-col gap-2'>
                                <span 
                                onClick={(e) => {
                                    e.stopPropagation()
                                }}  
                                className='whitespace-nowrap'>{`The highest price is ${formatMoney(bestPrice)}`}
                                </span>
                                <span>Default input value is USD</span>
                        </div>
                            <span 
                                onClick={(e) => {
                                    e.stopPropagation()
                                    setPrice({from: '', to: ''})
                                    // changeActiveFilter(null)
                                }} 
                                className='underline hover:text-main'>
                                Reset
                            </span>
                        </div>
                        <div className='mt-4 flex justify-center items-center gap-4'>
                            <div className='flex justify-center items-center gap-2'>
                                <label htmlFor="from">From </label>
                                <input 
                                    type="number" 
                                    className='form-input'
                                    id='from'
                                    value={price.from}
                                    onChange={(e) => setPrice(prev => ({...prev, from: e.target.value}))}
                                />
                            </div>
                            <div className='flex justify-center items-center gap-2'>
                                <label htmlFor="to">To </label>
                                <input 
                                    type="number" 
                                    className='form-input'
                                    id='to'
                                    value={price.to}
                                    onChange={(e) => setPrice(prev => ({...prev, to: e.target.value}))}
                                />
                            </div>
                        </div>
                    </div>}
            </div>}
        </div>
    )
}

export default memo(SearchItem)
