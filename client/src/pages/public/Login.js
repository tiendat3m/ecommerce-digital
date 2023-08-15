import React, {useState} from 'react'
import InputField from '../../components/InputField'
const Login = () => {

    const [payload, setPayload] = useState({
        email: '',
        password: '',
        name: ''
    });
    

    return (
        <div className='w-screen h-screen relative'>
            <img 
                src="https://img.freepik.com/premium-photo/shopping-cart-card-icon-discounts_116441-26066.jpg" 
                alt="" 
                className='w-full h-full object-cover'
            />
           <div className='absolute top-0 left-0 bottom-0 right-1/2 flex items-center justify-center'>
                <div className='p-8 bg-white min-w-[500px] rounded-md flex items-center flex-col'>
                    <h1 className='text-[28px] font-semibold text-main mb-5'>Login</h1>
                    <InputField 
                        value={payload.email}
                        setValue={setPayload}
                        nameKey={'name'}
                    />
                    <InputField 
                        value={payload.email}
                        setValue={setPayload}
                        nameKey={'email'}
                    />
                    <InputField 
                        value={payload.email}
                        setValue={setPayload}
                        nameKey={'password'}
                    />
                </div>
           </div>
        </div>
    )
}

export default Login
