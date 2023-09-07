import React, { memo, useEffect } from 'react'
import { Link } from 'react-router-dom'
import path from '../utils/path'
import {useDispatch, useSelector} from 'react-redux'
import { getCurrent } from '../store/user/asyncActions'
import icons from '../utils/icons'
import { logout } from '../store/user/userSlice'

const { AiOutlineLogout } = icons

const TopHeader = () => {
    const dispatch = useDispatch()
    const {isLoggedIn, current} = useSelector(state => state.user)
    useEffect(() => {
        if(isLoggedIn) dispatch(getCurrent())
    }, [dispatch, isLoggedIn])
    return (
        <div className='w-full bg-main h-[38px] flex items-center justify-center'>
            <div className='w-main flex justify-between text-xs text-white'>
                <span>ORDER ONLINE OR CALL US (+1800) 000 8808</span>
                {isLoggedIn 
                ? <div className='flex justify-center items-center gap-2'>
                    <span className='text-[12px]'>{`Welcome, ${current?.firstname} ${current?.lastname}`}</span> 
                    <span 
                        className='hover:rounded-full hover:bg-gray-200 p-1 hover:text-main cursor-pointer'
                        onClick={() => dispatch(logout())}
                    >
                        <AiOutlineLogout size={18}/>
                    </span>
                </div>
                : <Link to={`/${path.LOGIN}`} className='hover:text-gray-800'>Sign In or Create Account</Link>}
            </div>
        </div>
    )
}

export default memo(TopHeader)
