import React, {memo} from 'react'
import Product from './Product'
import Slider from 'react-slick'


const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1
};

const CustomSlider = ({products, activeTab}) => {
    return (
        <>
            {products && <Slider {...settings}>
                {products?.map(el => (
                    <Product 
                    key={el._id}
                    productData={el}
                    isNew={activeTab === 1 ? false : true}
                    />
                ))}
            </Slider>}
        </>
    )
}

export default memo(CustomSlider)
