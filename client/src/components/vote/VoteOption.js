import React, { memo, useEffect, useRef, useState } from 'react'
import Button from '../buttons/Button'
import logo from 'assets/logo.png'
import { AiFillStar } from 'react-icons/ai'
import { voteOptions } from 'utils/constants'
const VoteOption = ({ productName, handleSumbitVoteOption }) => {
    const [chosenScore, setChosenScore] = useState(null)
    const [score, setScore] = useState(null)
    const [comment, setComment] = useState('')
    const modalRef = useRef()
    useEffect(() => {
        modalRef.current.scrollIntoView({ block: 'center', behavior: 'smooth' })
    }, [])
    return (
        <div onClick={(e) => e.stopPropagation()} ref={modalRef} className='bg-white w-[700px] p-6 flex flex-col gap-4 items-center justify-center'>
            <img src={logo} alt="" className='w-[300px] my-8 object-contain' />
            <h2 className='text-center font-medium text-lg'>{`Voting product ${productName}`}</h2>
            <textarea
                className='form-textarea w-full placeholder:italic placeholder:text-xs text-sm'
                placeholder='Your comment'
                value={comment}
                onChange={e => setComment(e.target.value)}
            >

            </textarea>
            <div className=' w-full flex flex-col gap-4 mt-4'>
                <p>How do you feel about this product?</p>
                <div className='flex gap-8 justify-center items-center'>
                    {voteOptions?.map(el => (
                        <div
                            key={el.id}
                            className='bg-gray-200 hover:bg-gray-300 cursor-pointer rounded-md w-[90px] p-4 flex justify-center items-center flex-col gap-2'
                            onClick={() => {
                                setChosenScore(el.id)
                                setScore(el.id)
                            }}
                        >

                            {(Number(chosenScore) && chosenScore >= el.id) ? <AiFillStar color='orange' /> : <AiFillStar color='gray' />}
                            <span className='text-sm'>{el.text}</span>
                        </div>
                    ))}
                </div>
            </div>
            <Button fw handleOnclick={() => handleSumbitVoteOption({ comment, score })}>Submit</Button>

        </div>
    )
}

export default memo(VoteOption)
