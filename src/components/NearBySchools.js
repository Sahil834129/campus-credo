import React, { useState, useEffect, useCallback } from "react";
import { Link, useLocation} from "react-router-dom";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import RestEndPoint from "../redux/constants/RestEndpoints";
import RESTClient from "../utils/RestClient";
import SchoolCard from "./SchoolCard";
import { useSelector } from "react-redux";

const NearBySchools = () => {
  const location = useLocation();
    const [nearBySchools, setNearBySchools] = useState([]);
    const selectedLocation = useSelector((state) => state.locationData.selectedLocation);

    const queryParams = new URLSearchParams(location.search);
    const schoolId = getSchoolIdFromURL();
  
    function getSchoolIdFromURL() {
      try {
        return atob(queryParams.get("id")).replace("#", "");
      } catch (error) {
        return 0;
      }
    }
    useEffect(() => { getNearBySchools(schoolId) }, [schoolId]);

    // previous code to get nearBy School

    // const getNearBySchools = async () => {
    //     try {
    //         let payload = { filters: [{field:"city",operator:"EQUALS", value:selectedLocation}], offset: 1, limit: 1 };
    //         const response = await RESTClient.post(RestEndPoint.FIND_SCHOOLS, payload);
    //         setNearBySchools(response.data);
    //     } catch (e) {}
    // }

    const getNearBySchools = useCallback(async childId => {
        try {
          const response = await RESTClient.get(
            RestEndPoint.FIND_NEARBY_SCHOOL + `/${schoolId}`
          )
          if(response.data!==""){
            setNearBySchools(response.data.slice(1,4));
          }
        } catch (error) {
          // toast.error(RESTClient.getAPIErrorMessage(error))
        }
      }, [])

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
                    nearBySchools.length ? (nearBySchools.map((school, index) => (
                        <SchoolCard school={school} key={"nearBySchool_" + index} />
                    ))):(<div>Loading Please wait...</div>)
                }
                </div>
            </Col>
        </Row>
    )
}

export default NearBySchools;