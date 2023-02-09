import Layout from "../admin/layout";
import Container from "react-bootstrap/esm/Container";
import Breadcrumbs from '../../common/Breadcrumbs';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import comingsoon from "../../assets/img/coming-soon.jpg";

const TermsAndConditions = () => {
    return(
        <Layout>
            <section className="content-area about-page" style={{width:"100%"}}>
                <Container className="content-area-inner inner-page-container">
                    {/* <Row className='content-section bc-section'>
                        <Col className='bc-col'>
                            <Breadcrumbs/>
                        </Col>
                    </Row> */}
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
export default TermsAndConditions;