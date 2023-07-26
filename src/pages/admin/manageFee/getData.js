import { Button, Form } from 'react-bootstrap';
import { useState } from 'react';
import { toast } from 'react-toastify';

import { addSchoolFeeType, deleteSchoolFeeType, updateSchoolFeeType } from '../../../utils/services';
import { FEE_TYPE_FREQUENCY } from '../../../constants/app';
import { useEffect } from 'react';
import GenericDialog from '../../../dialogs/GenericDialog';

export const GetData = ({ rowData, index, setRefetch, resetButton, isWritePermission, session }) => {

    const [feeTypeName, setFeeTypeName] = useState('')
    const [feeTypeFrequency, setFeeTypeFrequency] = useState('')
    const [feeTypeId, setFeeTypeId] = useState('')
    const [isEditable, setIsEditable] = useState(false);
    const [show, setShow] = useState(false)

    const [errorName, setErrorName] = useState('')
    const [errorFrequency, setErrorFrequency] = useState('')

    const handleApiResponse = (response, isFailed) => {
        if (isFailed) {
            toast.error(response.response.data.apierror.message);
        } else {
            toast.success(response.data);
        }
        setIsEditable(false);
        setRefetch((value) => !value)
        setFeeTypeName('');
        setFeeTypeFrequency('');
        setFeeTypeId('');
    }

    const validationScheme = () => {
        if (feeTypeName === '' && feeTypeFrequency === '') {
            setErrorName('Required')
            setErrorFrequency('Required')
        } else {
            if (feeTypeName === '') {
                setErrorName('Required')
            } else {
                setErrorFrequency('Required')
            }
        }
    }

    const handleAdd = () => {
        if (feeTypeName === '' || feeTypeFrequency === '') {
            validationScheme()
        }
        else {
            const payload = {}
            payload['feeTypeName'] = feeTypeName
            payload['feeTypeFrequency'] = feeTypeFrequency
            addSchoolFeeType(payload, session)
                .then(response => {
                    handleApiResponse(response, false);
                })
                .catch(error => {
                    handleApiResponse(error, true);
                });
        }
    }

    const confirmDelete = () => {
        const temp = rowData.feeTypeId
        deleteSchoolFeeType(temp)
            .then(response => {
                toast.success(response.data);
                setRefetch((val) => !val)
                handleClose()
            })
            .catch(error => {
                toast.error(error.response.data.apierror.message);
                setRefetch((val) => !val)
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
        setIsEditable(true);
        setFeeTypeName(rowData.feeTypeName)
        setFeeTypeFrequency(rowData.feeTypeFrequency)
        setFeeTypeId(rowData.feeTypeId)
    }

    const hnadleUpdate = () => {
        if (feeTypeName === '' || feeTypeFrequency === '') {
            validationScheme()
        }
        else {
            const payload = {}
            payload['feeTypeName'] = feeTypeName
            payload['feeTypeId'] = feeTypeId
            payload['feeTypeFrequency'] = feeTypeFrequency
            updateSchoolFeeType(payload, session)
                .then(response => {
                    handleApiResponse(response, false);
                })
                .catch(error => {
                    handleApiResponse(error, true);
                });
        }
    }

    useEffect(() => {
        setIsEditable(false)
    }, [resetButton])

    return (
        <>
            <tr>
                <td className='id-cell' >{index > 0 ? index : ''}</td>
                <td style={{ width: '245px', verticalAlign:"middle", paddingLeft: "35px" }}>
                    <div >
                        {isEditable || rowData.add ? <Form.Control
                            size='sm'
                            type='text'
                            value={feeTypeName}
                            style={{ width: '245px', }}
                            placeholder='Enter Fee Name'
                            disabled={isWritePermission}
                            onChange={(e) => { setFeeTypeName(e.target.value); setErrorName('') }}
                        /> : <Form.Control
                            size='sm'
                            value={rowData.feeTypeName}
                            disabled={true}
                            style={{ width: '245px', }}
                        />}
                    </div>
                    {errorName && <div style={{ color: 'red' }}>{errorName}</div>}
                </td>
                <td style={{ width: '225px', verticalAlign:"middle", paddingLeft: "30px" }}>
                    <div >
                        {isEditable || rowData.add ? <Form.Select
                            size='sm'
                            value={feeTypeFrequency}
                            style={{ width: '225px', }}
                            disabled={isWritePermission}
                            onChange={(e) => { setFeeTypeFrequency(e.target.value); setErrorFrequency('') }}
                        >
                            <option value=''>SELECT</option>
                            {FEE_TYPE_FREQUENCY.map((view) =>
                                <option value={view.value} key={view.value}>{view.text}</option>
                            )}
                        </Form.Select> : <Form.Control
                            size='sm'
                            value={(rowData.feeTypeFrequency).replace('HALF_YEARLY','HALF-YEARLY')}
                            disabled={true}
                            style={{ width: '225px', }}
                        />}
                    </div>
                    {errorFrequency && <div style={{ color: 'red' }}>{errorFrequency}</div>}

                </td>
                <td>
                    <div className='action-btn-wrapper'>
                        {rowData.add ?
                            <Button className='save-btn' onClick={handleAdd}><i className='icons save-icon'></i></Button>:
                            <>
                                {isEditable ?
                                    <>
                                        <Button className='save-btn' onClick={hnadleUpdate}><i className='icons save-icon'></i></Button>
                                        <Button className='cancel-btn' onClick={() => setIsEditable(false)}><i className='icons cancel-icon'></i></Button>
                                    </>
                                    :
                                    <>
                                        <Button className='edit-btn' onClick={handleEdit}><i className='icons edit-icon'></i></Button>
                                        <Button className='dlt-btn' onClick={handleDelete}><i className='icons delete-icon'></i></Button>

                                    </>}
                            </>
                        }

                    </div>
                </td>
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