import React from 'react'
import usePagination from '../hooks/usePagination'
import { PagiItem } from './'

const Pagination = ({ totalCount }) => {
    const pagination = usePagination(totalCount, 2)

    console.log(pagination)
    return (
        <div className='flex items-center gap-4 text-gray-600 text-[20px]'>
            {pagination?.map(el => (
                <PagiItem
                    key={el}
                >
                    {el}
                </PagiItem>
            ))}
        </div>
    )
}

export default Pagination
