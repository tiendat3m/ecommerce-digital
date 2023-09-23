import React, { useCallback, useEffect, useState } from 'react'
import { createSearchParams, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { Breadcrumb, InputSelect, Pagination, Product, SearchItem } from '../../components'
import { apiGetProducts } from '../../apis'
import Masonry from 'react-masonry-css'
import { options } from '../../utils/constants'
const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1
};
const Products = () => {
    const [sort, setSort] = useState('')
    const [products, setProducts] = useState(null)
    const [activeClick, setActiveClick] = useState(null)
    const [params] = useSearchParams()
    const navigate = useNavigate()
    const fetchProductsByCategory = async (queries) => {
        const response = await apiGetProducts(queries)
        if (response.success) setProducts(response)
        console.log(response)
    }

    const { category } = useParams()

    useEffect(() => {
        navigate({
            pathname: `/${category}`,
            search: createSearchParams({
                sort
            }).toString()
        })
    }, [sort])

    useEffect(() => {
        let param = []
        for (let i of params.entries()) param.push(i)
        const queries = {}
        let priceQuery = {}
        for (let i of params) queries[i[0]] = i[1]
        if (queries.to && queries.from) {
            priceQuery = {
                $and: [
                    { price: { gte: queries.from } },
                    { price: { lte: queries.to } }
                ]
            }
        }
        if (queries.from) queries.price = { gte: queries.from }
        if (queries.to) queries.price = { lte: queries.to }
        delete queries.to
        delete queries.from
        delete queries.price
        const q = { ...priceQuery, ...queries }
        console.log(q)
        fetchProductsByCategory(q)
    }, [params])

    const changeActiveFilter = useCallback((name) => {
        if (activeClick === name) setActiveClick(null)
        else setActiveClick(name)
    }, [activeClick])

    const changeValue = useCallback((value) => {
        setSort(value)
    }, [sort])


    return (
        <div className='w-full'>
            <div className='h-[81px] bg-gray-100 w-full flex justify-center items-center'>
                <div className='w-main flex gap-2 flex-col'>
                    <span className='font-semibold uppercase'>{category}</span>
                    <span className='capitalize'><Breadcrumb category={category} /></span>
                </div>
            </div>
            <div className='w-main m-auto flex justify-between border p-[10px] mt-8'>
                <div className='w-4/5 flex-auto flex flex-col gap-2'>
                    <span className='font-semibold text-sm'>Filter by</span>
                    <div className='flex flexc items-center gap-4'>
                        <SearchItem
                            name={'price'}
                            activeClick={activeClick}
                            changeActiveFilter={changeActiveFilter}
                            type='input'
                        />
                        <SearchItem
                            name={'color'}
                            activeClick={activeClick}
                            changeActiveFilter={changeActiveFilter}
                        />
                    </div>
                </div>
                <div className='w-1/5 flex flex-col gap-3'>
                    <span className='font-semibold text-sm'>Sort by</span>
                    <div className='w-full'>
                        <InputSelect value={sort} changeValue={changeValue} options={options} />
                    </div>
                </div>
            </div>
            <div className='w-main m-auto'>
                <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className="my-masonry-grid mt-8 flex flex-wrap mx-[-10px]"
                    columnClassName="my-masonry-grid_column"
                >
                    {products?.products?.map(el => (
                        <Product
                            key={el._id}
                            productData={el}
                            normal={true}
                        />
                    ))}
                </Masonry>
            </div>
            <div className='flex justify-end mt8 w-main m-auto'>
                <Pagination totalCount={products?.counts} />
            </div>
            <div className="w-full h-[500px]"></div>
        </div>
    )
}

export default Products
