import React, { useState } from 'react'
import { productTabs } from '../utils/constants'
import VoteBar from './VoteBar'
import { renderStarFromNumber } from '../utils/helpers'
import Button from './Button'
import { useDispatch } from 'react-redux'
import { showModal } from '../store/app/appSlice'
import VoteOption from './VoteOption'

const ProductInfo = ({ totalRatings, totalCount, productName }) => {
    const [activeTabs, setActiveTabs] = useState(1)
    const dispatch = useDispatch()

    return (
        <div>
            <div className='flex gap-2 relative bottom-[-1px]'>
                {productTabs?.map(el => (
                    <span
                        key={el.id}
                        className={`px-4 py-2 cursor-pointer  ${activeTabs === +el.id ? 'bg-white border border-b-0' : 'bg-gray-200'}`}
                        onClick={() => setActiveTabs(el.id)}
                    >
                        {el.name}
                    </span>

                ))}
                <span
                    className={`px-4 py-2 cursor-pointer  ${activeTabs === 5 ? 'bg-white border border-b-0' : 'bg-gray-200'}`}
                    onClick={() => setActiveTabs(5)}

                >
                    CUSTOMER REVIEW
                </span>
            </div>
            <div className='w-full p-4 border'>
                {productTabs?.some(el => el.id === activeTabs) && productTabs.find(el => el.id === activeTabs)?.content}
                {activeTabs === 5 && <div className='flex flex-col p-4'>
                    <div className='flex'>
                        <div className='flex-4 border flex flex-col items-center justify-center gap-1 border-red-500'>
                            <span className='font-semibold text-[30px]'>{`${totalRatings}/5`}</span>
                            <span className='flex items-center gap-1'>{renderStarFromNumber(totalRatings)?.map((el, index) => (
                                <span key={index}>{el}</span>
                            ))}</span>
                            <span className='text-[16px]'>{`${totalCount} Reviewers`}</span>
                        </div>
                        <div className='flex-6 border flex flex-col p-4'>
                            {Array.from(Array(5).keys()).reverse()?.map(el => (
                                <span>
                                    <VoteBar
                                        key={el}
                                        number={el + 1}
                                        ratingCount={2}
                                        ratingTotal={5}
                                    />
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className='flex flex-col gap-2 items-center justify-center mt-4'>
                        <span>Do you review this product?</span>
                        <Button handleOnclick={() => dispatch(showModal({ isShowModal: true, modalChildren: <VoteOption productName={productName} /> }))}>Vote Now!</Button>
                    </div>
                </div>}
            </div>
        </div>
    )
}

export default ProductInfo
