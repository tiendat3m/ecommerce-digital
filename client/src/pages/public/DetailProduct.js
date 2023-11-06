import React, { useCallback, useEffect, useState } from 'react'
import { createSearchParams, useParams } from 'react-router-dom'
import { apiGetProduct, apiGetProducts, apiUpdateCart } from 'apis'
import { Breadcrumb, Button, CustomSlider, ProductInfo, ProductService, SelectQuantity } from 'components'
import Slider from 'react-slick'
import ReactImageMagnify from 'react-image-magnify';
import { formatMoney, formatPrice, renderStarFromNumber } from 'utils/helpers'
import { productService } from 'utils/constants'
import DOMPurify from 'dompurify';
import clsx from 'clsx'
import withBaseComponent from 'hocs/withBaseComponent'
import { useRef } from 'react'
import { useSelector } from 'react-redux'
import { getCurrent } from 'store/user/asyncActions'
import Swal from 'sweetalert2'
import path from 'utils/path'
import { toast } from 'react-toastify'
const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1
};
const DetailProduct = ({ isQuickView, data, dispatch, navigate, location }) => {
    const { current } = useSelector(state => state.user)
    const [currentImage, setCurrentImage] = useState(null)
    const [relatedProducts, setRelatedProducts] = useState(null)
    const [product, setProduct] = useState(null)
    const [update, setUpdate] = useState(false)
    const [quantity, setQuantity] = useState(1)
    const [variant, setVariant] = useState(null)
    const params = useParams()
    const scrollRef = useRef()
    const [pid, setPid] = useState(null);
    const [category, setCategory] = useState(null);
    const [currentProduct, setCurrentProduct] = useState({
        title: '',
        thumb: '',
        images: [],
        price: ''
    })
    const fetchProductData = async () => {
        const response = await apiGetProduct(pid)
        if (response.success) {
            setProduct(response.productData)
            setCurrentImage(response.productData?.thumb)

        }
    }
    const fetchProducts = async () => {
        const response = await apiGetProducts({ category })
        if (response.success) setRelatedProducts(response?.products)
    }
    useEffect(() => {
        if (data) {
            setPid(data.pid)
            setCategory(data.category)
        } else if (params && params.pid) {
            setPid(params.pid)
            setCategory(params.category)
        }
    }, [data, params])
    useEffect(() => {
        if (pid) {
            fetchProductData()
            fetchProducts()
        }
        window.scrollTo(0, 0);
    }, [pid])
    useEffect(() => {
        if (pid) fetchProductData()
    }, [update])
    useEffect(() => {
        if (variant) {
            setCurrentProduct({
                title: product?.variants?.find(el => el.sku === variant)?.title,
                price: product?.variants?.find(el => el.sku === variant)?.price,
                thumb: product?.variants?.find(el => el.sku === variant)?.thumb,
                images: product?.variants?.find(el => el.sku === variant)?.images,
                color: product?.variants?.find(el => el.sku === variant)?.color,
            })
        } else {
            setCurrentProduct({
                title: product?.title,
                price: product?.price,
                thumb: product?.thumb,
                images: product?.images || [],
                color: product?.color,
            })
        }
    }, [variant])
    const rerender = useCallback(() => {
        setUpdate(!update)
    }, [update])

    const handleQuantity = useCallback((number) => {
        if (!Number(number) || Number(number) < 1) {
            return
        } else {
            setQuantity(number)
        }
    }, [quantity])
    const handleChangeQuantity = (flag) => {
        if (flag === 'minus' && quantity === 1) return
        if (flag === 'minus') {
            setQuantity(prev => +prev - 1)
        } if (flag === 'plus') {
            setQuantity(prev => +prev + 1)
        }
    }
    useEffect(() => {
        scrollRef.current.scrollIntoView({ block: 'start' })
    }, [pid])
    const handelClickImage = (e, el) => {
        e.stopPropagation()
        setCurrentImage(el)
    }
    const handleAddToCart = async () => {
        if (1) {
            if (!current) return Swal.fire({
                title: 'Almost...',
                text: 'Please login first',
                icon: 'info',
                cancelButtonText: 'Not now!',
                showCancelButton: true,
                confirmButtonText: 'Go login page',

            }).then((rs) => {
                if (rs.isConfirmed) navigate({
                    pathname: `/${path.LOGIN}`,
                    search: createSearchParams({ redirect: location?.pathname }).toString()
                })
            })
            const response = await apiUpdateCart({
                pid,
                color: currentProduct?.color || product?.color, quantity,
                price: currentProduct?.price || product?.price,
                thumbnail: currentProduct?.thumb || product?.thumb,
                title: currentProduct?.title || product?.title
            })
            if (response.success) {
                toast.success(response.mes)
                dispatch(getCurrent())
            }
            else toast.error(response.mes)
        }
    }

    return (
        <div ref={scrollRef} className={clsx('w-full')}>
            {!isQuickView && <div className='h-[81px] bg-gray-100  flex justify-center items-center'>
                <div className='w-main flex gap-2 flex-col'>
                    <span className='font-semibold'>{currentProduct?.title || product?.title}</span>
                    <Breadcrumb title={currentProduct?.title || product?.title} category={product?.category} />
                </div>
            </div>}
            <div onClick={e => e.stopPropagation()} className={clsx('bg-white flex m-auto mt-4 gap-8', isQuickView ? 'max-w-[1000px] max-h-[80vh] overflow-y-auto gap-30 p-8' : 'w-main')}>
                <div className={clsx('flex flex-col gap-4 w-2/5', isQuickView && 'flex-1')}>
                    <div className={clsx('w-[458px] h-[458px] border')}>
                        < ReactImageMagnify {
                            ...{
                                smallImage: {
                                    isFluidWidth: true,
                                    src: currentProduct?.thumb || currentImage,
                                },
                                largeImage: {
                                    width: 800,
                                    height: 800,
                                    src: currentProduct?.thumb || currentImage,
                                }
                            }
                        } />
                    </div>
                    <div className='w-[458px]'>
                        <Slider className='images-slider' {...settings}>
                            {currentProduct?.images?.length === 0 && product?.images?.map(el => (
                                <div onClick={(e) => handelClickImage(e, el)} key={el}>
                                    <img src={el} alt="" className='w-[143px] h-[143px] p-2 object-contain border' />
                                </div>
                            ))}
                            {currentProduct?.images?.length > 0 && currentProduct?.images?.map(el => (
                                <div onClick={(e) => handelClickImage(e, el)} key={el}>
                                    <img src={el} alt="" className='w-[143px] h-[143px] p-2 object-contain border' />
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>
                <div className={clsx('w-2/5 flex flex-col gap-5', isQuickView && 'flex-1')}>
                    <div className='flex items-center justify-between'>
                        <h2 className='text-[30px] font-semibold '>{formatMoney(formatPrice(currentProduct?.price || product?.price))} VND</h2>
                        <span className='text-sm text-main'>{`In stock: ${product?.quantity}`}</span>
                    </div>
                    <div className='flex items-center gap-2'>
                        {renderStarFromNumber(product?.totalRatings)?.map((el, index) => (
                            <span key={index}>{el}</span>
                        ))}
                        <span className='text-sm text-main italic'>{`(Sold: ${product?.sold})`}</span>
                    </div>
                    {product?.description?.length > 1 && <ul className='text-[14px]'>
                        {product?.description?.map((el) => (
                            <li key={el} className='mb-[5px] list-square ml-5 text-gray-500'>{el}</li>
                        ))}
                    </ul>}
                    {product?.description?.length === 1 && <div className='text-sm line-clamp-6 mb-8' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(product?.description[0]) }}></div>}
                    <div className='my-4 flex gap-4'>
                        <span className='font-semibold'>Color</span>
                        <div className='flex flex-wrap gap-4 w-full items-center'>
                            <div onClick={() => setVariant(null)} className={clsx('flex items-center gap-2 p-2 border cursor-pointer', !variant && 'border-red-500')}>
                                <img src={product?.thumb} alt="thumb" className='rounded-md w-12 h-12 object-cover' />
                                <span className='flex flex-col gap-1'>
                                    <span>{product?.color?.toUpperCase()}</span>
                                    <span className='text-sm'>{formatMoney(formatPrice(product?.price))}</span>
                                </span>
                            </div>
                            {product?.variants?.map(el => (
                                <div onClick={() => setVariant(el?.sku)} key={el?._id} className={clsx('flex items-center gap-2 p-2 border cursor-pointer', variant === el?.sku && 'border-red-500')}>
                                    <img src={el?.thumb} alt="thumb" className='rounded-md w-12 h-12 object-cover' />
                                    <span className='flex flex-col'>
                                        <span>{el?.color?.toUpperCase()}</span>
                                        <span className='text-sm'>{formatMoney(el?.price)}</span>
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='flex flex-col gap-8'>
                        <span className='flex items-center gap-2'><span className='font-semibold'>Quantity: </span><SelectQuantity quantity={quantity} handleQuantity={handleQuantity} handleChangeQuantity={handleChangeQuantity} /></span>
                        <Button handleOnclick={handleAddToCart} fw>
                            Add to cart
                        </Button>
                    </div>
                </div>
                {!isQuickView && <div className='w-1/5'>
                    {productService?.map((el) => (
                        <ProductService key={el.id} title={el.title} sub={el.sub} icon={el.icon} />
                    ))}
                </div>}
            </div>
            {
                !isQuickView && <div className='w-main mt-8 m-auto'>
                    <ProductInfo totalRatings={product?.totalRatings} ratings={product?.ratings} productName={product?.title} pid={product?._id} rerender={rerender} />
                </div>
            }

            {
                !isQuickView && <div className='w-main mt-8 m-auto'>
                    <h3 className='text-[20px] py-[15px] border-b-2 border-main font-semibold mb-4'>OTHER CUSTOMERS ALSO BUY:</h3>
                    <div className='mx-[-10px]'><CustomSlider products={relatedProducts} normal={true} slidesToShow={4} /></div>
                </div>
            }
            {/* <div className='h-[400px]'></div> */}
        </div >
    )
}

export default withBaseComponent(DetailProduct)
