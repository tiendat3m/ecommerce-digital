import React from 'react'
import { NavLink } from 'react-router-dom';
import useBreadcrumbs from "use-react-router-breadcrumbs";
import icons from '../utils/icons';

const { MdKeyboardArrowRight } = icons

const Breadcrumb = ({ title, category }) => {
    const routes = [
        { path: "/:category", breadcrumb: category },
        { path: "/", breadcrumb: "Home" },
        { path: "/:category/:title/:pid", breadcrumb: title },
    ];


    const breadcrumbs = useBreadcrumbs(routes);
    return (
        <div className='flex items-center'>
            {breadcrumbs?.filter(el => !el?.match?.route === false).map(({ match, breadcrumb }, index, self) => (
                <NavLink className={`text-sm flex items-center justify-center hover:text-main`} key={match.pathname} to={match.pathname}>
                    <span className='capitalize'>{breadcrumb}</span>
                    {index !== self.length - 1 && <span><MdKeyboardArrowRight /></span>}
                </NavLink>
            ))}
        </div>
    )
}

export default Breadcrumb
