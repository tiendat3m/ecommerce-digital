import React, { memo, useCallback, useState } from 'react'
import { productTabs } from '../utils/constants'
import VoteBar from './VoteBar'
import { renderStarFromNumber } from '../utils/helpers'
import Button from './Button'
import { useDispatch, useSelector } from 'react-redux'
import { showModal } from '../store/app/appSlice'
import VoteOption from './VoteOption'
import { apiRatings } from '../apis'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import path from '../utils/path'
import Comment from './Comment'

const ProductInfo = ({ totalRatings, ratings, productName, pid, rerender }) => {
    const [activeTabs, setActiveTabs] = useState(1)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { isLoggedIn } = useSelector(state => state.user)
    console.log(isLoggedIn)
    const [payload, setPayload] = useState({
        comment: '',
        score: ''
    })
    const handleSumbitVoteOption = async ({ comment, score }) => {
        if (!comment || !pid || !score) {
            alert('Please vote before submit')
            return
        }
        await apiRatings({ comment, star: score, pid })
        dispatch(showModal({ isShowModal: false, modalChildren: null }))
        rerender()
    }

    const handleVoteNow = () => {
        if (!isLoggedIn) {
            Swal.fire({
                text: 'Login to vote',
                cancelButtonText: 'Cancel',
                confirmButtonText: 'Go login',
                showCancelButton: true,
                title: 'Opps'
            }).then((rs) => {
                if (rs.isConfirmed) navigate(`/${path.LOGIN}`)
            })
        } else {
            dispatch(
                showModal({
                    isShowModal: true,
                    modalChildren:
                        <VoteOption
                            productName={productName}
                            handleSumbitVoteOption={handleSumbitVoteOption}
                        />
                }))
        }
    }


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
                            <span className='text-[16px]'>{`${ratings.length} Reviewers`}</span>
                        </div>
                        <div className='flex-6 border flex flex-col p-4'>
                            {Array.from(Array(5).keys()).reverse()?.map((el, index) => (
                                <span key={el}>
                                    <VoteBar
                                        number={el + 1}
                                        ratingCount={ratings?.filter(i => i.star === el + 1).length}
                                        ratingTotal={ratings?.length}
                                    />
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className='flex flex-col gap-2 items-center justify-center mt-4'>
                        <span>Do you review this product?</span>
                        <Button
                            handleOnclick={handleVoteNow}
                        >
                            Vote Now!
                        </Button>
                    </div>
                    <div className='flex flex-col gap-4'>
                        {ratings.map(el => (
                            <Comment
                                key={el?._id}
                                star={el.star}
                                updatedAt={el.updatedAt}
                                comment={el.comment}
                                name={'Anonymous'}
                            />
                        ))}
                    </div>
                </div>}
            </div>
        </div>
    )
}

export default memo(ProductInfo)
