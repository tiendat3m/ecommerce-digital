import React, { memo, useEffect, useState } from 'react'
import icons from '../utils/icons'
import { apiGetProducts } from '../apis/product'
import { renderStarFromNumber, formatMoney } from '../utils/helpers'
import Countdown from './Countdown'
import moment from 'moment/moment'
import { secondsToHms } from '../utils/helpers'


const {AiFillStar, AiOutlineMenu} = icons
let intervalId

const DealDaily = () => {
    const [hour, setHour] = useState(0);
    const [minute, setMinute] = useState(0);
    const [second, setSecond] = useState(0);
    const [expireTime, setExpireTime] = useState(false)
    
    const [dealdaily, setDealdaily] = useState(null);
    const fetchDealDaily = async() => {
        const response = await apiGetProducts({limit: 1, page: Math.round(Math.random() * 10), totalRatings: 5})
        if(response.success) {
            setDealdaily(response.products[0])

            const today = `${moment().format('MM/DD/YYYY')} 7:00:00`
            const seconds = new Date(today).getTime() - new Date().getTime() + 24 * 3600 * 1000

            const number = secondsToHms(seconds)

            setHour(number.h)
            setMinute(number.m)
            setSecond(number.s)
        } else {
            setHour(0)
            setMinute(59)
            setSecond(59)
        }
    }
    
    // useEffect(() => {
    //     fetchDealDaily()
    // }, [])

    useEffect(() => {
        intervalId && clearInterval(intervalId)
        fetchDealDaily()
    }, [expireTime])

    useEffect(() => {
        intervalId = setInterval(updateTimer, 1000)
        return () => clearInterval(intervalId)
    }, [second, minute, hour, expireTime])

    const updateTimer = () => {
        if(second > 0) {
            setSecond(prev => prev - 1)
        } else {
            if(minute > 0) {
                setMinute(prev => prev - 1)
                setSecond(59)
            } else {
                if(hour > 0) {
                    setHour(prev => prev - 1)
                    setMinute(59)
                    setSecond(59)

                } else {
                    setExpireTime(!expireTime)
                }
            }
        }
    }
    

    return (
        <div className='border w-full flex-auto'>
            <div className='flex justify-between p-5 items-center w-full '>
                <span className='flex-1 justify-center'><AiFillStar size={20} color='#d11'/></span>
                <span className='flex-8 text-[20px] font-semibold text-gray-600 flex justify-center'>DAILY DEALS</span>
                <span className='flex-1'></span>
            </div>
            <div className='w-full flex flex-col items-center gap-2 text-center px-5 pt-8'>
                <img src={dealdaily?.thumb} alt="" className='w-full object-contain'/>
                <span className='line-clamp-1'>{dealdaily?.title}</span>
                <span className='flex h-4'>{renderStarFromNumber(dealdaily?.totalRatings, 20)}</span>
                <span>{`${formatMoney(dealdaily?.price)} VNĐ`}</span>
            </div>
            <div className='mt-7 px-5'>
                <div className='flex mb-4 justify-center items-center gap-2'>
                    <Countdown unit={'Hours'} number={hour}/>
                    <Countdown unit={'Minutes'} number={minute}/>
                    <Countdown unit={'Seconds'} number={second}/>
                </div>
                <button
                    type='button'
                    className='flex items-center justify-center gap-2 w-full bg-main py-2 hover:bg-gray-700 text-white font-medium'
                >
                    <AiOutlineMenu />
                    <span>Option</span>
                </button>
            </div>
        </div>
    )
}

export default memo(DealDaily)
