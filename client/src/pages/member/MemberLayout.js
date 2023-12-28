import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { MemberSidebar } from 'components'
import path from '../../utils/path'
const MemberLayout = () => {
    const { isLoggedIn, current } = useSelector(state => state.user)
    if (!isLoggedIn || !current) return <Navigate to={`/${path.LOGIN}`} replace={true} />
    return (
        <div className='flex'>
            <div className='min-h-screen w-[327px]'>
                <MemberSidebar />
            </div>
            <div className='flex-8 bg-gray-100'>
                <Outlet />
            </div>
        </div>
    )
}

export default MemberLayout
