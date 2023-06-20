import { useState } from "react";
import { useEffect } from "react";
import { Button, Form } from 'react-bootstrap';
import { ReactComponent as Save } from "../../../assets/admin/img/save.svg"
import { addClassFeeTypeAmount, deleteClassesFeeDetails, updateClassFeeTypeAmount } from "../../../utils/services";
import { toast } from "react-toastify";
import GenericDialog from "../../../dialogs/GenericDialog";




export const GetClassData = ({ tableData, index, feeoption, classId, setReFetch, resetButton }) => {

    const [feeTypeId, setFeeTypeId] = useState('')
    const [feeAmount, setFeeAmount] = useState('')
    const [mandatory, setMandatory] = useState(false)
    const [editable, setEditable] = useState(false)
    const [show, setShow] = useState(false)

    const [errorTypeField, setErrorTypeField] = useState('')
    const [errorAmount, setErrorAmount] = useState('')

    const ValidationScheme = () => {
        if (feeAmount === '') {
            setErrorAmount('Mandatory')
        }
        if (feeTypeId === '') {
            setErrorTypeField('Mandatory')
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
            addClassFeeTypeAmount(payload)
                .then(response => {
                    toast.success(response.data);
                    setReFetch(val => !val)
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
            updateClassFeeTypeAmount(payload)
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
                <td>{index > 0 ? index : ''}</td>
                <td>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        {!(editable || index === 0) ?
                            <Form.Control
                                style={{ width: '250px', }}
                                value={tableData?.classFee?.feeTypeName}
                                disabled={true} />
                            : <Form.Select
                                size='sm'
                                value={feeTypeId}
                                style={{ width: '250px', }}
                                onChange={(e) => { setFeeTypeId(e.target.value); setErrorTypeField('') }}
                                disabled={editable || index === 0 ? false : true}
                            >
                                <option value=''>Select Fee type</option>
                                {feeoption.map((val) => <option key={val?.feeTypeName} value={val?.feeTypeId}>{val?.feeTypeName}</option>)}
                            </Form.Select>}

                    </div>
                    {errorTypeField && <div style={{ color: 'red' }}>{errorTypeField}</div>}
                </td>
                <td>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        {!(editable || index === 0) ?
                            <Form.Control
                                style={{ width: '250px', }}
                                value={tableData?.classFee?.feeAmount}
                                disabled={true} />
                            : <Form.Control
                                size='sm'
                                type='number'
                                value={feeAmount}
                                style={{ width: '250px', }}
                                placeholder='Enter Fee Name'
                                disabled={editable || index === 0 ? false : true}
                                onChange={(e) => { setFeeAmount(e.target.value); setErrorAmount('') }}
                            />}
                    </div>
                    {errorAmount && <div style={{ color: 'red' }}>{errorAmount}</div>}

                </td>
                <td>
                    {!(editable || index === 0) ?
                        <Form.Check
                            checked={tableData?.classFee?.mandatory}
                            disabled={true}
                        />
                        : <Form.Check
                            value={mandatory}
                            checked={mandatory}
                            disabled={editable || index === 0 ? false : true}
                            onChange={(e) => setMandatory(val => !val)}
                        />}
                </td>
                <td>
                    {(index === 0)
                        ? <Button onClick={handleAdd}>SAVE</Button>
                        : <>{editable ?
                            <>
                                <Button onClick={handleUpdate}> UPDATE</Button>
                                <Button onClick={() => setEditable(false)}>CANCEL</Button>
                            </> :
                            <>
                                <Button onClick={handleEdit}>EDIT</Button>
                                <Button onClick={handleDelete}>DELETE</Button>
                            </>}
                        </>
                    }
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