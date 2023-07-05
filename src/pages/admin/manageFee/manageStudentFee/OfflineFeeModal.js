import { useEffect, useState } from "react";
import GenericDialog from "../../../../dialogs/GenericDialog";
import FeeModalHeader from "./feeModalHeader";
import { useDispatch } from "react-redux";
import Loader, { hideLoader, showLoader } from "../../../../common/Loader";
import { addOfflineFeeForStudent, getFeeAndPaymentHistoryForStudent } from "../../../../utils/services";
import { Button, Form } from "react-bootstrap";
import { MODE_OF_PAYMENT, SESSION } from "../../../../constants/app";
import ReactDatePicker from "react-datepicker";


export default function OfflineFeeModal({ show, handleClose, student }) {

    const [submissionFrequency, setSubmissionFrequency] = useState([])
    const [monthQtr, setMonthQtr] = useState('')
    const [lateFeeAmount, setLateFeeAmount] = useState('')
    const [modeOfPayment, setModeOfPayment] = useState('')
    const [paymentDate, setPaymentDate] = useState('')
    const [errors, setErrors] = useState([]);

    const [data, setData] = useState({})
    const [refresh, setRefresh]= useState(false)
    const dispatch = useDispatch()
    const maxDate = new Date()
    const minDate = new Date(maxDate.getFullYear(), 2, 1)
    const session = SESSION

    const validateData = () => {
        const errorVal = { monthQtr: "", lateFeeAmount: "", paymentDate: "", modeOfPayment: "" }
        if (monthQtr === '') {
            errorVal.monthQtr = "Required"
        }
        if (lateFeeAmount === '') {
            errorVal.lateFeeAmount = "Required"
        }
        if (paymentDate === '' || paymentDate === null) {
            errorVal.paymentDate = "Required"
        }
        if (modeOfPayment === '') {
            errorVal.modeOfPayment = "Required"
        }
        setErrors(errorVal)
    }

    const handleSubmit = () => {
        if (monthQtr === '' || lateFeeAmount === '' || modeOfPayment === '' || paymentDate === '' || paymentDate=== null) {
            validateData()
        } else {
            const payload = {
                "studentId": student.studentId,
                "classId": student.classId,
                "monthQtr": monthQtr,
                "session":session,
                "lateFeeAmount": parseInt(lateFeeAmount),
                "feeAmount":data[`${monthQtr}`].totalFeeDue,
                "feePaymentDatetime": paymentDate,
                "modeOfPayment": modeOfPayment,
            }
            addOfflineFeeForStudent(payload)
            .then(res=>{
                setRefresh(val=>!val)
                handleClose()
                
            })
            .catch(err=>console.log(err))
            
        }

    }

    const fetchFeeAndPaymentHistoryForStudent = () => {
        showLoader(dispatch)
        getFeeAndPaymentHistoryForStudent(session, student.classId, student.studentId)
            .then(response => {
                if (response.status === 200) {
                    const temp = response?.data
                    setData(temp)
                    const allKeys = Object.keys(temp)
                    const period = allKeys.filter((val) => (temp[`${val}`].feeStatus) !== 'Paid')
                    setSubmissionFrequency(period)
                    hideLoader(dispatch)
                }
            })
            .catch(error => {
                console.log(error);
                hideLoader(dispatch)
            });
    }

    useEffect(() => {
        fetchFeeAndPaymentHistoryForStudent()
    }, [refresh])

    return (
        <GenericDialog
            show={show}
            handleClose={handleClose}
            modalHeader="Offline Payment"
            className="review-admission-modal add-child-model"
        >
            <FeeModalHeader student={student} session={session}/>
            <Loader />
            <div>
                <div style={{ display: 'flex', margin: '10px', marginLeft: '30px' }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-start' }} >
                        <label style={{ width: '150px' }}>Fee Period</label> &nbsp;
                        <Form.Select
                            size='sm'
                            value={monthQtr}
                            style={{ width: '250px', }}
                            onChange={(e) => {setMonthQtr(e.target.value); errors.monthQtr = ''}}
                        >
                            <option value=''>Select Fee Period</option>
                            {submissionFrequency.map((val, index) => <option key={index} value={val}>{val}</option>)
                            }
                        </Form.Select>
                        <span className="error-exception" style={{width:'50px'}}>{errors.monthQtr}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-start', marginLeft: '50px' }}>
                        <label style={{ width: '100px' }}>Amount</label> &nbsp;
                        <Form.Control
                            size='sm'
                            value={monthQtr ? data[`${monthQtr}`].totalFeeDue : ''}
                            disabled={true}
                            style={{ color: 'blue', backgroundColor: 'white', width: "250px" }}
                        />
                    </div>
                </div>
                <div style={{ display: 'flex', margin: '10px', marginLeft: '30px' }}>
                    <label style={{ width: '150px' }}>Late Fees</label> &nbsp;
                    <Form.Control
                        size='sm'
                        type="number"
                        value={lateFeeAmount}
                        placeholder="Enter Late Fee"
                        style={{ backgroundColor: 'white', width: "250px" }}
                        onChange={(e) => {setLateFeeAmount(e.target.value); errors.lateFeeAmount =''}}
                    />
                    {errors?.lateFeeAmount && <span className="error-exception">{errors.lateFeeAmount}</span>}
                </div>
                <div style={{ display: 'flex', margin: '10px', marginLeft: '30px' }}>
                    <label style={{ width: '150px' }}>Payment Mode</label> &nbsp;
                    <Form.Select
                        size='sm'
                        value={modeOfPayment}
                        style={{ width: '250px', }}
                        onChange={(e) => {setModeOfPayment(e.target.value); errors.modeOfPayment =''}}
                    >
                        <option value=''>Select Payment Mode</option>
                        {MODE_OF_PAYMENT.map((val, index) => <option key={index} value={val.value}>{val.text}</option>)
                        }
                    </Form.Select>
                    {errors?.modeOfPayment && <span className="error-exception">{errors.modeOfPayment}</span>}

                </div>
                <div style={{ display: 'flex', margin: '10px', marginLeft: '30px' }}>
                    <label style={{ width: '150px' }}>Payment Date</label> &nbsp;
                    <div
                        style={{ border: '1px solid lightGrey', width: '250px', borderRadius: '5px' }}
                    >
                        <ReactDatePicker
                            selected={paymentDate}
                            onChange={(date) => {setPaymentDate(date); errors.paymentDate=''}}
                            minDate={minDate}
                            maxDate={maxDate}
                            placeholderText="Select Date"
                            dateFormat='yyyy/MM/dd'
                            isClearable
                            showIcon
                        />
                    </div>
                    {errors?.paymentDate && <span className="error-exception">{errors.paymentDate}</span>}
                </div>
                <div style={{ display: 'flex', justifyContent: 'end', margin: '30px' }}>
                    <Button onClick={handleSubmit}>SUBMIT</Button>
                </div>
            </div>
        </GenericDialog>
    )
}
