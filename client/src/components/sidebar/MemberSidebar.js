import React, { Fragment, memo, useState } from 'react'
import avatar from 'assets/avatarDefault.png'
import { adminSidebar, memberSidebar } from 'utils/constants'
import { Link, NavLink } from 'react-router-dom'
import clsx from 'clsx'
import { BsFillCaretDownFill, BsFillCaretRightFill } from 'react-icons/bs'
import { useSelector } from 'react-redux'


const activeStyle = 'px-4 py-2 flex items-center gap-2 text-gray-600 bg-gray-500 text-white font-semibold'
const notActiveStyle = 'px-4 py-2 flex items-center gap-2 text-gray-600 hover:bg-gray-500 hover:text-white '
const MemberSidebar = () => {
    const { current } = useSelector(state => state.user)
    console.log(current)
    const [actived, setActived] = useState([])
    const handleShowTabs = (tabID) => {
        if (actived?.some(el => el === tabID)) setActived(prev => prev.filter(el => el !== tabID))
        else setActived(prev => [...prev, tabID])
    }
    return (
        <div className='py-4 bg-[#ffd7d7] h-full'>
            <Link to={'/'} className='flex flex-col justify-center gap-3 p-4 items-center '>
                <img src={current?.avatar || avatar} alt="" className='h-16 w-16 object-contain' />
                <span className='font-semibold'>{`${current.firstname} ${current.lastname}`}</span>
            </Link>
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
                        {/* {el.type === 'PARENT' && <div onClick={() => handleShowTabs(el.id)} className='text-gray-600 flex flex-col justify-center'>
                            <div className='flex items-center justify-between py-2 px-4 hover:bg-gray-500 hover:text-white cursor-pointer'>
                                <div className='flex items-center gap-2'>
                                    <span>{el.icon}</span>
                                    <span>{el.text}</span>
                                </div>
                                {actived?.some(id => id === el.id) ? <BsFillCaretDownFill /> : <BsFillCaretRightFill />}
                            </div>
                            {actived?.some(id => id === el.id) && <div className='flex flex-col'>
                                {el?.submenu?.map(el =>
                                    <NavLink
                                        key={el.id}
                                        to={el.path}
                                        onClick={(e) => e.stopPropagation()}
                                        className={({ isActive }) => clsx(isActive && activeStyle, !isActive && notActiveStyle, 'pl-10 text-sm')}
                                    >
                                        <span>{el.text}</span>
                                    </NavLink>)}
                            </div>}
                        </div>} */}
                    </Fragment>
                ))}
            </div>
        </div>
    )
}

export default memo(MemberSidebar)
