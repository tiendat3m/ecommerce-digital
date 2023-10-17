import { Button, InputForm, MemberSidebar } from 'components'
import moment from 'moment'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'

const Personal = () => {
    const { register, formState: { errors, isDirty }, handleSubmit, watch, reset } = useForm()
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
    const handleSaveProfile = (data) => {
        console.log(data)
    }

    return (
        <div className='w-full flex flex-col gap-4 relative'>
            <header className='h-[75px] bg-gray-100  w-full text-3xl font-bold p-4 border-b '>
                My Profile
            </header>
            <form onSubmit={handleSubmit(handleSaveProfile)} className='w-3/5 mx-auto py-8 flex flex-col gap-4'>
                <div className='flex w-full gap-4'>
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
                </div>
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
