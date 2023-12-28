import React, { memo } from 'react'
import { navigation } from 'utils/constants'
import { NavLink } from 'react-router-dom'
const Navigation = () => {
  return (
    <div className='border-y w-main h-[48px] py-2 flex items-center text-sm'>
      {navigation.map(el => (
        <NavLink
          to={el.path}
          key={el.id}
          className={({ isActive }) => isActive ? 'pr-12 hover:text-main text-main' : 'pr-12 hover:text-main'}
        >
          {el.value}
        </NavLink>
      ))}
    </div>
  )
}

export default memo(Navigation)
