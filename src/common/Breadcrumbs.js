import React from "react";
import { useLocation } from "react-router-dom";
import Breadcrumb from 'react-bootstrap/Breadcrumb';

const Breadcrumbs = () => {
    const location = useLocation();
    const pathWithoutQuery = decodeURIComponent(location.pathname.split("?")[0]);
	const pathNestedRoutes = pathWithoutQuery.split("/").filter(v => v.length > 0);
    const getLinkRef = (index) => { return "/"+ pathNestedRoutes.slice(0,index+1).join("/"); }
    
    return (
        <Breadcrumb className='bc-main-wrap'>
            <Breadcrumb.Item href='/'>Home</Breadcrumb.Item>
            {
                pathNestedRoutes.map((path, index) => {
                    return index === pathNestedRoutes.length - 1 ?
                        <Breadcrumb.Item key={index} href={getLinkRef(index)} active>{path}</Breadcrumb.Item>
                        : <Breadcrumb.Item key={index} href={getLinkRef(index)}>{path}</Breadcrumb.Item>
                })
            }
        </Breadcrumb>
    );
};

export default Breadcrumbs;