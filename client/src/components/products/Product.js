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

const { AiOutlineMenu, FaRegEye, AiFillHeart } = icons
const Product = ({ productData, isNew, normal, dispatch, navigate }) => {
    const [isShowOption, setIsShowOption] = useState(false);
    const handleClickOptions = (e, flag) => {
        e.stopPropagation()
        if (flag === 'MENU') navigate(`/${productData?.category?.toLowerCase()}/${productData?._id}/${productData?.title}`)
        if (flag === 'QUICKVIEW') {
            dispatch(showModal({ isShowModal: true, modalChildren: <DetailProduct data={{ pid: productData?._id, category: productData?.category }} isQuickView /> }))
        }
    }

    return (
        <div className='w-full text-base px-[10px]'>
            <div
                className='w-full border p-[15px] flex flex-col items-center'
                onClick={e => navigate(`/${productData?.category?.toLowerCase()}/${productData?._id}/${productData?.title}`)}
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
                        <span onClick={(e) => handleClickOptions(e, 'WISHLIST')}><SelectOption icons={<AiFillHeart />} /></span>
                        <span onClick={(e) => handleClickOptions(e, 'MENU')}><SelectOption icons={<AiOutlineMenu />} /></span>
                        <span onClick={(e) => handleClickOptions(e, 'QUICKVIEW')}><SelectOption icons={<FaRegEye />} /></span>
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
