import React, { useState, useEffect } from "react";
import { Link} from "react-router-dom";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import RestEndPoint from "../redux/constants/RestEndpoints";
import RESTClient from "../utils/RestClient";
import SchoolCard from "./SchoolCard";

const NearBySchools = () => {
    const [nearBySchools, setNearBySchools] = useState([]);
    useEffect(() => { getNearBySchools() }, []);

    const getNearBySchools = async () => {
        try {
            let payload = { filters: [], offset: 1, limit: 1 };
            const response = await RESTClient.post(RestEndPoint.FIND_SCHOOLS, payload);
            setNearBySchools(response.data);
        } catch (e) {}
    }

    return (
        <Row className='content-section'>
            <div className='sidepanel-title'>
                <div className='cell left'>
                    <h4>Nearby Schools</h4>
                </div>
                <div className='cell right'>
                    <Link to='/schools'>View All</Link>
                </div>
            </div>

            <Col className='page-container sb-card-holder'>
                <div className='school-list-container'>
                {
                    nearBySchools.length && nearBySchools.map((school, index) => (
                        <SchoolCard school={school} key={"nearBySchool_" + index} />
                    ))
                }
                </div>
            </Col>
        </Row>
    )
}

export default NearBySchools;