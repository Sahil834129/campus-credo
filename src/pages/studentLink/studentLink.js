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
import PayFee from './payFee';
import StudentFeeDetails from '../admin/manageFee/manageStudentFee/studentFeeDetail';
import { SESSION } from '../../constants/app';

const StudentLink = () => {
    const [showForm, setShowForm] = useState(false)
    const [updateTable, setUpdateTable] = useState(false)
    const [StudenkLinkData, setStudentLinkData] = useState([])
    const [selectedRows, setSelectedRows] = useState({});
    const [showPaymentHistory, setShowPaymentHistory] = useState(false)
    const [showPayFee, setShowPayFee] = useState(false)
    const [submissionFrequency, setSubmissionFrequency] = useState([])
    const [modalData, setModalData] = useState({})
    const [data, setData] = useState({})
    const [monthQtr, setMonthQtr] = useState('')
    const [totalPay, setTotalPay] = useState(0)
    const role = localStorage.getItem('roles')
    const session = SESSION

    const handleClose = ()  => {
        setShowForm(false)
        setShowPaymentHistory(false)
        setShowPayFee(false)
        setMonthQtr('')
    }

    const fetchStudentTableList = () => {
        getStudentList()
            .then(res => {
                setStudentLinkData(res?.data)
            })
            .catch(err => console.log(err))
    }

    const paymentHistory = (val) => {
        setData(val?.feeDetails)
        setSubmissionFrequency(Object.keys(val?.feeDetails || {}))
        setShowPaymentHistory(true)
        setModalData(val)
    }

    const PayFeeDialog = (val) => {
        setShowPayFee(true)
        setData(val?.feeDetails)
        const temp = val?.feeDetails
        const allKeys = Object.keys(temp)
        const period = allKeys.filter((val) => (temp[`${val}`].feeStatus) !== 'Paid')
        setSubmissionFrequency(period)
        setModalData(val)

    }

    const columns = [
        {
            accessor: '',
            Header: 'S.No',
            Cell: ((e) => {
                const temp = parseInt(e.row?.id) + 1
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
            Header: 'Action',
            Cell: ((e) => {
                const temp = e.row.original?.feeDetails || {}
                const allKeys = Object.keys(temp)
                const period = allKeys.filter((val) => (temp[`${val}`].feeStatus) !== 'Paid')

                return (
                    <div className="frm-cell btn-wrapper" style={{ width: 'auto' }}>
                        <Button
                            variant="primary"
                            className="confirm-btn"
                            style={{ backgroundColor: '#41285F' }}
                            onClick={() => {
                                paymentHistory(e.row.original)
                            }}
                        >
                            Payment History
                        </Button>
                        <Button
                            variant="primary"
                            className="confirm-btn"
                            disabled={!(period.length>0)}
                            style={{ backgroundColor: '#4AB900' }}
                            onClick={() => {
                                PayFeeDialog(e.row.original)
                                setMonthQtr(submissionFrequency[0])
                            }}
                        >
                            Pay Fee
                        </Button>
                    </div>
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
                                <LinkFormDialog setUpdateTable={setUpdateTable} setShowForm={setShowForm} showForm={showForm}/>
                                <div className='table-wrapper-outer'>
                                    <TableComponent
                                        data={StudenkLinkData || []}
                                        columns={columns}
                                        showSelectedAll={false}
                                        selectedRows={selectedRows}
                                        onSelectedRowsChange={setSelectedRows}
                                    />
                                </div>
                                <StudentFeeDetails
                                    show={showPaymentHistory}
                                    handleClose={handleClose}
                                    student={modalData}
                                    session={session}
                                    role={role}
                                    data={data}
                                    submissionFrequency={submissionFrequency}

                                />
                                <PayFee
                                    show={showPayFee}
                                    studentData={modalData}
                                    data={data}
                                    submissionFrequency={submissionFrequency}
                                    first={submissionFrequency[0]}
                                    monthQtr ={monthQtr} 
                                    setMonthQtr={setMonthQtr}
                                    session={session}
                                    handleClose={handleClose}
                                    totalPay={totalPay}
                                    setTotalPay={setTotalPay}
                                />
                            </Col>
                        </div>
                    </Col>
                </Container>
            </section>
        </Layout>
    )
}

export default StudentLink;