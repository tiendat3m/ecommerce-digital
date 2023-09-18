import React from 'react'
import icons from '../utils/icons'

const { MdEmail, MdLocationOn, BsFillTelephoneFill } = icons

const Footer = () => {
    return (
        <div className='w-full '>
            <div className='w-full flex justify-center items-center bg-main h-[103px]'>
                <div className='w-main flex items-center justify-between'>
                    <div className='flex flex-col flex-1'>
                        <span className='text-[20px] text-gray-100'>SIGN UP TO NEWSLETTER</span>
                        <small className='text-[13px] text-gray-300'>Subscribe now and receive weekly newsletter</small>
                    </div>
                    <div className='flex-1 flex items-center'>
                        <input
                            type="text"
                            className='p-4 pr-0  rounded-l-full w-full bg-[#f04646] outline-none text-gray-100 placeholder:text-sm placeholder:text-gray-200 placeholder:italic placeholder:opacity-50'
                            placeholder='Email Addrress'
                        />
                        <div className='h-[56px] w-[56px]  bg-[#f04646] rounded-r-full  flex items-center justify-center text-white'>
                            <MdEmail size={16} />
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-full bg-[#191919] h-[408px] flex justify-center text-white text-[13px] py-[50px]'>
                <div className='w-main flex justify-center'>
                    <div className='flex-2 flex flex-col'>
                        <h3 className='pl-[15px] border-main border-l-4 font-medium mb-5 text-[15px] '>ABOUT US</h3>
                        <div className='mb-[8px] flex items-center gap-1'>
                            <MdLocationOn />
                            <span>Address: </span>
                            <span className='opacity-70'>474 Ontario St Toronto, ON M4X 1M7 Canada</span>
                        </div>
                        <div className='mb-[8px] flex items-center gap-1   '>
                            <BsFillTelephoneFill />
                            <span>Phone: </span>
                            <span className='opacity-70'>(+1234)56789xxx</span>
                        </div>
                        <div className='mb-[8px] flex items-center gap-1   '>
                            <MdEmail />
                            <span>Mail: </span>
                            <span className='opacity-70'>tadathemes@gmail.com</span>
                        </div>
                    </div>
                    <div className='flex-1'>
                        <h3 className='pl-[15px] border-main border-l-4 font-medium mb-5 text-[15px] '>INFORMATION</h3>
                        <div className='flex flex-col gap-2 opacity-70 jc'>
                            <span>Typography</span>
                            <span>Gallery</span>
                            <span>Store Location</span>
                            <span>Today's Deals</span>
                            <span>Contact</span>
                        </div>
                    </div>
                    <div className='flex-1'>
                        <h3 className='pl-[15px] border-main border-l-4 font-medium mb-5 text-[15px] '>WHO WE ARE</h3>
                        <div className='flex flex-col gap-2 opacity-70'>
                            <span>Help</span>
                            <span>Free Shipping</span>
                            <span>FAQs</span>
                            <span>Return & Exchange</span>
                            <span>Testimonials</span>
                        </div>
                    </div>
                    <div className='flex-1'>
                        <h3 className='pl-[15px] border-main border-l-4 font-medium mb-5 text-[15px] '>#DIGITALWORLDSTORE</h3>
                        <div>
                            <span></span><span></span><span></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer
