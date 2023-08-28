import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { toast } from 'react-toastify';
import { FEE_SUBMISSION_LAST_DATES, LATE_FEE_FREQUENCY } from "../../../constants/app";
import { setLocalData } from "../../../utils/helper";
import { updateFeeSeetings } from "../../../utils/services";

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
        setState(schoolParams.feeSubmissionLastDate-1)
    }

    const validationScheme = () => {
        if (lateFeeAmount ===''){
            setErrorAmount('Required')
        }
        if (feeSubmissionLastDate ===''){
            setErrorDate('Required')
        }
        if (lateFeeFrequency ===''){
            setErrorFrequency('Required')
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
                <div className='inner-content-wrap padt8 lateFee-wrapp' >
                    <div className='title-area'>
                        <h2>
                            Configure Late Fee
                        </h2>
                    </div>
                    <div className="fee-settings-block">
                        <div className="amount-main-wrapp fee-settings-panel">
                            <div className="frm-cell">
                                <label>Late Fee Settings</label>
                            </div>
                            <div className="amount-inner-wrapp" >
                                <div className="item-cell">
                                    <label>Late Fee Amount(₹)</label>
                                    <Form.Control
                                        value={lateFeeAmount}
                                        size='sm'
                                        type='number'
                                        min={0}
                                        placeholder='Fee Name'
                                        // style={{ width: '249px', margin: 'auto' }}
                                        onChange={val => {setLateFeeAmount(val.target.value);setErrorAmount('')}}
                                        disabled={!isWritePermission}
                                    />
                                    {errorAmount && <div style={{color:'red', textAlign:'center'}}>{errorAmount}</div>}

                                </div>
                                <div className="item-cell" >
                                    <label>Late Fee Frequency</label>
                                    <Form.Select
                                        value={lateFeeFrequency}
                                        size='sm'
                                        // style={{ width: '290px', margin: "auto" }}
                                        onChange={val => {setLateFeeFrequency(val.target.value); setErrorFrequency('')}}
                                        disabled={!isWritePermission}
                                    >
                                        <option value=''>SELECT</option>
                                        {LATE_FEE_FREQUENCY.map((val) => (
                                            <option value={val.value} key={`Select_${val.value}`}>{val.text}</option>
                                        ))}
                                    </Form.Select>
                                    {errorFrequency && <div style={{color:'red', textAlign:'center'}}>{errorFrequency}</div>}
                                </div>
                            </div>
                            <div className="border-wrapp" style={{
                                borderStyle: 'solid',
                                paddingTop: '5px',
                                borderTopWidth: '1px',
                                borderColor: "lightGray",
                                width: '595px'
                            }} />
                        </div>
                        <div className="amount-main-wrapp">
                            <div className='frm-cell'>
                                <label>Fee Submission Last Date</label>
                            </div>
                            <div className="amount-inner-wrapp submission-date-wrapp" >
                                <h2 className="submission-title">Select a date to define final due date for fee submission </h2>
                                <div className="date-main-container">
                                    {FEE_SUBMISSION_LAST_DATES.map((val, i) =>
                                    
                                            <div className="date-inner-container"
                                                style={
                                                    {
                                                        backgroundColor: state === i ? '#4AB900' : '#F8F8F8',
                                                        color: state === i ? '#fff' : '#5D5D5D',
                                                        border: state === i ? '1px solid #4AB900' : '1px dashed #D9D9D9',
                                                    }
                                                }
                                                key={`Select_${val}`}
                                                onClick={() => { if (isWritePermission) { setState(i); SetFeeSubmissionLastDate(val) } }}>
                                                {val}
                                            </div>
                                    
                                    )}
                                </div>
                            </div>
                            <div className="date-selection-wrapp">
                                {feeSubmissionLastDate ? <label><span style={{ color: 'Green', paddingLeft: 5 }}>{feeSubmissionLastDate}<sup>th</sup></span> of every month is selected to clear the due</label> : <div></div>}
                            </div>
                        </div>
                 
                        <div className='btn-wrapper'>
                            <Button className='reset-btn' onClick={handleReset}>RESET</Button>
                            <Button className='save-btn' onClick={handleSave}>Save</Button>
                        </div>
                    </div> 
                </div>
            </div>
        </div>
    )
}