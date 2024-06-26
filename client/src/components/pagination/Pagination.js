import React, { memo } from 'react'
import usePagination from 'hooks/usePagination'
import PagiItem from './PagiItem'
import { useSearchParams } from 'react-router-dom'

const Pagination = ({ totalCount }) => {
    const [params] = useSearchParams()
    const pagination = usePagination(totalCount, +params.get('page') || 1)


    // console.log(params.get('page'))

    const range = () => {
        const currentPage = +params.get('page')
        const pageSize = +process.env.REACT_APP_LIMIT || 10
        const start = ((currentPage - 1) * pageSize) + 1
        const end = Math.min(currentPage * pageSize, totalCount)

        return `${start} - ${end}`
    }

    return (
        <div className='flex w-full justify-between items-center'>
            {!+params.get('page') ? <span className='text-sm italic'>{`Show products 1 - ${Math.min(+process.env.REACT_APP_LIMIT, totalCount) || 10} of ${totalCount}`}</span> : ''}
            {+params.get('page') ? <span className='text-sm italic'>{`Show products ${range()} of ${totalCount}`}</span> : ''}
            <div className='flex items-center gap-4 text-gray-600 text-[14px] font-semibold'>
                {pagination?.map((el, idx) => (
                    <PagiItem
                        key={idx}
                    >
                        {el}
                    </PagiItem>
                ))}
            </div>
        </div>
    )
}

export default memo(Pagination)
