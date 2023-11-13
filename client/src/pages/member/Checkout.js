import React from 'react'
import payment from 'assets/payment.svg'
import { useSelector } from 'react-redux'
import { formatMoney } from 'utils/helpers'
import { Paypal } from 'components'
const Checkout = () => {
    const { currentCart } = useSelector(state => state.user)
    console.log(currentCart)
    return (
        <div className='p-8 grid grid-cols-10 h-full max-h-screen overflow-y-auto gap-6 '>
            <div className='w-full flex items-center col-span-4'>
                <img src={payment} alt="" className='h-[70%] object-contain' />
            </div>
            <div className='flex flex-col  justify-center col-span-6 gap-6 items-center'>
                <h2 className='text-3xl mb-6 font-bold'>Checkout your order</h2>
                <table className='table-auto w-full'>
                    <thead>
                        <tr className='border bg-gray-200 p-2'>
                            <th className='p-2'>Products</th>
                            <th className='text-center p-2'>Quantity</th>
                            <th className='text-center p-2'>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentCart?.map(el => (
                            <tr key={el._id} className='border'>
                                <td className='text-center p-2'>{el.title}</td>
                                <td className='text-center p-2'>{el.quantity}</td>
                                <td className='text-center p-2'>{formatMoney(el.price)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <span className='flex gap-10 items-center'>
                    <span>Subtotal: </span>
                    <span className='text-lg font-semibold'>{formatMoney(currentCart?.reduce((sum, el) => sum + Number(el?.price * el.quantity), 0)) + ' VND'}</span>
                </span>
                <div>
                    input address
                </div>
                <div className='w-full'><Paypal amount={120} /></div>
            </div>
        </div>
    )
}

export default Checkout
