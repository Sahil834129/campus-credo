import React from "react";
import Breadcrumbs from '../common/Breadcrumbs';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import { Link, useNavigate } from "react-router-dom";
import schoolpic01 from "../assets/img/school-picture/boarding-icon.jpg"
import Nav from 'react-bootstrap/Nav';
import Container from "react-bootstrap/Container";
import Form from 'react-bootstrap/Form';
import Layout from "../common/layout";

const UserProfile = () => {
    return (
        <Layout>
        <section className="content-area">
                <Container className="content-area-inner profile-page-wrap">
                  <Col className='inner-page-content '>
                    <Row className='content-section profile-bc-section'>
                        <Col className='bc-col'>
                            <Breadcrumbs/>
                        </Col>
                        <Col className='datetime-col'>
                            11 October 2022 - 9:09 PM
                        </Col>
                      
                    </Row>
                    <Row className='content-section profile-content-main'>
                        <Col className='left sidebar'>
                          <Nav defaultActiveKey="/home" className="sideNav">
                            <Nav.Link href="/home">Dashboard</Nav.Link>
                            <Nav.Link eventKey="link-1">Manage Profile</Nav.Link>
                            <Nav.Link eventKey="link-2">Fee Payments</Nav.Link>
                            <Nav.Link eventKey="link-3">One Admission Form</Nav.Link>
                            <Nav.Link eventKey="link-4">Logout</Nav.Link>
                            {/* <Nav.Link eventKey="disabled" disabled>
                                Disabled
                            </Nav.Link> */}
                            </Nav>
                        </Col>
                        <Col className='right content'>
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
                                    Your Application<Link to=''>(02)</Link>
                                </div>
                              </div>
                            <div className='row-items application-block'>
                                <div className='col-item left'>
                                  <div className='school-info-main'>
                                      <div className='info-item school-logo-wrap'>
                                          <Card.Img className='school-logo' src={schoolpic01} /> 
                                      </div>
                                      <div className='info-item school-info-exerpts'>
                                          <div className='school-name'>Orchids - The International School</div>
                                          <ListGroup className='school-type'>
                                          <ListGroup.Item>CBSE</ListGroup.Item>
                                          <ListGroup.Item>English</ListGroup.Item>
                                          <ListGroup.Item>Co-ed</ListGroup.Item>
                                          </ListGroup>
                                          <div className='moreinfo-block'>
                                              <div className='col'>Applying to Class : <strong>STD I</strong></div>
                                              <div className='col divider'>|</div>
                                              <div className='col'>Admission Fee Paid : <strong>₹240</strong></div>
                                          </div>
                                      </div>
                                  </div>
                                </div>
                                <div className='col-item right'>
                                  <div className='col'><label>Status</label></div>
                                  <div className='col'><span className='badge accepted'>Application Accepted</span></div>
                                  <div className='col'><Link>View Status timeline <i className='icons arrowdown-icon'></i></Link></div>
                                </div>
                            </div>
                            <div className='row-items timeline-wrapper'>
                                <div className='title-wrap'>
                                    <div className='col left'><h2>Application Status Timeline</h2></div>
                                    <div className='col right'><Link>View your form details <i className='icons arrowright-icon'></i></Link></div>
                                </div>
                                <div className='timeline-list'>
                                  <ul className='timeline-info-panel'>
                                    <li>
                                      <div className='date'>04 Oct 2022</div>
                                      <div className='indicator'><span className='indiShape circle'></span></div>
                                      <div className='particulars-status'>
                                        <div className='update-info'>Application <span className='status submitted'>Submitted</span></div>
                                      </div>
                                    </li>
                                    <li>
                                      <div className='date'>04 Oct 2022</div>
                                      <div className='indicator'><span className='indiShape circle'></span></div>
                                      <div className='particulars-status'>
                                      <div className='update-info'>
                                        <strong>Under process</strong> <span className='status submitted'>Validation and review</span>
                                      </div>
                                      </div>
                                    </li>
                                    <li>
                                      <div className='date'>06 Oct 2022</div>
                                      <div className='indicator'><span className='indiShape circle'></span></div>
                                      <div className='particulars-status'>
                                      <div className='update-info'>Sent for final validation to Principle’s office</div></div>
                                    </li>
                                    <li>
                                      <div className='date'>06 Oct 2022</div>
                                      <div className='indicator'><span className='indiShape circle'></span></div>
                                      <div className='particulars-status'>
                                          <div className='update-info'>Congratulation!!! <span className='status submitted'>Application Accepted for Interview</span></div>
                                          <div className='instruction'>Please contact school admin  for interview schedule and admission procedures</div>
                                      </div>
                                    </li>
                                    <li>
                                      <div className='date'>06 Oct 2022</div>
                                      <div className='indicator'><span className='indiShape circle'></span></div>
                                      <div className='particulars-status'>
                                        <div className='update-info'>Interview Scheduled </div>
                                        <div className='instruction inst-block'>
                                          <div className='items'>
                                            <div className='item'>Interview Date</div>
                                            <div className='item'>
                                                <div className='inner-section'>21 October 2022 <span className='time'>10:00 AM - 6:00 PM</span> </div>
                                                
                                            </div>
                                          </div>
                                          <div className='items'>
                                            <div className='item'>Contact Person</div>
                                            <div className='item'>
                                              <div className='inner-section'>Mr. Aritro Mondal  </div>
                                              <div className='inner-section'>P: +91 9456736675 E: admission@orchid.com</div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </li>
                                    <li>
                                      <div className='date'>06 Oct 2022</div>
                                      <div className='indicator'><span className='indiShape circle'></span></div>
                                      <div className='particulars-status'>
                                          <div className='update-info'>Congratulation!!! <span className='status submitted'>Application Accepted for Interview</span></div>
                                          <div className='instruction'>Please contact school admin  for interview schedule and admission procedures</div>
                                      </div>
                                    </li>
                                  </ul>
                                </div>

                            </div>
                            <div className='row-items application-block'>
                                <div className='col-item left'>
                                  <div className='school-info-main'>
                                      <div className='info-item school-logo-wrap'>
                                          <Card.Img className='school-logo' src={schoolpic01} /> 
                                      </div>
                                      <div className='info-item school-info-exerpts'>
                                          <div className='school-name'>Orchids - The International School</div>
                                          <ListGroup className='school-type'>
                                          <ListGroup.Item>CBSE</ListGroup.Item>
                                          <ListGroup.Item>English</ListGroup.Item>
                                          <ListGroup.Item>Co-ed</ListGroup.Item>
                                          </ListGroup>
                                          <div className='moreinfo-block'>
                                              <div className='col'>Applying to Class : <strong>STD I</strong></div>
                                              <div className='col divider'>|</div>
                                              <div className='col'>Admission Fee Paid : <strong>₹240</strong></div>
                                          </div>
                                      </div>
                                  </div>
                                </div>
                                <div className='col-item right'>
                                  <div className='col'><label>Status</label></div>
                                  <div className='col'><span className='badge under-validation'>Application Accepted</span></div>
                                  <div className='col'><Link>View Status timeline <i className='icons arrowdown-icon'></i></Link></div>
                                </div>
                            </div>

                        </Col>
                    </Row>
                  </Col>
    
             
                </Container>
                </section>
                </Layout>
    )
}

export default UserProfile;