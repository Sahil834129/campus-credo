import Layout from "../common/layout";
import Container from "react-bootstrap/esm/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Breadcrumbs from '../common/Breadcrumbs';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

const FAQ = () => {
    return(
        <Layout>
            <section className="content-area about-page">
                <Container className="content-area-inner inner-page-container">
                    <Row className='content-section bc-section'>
                        <Col className='bc-col'>
                            <Breadcrumbs/>
                        </Col>
                    </Row>
                    <Row className='content-section faq-content-main'>
                    <ListGroup>
                        <ListGroup.Item>
                            <h2>How does online applications work?</h2>
                            <div className="answer-block">Online applications are here to streamline and simplify the admissions process. Register yourself and update the OneAdmissionForm with student details. Then use CampusCredo's smart search capability to shortlist educational institutes and submit your application. Now sit back and relax. We take care of the rest of the steps</div>
                            <div className="blockquote-panel">CampusCredo takes away the pain of multiple separate applications and provides full visibility of the application statuses and next steps.</div>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>What role does CampusCredo play in admissions?</h2>
                            <div className="answer-block">CampusCredo plays no role in admissions. Decision to admit or not admit a candidate is completely up to the institutes</div>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Can I apply to multiple schools from this platform?</h2>
                            <div className="answer-block">Yes. You can apply to multiple schools at once or one by one as per your wish.</div>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>I want to apply to an institute is not accepting application from CampusCredo. What to do?</h2>
                            <div className="subtitle">Please submit the details via Contact Us page. We will sort it out for you.</div>
                            <div className="answer-block">Go to the Contact Us page. Select the enquiry category as "School Related" and add relevant details of the institute. Please add your details as well so that we can inform you once we have onboarded the institute.</div>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Can I make changes to my application form?</h2>
                            <div className="subtitle">Once an application is submitted, you cannot make any changes. However for subsequent applications, you can first update the OneAdmissionForm and then apply</div>
                            
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>What is the process for refunds in case I change my mind or made any mistake with my application?</h2>
                            <div className="subtitle">The Refund shall not be granted under the following circumstances:</div>
                            <div className="answer-block">
                                A. Once the fee is paid or an application has been submitted. <br/>
                                B. In case of wrong data or insufficient data being submitted by the User at the time of paying fees or submitting the applications.
                            </div>
                        </ListGroup.Item>


                    </ListGroup>
                        
                        <div className="btn-wrapper">
                            <Button className="begin-application-btn">Begin Application</Button>
                        </div>
                    </Row>
                    
                </Container>
            </section>
        </Layout>
    );
};
export default FAQ;