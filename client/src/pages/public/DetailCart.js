import { Breadcrumb, Button, OrderItem } from 'components'
import withBaseComponent from 'hocs/withBaseComponent'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link, createSearchParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import { formatMoney } from 'utils/helpers'
import path from 'utils/path'

const DetailCart = ({ location, navigate }) => {
    const { currentCart, current } = useSelector(state => state.user)
    const handleSubmit = () => {
        if (!current?.address) return Swal.fire({
            icon: 'info',
            title: 'Almost',
            text: 'Please update your address before checkout',
            showCancelButton: true,
            showConfirmButton: true,
            confirmButtonText: 'Go Update',
            cancelButtonText: 'Cancle'
        }).then((rs) => {
            if (rs.isConfirmed) {
                navigate({
                    pathname: `/${path.MEMBER}/${path.PERSONAL}`,
                    search: createSearchParams({ redirect: location.pathname }).toString()
                })
            }
        })
        else {
            window.open(`/${path?.CHECKOUT}`, '_blank')
        }
    }

    return (
        <div className='w-full'>
            <div className='h-[81px] flex justify-center items-center bg-gray-100'>
                <div className='w-main'>
                    <h2 className='font-bold text-2xl uppercase'>My Cart</h2>
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
                    <span className='text-lg font-semibold'>{formatMoney(currentCart?.reduce((sum, el) => sum + Number(el?.price * el.quantity), 0)) + ' VND'}</span>
                </span>
                <span className='text-sm italic text-gray-600'>
                    Shipping, taxes, and discounts calculated at checkout.
                </span>
                <Button handleOnclick={handleSubmit}>
                    Checkout
                </Button>
                {/* <Link target='_blank' className='px-4 py-2 rounded-md text-white bg-main mb-4 outline-none' to={`/${path.CHECKOUT}`}>
                    Check Out
                </Link> */}
            </div>
        </div>
    )
}

export default withBaseComponent(DetailCart)
