import React, { useEffect, useState } from 'react'
import payment from 'assets/payment.svg'
import { useSelector } from 'react-redux'
import { formatMoney } from 'utils/helpers'
import { Congrats, Paypal } from 'components'
import withBaseComponent from 'hocs/withBaseComponent'
import { getCurrent } from 'store/user/asyncActions'
const Checkout = ({ dispatch }) => {
    const { currentCart, current } = useSelector(state => state.user)
    const [isSuccess, setIsSuccess] = useState(false)
    useEffect(() => {
        if (isSuccess) dispatch(getCurrent())
    }, [isSuccess])
    return (
        <div className='p-8 grid grid-cols-10 h-full max-h-screen overflow-y-auto gap-6 '>
            {isSuccess && <Congrats />}
            <div className='w-full flex items-center col-span-4'>
                <img src={payment} alt="" className='h-[70%] object-contain' />
            </div>
            <div className='flex flex-col  justify-center col-span-6 gap-6'>
                <h2 className='text-3xl mb-6 font-bold'>Checkout your order</h2>
                <div className='flex gap-6 w-full justify-between'>
                    <div className='flex-1'>
                        <table className='table-auto h-fit'>
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
                                        <td className='text-center p-2 border'>{el.title}</td>
                                        <td className='text-center p-2 border'>{el.quantity}</td>
                                        <td className='text-center p-2 border'>{formatMoney(el.price)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className='flex-1'>
                        <div className='flex flex-col gap-6'>
                            <span className='flex gap-10 items-center'>
                                <span className='font-semibold'>Subtotal: </span>
                                <span className='text-sm font-semibold text-main'>
                                    {formatMoney(currentCart?.reduce((sum, el) => sum + Number(el?.price * el?.quantity), 0)) + ' VND'}
                                </span>
                            </span>
                            <span className='flex gap-10 items-center'>
                                <span className='font-semibold'>Adderss: </span>
                                <span className='text-sm font-semibold text-main'>
                                    {current?.address}
                                </span>
                            </span>
                        </div>
                        <div className='w-full mx-auto mt-8'>
                            <Paypal
                                payload={
                                    {
                                        products: currentCart,
                                        total: Math.round(+currentCart?.reduce((sum, el) => +el?.price * el.quantity + sum, 0) / 23500),
                                        address: current?.address
                                    }
                                }
                                amount={Math.round(+currentCart?.reduce((sum, el) => +el?.price * el.quantity + sum, 0) / 23500)}
                                setIsSuccess={setIsSuccess}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withBaseComponent(Checkout)
