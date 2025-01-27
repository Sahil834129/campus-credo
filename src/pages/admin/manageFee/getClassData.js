import { useEffect, useState } from "react";
import { Button, Form } from 'react-bootstrap';
import { toast } from "react-toastify";
import GenericDialog from "../../../dialogs/GenericDialog";
import { addClassFeeTypeAmount, deleteClassesFeeDetails, updateClassFeeTypeAmount } from "../../../utils/services";




export const GetClassData = ({ tableData, index, feeoption, classId, setReFetch, resetButton, isWritePermission, session }) => {

    const [feeTypeId, setFeeTypeId] = useState('')
    const [feeAmount, setFeeAmount] = useState('')
    const [mandatory, setMandatory] = useState(false)
    const [editable, setEditable] = useState(false)
    const [show, setShow] = useState(false)

    const [errorTypeField, setErrorTypeField] = useState('')
    const [errorAmount, setErrorAmount] = useState('')

    const ValidationScheme = () => {
        if (feeAmount === '') {
            setErrorAmount('Required')
        }
        if (feeTypeId === '') {
            setErrorTypeField('Required')
        }

    }

    const handleAdd = () => {
        if (feeAmount === '' || feeTypeId === '') {
            ValidationScheme()
        } else {
            const payload = {}
            const temp = {}
            temp['feeTypeId'] = parseInt(feeTypeId)
            temp['feeAmount'] = parseInt(feeAmount)
            temp['mandatory'] = mandatory
            payload['classId'] = classId
            payload['classFee'] = temp
            addClassFeeTypeAmount(payload, session)
                .then(response => {
                    toast.success(response.data);
                    setReFetch(val => !val)
                    setFeeTypeId('')
                    setFeeAmount('')
                    setMandatory(false)
                })
                .catch(error => {
                    toast.error(error.response.data.apierror.message);
                    setReFetch(val => !val)

                });
        }
    }

    const handleUpdate = () => {
        if (feeAmount === '' || feeTypeId === '') {
            ValidationScheme()
        } else {
            const payload = {}
            const temp = {}
            temp['feeTypeId'] = parseInt(feeTypeId)
            temp['feeAmount'] = parseInt(feeAmount)
            temp['mandatory'] = mandatory
            temp['feeTypeFrequency'] = tableData?.classFee?.feeTypeFrequency
            payload['classId'] = classId
            payload['classFeeId'] = tableData?.classFeeId
            payload['classFee'] = temp
            updateClassFeeTypeAmount(payload, session)
                .then(response => {
                    toast.success(response.data);
                    setEditable(val => !val)
                    setReFetch(val => !val)
                })
                .catch(error => {
                    toast.error(error.response.data.apierror.message);
                    setEditable(val => !val)
                    setReFetch(val => !val)

                });
        }
    }

    const confirmDelete = () => {
        const classFeeId = tableData?.classFeeId
        deleteClassesFeeDetails(classId, classFeeId)
            .then(response => {
                toast.success(response.data);
                setReFetch((val) => !val)
                handleClose()
            })
            .catch(error => {
                toast.error(error.response.data.apierror.message);
                setReFetch((val) => !val)
                handleClose()
            });
    }

    const handleDelete = () => {
        setShow(true)
    }

    const handleClose = () => {
        setShow(false)
    }

    const handleEdit = () => {
        setEditable(true)
        setFeeTypeId(tableData?.classFee?.feeTypeId)
        setFeeAmount(tableData?.classFee?.feeAmount)
        setMandatory(tableData?.classFee?.mandatory)
    }

    useEffect(() => {
        setEditable(false)
    }, [resetButton])

    return (
        <>
            <tr>
                <td valign="middle" 
                // style={{backgroundColor:"rgba(65, 40, 95, 0.02)", boxShadow:"0px -1px 0px 0px rgba(0, 0, 0, 0.12) inset", padding: "20px" }}
                >
                    {index > 0 ? index : ''}
                </td>
                <td valign="middle" style={{ }}>
                    <div style={{ padding: '0' }}>
                        {!(editable || index === 0) ?
                            <Form.Control
                                style={{ height:"40px"}}
                                value={tableData?.classFee?.feeTypeName}
                                disabled={true} />
                            : <Form.Select
                                size='sm'
                                value={feeTypeId}
                                style={{ }}
                                onChange={(e) => { setFeeTypeId(e.target.value); setErrorTypeField('') }}
                                disabled={editable || isWritePermission ? false : true}
                            >
                                <option value=''>Select Fee type</option>
                                {feeoption.map((val) => <option key={val?.feeTypeName} value={val?.feeTypeId}>{val?.feeTypeName}</option>)}
                            </Form.Select>}
                            {errorTypeField && <div className="error-exception-cft" 
                            // style={{ color: 'red', textAlign: 'center' }}
                            >{errorTypeField}</div>}
                    </div>
                    
                </td>
                <td valign="middle" style={{ }}>
                    <div 
                    // style={{ padding: '0 50px' }}
                    >
                        {!(editable || index === 0) ?
                            <Form.Control
                                style={{ height:"40px"}}
                                value={tableData?.classFee?.feeAmount}
                                disabled={true} />
                            : <Form.Control
                                size='sm'
                                type='number'
                                value={feeAmount}
                                style={{ height:"40px"}}
                                placeholder='Enter Fee Name'
                                disabled={(editable || isWritePermission ) ? false : true}
                                onChange={(e) => { setFeeAmount(e.target.value); setErrorAmount('') }}
                            />}
                            {errorAmount && <div className="error-exception-cft" >{errorAmount}</div>}
                    </div>
                </td>
                <td valign="middle">
                    {!(editable || index === 0) ?
                        <Form.Check
                            checked={tableData?.classFee?.mandatory}
                            disabled={true}
                        />
                        : <Form.Check
                            value={mandatory}
                            checked={mandatory}
                            disabled={editable || isWritePermission ? false : true}
                            onChange={(e) => setMandatory(val => !val)}
                        />}
                </td>
                <td>
                    <div className="action-btn-wrapper">
                    {(index === 0)
                        ? <Button className='save-btn' onClick={handleAdd}><i className='icons save-icon'></i></Button>
                        : <>{editable ?
                            <>
                                <Button className="update-btn " onClick={handleUpdate}> <i className='icons update-icon'></i></Button>
                                <Button className='cancel-btn' onClick={() => setEditable(false)}><i className='icons cancel-icon'></i></Button>
                            </> :
                            <>
                                <Button className='edit-btn' onClick={handleEdit}><i className='icons edit-icon'></i></Button>
                                <Button className='dlt-btn' onClick={handleDelete}><i className='icons delete-icon'></i></Button>
                            </>}
                        </>
                    }
                    </div>
                </td >
            </tr >
            <GenericDialog className='confirmation-modal' modalHeader='Please Confirm' show={show} handleClose={handleClose}>
                {
                    <>
                        <div className="form-container forgot-pwd">Are you sure you want to delete ?</div>

                        <div className="frm-cell btn-wrapper mt-3">

                            <Button type="submit" variant="primary" className="confirm-btn" onClick={confirmDelete}>
                                Confirm
                            </Button>
                            <Button
                                variant="primary"
                                className="cancel-btn"
                                onClick={handleClose}
                            >
                                Cancel
                            </Button>
                        </div>
                    </>
                }

            </GenericDialog>
        </>
    )
}