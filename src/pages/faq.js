import Col from 'react-bootstrap/Col';
import Container from "react-bootstrap/esm/Container";
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Breadcrumbs from '../common/Breadcrumbs';
import Layout from "../common/layout";

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
                            <h2>
                                <span className='q-initial'>Q.</span>
                                <span className='q-lbl'>How does online applications work?</span>
                            </h2>
                            <div className="answer-block">
                                <span className='ans-initial'>A.</span>
                                <span className='ans-lbl'>
                                    Online applications are here to streamline and simplify the admissions process. Register yourself and update the OneAdmissionForm with student details. Then use CampusCredo's smart search capability to shortlist educational institutes and submit your application. Now sit back and relax. We take care of the rest of the steps
                                    <div className="blockquote-panel">CampusCredo takes away the pain of multiple separate applications and provides full visibility of the application statuses and next steps.</div>
                                </span>
                                
                            </div>
                            
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>
                                <span className='q-initial'>Q.</span>
                                <span className='q-lbl'>What role does CampusCredo play in admissions?</span>
                            </h2>
                            <div className="answer-block">
                                <span className='ans-initial'>A.</span>
                                <span className='ans-lbl'>CampusCredo plays no role in admissions. Decision to admit or not admit a candidate is completely up to the institutes</span>
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>
                                <span className='q-initial'>Q.</span>
                                <span className='q-lbl'>Can I apply to multiple schools from this platform?</span>
                            </h2>
                            <div className="answer-block">
                                <span className='ans-initial'>A.</span>
                                <span className='ans-lbl'>Yes. You can apply to multiple schools at once or one by one as per your wish.</span>
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>
                                <span className='q-initial'>Q.</span>
                                <span className='q-lbl'>I want to apply to an institute is not accepting application from CampusCredo. What to do?</span>
                            </h2>
                            
                            <div className="answer-block">
                                <span className='ans-initial'>A.</span>
                                <span className='ans-lbl'>
                                    Please submit the details via Contact Us page. We will sort it out for you.<br/>
                                    Go to the Contact Us page. Select the enquiry category as "School Related" and add relevant details of the institute. Please add your details as well so that we can inform you once we have onboarded the institute.
                                </span>
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>
                                <span className='q-initial'>Q.</span>
                                <span className='q-lbl'>Can I make changes to my application form?</span>
                            </h2>
                            <div className="answer-block">
                                <span className='ans-initial'>A.</span>
                                <span className='ans-lbl'>
                                    Once an application is submitted, you cannot make any changes. However for subsequent applications, you can first update the OneAdmissionForm and then apply
                                </span>
                            </div>
                            
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>
                                <span className='q-initial'>Q.</span>
                                <span className='q-lbl'>What is the process for refunds in case I change my mind or made any mistake with my application?</span>
                            </h2>
                            
                            <div className="answer-block">
                                <span className='ans-initial'>A.</span>
                                <span className='ans-lbl'>
                                    <div className="">The Refund shall not be granted under the following circumstances:</div>
                                    <ol type='A'>
                                        <li>Once the fee is paid or an application has been submitted. <br/></li>
                                        <li>In case of wrong data or insufficient data being submitted by the User at the time of paying fees or submitting the applications.</li>
                                    </ol>
                                </span>
                                
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>
                                <span className='q-initial'>Q.</span>
                                <span className='q-lbl'>How will I be informed of application status?</span>
                            </h2>
                            <div className="answer-block">
                                <span className='ans-initial'>A.</span>
                                <span className='ans-lbl'>You will have full view of the submitted applications with statuses in your dashboard</span>
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>
                                <span className='q-initial'>Q.</span>
                                <span className='q-lbl'>Can I download a copy of my application form?</span>
                            </h2>
                            <div className="answer-block">
                                <span className='ans-initial'>A.</span>
                                <span className='ans-lbl'>Of course. You will be able to download your submitted applications from your portal.</span>
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item>
                                <h2>
                                    <span className='q-initial'>Q.</span>
                                    <span className='q-lbl'>My school is not accepting fee payment from CampusCredo. What to do?</span>
                                </h2>
                            <div className="answer-block">
                                <span className='ans-initial'>A.</span>
                                <span className='ans-lbl'>Go to Contact Us page. Select enquiry category as "School Related" and add relevant details of the institute. Please add your details as well so that we can inform you once we have onboarded the institute.</span>
                            </div>
                        </ListGroup.Item>

                    </ListGroup>
                    </Row>
                    
                </Container>
            </section>
        </Layout>
    );
};
export default FAQ;