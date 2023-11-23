import { apiGetUserOrders } from 'apis'
import { InputForm, Pagination } from 'components';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { createSearchParams, useSearchParams } from 'react-router-dom';
import { MdEditNote, MdDeleteOutline, MdOutlineDashboardCustomize } from 'react-icons/md'
import CustomSelect from 'components/inputs/CustomSelect';
import { statusOrders } from 'utils/constants';
import withBaseComponent from 'hocs/withBaseComponent';

const History = ({ navigate, location }) => {
    const [orders, setOrders] = useState(null);
    const [counts, setCounts] = useState(0);
    const [params] = useSearchParams()
    // console.log(orders)
    const { register, formState: { errors }, watch, setValue } = useForm()
    // const q = watch('q')
    const status = watch('status')
    const fetchOrders = async (params) => {
        const response = await apiGetUserOrders({
            ...params,
            limit: process.env.REACT_APP_LIMIT,

        })
        if (response.success) {
            setOrders(response.orders)
            setCounts(response.counts)
        }
    }

    useEffect(() => {
        const pr = Object.fromEntries([...params])
        fetchOrders(pr)
    }, [params])
    const handleSearchStatus = ({ value }) => {
        navigate({
            pathname: location.pathname,
            search: createSearchParams({ status: value }).toString()
        })
    }

    return (
        <div className='w-full relative'>
            <header className='h-[75px] bg-gray-100  w-full text-3xl font-bold p-4 border-b '>
                Buy History
            </header>
            <div className='flex w-full justify-end items-center'>
                <form className='w-[45%] px-4 grid grid-cols-2 gap-4'>
                    <div className='col-span-1'>
                        <InputForm
                            id={'q'}
                            register={register}
                            errors={errors}
                            fullWidth
                            placeholder='Search order by status,...'
                        />
                    </div>
                    <div className='col-span-1 flex items-center w-full'>

                        <CustomSelect
                            options={statusOrders}
                            value={status}
                            onChange={val => handleSearchStatus(val)}
                            wrapClassName='w-full'
                        />
                    </div>
                </form>
            </div>
            <table className='table-auto mb-6 w-full'>
                <thead className='bg-sky-900 text-[13px] text-white w-full font-bold'>
                    <tr className='border border-gray-500 '>
                        <th className='px-4 py-2 text-center'>#</th>
                        <th className='px-4 py-2 text-center'>Products</th>
                        <th className='px-4 py-2 text-center'>Total</th>
                        <th className='px-4 py-2 text-center'>Status</th>
                        <th className='px-4 py-2 text-center'>CreatedAt</th>
                        <th className='px-4 py-2 text-center'>Actions</th>
                    </tr>
                </thead>
                <tbody className='text-[13px]'>
                    {orders?.map((el, idx) => (
                        <tr key={el._id} className='border-b'>
                            <td className='py-2 text-center '>{((+params.get('page') > 1 ? +params.get('page') - 1 : 0) * process.env.REACT_APP_LIMIT) + idx + 1}</td>
                            <td className='px-4 py-2 text-center max-w-[500px]'>
                                <span className='grid grid-cols-2 gap-4'>
                                    {el.products?.map(item => (
                                        <span className='flex col-span-1 items-center gap-2' key={item?._id}>
                                            <img src={item?.thumbnail} alt="" className='w-8 h-8 object-contain' />
                                            <span className='flex flex-col '>
                                                <span className='text-sm text-main'>{item.title}</span>
                                                <span className='flex items-center text-xs gap-2'>
                                                    <span>Quantity: </span>
                                                    <span className='text-main'>{item.quantity}</span>
                                                </span>
                                            </span>
                                        </span>
                                    ))}
                                </span>
                            </td>
                            <td className='px-4 py-2 text-center'>{`${el.total}$`}</td>
                            <td className='px-4 py-2 text-center'>{el.status}</td>
                            <td className='px-4 py-2 text-center'>{moment(el.createdAt)?.format('DD/MM/YYYY')}</td>
                            <td className='px-4 py-2 text-center'>
                                <div className='flex items-center gap-1 justify-center'>
                                    <span
                                        className='text-blue-500 hover:text-main cursor-pointer'
                                    // onClick={() => handleDeleteProduct(el?._id)}
                                    >
                                        <MdDeleteOutline size={20} />
                                    </span>
                                </div>
                            </td>
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

export default withBaseComponent(History)
