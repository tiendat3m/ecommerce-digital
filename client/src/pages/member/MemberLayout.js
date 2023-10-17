import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import path from '../../utils/path'
import { useSelector } from 'react-redux'
import { MemberSidebar } from 'components'
const MemberLayout = () => {
    const { isLoggedIn, current } = useSelector(state => state.user)
    if (!isLoggedIn || !current) return <Navigate to={`/${path.LOGIN}`} replace={true} />
    return (
        <div className='flex'>
            <div className='min-h-screen w-[327px]'>
                <MemberSidebar />
            </div>
            <div className='flex-8 '>
                <Outlet />
            </div>
        </div>
    )
}

export default MemberLayout
