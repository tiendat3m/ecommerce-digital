import React, {useCallback, useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { apiGetProduct } from '../../apis'
import { Breadcrumb, Button, SelectQuantity } from '../../components'
import Slider from 'react-slick'
import ReactImageMagnify from 'react-image-magnify';
import { formatMoney, renderStarFromNumber } from '../../utils/helpers'

const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll:1
};

const DetailProduct = () => {
    const [quantity, setQuantity] = useState(1)
    const [product, setProduct] = useState(null)
    const {pid, title, category} = useParams()

    const fetchProductData = async() => {
        const response = await apiGetProduct(pid)
        if(response.success) setProduct(response.productData)
    }
    
    useEffect(() => {
        if(pid) fetchProductData()
    }, [])

    const handleQuantity = useCallback((number) => {
        if(!Number(number) || Number(number) < 1) {
            return
        }else {
            setQuantity(number)
        }
    }, [quantity])
    const handleChangeQuantity = (flag) => {
        if(flag === 'minus' && quantity === 1) return
        if(flag === 'minus') {
            setQuantity(prev => +prev - 1)
        }if (flag === 'plus') {
            setQuantity(prev => +prev + 1)
        }
    }
    
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
                    <div className='w-[485px] border'>
                        <ReactImageMagnify {...{
                            smallImage: {
                                isFluidWidth: true,
                                src: product?.thumb,
                            },
                            largeImage: {
                                width: 1200,
                                height: 1200,
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
                <div className='w-2/5 pl-[45px] flex flex-col gap-5'>
                    <div className='flex items-center justify-between'>
                        <h2 className='text-[30px] font-semibold '>{formatMoney(product?.price)} VND</h2>
                        <span className='text-sm text-main'>{`Kho: ${product?.quantity}`}</span>
                    </div>
                    <div className='flex items-center'>
                        {renderStarFromNumber(product?.totalRatings)?.map((el, index) => (
                            <span key={index}>{el}</span>
                        ))}
                        <span className='text-sm text-main ml-4 italic'>{`(Đã bán: ${product?.sold})`}</span>
                    </div>
                    <ul className='text-[14px]'>
                        {product?.description?.map((el) => (
                            <li key={el} className='mb-[5px] list-square ml-5 text-gray-500'>{el}</li>
                        ))}
                    </ul>
                    <div className='flex flex-col gap-8'>
                        <span className='flex items-center gap-2'><span className='font-semibold'>Quantity: </span><SelectQuantity quantity={quantity} handleQuantity={handleQuantity} handleChangeQuantity={handleChangeQuantity}/></span>
                        <Button fw>
                            Add to cart
                        </Button>
                    </div>
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
