import { apiRemoveCart } from 'apis'
import Button from 'components/buttons/Button'
import withBaseComponent from 'hocs/withBaseComponent'
import React from 'react'
import { AiFillCloseCircle } from 'react-icons/ai'
import { MdOutlineDeleteOutline } from 'react-icons/md'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { showCart } from 'store/app/appSlice'
import { getCurrent } from 'store/user/asyncActions'
import { formatMoney } from 'utils/helpers'
import path from 'utils/path'
const Cart = ({ dispatch, navigate }) => {
    const { currentCart } = useSelector(state => state.user)
    const removeCart = async (pid, color) => {
        const response = await apiRemoveCart(pid, color)
        if (response.success) {
            dispatch(getCurrent())
        } else toast.error(response.mes)
    }
    return (
        <div onClick={(e) => e.stopPropagation()} className='w-[450px] bg-black h-screen grid grid-rows-10 text-white px-6 pb-6 animate-slide-left'>
            <header className='row-span-1 h-full text-2xl  border-gray-500 flex items-center justify-between font-bold border-b'>
                <span>Your Cart</span>
                <span onClick={() => dispatch(showCart())} className='cursor-pointer'><AiFillCloseCircle size={24} /></span>
            </header>
            <section className='row-span-7 flex flex-col h-full max-h-full overflow-y-auto pr-6'>
                {!currentCart && <span className='italic text-xs text-white'>Your cart is empty</span>}
                {currentCart && currentCart?.map(el => (
                    <div key={el?._id} className='flex justify-between items-center w-full border-b'>
                        <div key={el?._id} className='flex gap-2 py-6'>
                            <img src={el?.thumbnail} alt="" className='w-16 h-16 object-contain' />
                            <div className='flex flex-col gap-1 justify-center'>
                                <span className='font-semibold text-main text-sm'>{el?.title}</span>
                                <span className='text-xs italics'>
                                    {el?.color}
                                </span>
                                <span className='text-xs'>
                                    {formatMoney(el?.price * el.quantity) + ' VND'}

                                    <span className='text-xs italic ml-5'>{`Quantity : ${el?.quantity}`}</span>
                                </span>
                            </div>
                        </div>
                        <span onClick={() => removeCart(el?.product?._id, el.color)} className='h-10 w-10 rounded-full flex items-center justify-center hover:bg-gray-700 cursor-pointer'><MdOutlineDeleteOutline size={24} /></span>
                    </div>
                ))}
            </section>
            <div className='row-span-2 h-full flex flex-col justify-between'>
                <div className='flex items-center my-4 justify-between pt-4 border-t'>
                    <span>Subtotal: </span>
                    <span>{formatMoney(currentCart?.reduce((sum, el) => sum + Number(el?.price * el.quantity), 0)) + 'VND'}</span>
                </div>
                <span className='text-center text-gray-700 italic text-sm'>Shipping, taxes, and discounts calculated at checkout.</span>
                <Button handleOnclick={() => {
                    dispatch(showCart())
                    navigate(`/${path.MEMBER}/${path.DETAIL_CART}`)
                }} style={'rounded-none w-full bg-main py-2 mt-4'}>Shopping Cart</Button>
            </div>
        </div>
    )
}

export default withBaseComponent(Cart)
