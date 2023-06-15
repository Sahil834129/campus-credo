import { Button, Form } from 'react-bootstrap';
import { useState } from 'react';
import { toast } from 'react-toastify';

import { addSchoolFeeType, deleteSchoolFeeType, updateSchoolFeeType } from '../../../utils/services';
import { FEE_TYPE_FREQUENCY } from '../../../constants/app';
import { ReactComponent as Save } from "../../../assets/admin/img/save.svg"
import { ReactComponent as Delete } from "../../../assets/admin/img/delete.svg"
import { useEffect } from 'react';

export const GetData = ({ rowData, index, setRefetch, resetButton }) => {

    const [feeTypeName, setFeeTypeName] = useState('')
    const [feeTypeFrequency, setFeeTypeFrequency] = useState('')
    const [feeTypeId, setFeeTypeId] = useState('')
    const [isEditable, setIsEditable] = useState(false);

    const handleApiResponse = (response, isFailed) => {
        if(isFailed) {
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

    const handleAdd = () => {
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

    const handleDelete = () => {
        const temp = rowData.feeTypeId
        deleteSchoolFeeType(temp)
            .then(response => {
                toast.success(response.data);
                setRefetch((val) => !val)
            })
            .catch(error => {
                toast.error(error.response.data.apierror.message);
                setRefetch((val) => !val)
            });
    }

    const handleEdit = () => {
        setIsEditable(true);
        setFeeTypeName(rowData.feeTypeName)
        setFeeTypeFrequency(rowData.feeTypeFrequency)
        setFeeTypeId(rowData.feeTypeId)      
    }

    const hnadleUpdate =()=>{
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

    useEffect(()=>{
        setIsEditable(false)
    },[resetButton])

    return (
        <tr>
            <td>{index > 0 ? index : ''}</td>
            <td style={{ width: '300px', }}>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    {isEditable || rowData.add ? <Form.Control
                        size='sm'
                        type='text'
                        value={feeTypeName}
                        style={{ width: '250px', }}
                        onChange={(e) => setFeeTypeName(e.target.value)}
                    /> : rowData.feeTypeName}
                </div>
            </td>
            <td style={{ width: '300px', }}>
                <div style={{ display: 'flex', justifyContent: 'center' }} >
                    {isEditable || rowData.add ? <Form.Select
                        size='sm'
                        type='number'
                        value={feeTypeFrequency}
                        style={{ width: '250px', }}
                        onChange={(e) => setFeeTypeFrequency(e.target.value)}
                    >
                        <option>SELECT</option>
                        {FEE_TYPE_FREQUENCY.map((view) =>
                            <option value={view.value} key={view.value}>{view.text}</option>
                        )}
                    </Form.Select> : rowData.feeTypeFrequency}
                </div>
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
    )
}