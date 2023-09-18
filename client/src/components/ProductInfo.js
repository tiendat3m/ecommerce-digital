import React, { useState } from 'react'
import { productTabs } from '../utils/constants'

const ProductInfo = () => {
    const [activeTabs, setActiveTabs] = useState(1);

    return (
        <div>
            <div className='relative bottom-[7px]'>
                {productTabs?.map(el => (
                    <span
                        key={el.id}
                        className={`px-4 py-2 border mr-2 hover:bg-white cursor-pointer ${activeTabs === +el.id ? 'bg-white border border-b-0' : 'bg-gray-200'}`}
                        onClick={() => setActiveTabs(el.id)}
                    >
                        {el.name}
                    </span>
                ))}
            </div>
            <div className='w-full border p-4 text-[14px]'>
                {productTabs?.some(el => activeTabs === el.id) && productTabs?.find(el => activeTabs === el.id)?.content}
            </div>
        </div>
    )
}

export default ProductInfo
