import React, { useState } from 'react'
import { Button } from '../../components'
import { useParams } from 'react-router-dom'
import { apiResetPassword } from '../../apis'
import { toast } from 'react-toastify'
const ResetPassword = () => {
    const { token } = useParams()
    const [password, setPassword] = useState('')

    const handleResetPassword = async () => {
        const response = await apiResetPassword({ password, token })
        if (password.success) {
            toast.success(response.mes)
        } else toast.info(response.mes)
    }

    return (
        <div className='absolute top-0 right-0 left-0 bottom-0 bg-white flex flex-col items-center py-8 z-50'>
            <div className='flex flex-col gap-4'>
                <label htmlFor="password">Enter your new password: </label>
                <input
                    type="text"
                    id='password'
                    placeholder='Type here'
                    className='w-[800px] outline-none border-b pb-2 placeholder:text-sm'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <div className='flex items-center justify-end w-full gap-2'>
                    <Button
                        name='Submit'
                        handleOnclick={handleResetPassword}
                    />
                </div>
            </div>
        </div>
    )
}

export default ResetPassword
