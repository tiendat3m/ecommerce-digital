import withBaseComponent from 'hocs/withBaseComponent'
import { useEffect } from 'react'

const ScrollToTop = ({ location }) => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [location.pathname])
    return null
}

export default withBaseComponent(ScrollToTop)
