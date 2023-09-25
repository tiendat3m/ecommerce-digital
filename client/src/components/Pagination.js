import React from 'react'
import usePagination from '../hooks/usePagination'
import { PagiItem } from './'
import { useSearchParams } from 'react-router-dom'

const Pagination = ({ totalCount }) => {
    const pagination = usePagination(totalCount, 2)
    const [params] = useSearchParams()
    const range = () => {
        const currentPage = +params.get('page')
        const pageSize = +process.env.REACT_APP_LIMIT_PRODUCT || 10
        const start = ((currentPage - 1) * pageSize) + 1
        const end = Math.min(currentPage * pageSize, totalCount)

        return `${start} - ${end}`
    }

    return (
        <div className='flex w-main justify-between items-center'>
            {!+params.get('page') && <span className='text-sm italic'>{`Show products 1 - ${+process.env.REACT_APP_LIMIT_PRODUCT || 10} of ${totalCount}`}</span>}
            {+params.get('page') && <span className='text-sm italic'>{`Show products ${range()} of ${totalCount}`}</span>}
            <div className='flex items-center gap-4 text-gray-600 text-[20px]'>
                {pagination?.map(el => (
                    <PagiItem
                        key={el}
                    >
                        {el}
                    </PagiItem>
                ))}
            </div>
        </div>
    )
}

export default Pagination
