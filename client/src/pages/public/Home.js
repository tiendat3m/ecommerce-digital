import React from 'react'
import {Sidebar, Banner, BestSeller, DealDaily, FeatureProduct, CustomSlider, Product } from '../../components'
import { useSelector } from 'react-redux'
import icons from '../../utils/icons'

const {MdKeyboardArrowRight} = icons

const Home = () => {

    const {newProducts} = useSelector(state => state.products)
    const {categories} = useSelector(state => state.app)
    // console.log(categories)

    return (
        <>
            <div className='pt-6 w-main flex'>
                <div className='flex flex-col gap-5 [w-25%] flex-auto'>
                    <Sidebar />
                    <DealDaily />
                </div>
                <div className='flex flex-col gap-5 pl-5 w-[75%] flex-auto'>
                    <Banner />
                    <BestSeller />
                </div>
            </div>
            <div className='w-main'>
            <div className='my-8'>
                <FeatureProduct />
            </div>
            <div className='my-8'>
                <h3 className='text-[20px] py-[15px] border-b-2 border-main font-semibold'>NEW ARRIVALS</h3>
                <div className='mt-4 mx-[-10px]'>
                    <CustomSlider products={newProducts}/>
                </div>
            </div>
            <div className='my-8 w-full'>
                <h3 className='text-[20px] py-[15px] border-b-2 border-main font-semibold'>HOT COLLECTIONS</h3>
                <div className='flex flex-wrap gap-4 mt-4 '>
                    {categories?.filter(el => el.brand.length > 0)?.map(el => (
                        <div 
                            key={el._id}
                            className='w-[396px]'
                        >
                            <div className='flex border p-[15px] gap-4 min-h-[220px]'>
                                <img src={el?.image} alt="" className='flex-1 w-[144px] h-[129px] object-contain'/>
                                <div className='flex-1  '>
                                    <h3 className='font-semibold mb-[10px] text-sm uppercase'>{el?.title}</h3>
                                    <ul className='text-sm text-gray-400'>
                                        {el?.brand?.map((item) => (
                                            <li
                                                key={item}
                                                className='flex items-center mb-[5px]'
                                            >
                                                <MdKeyboardArrowRight size={14}/>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className='my-8'>
                <h3 className='text-[20px] py-[15px] border-b-2 border-main font-semibold'>BLOG POSTS</h3>
            </div>
            </div>
        </>
    )
}

export default Home
