import React, { memo, useState } from 'react'
import { formatMoney, renderStarFromNumber } from 'utils/helpers'
import newLabel from 'assets/new.png'
import trendingLabel from 'assets/trending.png'
import SelectOption from '../search/SelectOption'
import icons from 'utils/icons'
import { Link } from 'react-router-dom'
import withBaseComponent from 'hocs/withBaseComponent'
import { showModal } from 'store/app/appSlice'
import { DetailProduct } from 'pages/public'
import { apiUpdateCart } from 'apis'
import { toast } from 'react-toastify'
import { getCurrent } from 'store/user/asyncActions'
import { useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import path from 'utils/path'

const { BsFillCartPlusFill, FaRegEye, AiFillHeart, BsCartCheckFill } = icons
const Product = ({ productData, isNew, normal, dispatch, navigate }) => {
    const [isShowOption, setIsShowOption] = useState(false);
    const { current } = useSelector(state => state.user)
    console.log(productData)
    const handleClickOptions = async (e, flag) => {
        e.stopPropagation()
        if (flag === 'CART') {
            if (!current) return Swal.fire({
                title: 'Almost...',
                text: 'Please login first',
                icon: 'info',
                cancelButtonText: 'Not now!',
                showCancelButton: true,
                confirmButtonText: 'Go login page',

            }).then((rs) => {
                if (rs.isConfirmed) navigate(`/${path.LOGIN}`)
            })
            const response = await apiUpdateCart({
                pid: productData?._id,
                color: productData?.color,
                title: productData?.title,
                price: productData?.price,
                thumbnail: productData?.thumb
            })
            if (response.success) {
                toast.success(response.mes)
                dispatch(getCurrent())
            }
            else toast.error(response.mes)
        }
        if (flag === 'QUICKVIEW') {
            dispatch(showModal({ isShowModal: true, modalChildren: <DetailProduct data={{ pid: productData?._id, category: productData?.category }} isQuickView /> }))
        }
    }

    return (
        <div className='w-full text-base px-[10px]'>
            <div
                className='w-full border p-[15px] flex flex-col items-center'
                onClick={e => {
                    navigate(`/${productData?.category?.toLowerCase()}/${productData?._id}/${productData?.title}`)
                    // e.stopPropagation()
                }}
                onMouseEnter={(e) => {
                    e.stopPropagation()
                    setIsShowOption(true)
                }}
                onMouseLeave={(e) => {
                    e.stopPropagation()
                    setIsShowOption(false)
                }}
            >
                <div className='w-full relative'>
                    {isShowOption && <span className='absolute bottom-[-10px] left-0 right-0 flex items-center justify-center gap-3 animate-slide-top'>
                        <span title='Wishlist' onClick={(e) => handleClickOptions(e, 'WISHLIST')}><SelectOption icons={<AiFillHeart />} /></span>
                        {current?.cart?.some(el => el?.product?._id === productData?._id.toString())
                            ? <span><SelectOption icons={<BsCartCheckFill color='green' />} /></span>
                            : <span title='Add to Cart' onClick={(e) => handleClickOptions(e, 'CART')}><SelectOption icons={<BsFillCartPlusFill />} /></span>
                        }
                        <span title='QuickView' onClick={(e) => handleClickOptions(e, 'QUICKVIEW')}><SelectOption icons={<FaRegEye />} /></span>
                    </span>}
                    <img src={productData?.thumb || ''} alt="" className='w-[274px] h-[274px] object-cover' />
                    {!normal && <img src={isNew ? newLabel : trendingLabel} alt="" className={`absolute top-[0] right-[0] w-[100px] h-[35px] object-cover`} />}
                </div>
                <div className='flex flex-col gap-1 mt-[15px] items-start w-full'>
                    <span className='flex h-4'>{renderStarFromNumber(productData?.totalRatings)?.map((el, index) => (
                        <span key={index}>{el}</span>
                    ))}</span>
                    <span className='line-clamp-1'>{productData?.title}</span>
                    <span>{`${formatMoney(productData?.price)} VNĐ`}</span>
                </div>
            </div>
        </div>
    )
}

export default withBaseComponent(memo(Product))
