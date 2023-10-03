import React, { useCallback, useEffect, useState } from 'react'
import InputField from '../../components/inputs/InputField'
import { Button, Loading } from 'components';
import { apiLogin, apiRegister, apiForgotPassword, apiFinalRegister } from 'apis/user';
import Swal from 'sweetalert2'
import { Link, useNavigate } from 'react-router-dom'
import path from 'utils/path'
import { login } from 'store/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { validate } from 'utils/helpers';
import { showModal } from 'store/app/appSlice';
const Login = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [invalidFields, setInvalidFields] = useState('')
    const [email, setEmail] = useState('')
    const [token, setToken] = useState('')
    const [isRegister, setIsRegister] = useState(false)
    const [isVerifiedEmail, setIsVerifiedEmail] = useState(false)
    const [isForgotPasswrod, setIsForgotPassword] = useState(false)
    const [payload, setPayload] = useState({
        email: '',
        password: '',
        firstname: '',
        lastname: '',
        mobile: ''
    });
    const resetPayload = () => {
        setPayload({
            email: '',
            password: '',
            firstname: '',
            lastname: '',
            mobile: ''
        })
    }
    useEffect(() => {
        resetPayload()
        setInvalidFields([])
    }, [isRegister])
    const handleSubmit = useCallback(async () => {
        const { firstname, lastname, mobile, ...data } = payload
        const invalid = isRegister ? validate(payload, setInvalidFields) : validate(data, setInvalidFields)
        if (invalid === 0) {
            if (isRegister) {
                dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }))
                const response = await apiRegister(payload)
                dispatch(showModal({ isShowModal: false, modalChildren: null }))
                if (response.success) {
                    setIsVerifiedEmail(true)
                } else Swal.fire('Opps!', response.mes, 'error')
            } else {
                const rs = await apiLogin(data)
                if (rs.success) {
                    dispatch(login({ isLoggedIn: true, token: rs.accessToken, userData: rs.userData }))
                    navigate(`/${path.HOME}`)
                } else {
                    Swal.fire('Opps', rs.mes, 'error')
                }
            }
        }
    }, [payload, isRegister])

    const handleForgotPassword = async () => {

        const response = await apiForgotPassword({ email })
        if (response.success) {
            toast.success(response.mes)

        } else toast.info(response.mes)
    }

    const finalRegister = async () => {
        const response = await apiFinalRegister(token)
        if (response.success) {
            Swal.fire('Congratulation', response.mes, 'success').then(() => {
                setIsRegister(false)
                resetPayload()
            })
        } else {
            Swal.fire('Opps', response.mes, 'error')
        }
        setIsVerifiedEmail(false)
        setToken('')
    }

    return (
        <div className='w-screen h-screen relative'>
            {isVerifiedEmail && <div className='absolute top-0 left-0 right-0 bottom-0 bg-overlay flex justify-center items-center z-50'>
                <div className='bg-white w-[500px] rounded-md p-4'>
                    <div className=''>
                        <h4 className='mb-4'>We sent a code to your mail, please check your mail</h4>
                        <input
                            type="text"
                            value={token}
                            onChange={(e) => setToken(e.target.value)}
                            placeholder='Enter your code'
                            className='px-4 py-2 border outline-none text-[14px]'
                        />
                        <button
                            className='bg-blue-600 p-2 rounded-md font-semibold outline-none ml-4 text-white '
                            onClick={finalRegister}
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>}
            {isForgotPasswrod && <div className='absolute top-0 right-0 left-0 bottom-0 bg-white flex flex-col items-center py-8 z-50'>
                <div className='flex flex-col gap-4'>
                    <label htmlFor="email">Enter your email: </label>
                    <input
                        type="text"
                        id='email'
                        placeholder='Exp: email@gmail.com'
                        className='w-[800px] outline-none border-b pb-2 placeholder:text-sm'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <div className='flex items-center justify-end w-full gap-2'>
                        <Button handleOnclick={handleForgotPassword}>
                            Submit
                        </Button>
                        <Button
                            handleOnclick={() => setIsForgotPassword(false)}
                            style='px-4 py-2 rounded-md text-white bg-blue-600 mb-4 outline-none'
                        >
                            Back
                        </Button>
                    </div>
                </div>
            </div>}
            <img
                src="https://img.freepik.com/premium-photo/shopping-cart-card-icon-discounts_116441-26066.jpg"
                alt=""
                className='w-full h-full object-cover'
            />
            <div className='absolute top-0 left-0 bottom-0 right-1/2 flex items-center justify-center'>
                <div className='p-8 bg-white min-w-[500px] rounded-md flex items-center flex-col'>
                    <h1 className='text-[28px] font-semibold text-main mb-5'>{isRegister ? 'Register' : 'Login'}</h1>
                    {isRegister && <div className='flex items-center gap-2'>
                        <InputField
                            value={payload.firstname}
                            setValue={setPayload}
                            nameKey={'firstname'}
                            invalidFields={invalidFields}
                            setInvalidFields={setInvalidFields}
                            fullWidth
                        />
                        <InputField
                            value={payload.lastname}
                            setValue={setPayload}
                            nameKey={'lastname'}
                            invalidFields={invalidFields}
                            setInvalidFields={setInvalidFields}
                            fullWidth
                        />
                    </div>}
                    <InputField
                        value={payload.email}
                        setValue={setPayload}
                        nameKey={'email'}
                        invalidFields={invalidFields}
                        setInvalidFields={setInvalidFields}
                        fullWidth
                    />
                    {isRegister && <InputField
                        value={payload.mobile}
                        setValue={setPayload}
                        nameKey='mobile'
                        invalidFields={invalidFields}
                        setInvalidFields={setInvalidFields}
                        fullWidth
                    />}
                    <InputField
                        value={payload.password}
                        setValue={setPayload}
                        nameKey={'password'}
                        type={'password'}
                        invalidFields={invalidFields}
                        setInvalidFields={setInvalidFields}
                        fullWidth
                    />
                    <Button
                        children={isRegister ? 'REGISTER' : 'LOGIN'}
                        handleOnclick={handleSubmit}
                        fw
                    />
                    <div className='flex justify-between w-full text-sm my-2 items-center'>
                        {!isRegister && <span className='hover:text-main hover:underline cursor-pointer' onClick={() => setIsForgotPassword(true)}> Forgot your password? </span>}
                        {!isRegister && <span
                            className='hover:text-main hover:underline cursor-pointer'
                            onClick={() => setIsRegister(true)}
                        >
                            Create Account
                        </span>}
                        {isRegister && <span
                            className='hover:text-main hover:underline cursor-pointer w-full text-center'
                            onClick={() => setIsRegister(false)}
                        >
                            Back to Login
                        </span>}
                    </div>
                    <Link to={`/${path.HOME}`} className='hover:text-main hover:underline cursor-pointer text-[14px]'>Go Home</Link>
                </div>
            </div>
        </div>
    )
}

export default Login
