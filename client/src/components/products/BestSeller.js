import React, { memo, useEffect, useState } from 'react'
import { apiGetProducts } from 'apis/product'
import CustomSlider from '../common/CustomSlider'
import { getNewProducts } from 'store/products/asyncActions'
import { useDispatch, useSelector } from 'react-redux'

const tabs = [
  { id: 1, name: 'best seller' },
  { id: 2, name: 'arrival' },
  // {id: 3, name: 'tablet'}

]

const BestSeller = () => {
  const [bestSeller, setBestSeller] = useState(null)
  const [activeTab, setActiveTab] = useState(1)
  const [products, setProducts] = useState(null);
  const dispatch = useDispatch()
  const { newProducts } = useSelector(state => state.products)

  const fetchProducts = async () => {
    const response = await apiGetProducts({ sort: '-sold' })
    if (response?.success) {
      setBestSeller(response.products)
      setProducts(response.products)
    }
  }
  useEffect(() => {
    fetchProducts()
    dispatch(getNewProducts())
  }, [])
  useEffect(() => {
    if (activeTab === 1) setProducts(bestSeller)
    if (activeTab === 2) setProducts(newProducts)
  }, [activeTab])
  return (
    <div>
      <div className='uppercase flex text-[20px]  ml-[-32px]'>
        {tabs?.map(el => (
          <span
            key={el.id}
            className={`font-semibold px-8 border-r text-gray-400 cursor-pointer ${activeTab === el.id ? 'text-gray-900' : ''}`}
            onClick={() => setActiveTab(el.id)}
          >
            {el.name}
          </span>
        ))}
      </div>
      <div className='border-main border-t-2 mt-4'></div>
      <div className='mx-[-10px] pt-5'>
        <CustomSlider activeTab={activeTab} products={products} />
      </div>
      <div className='flex w-full gap-4 mt-4'>
        <img
          src="https://digital-world-2.myshopify.com/cdn/shop/files/banner2-home2_2000x_crop_center.png?v=1613166657"
          alt=""
          className='flex-1 object-cover' />
        <img
          src="https://digital-world-2.myshopify.com/cdn/shop/files/banner1-home2_2000x_crop_center.png?v=1613166657"
          alt=""
          className='flex-1 object-cover' />
      </div>
    </div>
  )
}

export default memo(BestSeller)
