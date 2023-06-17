import { useState } from "react"
import { Button, Form } from "react-bootstrap"
import { updateFeeSeetings } from "../../../utils/services"
import { toast } from 'react-toastify';
import { FEE_SUBMISSION_LAST_DATES, LATE_FEE_FREQUENCY } from "../../../constants/app";
import { setLocalData } from "../../../utils/helper";

export const FeeSettings = ({ isWritePermission }) => {
    let schoolParams = JSON.parse(localStorage.getItem('schoolParams'))
    const [feeSubmissionLastDate, SetFeeSubmissionLastDate] = useState(schoolParams.feeSubmissionLastDate || '');
    const [lateFeeAmount, setLateFeeAmount] = useState(schoolParams.lateFeeAmount || '');
    const [lateFeeFrequency, setLateFeeFrequency] = useState(schoolParams.lateFeeFrequency || '');
    const [state, setState] = useState(schoolParams.feeSubmissionLastDate - 1);

    const [errorDate, setErrorDate] = useState('')
    const [errorAmount, setErrorAmount] = useState('')
    const [errorFrequency, setErrorFrequency] = useState('')

    const handleReset = () => {
        let schoolParams = JSON.parse(localStorage.getItem('schoolParams'));
        SetFeeSubmissionLastDate(schoolParams.feeSubmissionLastDate);
        setLateFeeAmount(schoolParams.lateFeeAmount);
        setLateFeeFrequency(schoolParams.lateFeeFrequency);
    }

    const validationScheme = () => {
        if (lateFeeAmount ===''){
            setErrorAmount('Mandatory')
        }
        if (feeSubmissionLastDate ===''){
            setErrorDate('Mandatory')
        }
        if (lateFeeFrequency ===''){
            setErrorFrequency('Mandatory')
        }
    }

    const handleSave = () => {
        if (feeSubmissionLastDate === '' || lateFeeAmount === '' || lateFeeFrequency === '') {
            validationScheme()
        } else {
            const localpayload = {};
            localpayload['lateFeeAmount'] = lateFeeAmount;
            localpayload['lateFeeFrequency'] = lateFeeFrequency;
            localpayload['feeSubmissionLastDate'] = feeSubmissionLastDate;
            setLocalData('schoolParams', JSON.stringify(localpayload || {}));
            const payload = {};
            payload['lateFeeAmount'] = parseInt(lateFeeAmount);
            payload['lateFeeFrequency'] = lateFeeFrequency;
            payload['feeSubmissionLastDate'] = feeSubmissionLastDate;
            updateFeeSeetings(payload)
                .then(response => {
                    toast.success(response.data);
                })
                .catch(error => {
                    toast.error(error.response.data.apierror.message);
                });
        }
    }

    return (
        <div className='content-area-inner inner-page-outer' style={{ width: '100%' }}>
            <div className='internal-page-wrapper'>
                <div className='inner-content-wrap padt8' >
                    <div className='title-area' style={{ padding: 10 }}>
                        <h2>
                            Manage Fee Settings
                        </h2>
                    </div>
                    <div style={{
                        borderStyle: 'solid',
                        borderTopWidth: '1px',
                        borderColor: "lightGray",
                    }} />
                    <div>
                        <div className="frm-cell" style={{ padding: 10, paddingBottom: 0 }} >
                            <label>Late Fee Settings</label>
                        </div>
                        <div style={{
                            display: 'flex', margin: 5, paddingLeft: 45
                        }} >
                            <div style={{ margin: 10 }}>
                                <label style={{ color: 'black' }}>Late Fee Amount(₹)</label>
                                <Form.Control
                                    value={lateFeeAmount}
                                    size='sm'
                                    type='text'
                                    placeholder='Fee Name'
                                    style={{ width: '200px', margin: 'auto' }}
                                    onChange={val => {setLateFeeAmount(val.target.value);setErrorAmount('')}}
                                    disabled={!isWritePermission}
                                />
                                {errorAmount && <div style={{color:'red'}}>{errorAmount}</div>}

                            </div>
                            <div style={{ margin: 10 }}>
                                <label style={{ color: 'black' }}>Late Fee Frequency</label>
                                <Form.Select
                                    value={lateFeeFrequency}
                                    size='sm'
                                    style={{ width: '200px', margin: "auto" }}
                                    onChange={val => {setLateFeeFrequency(val.target.value); setErrorFrequency('')}}
                                    disabled={!isWritePermission}
                                >
                                    <option value=''>SELECT</option>
                                    {LATE_FEE_FREQUENCY.map((val) => (
                                        <option value={val.value} key={`Select_${val.value}`}>{val.text}</option>
                                    ))}
                                </Form.Select>
                                {errorFrequency && <div style={{color:'red'}}>{errorFrequency}</div>}
                            </div>
                        </div>
                        <div style={{
                            borderStyle: 'solid',
                            paddingTop: '5px',
                            borderTopWidth: '1px',
                            borderColor: "lightGray",
                            width: '550px'
                        }} />
                    </div>
                    <div >
                        <div className='frm-cell' style={{ display: "flex", padding: 10 }} >
                            <label>Fee Submission Last Date</label>
                        </div>
                        <div className='title-area' style={{ display: 'block', paddingLeft: 45 }} >
                            <h2>Select a date to define final due date for fee submission </h2>
                            <div style={
                                {
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(10, 1fr)',
                                    width: '500px',
                                }}>
                                {FEE_SUBMISSION_LAST_DATES.map((val, i) =>
                                   
                                        <div
                                            style={
                                                {
                                                    margin: 5,
                                                    padding: 5,
                                                    borderStyle: "dashed",
                                                    borderColor: 'darkGrey',
                                                    borderWidth: 1,
                                                    borderRadius: 5,
                                                    width: 40,
                                                    textAlign:'center',
                                                    backgroundColor: state === i ? 'lightGreen' : 'white',
                                                }
                                            }
                                            key={`Select_${val}`}
                                            onClick={() => { if (isWritePermission) { setState(i); SetFeeSubmissionLastDate(val) } }}>
                                            {val}
                                        </div>
                                
                                )}
                            </div>
                        </div>
                        <div style={{
                            borderStyle: "dashed",
                            borderColor: 'lightGreen',
                            borderWidth: 1,
                            borderRadius: 5,
                            backgroundColor: 'lightGrey',
                            margin: 10,
                            marginLeft: 45,
                            padding: 5,
                            width: '400px',

                        }}>
                            {feeSubmissionLastDate ? <div><span style={{ color: 'Green', paddingLeft: 5 }}>{feeSubmissionLastDate}<sup>th</sup></span> of every month is selected to clear the due</div> : <div></div>}
                        </div>
                    </div>
                    <div style={{
                        borderStyle: 'solid',
                        padding: '10px',
                        borderTopWidth: '1px',
                        borderColor: "lightGray",
                        width: '550px'

                    }} />
                    <div className='btn-wrapper' style={{ position: 'absolute' }}>
                        <Button className='reset-btn' onClick={handleReset}>RESET</Button>
                        <Button className='save-btn' onClick={handleSave}>Save</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}