import { apiGetProducts } from 'apis'
import { InputForm, Pagination } from 'components'
import moment from 'moment'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { formatMoney } from 'utils/helpers'

const ManageProduct = () => {
    const [products, setProducts] = useState(null)
    const [params] = useSearchParams()
    const [counts, setCounts] = useState(0)
    const { register, formState: { errors }, handleSubmit, reset } = useForm()
    const handleSearchProducts = (data) => {
        console.log(data)
    }
    const fetchProducts = async (params) => {
        const response = await apiGetProducts({ ...params, limit: process.env.REACT_APP_LIMIT })
        if (response.success) {
            setProducts(response)
            setCounts(response.counts)
        }
    }
    // const queriesDebounce = 
    useEffect(() => {
        const searchParams = Object.fromEntries([...params])
        fetchProducts(searchParams)
    }, [params])
    return (
        <div className='w-full flex flex-col gap-4 relative'>
            <div className='h-[69px] w-full'></div>
            <h1 className='h-[75px] bg-gray-100  w-full flex justify-between items-center text-3xl font-bold p-4 border-b fixed top-0'>
                <span>Manage Products</span>
            </h1>
            <div className='flex w-full justify-end items-center'>
                <form
                    className='w-[40%] px-4'
                    action=""
                    onSubmit={handleSubmit(handleSearchProducts)}
                >
                    <InputForm
                        id={'q'}
                        register={register}
                        errors={errors}
                        fullWidth
                        placeholder='Search product by title, description,...'
                    />
                </form>
            </div>
            <table className='table-auto mb-6 w-full'>
                <thead className='bg-sky-900 text-[13px] text-white w-full font-bold'>
                    <tr className='border border-gray-500'>
                        <th className='px-4 py-2 text-center'>Order</th>
                        <th className='px-4 py-2 text-center'>Thumb</th>
                        <th className='px-4 py-2 text-center'>Title</th>
                        <th className='px-4 py-2 text-center'>Brand</th>
                        <th className='px-4 py-2 text-center'>Category</th>
                        <th className='px-4 py-2 text-center'>Price</th>
                        <th className='px-4 py-2 text-center'>Quantity</th>
                        <th className='px-4 py-2 text-center'>Sold</th>
                        <th className='px-4 py-2 text-center'>Color</th>
                        <th className='px-4 py-2 text-center'>Ratings</th>
                        <th className='px-4 py-2 text-center'>Created At</th>
                    </tr>
                </thead>
                <tbody className=''>
                    {products?.products?.map((el, idx) => (
                        <tr key={el._id} className='border-b'>
                            <td className='px-4 py-2 text-center font-semibold'>{idx + 1}</td>
                            <td className='px-4 py-2 text-center'>
                                <img src={el.thumb} alt="" className='w-12 h-12 object-contain' />
                            </td>
                            <td className='px-4 py-2 text-center'>{el.title}</td>
                            <td className='px-4 py-2 text-center'>{el.brand}</td>
                            <td className='px-4 py-2 text-center'>{el.category}</td>
                            <td className='px-4 py-2 text-center'>{formatMoney(el.price)}</td>
                            <td className='px-4 py-2 text-center'>{el.quantity}</td>
                            <td className='px-4 py-2 text-center'>{el.sold}</td>
                            <td className='px-4 py-2 text-center'>{el.color}</td>
                            <td className='px-4 py-2 text-center'>{el.totalRatings}</td>
                            <td className='px-4 py-2 text-center '>{moment(el.createdAt).format('DD/MM/YYYY')}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className='w-full flex justify-end px-4'>
                <Pagination totalCount={counts} />
            </div>
        </div>
    )
}

export default ManageProduct
