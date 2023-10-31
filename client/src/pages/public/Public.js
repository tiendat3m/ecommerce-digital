import React from 'react'
import { Outlet } from 'react-router-dom'
import { Footer, Header, Navigation, TopHeader } from '../../components'
const Public = () => {
    return (
        <div className='max-h-full overflow-y-auto flex flex-col items-center'>
            <div className='w-full'>
                <TopHeader />
            </div>
            <Header />
            <Navigation />
            <div className='w-full flex flex-col justify-center items-center'>
                <Outlet />
            </div>
            <Footer />
        </div>

    )
}

export default Public
