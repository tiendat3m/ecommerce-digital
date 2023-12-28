import React, { Fragment, memo } from 'react'
import { memberSidebar } from 'utils/constants'
import { NavLink } from 'react-router-dom'
import { ImForward } from 'react-icons/im'
import { useSelector } from 'react-redux'
import avatar from 'assets/avatarDefault.png'
import clsx from 'clsx'


const activeStyle = 'px-4 py-2 flex items-center gap-2 text-gray-600 bg-gray-500 text-white font-semibold'
const notActiveStyle = 'px-4 py-2 flex items-center gap-2 text-gray-600 hover:bg-gray-500 hover:text-white '
const MemberSidebar = () => {
    const { current } = useSelector(state => state.user)
    return (
        <div className='py-4 bg-[#ffd7d7] h-full'>
            <div className='flex flex-col justify-center gap-3 p-4 items-center '>
                <img src={current?.avatar || avatar} alt="" className='h-16 w-16 object-contain rounded-full' />
                <span className='font-semibold'>{`${current.firstname} ${current.lastname}`}</span>
            </div>
            <div>
                {memberSidebar?.map(el => (
                    <Fragment key={el.id} className='flex'>
                        {el.type === 'SINGLE' &&
                            <NavLink
                                to={el.path}
                                className={({ isActive }) => clsx(isActive && activeStyle, !isActive && notActiveStyle)}
                            >
                                <span>{el.icon}</span>
                                <span>{el.text}</span>
                            </NavLink>
                        }
                    </Fragment>
                ))}
                <NavLink to={'/'} className={clsx(notActiveStyle)}>
                    <ImForward />
                    Go Home
                </NavLink>
            </div>
        </div>
    )
}

export default memo(MemberSidebar)
