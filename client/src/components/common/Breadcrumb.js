import React, { memo } from 'react'
import { NavLink } from 'react-router-dom';
import useBreadcrumbs from "use-react-router-breadcrumbs";
import icons from 'utils/icons';

const { MdKeyboardArrowRight } = icons
const Breadcrumb = ({ title, category }) => {
    const routes = [
        { path: "/:category", breadcrumb: category },
        { path: "/", breadcrumb: "Home" },
        { path: "/:category/:pid/:title", breadcrumb: title },
    ];
    const breadcrumb = useBreadcrumbs(routes)
    return (
        <div className='text-sm flex items-center'>
            {breadcrumb?.filter(el => !el.match?.route === false).map(({ match, breadcrumb }, index, self) => (
                <NavLink className='flex items-center' key={match.pathname} to={match.pathname}>
                    <span className='hover:text-main capitalize'>{breadcrumb}</span>
                    {index !== self.length - 1 && <span><MdKeyboardArrowRight /></span>}
                </NavLink>
            ))}
        </div>
    )
}

export default memo(Breadcrumb)
