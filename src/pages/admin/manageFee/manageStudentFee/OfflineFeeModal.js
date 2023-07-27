import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import ReactDatePicker from "react-datepicker";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Loader, { hideLoader, showLoader } from "../../../../common/Loader";
import { MODE_OF_PAYMENT, SESSION } from "../../../../constants/app";
import GenericDialog from "../../../../dialogs/GenericDialog";
import { formatDateToDDMMYYYY } from "../../../../utils/DateUtil";
import { addOfflineFeeForStudent, getFeeAndPaymentHistoryForStudent } from "../../../../utils/services";
import FeeModalHeader from "./feeModalHeader";


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
                "feePaymentDatetime": formatDateToDDMMYYYY(paymentDate),
                "modeOfPayment": modeOfPayment,
            }
            addOfflineFeeForStudent(payload)
            .then(res=>{
                setRefresh(val=>!val)
                handleClose()
                toast.success("Payment is Successfully Updated  ")
                
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
            className="offline-payment-model"
        >
            <FeeModalHeader student={student} session={session}/>
            <Loader />
            <div className="offline-paymt-frm-wrapper">
                <div className="frm-row" >
                    <div className="cell-item">
                        <label>Fee Period</label>
                        <Form.Select
                            size='sm'
                            value={monthQtr}
                            style={{ 
                                
                                borderColor :`${errors.monthQtr ? 'red' : ''}`
                            }}
                            onChange={(e) => {
                                setMonthQtr(e.target.value); 
                                setErrors(val => {
                                    return {
                                        ...val,
                                        monthQtr:undefined,
                                    }
                                })    
                            }}
                        >
                            <option value=''>Select Fee Period</option>
                            {submissionFrequency.map((val, index) => <option key={index} value={val}>{val}</option>)
                            }
                        </Form.Select>
                    </div>
                    <div className="cell-item">
                        
                        <label>Amount</label>
                        <Form.Control
                            size='sm'
                            value={monthQtr ? data[`${monthQtr}`].totalFeeDue : ''}
                            disabled={true}
                            style={{ color: 'blue', backgroundColor: 'white', borderColor :`${errors.monthQtr ? 'red' : ''}` }}
                        />
                    </div>
                </div>
                <div className="frm-row" >
                    <div className="cell-item">
                        <label>Late Fees</label>
                        <Form.Control
                            size='sm'
                            type="number"
                            value={lateFeeAmount}
                            placeholder="Enter Late Fee"
                            style={{ 
                                backgroundColor: 'white', 
                                // width: "250px", 
                                borderColor :`${errors.lateFeeAmount ? 'red' : ''}`
                            }}
                            onChange={(e) => {
                                setLateFeeAmount(e.target.value); 
                                setErrors(val => {
                                    return {
                                        ...val,
                                        lateFeeAmount: undefined,
                                    }
                                })    
                            }}
                        />
                    </div>
                    <div className="cell-item"></div>
                </div>
                <div className="frm-row" >
                    <div className="cell-item">
                        <label>Payment Mode</label>
                        <Form.Select
                            size='sm'
                            value={modeOfPayment}
                            style={{  borderColor :`${errors.modeOfPayment ? 'red' : ''}` }}
                            onChange={(e) => {
                                setModeOfPayment(e.target.value); 
                                setErrors(val => {
                                    return {
                                        ...val,
                                        modeOfPayment: undefined,
                                    }
                                })      
                            }}
                        >
                            <option value=''>Select Payment Mode</option>
                            {MODE_OF_PAYMENT.map((val, index) => <option key={index} value={val.value}>{val.text}</option>)
                            }
                        </Form.Select>
                    </div>
                    <div className="cell-item"></div>
                </div>
                <div className="frm-row" >
                    <div className="cell-item">
                        <label>Payment Date</label>
                        <div className="datepicker-fld"
                            style={{ border: '1px solid #ced4da', fontSize: '14px', borderRadius: '5px', padding:'2px 0px 2px 10px', borderColor :`${errors.paymentDate ? 'red' : '#ced4da'}` }}
                        >
                            <ReactDatePicker
                                selected={paymentDate}
                                onChange={(date) => {
                                    setPaymentDate(date);
                                    setErrors(val => {
                                        return {
                                            ...val,
                                            paymentDate: undefined,
                                        }
                                    })     
                                }}
                                minDate={minDate}
                                maxDate={maxDate}
                                placeholderText="Select Date"
                                dateFormat='yyyy/MM/dd'
                                isClearable
                                showIcon
                            />
                        </div>
                    </div>
                    <div className="cell-item"></div>
                </div>
                <div className="btn-wrapper">
                    <Button className="submit-btn" onClick={handleSubmit}>SUBMIT</Button>
                </div>
            </div>
        </GenericDialog>
    )
}
