import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { apiGetProduct } from '../../apis'
import { Breadcrumb } from '../../components'
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
        <div className='h-[81px] bg-gray-100 w-full flex justify-center items-center'>
            <div className='w-main flex flex-col'>
                <span>{title}</span>
                <Breadcrumb title={title} category={product?.category}/>
            </div>
            
        </div>
    )
}

export default DetailProduct
