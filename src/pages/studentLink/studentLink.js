import Layout from '../../common/layout';
import Accordion from 'react-bootstrap/Accordion';
import Col from 'react-bootstrap/Col';
import Container from "react-bootstrap/Container";
import Row from 'react-bootstrap/Row';
import Breadcrumbs from "../../common/Breadcrumbs";
import LeftMenuBar from "../../common/LeftMenuBar";
import PageContent from '../../resources/pageContent';
import { useEffect } from 'react';
import { getStudentList } from '../../utils/services';
import { Button } from 'react-bootstrap';
import { useState } from 'react';
import LinkFormDialog from './linkFormDialog';



const StudentLink = () => {
    const [showForm, setShowForm] = useState(false)

    const handleClose = () => {
        setShowForm(false)
    }

    const fetchStudentTableList = () => {
        getStudentList()
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }

    useEffect(() => {
        // fetchStudentTableList()
    }, [])

    return (
        <Layout>
            <section className="content-area">
                <Container className="content-area-inner profile-page-wrap">
                    <Col className='inner-page-content dashboard-page col'>
                        <Row className='content-section profile-bc-section'>
                            <Col className='bc-col'>
                                <Breadcrumbs />
                            </Col>
                        </Row>
                        <div className='content-section profile-content-main'>
                            <Col className='left profile-sidebar'>
                                <Accordion className="sidebar-collapsible" defaultActiveKey={['0']} alwaysOpen>
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header>Main Categories</Accordion.Header>
                                        <Accordion.Body>
                                            <LeftMenuBar menuItems={PageContent.USER_PROFILE_SIDEBAR_MENU_ITEMS} />
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </Col>
                            <Col className='profile-content right'>
                                <div className='row-items header' style={{ display: 'flex', justifyContent: 'end' }}>
                                    <div className='col-item select-option left'>
                                        <Button onClick={() => setShowForm(true)}>Add Child</Button>
                                    </div>
                                </div>
                                <LinkFormDialog showForm={showForm} handleClose={handleClose}/>
                                <div>TABLE Content</div>
                            </Col>
                        </div>
                    </Col>
                </Container>
            </section>
        </Layout>
    )
}

export default StudentLink;