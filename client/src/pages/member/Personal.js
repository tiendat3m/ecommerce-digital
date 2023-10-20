import { Button, InputForm, MemberSidebar } from 'components'
import moment from 'moment'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import defaultAvatar from 'assets/avatarDefault.png'
import { apiUpdateCurrent } from 'apis'
import { toast } from 'react-toastify'
import { getCurrent } from 'store/user/asyncActions'
const Personal = () => {
    const { register, formState: { errors, isDirty }, handleSubmit, watch, reset } = useForm()
    const dispatch = useDispatch()
    const { current } = useSelector(state => state.user)
    useEffect(() => {
        reset({
            firstname: current?.firstname || '',
            lastname: current?.lastname || '',
            email: current?.email || '',
            mobile: current?.mobile || '',
            avatar: current?.avatar || ''
        })
    }, [current])
    const handleSaveProfile = async (data) => {
        const formData = new FormData()
        if (data.avatar.length > 0) {
            formData.append('avatar', data.avatar[0])
            delete data.avatar
        }
        for (let i of Object.entries(data)) formData.append(i[0], i[1])
        const response = await apiUpdateCurrent(formData)
        if (response.success) {
            dispatch(getCurrent())
            toast.success(response.mes)
        } else toast.error(response.mes)

    }

    return (
        <div className='w-full flex flex-col gap-4 relative'>
            <header className='h-[75px] bg-gray-100  w-full text-3xl font-bold p-4 border-b '>
                My Profile
            </header>
            <form onSubmit={handleSubmit(handleSaveProfile)} className='w-3/5 mx-auto py-8 flex flex-col gap-4'>
                <InputForm
                    label={'First Name'}
                    register={register}
                    errors={errors}
                    id='firstname'
                    validate={{
                        required: 'Require fill'
                    }}
                    fullWidth
                    style='flex-auto'
                />
                <InputForm
                    label={'Last Name'}
                    register={register}
                    errors={errors}
                    id='lastname'
                    validate={{
                        required: 'Require fill'
                    }}
                    fullWidth
                    style='flex-auto'
                />
                <InputForm
                    label={'Email'}
                    register={register}
                    errors={errors}
                    id='email'
                    validate={{
                        required: 'Require fill',
                        pattern: {
                            value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                            message: 'Email invalid'
                        }
                    }}
                    fullWidth
                />
                <InputForm
                    label={'Mobile'}
                    register={register}
                    errors={errors}
                    id='mobile'
                    validate={{
                        required: 'Require fill',
                        pattern: {
                            value: /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
                            message: 'Phone invalid'
                        }
                    }}
                    fullWidth
                />
                <div className='flex items-center gap-2'>
                    <span className='font-medium'>Account Status: </span>
                    <span>{current?.isBlocked ? 'Blocked' : 'Active'}</span>
                </div>
                <div className='flex items-center gap-2'>
                    <span className='font-medium'>Role: </span>
                    <span>{+current?.role === 7052002 ? 'Admin' : 'User'}</span>
                </div>
                <div className='flex items-center gap-2'>
                    <span className='font-medium'>Created At: </span>
                    <span>{moment(current?.createdAt).format('DD/MM/YYYY')}</span>
                </div>
                <div className='flex flex-col gap-2'>
                    <span className='font-medium'>Avatar: </span>
                    <label htmlFor="file">
                        <img src={current.avatar || defaultAvatar} alt="" className='h-20 w-20 object-contain cursor-pointer rounded-full' />
                        <input type="file" id='file' {...register('avatar')} className='hidden' />
                    </label>
                </div>
                {isDirty && <div className='flex w-full justify-end'>
                    <Button type='submit'>
                        Save
                    </Button>
                </div>}
            </form>
        </div>
    )
}

export default Personal
