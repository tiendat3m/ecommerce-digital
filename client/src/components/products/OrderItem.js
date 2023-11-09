import SelectQuantity from 'components/common/SelectQuantity'
import withBaseComponent from 'hocs/withBaseComponent'
import React, { useEffect, useState } from 'react'
import { updateCart } from 'store/user/userSlice'
import { formatMoney } from 'utils/helpers'

const OrderItem = ({ el, defaultQuantity = 1, dispatch }) => {
    const [quantity, setQuantity] = useState(() => defaultQuantity)
    const handleQuantity = (number) => {
        if (+number > 1) setQuantity(number)
    }
    const handleChangeQuantity = (flag) => {
        if (flag === 'minus' && quantity === 1) return
        if (flag === 'minus') {
            setQuantity(prev => +prev - 1)
        } if (flag === 'plus') {
            setQuantity(prev => +prev + 1)
        }
    }
    useEffect(() => {
        dispatch(updateCart({ pid: el.product?._id, color: el.color, quantity }))
    }, [quantity])
    return (
        <div>
            <div className='w-main mx-auto border font-bold py-3 grid grid-cols-10 '>
                <span className='col-span-6 w-full p-6'>
                    <div className='flex gap-4  justify-start items-center'>
                        <img src={el?.thumbnail} alt="" className='w-28 h-28 object-cover' />
                        <div className='flex flex-col gap-2 justify-start'>
                            <span className='text-main text-sm'>{el?.title}</span>
                            <span className='text-xs font-main'>{el?.color}</span>
                        </div>
                    </div>
                </span>
                <span className='col-span-1 w-full flex justify-center'>
                    <SelectQuantity
                        quantity={quantity}
                        handleChangeQuantity={handleChangeQuantity}
                        handleQuantity={handleQuantity}
                    />
                </span>
                <span className='col-span-3 text-lg font-semibold flex justify-center items-center'>{formatMoney(el?.price * quantity) + ' VND'}</span>
            </div>
        </div>
    )
}

export default withBaseComponent(OrderItem)
