import React, { memo, useEffect, useState } from 'react'
import { apiGetProducts } from 'apis/product'
import ProductCard from './ProductCard'

const FeatureProduct = () => {
    const [products, setProducts] = useState(null)
    const fetchProducts = async () => {
        const response = await apiGetProducts({ limit: 9, totalRatings: 5 })
        if (response.success) setProducts(response.products)
    }

    useEffect(() => {
        fetchProducts()
    }, [])
    return (
        <div className='w-full'>
            <h3 className='text-[20px] py-[15px] border-b-2 border-main font-semibold'>FEATURE PRODUCTS</h3>
            <div className='flex flex-wrap mt-5 mx-[-10px]'>
                {products?.map(el => (
                    <ProductCard
                        key={el._id}
                        products={el}
                    />
                ))}
            </div>

            <div className='flex gap-5'>
                <img src="https://digital-world-2.myshopify.com/cdn/shop/files/banner1-bottom-home2_b96bc752-67d4-45a5-ac32-49dc691b1958_600x.jpg?v=1613166661" alt="" className='w-[50%]' />
                <div className='flex flex-col w-[25%] justify-between '>
                    <img src="https://digital-world-2.myshopify.com/cdn/shop/files/banner2-bottom-home2_400x.jpg?v=1613166661" alt="" />
                    <img src="https://digital-world-2.myshopify.com/cdn/shop/files/banner3-bottom-home2_400x.jpg?v=1613166661" alt="" />
                </div>
                <img src="https://digital-world-2.myshopify.com/cdn/shop/files/banner4-bottom-home2_92e12df0-500c-4897-882a-7d061bb417fd_400x.jpg?v=1613166661" alt="" className='w-[25%]' />
            </div>
        </div>
    )
}

export default memo(FeatureProduct)
