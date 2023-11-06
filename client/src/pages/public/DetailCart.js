import { Breadcrumb, Button, OrderItem, SelectQuantity } from 'components'
import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { formatMoney } from 'utils/helpers'

const DetailCart = ({ location }) => {
    const { current } = useSelector(state => state.user)
    // const [quantity, setQuantity] = useState(1)
    // const handleQuantity = (number) => {
    //     if (+number > 1) setQuantity(number)
    // }
    // const handleChangeQuantity = (flag) => {
    //     if (flag === 'minus' && quantity === 1) return
    //     if (flag === 'minus') {
    //         setQuantity(prev => +prev - 1)
    //     } if (flag === 'plus') {
    //         setQuantity(prev => +prev + 1)
    //     }
    // }
    return (
        <div className='w-full'>
            <div className='h-[81px] flex justify-center items-center bg-gray-100'>
                <div className='w-main'>
                    <h2 className='font-bold text-2xl uppercase'>My Cart</h2>
                    <Breadcrumb category={location?.pathname} />
                </div>
            </div>
            <div className='flex flex-col border w-main my-8 mx-auto '>
                <div className='w-main mx-auto grid grid-cols-10 font-bold py-3 bg-main text-white'>
                    <span className='col-span-6 w-full text-center'></span>
                    <span className='col-span-1 w-full text-center'>Quantity</span>
                    <span className='col-span-3 w-full text-center'>Price</span>
                </div>
                {current?.cart?.map(el => (
                    <OrderItem key={el?._id} el={el} />
                ))}
            </div>
            <div className='w-main mx-auto flex flex-col justify-center items-end gap-3 mb-12'>
                <span className='flex gap-10 items-center'>
                    <span>Subtotal: </span>
                    <span className='text-lg font-semibold'>{formatMoney(current?.cart?.reduce((sum, el) => sum + Number(el?.price), 0)) + 'VND'}</span>
                </span>
                <span className='text-sm italic text-gray-600'>
                    Shipping, taxes, and discounts calculated at checkout.
                </span>
                <Button>
                    Check Out
                </Button>
            </div>
        </div>
    )
}

export default DetailCart
