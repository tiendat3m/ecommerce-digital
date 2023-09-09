import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { apiGetProduct } from '../../apis'
import { Breadcrumb } from '../../components'
import Slider from 'react-slick'
import ReactImageMagnify from 'react-image-magnify';
import { formatMoney } from '../../utils/helpers'

const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll:1
};

const DetailProduct = () => {
    const [product, setProduct] = useState(null)
    const {pid, title, category} = useParams()

    const fetchProductData = async() => {
        const response = await apiGetProduct(pid)
        if(response.success) setProduct(response.productData)
    }
    
    useEffect(() => {
        if(pid) fetchProductData()
    }, [])

    return (
        <div className='w-full'>
            <div className='h-[81px] bg-gray-100 w-full flex justify-center items-center'>
                <div className='w-main flex gap-2 flex-col'>
                    <span>{title}</span>
                    <Breadcrumb title={title} category={product?.category}/>
                </div>
            </div>
            <div className='w-main flex m-auto mt-4'>
                <div className='flex flex-col gap-4 w-2/5'>
                    <div className='w-[485px border'>
                        <ReactImageMagnify {...{
                            smallImage: {
                                isFluidWidth: true,
                                src: product?.thumb,
                            },
                            largeImage: {
                                width: 800,
                                height: 800,
                                src: product?.thumb,
                            }
                        }} />
                    </div>
                    <div className='w-full'>
                        <Slider className='images-slider' {...settings}>
                            {product?.images?.map(el => (
                                <div className='' key={el}>
                                    <img src={el} alt="" className='w-[148px] h-[148px] p-2 object-contain border'/>
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>
                <div className='w-2/5 pl-[45px]'>
                    <h2 className='text-[30px] font-semibold'>{formatMoney(product?.price)} VND</h2>
                </div>
                <div className='border border-yellow-400 w-1/5'>
                    info
                </div>
            </div>
            <div className='h-[400px]'></div>
        </div>
    )
}

export default DetailProduct
