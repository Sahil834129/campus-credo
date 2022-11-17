import React from "react";
import Breadcrumbs from '../common/Breadcrumbs';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Form from 'react-bootstrap/Form';
import Layout from "../common/layout";
import AppliedSchools from "../components/userProfile/AppliedSchools";
import LeftMenuBar from "../common/LeftMenuBar";
import PageContent from "../resources/pageContent";

const UserProfile = () => {
  const schoolData = [
    {
        schoolName: "Orchids - The International School",
        applyingtoClass: "STD I",
        admissionFeePaid:"₹240",
        board: "CBSE",
        mediumOfInstruction: "English",
        gender: "Co-ed"
    },
    {
      schoolName: "Orchids - The International School",
      applyingtoClass: "STD I",
      admissionFeePaid:"₹240",
      board: "CBSE",
      mediumOfInstruction: "English",
      gender: "Co-ed"
  },
  
  ];
    return (
        <Layout>
        <section className="content-area">
                <Container className="content-area-inner profile-page-wrap">
                  <Col className='inner-page-content '>
                    <Row className='content-section profile-bc-section'>
                        <Col className='bc-col'>
                            <Breadcrumbs/>
                        </Col>
                    </Row>
                    <Row className='content-section profile-content-main'>
                        <Col className='left sidebar'>
                          <LeftMenuBar menuItems={PageContent.USER_PROFILE_SIDEBAR_MENU_ITEMS}/>
                        </Col>
                <Col className='profile-content right'>
                  <div className='row-items header'>
                    <div className='col-item select-option left'>
                      <label>Select Child<span className='req'>*</span></label>
                      <Form.Group className='frm-cell'>
                        <Form.Select aria-label="Default select example">
                          <option>--Select Child--</option>
                          <option value="1">Child-one</option>
                          <option value="2">Child-two</option>
                          <option value="3">Child-three</option>
                        </Form.Select>
                      </Form.Group>
                    </div>
                    <div className='col-item application-link right'>
                      <label>Your Application</label> <Link to=''>(02)</Link>
                    </div>
                  </div>
                  {
                    schoolData.length && schoolData.map((school, index) => {
                      return <AppliedSchools key={"appliedSchools_" + index} school={school} />
                    })
                  }
                </Col>
                    </Row>
                  </Col>
    
             
                </Container>
                </section>
                </Layout>
    )
}

export default UserProfile;