import React, {useCallback, useState} from 'react'
import InputField from '../../components/InputField'
import Button from '../../components/Button';
import { apiLogin, apiRegister } from '../../apis/user';
import Swal from 'sweetalert2'
import {useLocation, useNavigate} from 'react-router-dom'
import path from '../../utils/path'
import { register } from '../../store/user/userSlice';
import { useDispatch } from 'react-redux';
const Login = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    console.log(location)
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

    return (
        <div className='w-screen h-screen relative'>
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
                    {!isRegister && <span className='hover:text-main hover:underline cursor-pointer'> Forgot your password? </span>}
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
