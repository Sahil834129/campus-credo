import Accordion from 'react-bootstrap/Accordion';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Container from "react-bootstrap/esm/Container";
import GuideScreen01 from "../assets/img/guide/screen-01.jpg";
import GuideScreen02 from "../assets/img/guide/screen-02.jpg";
import GuideScreen03 from "../assets/img/guide/screen-03.jpg";
import GuideScreen04 from "../assets/img/guide/screen-04.jpg";
import Breadcrumbs from '../common/Breadcrumbs';
import Layout from "../common/layout";

const HowItWorks = () => {
    return(
        <Layout>
            <section className="content-area ">
                <Container className="content-area-inner profile-page-wrap">
                    <Col className="inner-page-content">
                        <Row className='bc-section common-bc'>
                            <Col className='bc-col'>
                                <Breadcrumbs/>
                            </Col>
                        </Row>
                        <div className="content-section profile-content-main">
                            <Col className="left common-sidebar profile-sidebar">
                                <h2>Articles in this section</h2>
                                <Accordion className="sidebar-collapsible" defaultActiveKey={['0']} alwaysOpen>
                                    <Accordion.Item eventKey="0">
                                    <Accordion.Header>Articles in this section</Accordion.Header>
                                    <Accordion.Body>
                                    <ListGroup className='common-sidebar-list' as="ul" variant="flush" defaultActiveKey="#link1">
                                        <ListGroup.Item as="li" action href="#link1" active>
                                            How to apply to a school?
                                        </ListGroup.Item>
                                        <ListGroup.Item as="li" action href="#link2">
                                            How to select multiple schools for application?
                                        </ListGroup.Item>
                                        <ListGroup.Item as="li">
                                            Where do I add student details for application?
                                        </ListGroup.Item>
                                        <ListGroup.Item as="li">
                                            Can I add multiple students for application?
                                        </ListGroup.Item>
                                        <ListGroup.Item as="li">
                                            How do I update my email/mobile?
                                        </ListGroup.Item>
                                        <ListGroup.Item as="li">
                                            Distance from home option not working?
                                        </ListGroup.Item>
                                        <ListGroup.Item as="li">
                                            I have received an email/sms that my application has been approved. What to do next?
                                        </ListGroup.Item>
                                        <ListGroup.Item as="li">
                                            My application has been declined. Where can I see the reason?
                                        </ListGroup.Item>
                                        <ListGroup.Item as="li">
                                            I have a query regarding the application form. What to do?
                                        </ListGroup.Item>
                                        <ListGroup.Item as="li">
                                            I have a query regarding a school. What to do?
                                        </ListGroup.Item>
                                        <ListGroup.Item as="li">
                                            Where can I find invoices?
                                        </ListGroup.Item>
                                        <ListGroup.Item as="li">
                                            How do I get refund of my application/admission fee?
                                        </ListGroup.Item>
                                        <ListGroup.Item as="li">
                                            How do I minimize transaction cost when I pay online?
                                        </ListGroup.Item>
                                    </ListGroup>   
                                    </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </Col>
                            <Col className="common-content right">
                                <h2>How to apply to a school on CampusCredo?</h2>
                                <ListGroup as="ol" variant="flush" numbered>
                                    <ListGroup.Item as="li">
                                        <span className='screen-title'>Login to your CampusCredo Account</span>
                                        <div className='guide-screen'>
                                            <img src={GuideScreen01} alt="" />
                                        </div>
                                    </ListGroup.Item>
                                    <ListGroup.Item as="li">
                                        <span className='screen-title'>Go to your dashboard. Click on “Manage Child” to add student details</span>
                                        <div className='guide-screen'>
                                            <img src={GuideScreen02} alt="" />
                                        </div>
                                    </ListGroup.Item>
                                    <ListGroup.Item as="li">
                                        <span className='screen-title'>Click “Add Child”. Update the pop-up with student details and click “Add” button to register student.</span>
                                        <div className='guide-screen'>
                                            <img src={GuideScreen03} alt="" />
                                        </div>
                                    </ListGroup.Item>
                                    <ListGroup.Item as="li">
                                        <span className='screen-title'>Now click on the “Admission Form” in the dashboard. Select Child registered from the dropdown and fill out the rest of the admission form.</span>
                                        <div className='guide-screen'>
                                            <img src={GuideScreen04} alt="" />
                                        </div>
                                    </ListGroup.Item>
                                </ListGroup>                                    
                            </Col>
                        </div>
                    </Col>
                </Container>
            </section>
        </Layout>
    );
};
export default HowItWorks;