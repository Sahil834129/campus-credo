import Col from 'react-bootstrap/Col';
import Container from "react-bootstrap/esm/Container";
import Row from 'react-bootstrap/Row';
import { Link } from "react-router-dom";
import Breadcrumbs from '../common/Breadcrumbs';
import Layout from "../common/layout";

import ListGroup from 'react-bootstrap/ListGroup';

import aboutpic2 from "../assets/img/about-elearning.svg";
import aboutpic1 from "../assets/img/about-hero-pic.jpg";
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
                                <h2>No more waiting at queue for admission forms or filling out online forms for every single school.</h2> <Link to='/schools'><label>Apply Now</label> <i className="icons green-arrow-icon"></i></Link>
                            </div>
                        </section>
                        <section className="section-wrapper">
                            <div className="img-wrap"><img src={aboutpic2} alt="" /></div>
                            <div className="content-wrap">
                                <h2>All your needs are in one place with one simple application form</h2>
                                <h4>We are a group of technocrats who, as parents to toddlers and schoolgoers, realized the need to bring educational institutions and parents on the same digital platform for realizing the mutual benefits.</h4>
                            </div>
                        </section>
                        <section className="section-wrapper full-width">
                            <div className="content-wrap">
                                <h2>Minimizing Parents hardship</h2>
                                <h4>As Parents in this age of digitalization, the convenience of virtualized experience of picking the right type and kind of educational institute for our kids, without having to spend hours physically searching, visiting, and analyzing, is ingrained in our ethos to find the ‘best’ from the plethora of available options that would best suit our own preferences and choices. </h4>
                                <blockquote>CampusCredo therefore provides the much needed platform to find and connect to such educational institutes.</blockquote>
                            </div>
                            <div className="img-wrap"><img src={aboutpic3} alt="" /></div>
                        </section>
                        <section className="section-wrapper infotoschools">
                        <div className="img-wrap"><img src={aboutpic4} alt="" /></div>
                            <div className="content-wrap">
                                <h2>Schools and Educational Institutes</h2>
                                <p>For Educational Institutes, CampusCredo is the hassle free digital platform that portrays the journey, growth and prosperity of aspirants with the institutes’ heritage and unique capabilities and offerings; and also acts as the single point solution to </p>
                                <ListGroup>
                                    <ListGroup.Item>Be responsive to the needs of prospective students, </ListGroup.Item>
                                    <ListGroup.Item>Onboard them without hassles and, </ListGroup.Item>
                                    <ListGroup.Item>Manage and track the educational, emotional and personal growth and progress of all students.</ListGroup.Item>
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