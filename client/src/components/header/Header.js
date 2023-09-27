import React, { Fragment, memo } from 'react'
import logo from 'assets/logo.png'
import icons from 'utils/icons'
import { Link } from 'react-router-dom'
import path from 'utils/path'
import { useSelector } from 'react-redux'

const Header = () => {
  const { RiPhoneFill, MdEmail, BsHandbagFill, FaUserCircle } = icons
  const { current } = useSelector(state => state.user)
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
          <div className='cursor-pointer flex items-center px-6 border-r gap-2 justify-center'>
            <BsHandbagFill color='red' size={20} />
            <span>0 item(s)</span>
          </div>
          <Link
            to={+current?.role === 7052002 ? `/${path.ADMIN}/${path.DASHBOARD}` : `/${path.MEMBER}/${path.PERSONAL}`}
            className='cursor-pointer flex items-center px-6 justify-center gap-2'
          >
            <FaUserCircle size={24} color='red' />
            <span>Profile</span>
          </Link>
        </Fragment>}
      </div>
    </div>
  )
}

export default memo(Header)
