import React, {useCallback, useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { apiGetProduct, apiGetProducts } from '../../apis'
import { Breadcrumb, Button, CustomSlider, ProductInfo, ProductService, SelectQuantity } from '../../components'
import Slider from 'react-slick'
import ReactImageMagnify from 'react-image-magnify';
import { formatMoney, renderStarFromNumber } from '../../utils/helpers'
import { productService } from '../../utils/constants'

const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll:1
};

const DetailProduct = () => {
    const [relatedProducts, setrelatedProducts] = useState(null)
    const [quantity, setQuantity] = useState(1)
    const [product, setProduct] = useState(null)
    const {pid, title, category} = useParams()

    const fetchProductData = async() => {
        const response = await apiGetProduct(pid)
        if(response.success) setProduct(response.productData)
    }
    
    const fetchProducts = async () => {
        const response = await apiGetProducts({category})
        if(response.success) setrelatedProducts(response?.products)
    }
     

    useEffect(() => {
        fetchProductData()
        fetchProducts()
    }, [pid])

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
                    <span className='font-semibold'>{title}</span>
                    <Breadcrumb title={title} category={product?.category}/>
                </div>
            </div>
            <div className='w-main flex m-auto mt-4 gap-8'>
                <div className='flex flex-col gap-4 w-2/5'>
                    <div className='w-[485px] border'>
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
                <div className='w-2/5 flex flex-col gap-5'>
                    <div className='flex items-center justify-between'>
                        <h2 className='text-[30px] font-semibold '>{formatMoney(product?.price)} VND</h2>
                        <span className='text-sm text-main'>{`In stock: ${product?.quantity}`}</span>
                    </div>
                    <div className='flex items-center'>
                        {renderStarFromNumber(product?.totalRatings)?.map((el, index) => (
                            <span key={index}>{el}</span>
                        ))}
                        <span className='text-sm text-main ml-4 italic'>{`(Sold: ${product?.sold})`}</span>
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
                <div className='w-1/5'>
                    {productService?.map((el) => (
                        <ProductService key={el.id} title={el.title} sub={el.sub} icon={el.icon}/>
                    ))}
                </div>
            </div>
            <div className='w-main mt-8 m-auto'>
                <ProductInfo />
            </div>

            <div className='w-main mt-8 m-auto'>
                <h3 className='text-[20px] py-[15px] border-b-2 border-main font-semibold mb-4'>OTHER CUSTOMERS ALSO BUY:</h3>
                <div className='mx-[-10px]'><CustomSlider products={relatedProducts} normal={true} slidesToShow={4}/></div>
            </div>
            <div className='h-[400px]'></div>
        </div>
    )
}

export default DetailProduct
