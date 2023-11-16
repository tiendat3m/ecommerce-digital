import React, { useEffect } from 'react'
import payment from 'assets/payment.svg'
import { useSelector } from 'react-redux'
import { formatMoney } from 'utils/helpers'
import { InputForm, Paypal } from 'components'
import { useForm } from 'react-hook-form'
import withBaseComponent from 'hocs/withBaseComponent'
const Checkout = ({ dispatch }) => {
    const { currentCart, current } = useSelector(state => state.user)
    console.log(currentCart)
    const { register, formState: { errors }, watch, setValue } = useForm()
    const address = watch('address')
    useEffect(() => {
        setValue('address', current?.address)
    }, [current])
    // console.log(address)

    return (
        <div className='p-8 grid grid-cols-10 h-full max-h-screen overflow-y-auto gap-6 '>
            <div className='w-full flex items-center col-span-4'>
                <img src={payment} alt="" className='h-[70%] object-contain' />
            </div>
            <div className='flex flex-col  justify-center col-span-6 gap-6'>
                <h2 className='text-3xl mb-6 font-bold'>Checkout your order</h2>
                <div className='flex gap-6 w-full justify-between'>
                    <table className='table-auto flex-1 max-h-[300px]'>
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
                    <div className='flex-1'>
                        <div className='flex flex-col gap-6'>
                            <span className='flex gap-10 items-center'>
                                <span className='font-semibold'>Subtotal: </span>
                                <span className='text-lg font-semibold text-main'>{formatMoney(currentCart?.reduce((sum, el) => sum + Number(el?.price * el?.quantity), 0)) + ' VND'}</span>
                            </span>
                            <InputForm
                                label={'Your Address : '}
                                register={register}
                                errors={errors}
                                id='address'
                                validate={{
                                    required: 'Required filling'
                                }}
                                placeholder={'Please type your address first'}
                                style='text-sm'
                            />
                        </div>
                        {address && address?.length > 10 && <div className='w-full mx-auto mt-8'><Paypal amount={Math.round(+currentCart?.reduce((sum, el) => +el?.price * el.quantity + sum, 0) / 23500)} /></div>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withBaseComponent(Checkout)
