import React, { memo } from 'react'
import ClipLoader from "react-spinners/ClipLoader";
const Loading = () => {
    return (
        <div>
            <ClipLoader color='#ee3131' />
        </div>
    )
}

export default memo(Loading)
