import React, { memo } from 'react'
import { renderStarFromNumber, formatMoney } from '../../utils/helpers'
import { useNavigate } from 'react-router-dom'
const ProductCard = ({ products }) => {
    console.log(products)
    const navigate = useNavigate()
    return (
        <div onClick={(e) => navigate(`/${products?.category?.toLowerCase()}/${products._id}/${products.title}`)} className='w-1/3 cursor-pointer flex-auto px-[10px] mb-[20px]'>
            <div className='flex border w-full items-center'>
                <img src={products?.thumb} alt="" className='w-[120px] object-contain p-4' />
                <div className='flex flex-col gap-1 items-start w-full text-sm'>
                    <span className='line-clamp-1 capitalize '>{products?.title.toLowerCase()}</span>
                    <span className='flex h-4'>{renderStarFromNumber((products?.totalRatings), 14)?.map((el, index) => (
                        <span key={index}>{el}</span>
                    ))}</span>
                    <span className='text-xs'>{`${formatMoney(products?.price)} VNĐ`}</span>
                </div>
            </div>
        </div>
    )
}

export default memo(ProductCard)
