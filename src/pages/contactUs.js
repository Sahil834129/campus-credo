import Layout from "../common/layout";
import Container from "react-bootstrap/esm/Container";
import { Link, useNavigate, Button, ListGroup } from "react-router-dom";
import Breadcrumbs from '../common/Breadcrumbs';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import comingsoon from "../assets/img/coming-soon.jpg";

const ContactUs = () => {
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
                            <div className="hero-img"><img src={comingsoon} alt="" /></div>
                            
                        </section>
                        

                    </Row>
                </Container>
            </section>
        </Layout>
    );
};
export default ContactUs;