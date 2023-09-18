import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { apiGetProduct, apiGetProducts } from '../../apis'
import Breadcrumb from '../../components/Breadcrumb';
import Slider from 'react-slick';
import ReactImageMagnify from 'react-image-magnify';
import { formatMoney, renderStarFromNumber } from '../../utils/helpers';
import { Button, ProductInfo, SelectQuantity, ProductService, CustomSlider } from '../../components';
import { productService, productTabs } from '../../utils/constants';


const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1
};
const DetailProduct = () => {
    const [currentImage, setCurrentImage] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [relatedProduct, setRelatedProduct] = useState(null);
    const [product, setProduct] = useState(null);
    const { pid, title, category } = useParams()
    const fectchProductData = async () => {
        const response = await apiGetProduct(pid)
        if (response.success) {
            setProduct(response?.productData)
            setCurrentImage(response?.productData?.thumb)
        }
    }
    const fetchProductsData = async () => {
        const response = await apiGetProducts({ category })
        if (response.success) setRelatedProduct(response?.products)
    }

    useEffect(() => {
        fectchProductData()
        fetchProductsData()
    }, [pid])
    const handleQuantity = useCallback(number => {
        if (!Number(number) || number < 1) {
            return
        } else {
            setQuantity(number)
        }
    })

    const handleChangeQuantity = (flag) => {
        if (flag === 'minus' && quantity === 1) return
        if (flag === 'minus') {
            setQuantity(prev => +prev - 1)
        } if (flag === 'plus') {
            setQuantity(prev => +prev + 1)
        }
    }

    const handleClickImage = useCallback((e, el) => {
        e.stopPropagation()
        setCurrentImage(el)
    }, [])

    return (
        <div className='w-full'>
            <div className='h-[81px] bg-gray-100 flex justify-center items-center'>
                <div className='w-main'>
                    <h3 className='font-bold mb-[10px]'>{title}</h3>
                    <Breadcrumb title={title} category={category} />
                </div>
            </div>
            <div className='w-main flex m-auto mt-4 gap-6'>
                <div className='w-2/5 flex flex-col gap-4'>
                    <div className='w-[485px] h-[485px] border'>
                        <ReactImageMagnify {...{
                            smallImage: {
                                isFluidWidth: true,
                                src: currentImage,
                            },
                            largeImage: {
                                width: 1000,
                                height: 1000,
                                src: currentImage,
                            }
                        }} />
                    </div>
                    <div className='w-full'>
                        <Slider className='detail-slider' {...settings}>
                            {product?.images?.map(el => (
                                <div className='m-0' key={el}>
                                    <img onClick={(e) => handleClickImage(e, el)} src={el} alt="" className='w-[143px] h-[143px] p-2 object-contain border' />
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>
                <div className='w-2/5 flex flex-col gap-5'>
                    <div className='flex justify-between items-center'>
                        <h3 className='text-[30px] font-semibold'>{formatMoney(product?.price)} VND</h3>
                        <span className='text-xs text-main'>{`In stock : ${product?.quantity}`}</span>
                    </div>
                    <div className='flex items-center'>
                        {renderStarFromNumber(product?.totalRatings, 19)?.map((el, index) => (
                            <span key={index}>{el}</span>
                        ))}
                        <span className='text-xs text-main italic ml-4'>{`Sold: ${product?.sold}`}</span>
                    </div>
                    <ul className='text-sm text-gray-600 list-square ml-5'>
                        {product?.description?.map(el => (
                            <li key={el} className='mb-[5px]'>{el}</li>
                        ))}
                    </ul>
                    <div className='flex flex-col gap-4 mt-8'>
                        <span className='flex items-center gap-3'><span className='font-semibold text-sm'>Quantity: </span> <SelectQuantity quantity={quantity} handleQuantity={handleQuantity} handleChangeQuantity={handleChangeQuantity} /></span>

                        <Button fw>
                            Add to cart
                        </Button>
                    </div>
                </div>
                <div className='w-1/5'>
                    {productService?.map(el => (
                        <ProductService key={el.id} title={el.title} sub={el.sub} icon={el.icon} />
                    ))}
                </div>
            </div>
            <div className='mt-[64px] w-main m-auto'>
                <ProductInfo />
            </div>
            <div className='mt-8 w-main m-auto flex flex-col gap-6'>
                <h3 className='text-[20px] py-[15px] border-b-2 border-main font-semibold'>OTHER CUSTOMERS ALSO BUY:</h3>
                <div className='mx-[-10px]'><CustomSlider products={relatedProduct} slidesToShow={4} isNormal={true} /></div>
            </div>
            <div className='h-[500px]'></div>
        </div>
    )
}

export default DetailProduct
