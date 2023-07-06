import { useState, useEffect } from 'react';

import LinkFormDialog from './linkFormDialog';
import Col from 'react-bootstrap/Col';
import Container from "react-bootstrap/Container";
import Row from 'react-bootstrap/Row';
import Accordion from 'react-bootstrap/Accordion';
import { Button } from 'react-bootstrap';

import Layout from '../../common/layout';
import TableComponent from '../../common/TableComponent';
import Breadcrumbs from "../../common/Breadcrumbs";
import LeftMenuBar from "../../common/LeftMenuBar";
import PageContent from '../../resources/pageContent';
import { getStudentList } from '../../utils/services';

const StudentLink = () => {
    const [showForm, setShowForm] = useState(false)
    const [updateTable, setUpdateTable] = useState(false)
    const [StudenkLinkData, setStudentLinkData] = useState([])
    const [selectedRows, setSelectedRows] = useState({});
    const [pageStep, setPageStep] = useState(1)

    const handleClose = () => {
        setShowForm(false)
        setPageStep(1)
    }

    const fetchStudentTableList = () => {
        getStudentList()
            .then(res => setStudentLinkData(res?.data))
            .catch(err => console.log(err))
    }

    const columns = [
        {
            accessor: '',
            Header: 'S.No',
            Cell: ((e) => {
                const temp =parseInt(e.row?.id)+1
                return (
                    <span>{temp}</span>
                )
            })
        },
        {
            accessor: '',
            Header: 'School Student ID',
            Cell: ((e) => {
                return (
                    <span>{`${e.row.original?.schoolStudentId}`}</span>
                )
            })
        },
        {
            accessor: '',
            Header: 'Full Name',
            Cell: ((e) => {
                return (
                    <span>{`${e.row.original?.firstName} ${e.row.original?.lastName}`}</span>
                )
            })
        },
        {
            accessor: '',
            Header: 'Date of Birth',
            Cell: ((e) => {
                return (
                    <span>{`${e.row.original?.dateOfBirth}`}</span>
                )
            })
        },
        {
            accessor: '',
            Header: 'Class',
            Cell: ((e) => {
                return (
                    <span>{`${e.row.original?.className}`}</span>
                )
            })
        },
        {
            accessor: '',
            Header: 'Class Section',
            Cell: ((e) => {
                return (
                    <span>{`Section ${e.row.original?.classSection}`}</span>
                )
            })
        },
        {
            accessor: '',
            Header: 'Stream',
            Cell: ((e) => {
                return (
                    <span>{`${e.row.original?.stream}`}</span>
                )
            })
        },
    ]

    useEffect(() => {
        fetchStudentTableList()
    }, [updateTable])

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
                                        <Button onClick={() => setShowForm(true)}>Link Student</Button>
                                    </div>
                                </div>
                                <LinkFormDialog setUpdateTable={setUpdateTable} setShowForm={setShowForm} showForm={showForm} handleClose={handleClose} pageStep={pageStep} setPageStep={setPageStep}/>
                                <div className='table-wrapper-outer'>
                                    <TableComponent
                                        data={StudenkLinkData || []}
                                        columns={columns}
                                        showSelectedAll={false}
                                        selectedRows={selectedRows}
                                        onSelectedRowsChange={setSelectedRows}
                                    />
                                </div>
                            </Col>
                        </div>
                    </Col>
                </Container>
            </section>
        </Layout>
    )
}

export default StudentLink;