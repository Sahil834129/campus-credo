import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Accordion from 'react-bootstrap/Accordion';
import Container from "react-bootstrap/Container";
import { useLocation } from "react-router-dom";
import Breadcrumbs from "../common/Breadcrumbs";
import Layout from "../common/layout";
import NoRecordsFound from "../common/NoRecordsFound";
import Desclaimer from "../components/Desclaimer";
import Description from "../components/Description";
import NearBySchools from "../components/NearBySchools";
import ApplyToSchool from "../components/schoolDetails/ApplyToSchool";
import SchoolBasicInfo from "../components/schoolDetails/SchoolBasicInfo";
import SchoolDetailTitle from "../components/schoolDetails/SchoolDetailTitle";
import SchoolExtracurriculars from "../components/schoolDetails/SchoolExtracurriculars";
import SchoolFacilities from "../components/schoolDetails/SchoolFacilities";
import SchoolStats from "../components/schoolDetails/SchoolStats";
import RestEndPoint from "../redux/constants/RestEndpoints";
import PageContent from "../resources/pageContent";
import { isLoggedIn, setLocalData } from "../utils/helper";
import RESTClient from "../utils/RestClient";
import { useDispatch, useSelector } from "react-redux";
import { hideLoader, showLoader } from "../common/Loader";

const SchoolDetails = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [schoolDetails, setSchoolDetails] = useState({});
  const isLoggedInUser = useSelector((state) => state.userData.isLoggedInUser);
    const [
    schoolCategoryExtracurricularMap,
    setSchoolCategoryExtracurricularMap,
  ] = useState({});

  const queryParams = new URLSearchParams(location.search);
  const schoolId = getSchoolIdFromURL();

  useEffect(() => {
    fetchSchoolDetails(schoolId);
  }, [schoolId]);

  function getSchoolIdFromURL() {
    try {
      return atob(queryParams.get("id")).replace("#", "");
    } catch (error) {
      return 0;
    }
  }

  const fetchSchoolDetails = async (schoolId) => {
    showLoader(dispatch)
    try {
      const response = await RESTClient.get(
        RestEndPoint.SCHOOL_BY_ID + "/" + schoolId
      );
      hideLoader(dispatch);
      let schoolDetails = response.data;
      let categoryFaciltiesMap = {};
      let categoryExtracurricularMap = {};
      setSchoolDetails(schoolDetails);
      setLocalData("SchoolDetailsLatitude",schoolDetails.latitude);
      setLocalData("SchoolDetailsLongitude", schoolDetails.longitude);
      schoolDetails.facilities.map((facility) => {
        if (!categoryFaciltiesMap.hasOwnProperty(facility.category))
          categoryFaciltiesMap[facility.category] = [];
        categoryFaciltiesMap[facility.category].push(facility.facilityName);
      });
      schoolDetails.extracurricular.map((extracurricular) => {
        if (
          !categoryExtracurricularMap.hasOwnProperty(extracurricular.category)
        )
          categoryExtracurricularMap[extracurricular.category] = [];
        categoryExtracurricularMap[extracurricular.category].push(
          extracurricular.activity
        );
      });
      setSchoolCategoryExtracurricularMap(categoryExtracurricularMap);
    } catch (e) {
      hideLoader(dispatch);
      setSchoolDetails({});
      console.log("error : " + e);
      //navigate("/notFound")
    }
  };
  useEffect(() => {}, [isLoggedInUser]);
  return (
    <Layout>
      <section className="content-area">
        <Container className="content-area-inner internal-page-wrapper school-details-wrap">
          <Col className="inner-page-content left">
            <Row className="content-section">
              {Object.keys(schoolDetails).length > 0 ? (
                <>
                  <Breadcrumbs />
                  <Col className="page-container">
                    <SchoolDetailTitle
                      schoolName={schoolDetails.schoolName}
                      establishYear={schoolDetails.yearEstablishedIn}
                      schoolEmail={schoolDetails.email}
                      schoolId={schoolDetails.schoolId}
                      schoolAddress={schoolDetails.addressLine1}
                    />
                    <div className="school-details-container">
                      <SchoolBasicInfo schoolDetails={schoolDetails} />
                      {(isLoggedIn() || isLoggedInUser) &&
                      schoolDetails.hasOwnProperty("admissionInfo")  && schoolDetails.partner? (
                        <ApplyToSchool
                          schoolId={schoolId}
                          schoolDetails={schoolDetails}
                        />
                      ) : (
                        ""
                      )}
                      <div className="academic-stat-wrapper">
                        <Col className="about-school-wrap">
                          {schoolDetails.aboutSchool && (
                            <Description
                              heading="About School"
                              description={schoolDetails.aboutSchool}
                            />
                          )}
                        </Col>
                        <Col className="about-school-wrap">
                          {schoolDetails.awardsRecognition && (
                            <Description
                              heading="Awards & Recognition"
                              description={schoolDetails.awardsRecognition}
                            />
                          )}
                        </Col>
                        <SchoolStats schoolDetails={schoolDetails} />
                        <Col className="facilities-list">
                          <SchoolFacilities
                            facilities={schoolDetails.facilities}
                          />
                        </Col>
                        <Col className="facilities-list">
                          <SchoolExtracurriculars
                            schoolCategoryExtracurricularMap={
                              schoolCategoryExtracurricularMap
                            }
                          />
                        </Col>
                        {/* <Col className='fee-structure-wrap'>
											<SchoolDetailFeeStructure />
										</Col> */}
                        <Col className="about-school-wrap">
                          {schoolDetails.curriculamInfra ? (
                            <Description
                              heading="Curriculum & Infrastructure"
                              description={schoolDetails.curriculamInfra}
                            />
                          ) : (
                            ""
                          )}
                          {schoolDetails.achievements ? (
                            <Description
                              heading="Achievements"
                              description={schoolDetails.achievements}
                            />
                          ) : (
                            ""
                          )}
                        </Col>
                        <Col>
                          <Desclaimer
                            heading={PageContent.SCHOOL_DTL_DISCLAIMER.heading}
                            description={
                              PageContent.SCHOOL_DTL_DISCLAIMER.description
                            }
                          />
                        </Col>
                      </div>
                    </div>
                  </Col>
                </>
              ) : (
                <NoRecordsFound message="No school found" />
              )}
            </Row>
          </Col>
          <Col className="inner-page-content right">
            <Accordion className="school-nearby-collapsible" defaultActiveKey={['0']} alwaysOpen>
              <Accordion.Item eventKey="0">
                <Accordion.Header>Explore these also</Accordion.Header>
                <Accordion.Body>
                  <NearBySchools />
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Col>
        </Container>
      </section>
    </Layout>
  );
};

export default SchoolDetails;
