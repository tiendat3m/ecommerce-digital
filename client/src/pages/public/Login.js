import React, {useCallback, useState} from 'react'
import InputField from '../../components/InputField'
import Button from '../../components/Button';
import { apiLogin, apiRegister, apiForgotPassword } from '../../apis/user';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import path from '../../utils/path'
import { register } from '../../store/user/userSlice';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
const Login = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [payload, setPayload] = useState({
        email: '',
        password: '',
        firstname: '',
        lastname: '',
        mobile: ''
    });
    const [isRegister, setIsRegister] = useState(false)
    const resetPayload = () => {
        setPayload({
            email: '',
            password: '',
            firstname: '',
            lastname: '',
            mobile: ''
        })
    }
    const handleSubmit = useCallback(async() => {
        const {firstname, lastname, mobile, ...data} = payload
        if(isRegister) {
            const response = await apiRegister(payload)
            if(response.success) {
                Swal.fire('Congratulation', response.mes, 'success' ).then(() => {
                    setIsRegister(false)
                    resetPayload()
                })
            } else {
                Swal.fire('Opps', response.mes, 'error' )
            }
        } else {
            const rs = await apiLogin(data)
            if(rs.success) {
                dispatch(register({isLoggedIn: true, token: rs.accessToken, userData: rs.userData}))
                navigate(`/${path.HOME}`)
            } else {
                Swal.fire('Opps', rs.mes, 'error' )
            }
        }
    }, [payload, isRegister])
    const [email, setEmail] = useState('')
    const handleForgotPassword = async() => {
        const response = await apiForgotPassword({email})
        if(response.success) {
            toast.success(response.mes)
        } else toast.info(response.mes)
    }
    const [isForgotPasswrod, setIsForgotPassword] = useState(false)
    return (
        <div className='w-screen h-screen relative'>
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
                        <Button 
                            name='Submit'
                            handleOnclick={handleForgotPassword}
                        />
                        <Button 
                            name='Back'
                            handleOnclick={() => setIsForgotPassword(false)}
                            style='px-4 py-2 rounded-md text-white bg-blue-600 mb-4 outline-none'
                        />
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
                        />
                        <InputField 
                            value={payload.lastname}
                            setValue={setPayload}
                            nameKey={'lastname'}
                        />
                    </div>}
                    <InputField 
                        value={payload.email}
                        setValue={setPayload}
                        nameKey={'email'}
                    />
                    {isRegister && <InputField 
                        value={payload.mobile}
                        setValue={setPayload}
                        nameKey='mobile'
                    />}
                    <InputField 
                        value={payload.password}
                        setValue={setPayload}
                        nameKey={'password'}
                        type={'password'}
                    />
                    <Button 
                        name={isRegister ? 'REGISTER' : 'LOGIN'}
                        handleOnclick={handleSubmit}
                        fw
                    />
                <div className='flex justify-between w-full text-sm my-2 items-center'>
                    {!isRegister && <span className='hover:text-main hover:underline cursor-pointer' onClick={() => setIsForgotPassword(true)}> Forgot your password? </span>}
                    {!isRegister &&  <span 
                        className='hover:text-main hover:underline cursor-pointer'
                        onClick={() => setIsRegister(true)}
                    > 
                        Create Account 
                    </span>}
                    {isRegister &&  <span 
                        className='hover:text-main hover:underline cursor-pointer w-full text-center'
                        onClick={() => setIsRegister(false)}
                    > 
                       Back to Login
                    </span>}
                </div>
                </div>
           </div>
        </div>
    )
}

export default Login
