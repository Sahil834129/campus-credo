import React, {useEffect, useState} from 'react';
import Layout from "../common/layout";
import Container from "react-bootstrap/esm/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SidebarFilter from '../common/SidebarFilter';
import SchoolCardGrid from '../components/SchoolCardGrid';
import Breadcrumbs from '../common/Breadcrumbs';
import { useLocation } from 'react-router-dom';
import RESTClient from '../utils/RestClient';
import RestEndPoint from '../redux/constants/RestEndpoints';
import { useSelector, useDispatch } from "react-redux";
import { showLoader, hideLoader } from '../common/Loader';

const AllSchools = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const [schoolList, setSchoolList] = useState([]);
    const selectedLocation = useSelector((state) => state.locationData.selectedLocation);
    useEffect(() => { getSchoolList(); }, [location]);

    const applyFilters = async(filters) => {
        try {
            showLoader(dispatch);
            const response = await RESTClient.post(RestEndPoint.FIND_SCHOOLS, filters);
            setSchoolList(response.data);
            hideLoader(dispatch);
        } catch (error){
            hideLoader(dispatch);
        }
        window.scrollTo(0, 0)
    }

    const getSchoolList = async() => {
        let filters = [];
        const queryParams = new URLSearchParams(location.search);
        const schoolName = queryParams.get("name");
        if (schoolName !== null && schoolName !== '')
            filters.push({field: 'name', operator: "LIKE", value: schoolName});
        
        // If there is no filter then by default show the schools with admission open for selected city
        if (filters.length === 0) {
            filters.push({field:"city",operator:"EQUALS", value:selectedLocation})
            filters.push({field:"status",operator:"LIKE", value:'open'})
        }
            
        try {
            showLoader(dispatch);
            const response =await RESTClient.post(RestEndPoint.FIND_SCHOOLS, {filters:filters});
            setSchoolList(response.data);
             hideLoader(dispatch);
        } catch (error){}
    }
    
    return (
        <Layout>
            <section className="content-area">
                <Container className="content-area-inner internal-page-wrapper">
                    <Col className='inner-page-content left'>
                        <SidebarFilter applyFilters={applyFilters}/>                        
                    </Col>
                    <Col className='inner-page-content allschool-wrap right'>
                        <Row className='content-section'>
                            <Breadcrumbs/>
                            <Col className='page-container'>
                                <SchoolCardGrid schools={schoolList}/>
                            </Col>
                        </Row>
                    </Col>
                </Container>
            </section>
        </Layout>
    );
};
export default AllSchools;