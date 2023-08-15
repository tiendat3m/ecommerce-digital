import React, { memo } from 'react'
import { Link } from 'react-router-dom'
import path from '../utils/path'
const TopHeader = () => {
    return (
        <div className='w-full bg-main h-[38px] flex items-center justify-center'>
            <div className='w-main flex justify-between text-xs text-white'>
                <span>ORDER ONLINE OR CALL US (+1800) 000 8808</span>
                <Link to={path.LOGIN}>Sign In or Create Account</Link>
            </div>
        </div>
    )
}

export default memo(TopHeader)
