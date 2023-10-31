import withBaseComponent from 'hocs/withBaseComponent'
import React from 'react'
import { AiFillCloseCircle } from 'react-icons/ai'
import { useSelector } from 'react-redux'
import { showCart } from 'store/app/appSlice'
import { formatMoney } from 'utils/helpers'
const Cart = ({ dispatch }) => {
    const { current } = useSelector(state => state.user)
    console.log(current)
    return (
        <div onClick={(e) => e.stopPropagation()} className='w-[400px] bg-black h-screen grid grid-rows-10 text-white p-6'>
            <header className='row-span-1 h-full text-2xl  border-gray-500 flex items-center justify-between font-bold border-b'>
                <span>Your Cart</span>
                <span onClick={() => dispatch(showCart())} className='cursor-pointer'><AiFillCloseCircle size={24} /></span>
            </header>
            <section className='row-span-6 flex flex-col gap-3 h-full max-h-full overflow-y-auto py-3'>
                {!current?.cart && <span className='italic text-xs'>Your cart is empty</span>}
                {current?.cart && current?.cart?.map(el => (
                    <div key={el?._id} className='flex gap-2 items-center'>
                        <img src={el?.product?.thumb} alt="" className='w-16 h-16 object-contain' />
                        <div className='flex flex-col gap-1'>
                            <span className='font-semibold text-main'>{el?.product?.title}</span>
                            <span className='text-xs italic'>{el?.color}</span>
                            <span>{formatMoney(el?.product?.price) + ' VND'}</span>

                        </div>
                    </div>
                ))}
            </section>
            <div className='row-span-3 h-full'>
                checkout
            </div>
        </div>
    )
}

export default withBaseComponent(Cart)
