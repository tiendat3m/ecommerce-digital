import React, { Fragment, memo, useEffect, useState } from 'react'
import logo from 'assets/logo.png'
import avatarDefault from 'assets/avatarDefault.png'
import icons from 'utils/icons'
import { Link } from 'react-router-dom'
import path from 'utils/path'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from 'store/user/userSlice'

const Header = () => {
  const { RiPhoneFill, MdEmail, BsHandbagFill, FaUserCircle } = icons
  const [isShowOption, setIsShowOption] = useState(false);
  const dispatch = useDispatch()
  const { current } = useSelector(state => state.user)
  useEffect(() => {
    const handleClickOutOptions = (e) => {
      const profile = document.getElementById('profile')
      if (!profile?.contains(e.target)) setIsShowOption(false)
    }
    document.addEventListener('click', handleClickOutOptions)
    return () => {
      document.removeEventListener('click', handleClickOutOptions)
    }
  }, [])
  return (
    <div className='w-main h-[110px] py-[35px] flex justify-between'>
      <Link to={`/${path.HOME}`}>
        <img src={logo} alt="logo" className='w-[234px] object-contain' />
      </Link>
      <div className='flex text-[13px]'>
        <div className='flex flex-col  px-6 border-r items-center'>
          <span className='flex gap-2 items-center'>
            <RiPhoneFill color='red' />
            <span className='font-semibold'> (+1800) 000 8808</span>
          </span>
          <span className='text-[12px]'>Mon-Sat 9:00AM - 8:00PM</span>
        </div>
        <div className='flex flex-col px-6 border-r items-center'>
          <span className='flex gap-4 items-center'>
            <MdEmail color='red' />
            <span className='font-semibold'>  SUPPORT@TADATHEMES.COM</span>
          </span>
          <span className='text-[12px]'>Online Support 24/7</span>
        </div>
        {current && <Fragment>
          <div className='cursor-pointer flex items-center px-6 border-r gap-2 justify-center' >
            <BsHandbagFill color='red' size={20} />
            <span>0 item(s)</span>
          </div>
          <div
            className='cursor-pointer flex items-center px-6 justify-center gap-2 relative'
            onClick={() => setIsShowOption(prev => !prev)}
            id='profile'
          >
            <img src={current.avatar || avatarDefault} alt="" className='w-7 h-7 rounded-full object-contain' />
            <span>Profile</span>
            {isShowOption && <div onClick={(e) => e.stopPropagation()} className='absolute min-w-[150px] top-full left-[20%] bg-gray-100 py-2 border flex flex-col rounded-sm'>
              <Link to={`${path.MEMBER}/${path.PERSONAL}`} className='hover:bg-white p-2 w-full'>My Account</Link>
              {+current.role === 7052002 && <Link className='p-2 hover:bg-white w-full' to={`${path.ADMIN}/${path.DASHBOARD}`}>
                Admin Workspace
              </Link>}
              <span onClick={() => dispatch(logout())} className='p-2 hover:bg-white w-full'>Logout</span>
            </div>}
          </div>
        </Fragment>}
      </div>
    </div>
  )
}

export default memo(Header)
