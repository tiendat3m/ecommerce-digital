import { Button, Product } from 'components'
import React from 'react'
import { useSelector } from 'react-redux'

const Wishlist = () => {
    const { current } = useSelector((s) => s.user)
    console.log(current)
    return (
        <div className='w-full relative'>
            <header className='h-[75px] bg-gray-100  w-full text-3xl font-bold p-4 border-b '>
                My Wishlist
            </header>
            <div className='w-full flex flex-wrap gap-4 p-4'>
                {current?.wishlist?.map(el => (
                    <div className='bg-white rounded-md w-[350px] drop-shadow-sm py-4 flex flex-col gap-3' key={el._id}>
                        <Product
                            pid={el._id} v
                            productData={el}
                        />
                        {/* <div className='px-3'>
                            <Button>
                                Add to cart
                            </Button>
                        </div> */}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Wishlist
