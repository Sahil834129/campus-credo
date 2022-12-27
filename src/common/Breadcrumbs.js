import React from "react";
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { useLocation, useNavigate } from "react-router-dom";
import PageContent from "../resources/pageContent";
import { convertCamelCaseToPresentableText, gotoHome } from "../utils/helper";

const Breadcrumbs = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const pathWithoutQuery = decodeURIComponent(location.pathname.split("?")[0])
	const pathNestedRoutes = pathWithoutQuery.split("/").filter(v => v.length > 0 && v !== 'userProfile')
    const getLinkRef = (index) => { return "/"+ pathNestedRoutes.slice(0,index+1).join("/") }
    const isHomePage = (pathWithoutQuery === '/' || pathWithoutQuery === '/userProfile')
    
    return (
        <Breadcrumb className='bc-main-wrap'>
            { isHomePage ? '' : <Breadcrumb.Item onClick={(e)=> gotoHome(e, navigate)}>Home</Breadcrumb.Item> }
            {
                pathNestedRoutes.map((path, index) => {
                    return index === pathNestedRoutes.length - 1 ?
                        <Breadcrumb.Item key={index} href={getLinkRef(index)} active>
                            {
                                PageContent.CUSTOM_LINK_TITLES.hasOwnProperty(path) ? PageContent.CUSTOM_LINK_TITLES[path] : convertCamelCaseToPresentableText(path)
                            }</Breadcrumb.Item>
                        : <Breadcrumb.Item key={index} href={getLinkRef(index)}>
                            {
                                PageContent.CUSTOM_LINK_TITLES.hasOwnProperty(path) ? PageContent.CUSTOM_LINK_TITLES[path] : convertCamelCaseToPresentableText(path)
                            }
                        </Breadcrumb.Item>
                })
            }
        </Breadcrumb>
    );
};

export default Breadcrumbs;