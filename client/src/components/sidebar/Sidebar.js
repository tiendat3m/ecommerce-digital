import React, { memo } from 'react'
import { NavLink } from 'react-router-dom'
import { createSlug } from 'utils/helpers'
import icons from 'utils/icons'
import { useSelector } from 'react-redux'
const { FaList } = icons

const Sidebar = () => {
  const { categories } = useSelector(state => state.app)
  return (
    <div className='flex flex-col border'>
      <div className='flex gap-3 font-semibold items-center px-5 py-[10px] text-white bg-main'>
        <FaList />
        <span> ALL COLLECTIONS</span>
      </div>
      {categories?.map(el => (
        <NavLink
          key={createSlug(el.title)}
          to={createSlug(el.title)}
          className={({ isActive }) => isActive
            ? 'bg-main text-white py-5 px-[15px] text-sm hover:text-main'
            : 'py-5 px-[15px] text-sm hover:text-main'}
        >
          {el.title}
        </NavLink>
      ))}
    </div>
  )
}

export default memo(Sidebar)
