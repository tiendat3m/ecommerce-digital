import React from 'react'
import { apiGetUsers } from 'apis'
import { useEffect } from 'react'
import { useState } from 'react'
import { roles } from 'utils/constants'
import moment from 'moment'
const ManageUser = () => {
    const [users, setUsers] = useState(null)
    const fetchUsers = async (params) => {
        const response = await apiGetUsers(params)
        if (response.success) setUsers(response?.users)
    }
    useEffect(() => {
        fetchUsers()
    }, [])
    return (
        <div className='w-full'>
            <h1 className='h-[75px] flex justify-between items-center text-3xl font-bold px-4 border-b'>
                <span>Manage Users</span>
            </h1>
            <div className='w-full p-4'>
                <table className='table-auto mb-6 text-left w-full'>
                    <thead className='font-semibold bg-gray-500 text-[16px] text-white'>
                        <tr className='border border-gray-500'>
                            <th className='px-4 py-2'>#</th>
                            <th className='px-4 py-2'>Email address</th>
                            <th className='px-4 py-2'>Fullname</th>
                            <th className='px-4 py-2'>Role</th>
                            <th className='px-4 py-2'>Phone</th>
                            <th className='px-4 py-2'>Status</th>
                            <th className='px-4 py-2'>Created At</th>
                            <th className='px-4 py-2'>Actions</th>
                        </tr>
                    </thead>
                    <tbody className=''>
                        {users?.map((el, index) => (
                            <tr key={el._id} className='text-[14px] border '>
                                <td className='px-4 py-2'>{index + 1}</td>
                                <td className='px-4 py-2'>{el.email}</td>
                                <td className='px-4 py-2'>{`${el.firstname} ${el.lastname}`}</td>
                                <td className='px-4 py-2'>{roles?.find(role => +role.code === +el.role)?.value}</td>
                                <td className='px-4 py-2'>{+el.mobile}</td>

                                <td className='px-4 py-2'>{el?.isBlocked ? 'Blocked' : 'Active'}</td>
                                <td className='px-4 py-2'>{moment(el.createdAt).format('DD/MM/YYYY')}</td>
                                <td className='px-4 py-2'>
                                    <span className='px-2 text-main hover:underline cursor-pointer'>Edit</span>
                                    <span className='px-2 text-main hover:underline cursor-pointer'>Delete</span>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ManageUser