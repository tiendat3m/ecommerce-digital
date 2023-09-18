import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Breadcrumb, Product, SearchItem } from '../../components'
import { apiGetProducts } from '../../apis'
import Masonry from 'react-masonry-css'


const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1
};


const Products = () => {
    const [activeClick, setActiveClick] = useState(null);

    const [products, setProducts] = useState(null);

    const { category } = useParams()

    const fetchProducts = async (category) => {
        const response = await apiGetProducts(category)
        if (response.success) setProducts(response?.products)
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    const changeActiveFilter = useCallback((name) => {
        if (activeClick === name) setActiveClick(null)
        else setActiveClick(name)
    }, [activeClick])


    return (
        <div className='w-full'>
            <div className='h-[81px] bg-gray-100 flex justify-center items-center'>
                <div className='w-main'>
                    <h3 className='font-bold mb-[10px] uppercase'>{category}</h3>
                    <Breadcrumb category={category} />
                </div>
            </div>
            <div className='w-main m-auto flex justify-between border mt-8 p-[10px]'>
                <div className='w-4/5 flex flex-col gap-2'>
                    <span className='text-sm font-semibold'>Filter by</span>
                    <div className='flex items-center gap-2'>
                        <SearchItem
                            name={'price'}
                            activeClick={activeClick}
                            changeActiveFilter={changeActiveFilter}

                        />
                        <SearchItem
                            name={'color'}
                            activeClick={activeClick}
                            changeActiveFilter={changeActiveFilter}
                            type='checkbox'
                        />
                    </div>
                </div>
                <div className='w-1/5'>
                    <span>Sort by</span>
                </div>
            </div>
            <div className='w-main m-auto mt-8'>
                <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className="my-masonry-grid mx-[-10px] flex flex-wrap"
                    columnClassName="my-masonry-grid_column">
                    {products?.map(el => (
                        <Product
                            key={el._id}
                            productData={el}
                            isNormal={true}
                        />
                    ))}
                </Masonry>
            </div>
        </div>
    )
}

export default Products
