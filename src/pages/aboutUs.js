import Layout from "../common/layout";
import { Link, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/esm/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Breadcrumbs from '../common/Breadcrumbs';

import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

import aboutpic1 from "../assets/img/about-hero-pic.jpg";
import aboutpic2 from "../assets/img/about-elearning.svg";
import aboutpic3 from "../assets/img/about-pic3.png";
import aboutpic4 from "../assets/img/about-pic4.png";

const AboutUs = () => {
    return(
        <Layout>
            <section className="content-area about-page">
                <Container className="content-area-inner inner-page-container">
                    <Row className='content-section bc-section'>
                        <Col className='bc-col'>
                            <Breadcrumbs/>
                        </Col>
                    </Row>
                    <Row className='content-section about-content-main'>
                        <section className="section-wrapper hero-wrap">
                            <div className="hero-img"><img src={aboutpic1} alt="" /></div>
                            <div className="hero-caption">
                                No more waiting at queue for admission forms or filling out online forms for every single school. <Link to='/schools'>Apply Now <i className="icons green-arrow-icon"></i></Link>
                            </div>
                        </section>
                        <section className="section-wrapper">
                            <div className="img-wrap"><img src={aboutpic2} alt="" /></div>
                            <div className="content-wrap">
                            We are a group of technocrats who, as parents to toddlers and schoolgoers, realized the need to bring educational institutions and parents on the same digital platform for realizing the mutual benefits.
                            </div>
                        </section>
                        <section className="section-wrapper full-width">
                            <div className="content-wrap">
                                As Parents in this age of digitalization, the convenience of virtualized experience of picking the right type and kind of educational institute for our kids, without having to spend hours physically searching, visiting, and analyzing, is ingrained in our ethos to find the ‘best’ from the plethora of available options that would best suit our own preferences and choices. CampusCredo therefore provides the much needed platform to find and connect to such educational institutes.
                            </div>
                            <div className="img-wrap"><img src={aboutpic3} alt="" /></div>
                        </section>
                        <section className="section-wrapper">
                        <div className="img-wrap"><img src={aboutpic4} alt="" /></div>
                            <div className="content-wrap">
                                <p>For Educational Institutes, CampusCredo is the hassle free digital platform that portrays the journey, growth and prosperity of aspirants with the institutes’ heritage and unique capabilities and offerings; and also acts as the single point solution to </p>
                                <ListGroup>
                                    <ListGroup.Item>be responsive to the needs of prospective students, </ListGroup.Item>
                                    <ListGroup.Item>onboard them without hassles and, </ListGroup.Item>
                                    <ListGroup.Item>manage and track the educational, emotional and personal growth and progress of all students.</ListGroup.Item>
                                </ListGroup>
                            </div>
                            
                        </section>

                    </Row>
                </Container>
            </section>
        </Layout>
    );
};
export default AboutUs;