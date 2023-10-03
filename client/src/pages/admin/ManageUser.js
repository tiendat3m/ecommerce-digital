import React, { useCallback } from 'react'
import { apiDeleteUser, apiGetUsers, apiUpdateUser } from 'apis'
import { useEffect } from 'react'
import { useState } from 'react'
import { blockStatus, roles } from 'utils/constants'
import moment from 'moment'
import { Button, InputField, InputForm, Pagination, Select } from 'components'
import useDebounce from 'hooks/useDebounce'
import { useSearchParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
import clsx from 'clsx'

const ManageUser = () => {
    const { handleSubmit, register, formState: { errors } } = useForm({
        email: '',
        firstname: '',
        lastname: '',
        role: '',
        phone: '',
        status: ''
    })
    const [update, setUpdate] = useState(false)
    const [users, setUsers] = useState(null)
    const [queries, setQueries] = useState({
        q: ''
    })
    const [params] = useSearchParams()
    const [editEl, setEditEl] = useState(null)
    const fetchUsers = async (params) => {
        const response = await apiGetUsers({ ...params, limit: +process.env.REACT_APP_LIMIT })
        if (response.success) setUsers(response)
    }
    const queriesDebounce = useDebounce(queries.q, 800)
    const render = useCallback(() => {
        setUpdate(!update)
    }, [update])

    useEffect(() => {
        const queries = Object.fromEntries([...params])
        if (queriesDebounce) queries.q = queriesDebounce
        fetchUsers(queries)
    }, [queriesDebounce, params, update])

    const hanldeUpdate = async (data) => {
        const response = await apiUpdateUser(data, editEl._id)
        if (response.success) {
            setEditEl(null)
            render()
            toast.success(response.mes)
        } else toast.error(response.mes)
    }
    const handleDelete = (uid) => {
        console.log(uid)
        Swal.fire({
            title: 'Are you sure...',
            text: 'Are you ready to remove this user?',
            showCancelButton: true
        }).then(async (rs) => {
            if (rs.isConfirmed) {
                const response = await apiDeleteUser(uid)
                if (response.success) {
                    render()
                    toast.success(response.mes)
                } else toast.error(response.mes)
            }
        })
    }

    return (
        <div className={clsx('w-full')}>
            <h1 className='h-[75px] flex justify-between items-center text-3xl font-bold px-4 border-b'>
                <span>Manage Users</span>
            </h1>
            <div className='w-full p-4'>
                <div className='flex justify-end py-4'>
                    <InputField
                        nameKey={'q'}
                        value={queries.q}
                        setValue={setQueries}
                        style={'w500'}
                        placeholder={'Enter username or email'}
                        isHideLabel
                    />
                </div>
                <form onSubmit={handleSubmit(hanldeUpdate)}>
                    {editEl && <Button type='submit' >
                        Update
                    </Button>}
                    <table className='table-auto mb-6 text-left w-full'>
                        <thead className='bg-gray-500 text-[13px] text-white w-full font-bold'>
                            <tr className='border border-gray-500'>
                                <th className='px-4 py-2'>#</th>
                                <th className='px-4 py-2'>Email address</th>
                                <th className='px-4 py-2'>Firstname</th>
                                <th className='px-4 py-2'>Lastname</th>
                                <th className='px-4 py-2'>Role</th>
                                <th className='px-4 py-2'>Phone</th>
                                <th className='px-4 py-2'>Status</th>
                                <th className='px-4 py-2'>Created At</th>
                                <th className='px-4 py-2'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className=''>
                            {users?.users?.map((el, index) => (
                                <tr key={el._id} className='text-[14px] border'>
                                    <td className='px-4 py-2'>{index + 1}</td>
                                    <td className='px-4 py-2'>
                                        {editEl?._id === el._id
                                            ? <InputForm
                                                fullWidth
                                                register={register}
                                                errors={errors}
                                                defaultValue={editEl?.email}
                                                id={'email'}
                                                validate={{
                                                    required: 'Require fill',
                                                    pattern: {
                                                        value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                                        message: 'Please enter a valid email',
                                                    },
                                                }} />
                                            : <span>{el.email}</span>}
                                    </td>
                                    <td className='px-4 py-2'>
                                        {editEl?._id === el._id
                                            ? <InputForm
                                                fullWidth
                                                register={register}
                                                errors={errors}
                                                defaultValue={editEl?.firstname}
                                                id={'firstname'}
                                                validate={{ required: 'Require fill' }} />
                                            : <span>{el.firstname}</span>}
                                    </td>
                                    <td className='px-4 py-2'>
                                        {editEl?._id === el._id
                                            ? <InputForm
                                                fullWidth
                                                register={register}
                                                errors={errors}
                                                defaultValue={editEl?.lastname}
                                                id={'lastname'}
                                                validate={{ required: 'Require fill' }} />
                                            : <span>{el.lastname}</span>}
                                    </td>
                                    <td className='px-4 py-2'>
                                        {editEl?._id === el._id
                                            ? <Select
                                                fullWidth
                                                register={register}
                                                errors={errors}
                                                defaultValue={el.role}
                                                id={'role'}
                                                validate={{ required: 'Require fill' }}
                                                options={roles}
                                            />
                                            : <span>{roles?.find(role => +role.code === +el.role)?.value}</span>}
                                    </td>
                                    <td className='px-4 py-2'>
                                        {editEl?._id === el._id
                                            ? <InputForm
                                                fullWidth
                                                register={register}
                                                errors={errors}
                                                defaultValue={editEl?.mobile}
                                                id={'mobile'}
                                                validate={{
                                                    required: 'Require fill',
                                                    pattern: {
                                                        value: /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
                                                        message: 'Invalid Phone number',
                                                    },
                                                }} />
                                            : <span>{el.mobile}</span>}
                                    </td>
                                    <td className='px-4 py-2'>
                                        {editEl?._id === el?._id
                                            ? <Select
                                                fullWidth
                                                register={register}
                                                errors={errors}
                                                defaultValue={el.isBlocked}
                                                id={'status'}
                                                validate={{ required: 'Require fill' }}
                                                options={blockStatus}
                                            />
                                            : <span>{el?.isBlocked ? 'Blocked' : 'Active'}</span>}
                                    </td>
                                    <td className='px-4 py-2'>{moment(el.createdAt).format('DD/MM/YYYY')}</td>
                                    <td className={clsx('px-4 py-2')}>
                                        <span className='flex'>
                                            {editEl?._id === el?._id
                                                ? <span onClick={() => setEditEl(null)} className='px-2 text-main hover:underline cursor-pointer'>Back </span>
                                                : <span onClick={() => setEditEl(el)} className='px-2 text-main hover:underline cursor-pointer'>Edit</span>
                                            }
                                            <span onClick={() => handleDelete(el._id)} className='px-2 text-main hover:underline cursor-pointer'>Delete</span>
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </form>
                <div className='text-right w-full flex justify-end'>
                    <Pagination totalCount={users?.counts} />
                </div>
            </div>
        </div>
    )
}

export default ManageUser
