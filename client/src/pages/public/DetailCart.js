import { Breadcrumb, Button, OrderItem } from 'components'
import withBaseComponent from 'hocs/withBaseComponent'
import React from 'react'
import { useSelector } from 'react-redux'
import { formatMoney } from 'utils/helpers'

const DetailCart = ({ location }) => {
    const { currentCart } = useSelector(state => state.user)
    return (
        <div className='w-full'>
            <div className='h-[81px] flex justify-center items-center bg-gray-100'>
                <div className='w-main'>
                    <h2 className='font-bold text-2xl uppercase'>My Cart</h2>
                    <Breadcrumb category={location.pathname?.replace('/', '')?.split('-')?.join(' ')} />
                </div>
            </div>
            <div className='flex flex-col border w-main my-8 mx-auto '>
                <div className='w-main mx-auto grid grid-cols-10 font-bold py-3 bg-main text-white'>
                    <span className='col-span-6 w-full text-center'></span>
                    <span className='col-span-1 w-full text-center'>Quantity</span>
                    <span className='col-span-3 w-full text-center'>Price</span>
                </div>
                {currentCart?.map(el => (
                    <OrderItem key={el?._id} el={el} defaultQuantity={el.quantity} />
                ))}
            </div>
            <div className='w-main mx-auto flex flex-col justify-center items-end gap-3 mb-12'>
                <span className='flex gap-10 items-center'>
                    <span>Subtotal: </span>
                    <span className='text-lg font-semibold'>{formatMoney(currentCart?.reduce((sum, el) => sum + Number(el?.price * el.quantity), 0)) + 'VND'}</span>
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

export default withBaseComponent(DetailCart)
