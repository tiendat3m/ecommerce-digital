import React from 'react'
import { useParams } from 'react-router-dom'

const DetailProduct = () => {

    const {pid} = useParams()

    console.log(pid)

    return (
        <div>
            Pd
        </div>
    )
}

export default DetailProduct
