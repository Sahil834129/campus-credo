import { Button, Form } from 'react-bootstrap';
import { useState } from 'react';
import { toast } from 'react-toastify';

import { addSchoolFeeType, deleteSchoolFeeType, updateSchoolFeeType } from '../../../utils/services';
import { FEE_TYPE_FREQUENCY } from '../../../constants/app';
import { ReactComponent as Save } from "../../../assets/admin/img/save.svg"
import { ReactComponent as Delete } from "../../../assets/admin/img/delete.svg"
import { useEffect } from 'react';
import GenericDialog from '../../../dialogs/GenericDialog';

export const GetData = ({ rowData, index, setRefetch, resetButton }) => {

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
            setErrorName('Mandatory')
            setErrorFrequency('Mandatory')
        } else {
            if (feeTypeName === '') {
                setErrorName('Mandatory')
            } else {
                setErrorFrequency('Mandatory')
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
            addSchoolFeeType(payload)
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
            updateSchoolFeeType(payload)
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
                <td>{index > 0 ? index : ''}</td>
                <td style={{ width: '300px', }}>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        {isEditable || rowData.add ? <Form.Control
                            size='sm'
                            type='text'
                            value={feeTypeName}
                            style={{ width: '250px', }}
                            placeholder='Enter Fee Name'
                            onChange={(e) => { setFeeTypeName(e.target.value); setErrorName('') }}
                        /> : <Form.Control
                            size='sm'
                            value={rowData.feeTypeName}
                            disabled={true}
                            style={{ width: '250px', }}
                        />}
                    </div>
                    {errorName && <div style={{ color: 'red' }}>{errorName}</div>}
                </td>
                <td style={{ width: '300px', }}>
                    <div style={{ display: 'flex', justifyContent: 'center' }} >
                        {isEditable || rowData.add ? <Form.Select
                            size='sm'
                            value={feeTypeFrequency}
                            style={{ width: '250px', }}
                            onChange={(e) => { setFeeTypeFrequency(e.target.value); setErrorFrequency('') }}
                        >
                            <option value=''>SELECT</option>
                            {FEE_TYPE_FREQUENCY.map((view) =>
                                <option value={view.value} key={view.value}>{view.text}</option>
                            )}
                        </Form.Select> : <Form.Control
                            size='sm'
                            value={(rowData.feeTypeFrequency).replace('HALF_YEARLY','HALFY-YEARLY')}
                            disabled={true}
                            style={{ width: '250px', }}
                        />}
                    </div>
                    {errorFrequency && <div style={{ color: 'red' }}>{errorFrequency}</div>}

                </td>
                <td>
                    <div>
                        {rowData.add ?
                            <Save onClick={handleAdd}></Save> :
                            <>
                                {isEditable ?
                                    <>
                                        <Save onClick={hnadleUpdate}></Save>
                                        <Button onClick={() => setIsEditable(false)}>CANCEL</Button>
                                    </>
                                    :
                                    <>
                                        <Button onClick={handleEdit}>EDIT</Button>
                                        <Delete onClick={handleDelete}></Delete>

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