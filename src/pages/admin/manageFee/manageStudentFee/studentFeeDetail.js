import { useEffect } from "react";
import GenericDialog from "../../../../dialogs/GenericDialog";
import { humanize } from "../../../../utils/helper";
import { getFeeAndPaymentHistoryForStudent } from "../../../../utils/services";
import { useState } from "react";
import { Accordion } from "react-bootstrap";


export default function StudentFeeDetails({ show, handleClose, student }) {

    const [submissionFrequency, setSubmissionFrequency] = useState([])
    const [openAccord, setOpenAccord] = useState(false)
    const [data, setData] = useState({})


    console.log('submissionFrequency', submissionFrequency)
    const fetchFeeAndPaymentHistoryForStudent = () => {
        const session = "2023-2024"
        getFeeAndPaymentHistoryForStudent(session, student.classId, student.studentId)
            .then(response => {
                if (response.status === 200) {
                    console.log(response?.data)
                    const temp = response?.data
                    setSubmissionFrequency(Object.keys(temp))
                    setData(temp)
                }
            })
            .catch(error => {
                console.log(error);
            });
    }


    useEffect(() => {
        fetchFeeAndPaymentHistoryForStudent()
    }, [])

    return (
        <GenericDialog
            show={show}
            handleClose={handleClose}
            modalHeader="Student fee Details"
            className="review-admission-modal add-child-model"
        >
            <Accordion flush style={{ width: '100%', borderRadius: '20px' }}>
                <div
                    className='title-area'
                    style={{ backgroundColor: '#F0EEF2', padding: '15px', border: '1px solid lightGrey' }}
                >
                    {`${humanize(student.firstName)} ${humanize(student.lastName)} (${student.schoolStudentId})`}
                </div>
                {submissionFrequency.map((val, index) =>
                    <div className="view-file-container">
                        <Accordion.Item key={index} eventKey={index} style={{ margin: '10px 20px 10px 20px' }} onClick={() => { setOpenAccord(true) }}>
                            <div style={{ border: '1px solid lightGrey', }}>
                                <Accordion.Header style={{ border: '1px solid #F0EEF2' }}>{`${humanize(val)}`}</Accordion.Header>
                                <Accordion.Body style={{ padding: '0px' }}>
                                    <div >
                                        <div>
                                            <div style={{ display: 'flex', width: '100%', padding: '10px', }}>
                                                <div style={{ display: 'flex', width: '50%', paddingLeft: '10px' }}>
                                                    <label>Class</label> &nbsp;
                                                    <span style={{ color: '#41285F', fontWeight: 'bold' }}>{data[`${val}`].className}</span>
                                                </div>
                                                <div>
                                                    <label>Stream </label> &nbsp;
                                                    <span style={{ color: '#41285F' }}>{data[`${val}`].className}</span>
                                                </div>
                                            </div>
                                            <div style={{ padding: '10px', paddingLeft: '20px', borderTop: '1px solid lightGrey' }}>
                                                <label>Payment Status </label> &nbsp;
                                                <span style={{ color: '#41285F' }}>{data[`${val}`].feeStatus}</span>
                                            </div>
                                        </div>
                                        <div style={{ backgroundColor: '#F0EEF2', borderRadius: '20px', border: '1px solid #F0EEF2' }}>
                                            <div style={{
                                                padding: '5px',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                border: '1px solid white'
                                            }}>
                                                <strong>Payment Details</strong>
                                            </div>
                                            <div style={{ display: 'flex', width: '100%', padding: '10px', border: '1px solid white', paddingLeft: '20px' }}>
                                                <div style={{ display: 'flex', width: '50%', }}>
                                                    <label>Fee Amount </label>&nbsp;
                                                    <span style={{ color: '#41285F' }}>{data[`${val}`].paymentAmount}</span>
                                                </div>
                                                <div>
                                                    <label>Late Fee Amount </label> &nbsp;
                                                    <span style={{ color: '#41285F' }}>{data[`${val}`].lateFee}</span>
                                                </div>
                                            </div>
                                            <div style={{ display: 'flex', width: '100%', padding: '10px', border: '1px solid white', paddingLeft: '20px' }}>
                                                <div style={{ display: 'flex', width: '50%', }}>
                                                    <label>Payment Mode </label>&nbsp;
                                                    <span style={{ color: '#41285F' }}>{data[`${val}`].paymentMode}</span>
                                                </div>
                                                <div>
                                                    <label>Date of Payment </label>&nbsp;
                                                    <span style={{ color: '#41285F' }}>{data[`${val}`].paymentDate}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Accordion.Body>
                            </div>
                        </Accordion.Item>
                    </div>
                )}
            </Accordion>
        </GenericDialog>
    )
}