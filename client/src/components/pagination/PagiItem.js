import React, { memo, useEffect } from 'react'
import clsx from 'clsx'
import { createSearchParams, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
const PagiItem = ({ children }) => {
    const [params] = useSearchParams()
    const location = useLocation()
    const navigate = useNavigate()
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [+params.get('page')])
    const handlePagination = () => {
        const queries = Object.fromEntries([...params])
        if (Number(children)) queries.page = children
        navigate({
            pathname: location.pathname,
            search: createSearchParams(queries).toString()
        })
    }
    return (
        <button
            className={clsx('hover:rounded-full w-8 h-8 flex justify-center', !Number(children) && 'items-end pb-2 hover:non', Number(children) && 'items-center hover:bg-gray-300 hover:text-white', +params.get('page') === +children && 'rounded-full bg-gray-300', !+params.get('page') && +children === 1 && 'rounded-full bg-gray-300')}
            onClick={handlePagination}
            type='button'
            disabled={!Number(children)}
        >
            {children}
        </button>
    )
}

export default memo(PagiItem)
