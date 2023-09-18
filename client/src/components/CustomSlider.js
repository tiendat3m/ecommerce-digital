import React, { memo } from 'react'
import Product from './Product'
import Slider from 'react-slick'

const CustomSlider = ({ products, activeTab, slidesToShow, isNormal }) => {
    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: slidesToShow || 3,
        slidesToScroll: 1
    };
    return (
        <>
            {products && <Slider className='product-slider' {...settings}>
                {products?.map(el => (
                    <Product
                        key={el._id}
                        productData={el}
                        isNew={activeTab === 1 ? false : true}
                        isNormal={isNormal}
                    />
                ))}
            </Slider>}
        </>
    )
}

export default memo(CustomSlider)
