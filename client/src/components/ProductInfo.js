import React, {useState} from 'react'
import { productTabs } from '../utils/constants'

const ProductInfo = () => {
    const [activeTabs, setActiveTabs] = useState(1)
    return (
       <div>
            <div className='flex gap-1 relative bottom-[-1px]'>
                {productTabs?.map(el => (
                    <span
                        key={el.id}
                        className={`px-4 py-2 cursor-pointer  ${activeTabs === +el.id ? 'bg-white border border-b-0' : 'bg-gray-200'}`}
                        onClick={() => setActiveTabs(el.id)}
                    >
                        {el.name}
                    </span>
                ))}
            </div>
            <div className='w-full p-4 border'>
                {productTabs?.some(el => el.id === activeTabs) && productTabs.find(el => el.id === activeTabs)?.content}
            </div>
       </div>
    )
}

export default ProductInfo
