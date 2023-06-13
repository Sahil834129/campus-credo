import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import TableComponent from '../../../common/TableComponent';
import { getSchoolFeeType, deleteSchoolFeeType } from '../../../utils/services';
import { ReactComponent as Save } from "../../../assets/admin/img/save.svg"
import { ReactComponent as Delete } from "../../../assets/admin/img/delete.svg";
import { Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { getManageFeesType } from '../../../redux/actions/manageFeesAction';
import { useDispatch, useSelector } from 'react-redux';
import { FEE_TYPE_FREQUENCY } from "../../../constants/app";


export const ManageFeesTypes = () => {

    const [selectedRows, setSelectedRows] = useState({});
    const rowsData = useSelector(state => state?.manageFees?.feesTypeRows || []);
    const dispatch = useDispatch();
    const [feeTypeId, setFeeTypeId] = useState('')
    const [feeTypeName, setFeeTypeName] = useState('')
    const [feeTypeFrequency, setFeeTypeFrequency]= useState('')
    const [reFetch, setRefetch] = useState(false)

    const handleNameChange =(e)=>{
        setFeeTypeName(e.target.value)
    }

    const columns = [
        {
            accessor: '',
            Header: '#',
            Cell: ((e) => {
                if (!e.row.original.add) {
                    const count = parseInt(e.row.id)
                    return (
                        <>{count}</>
                    )
                }
                return <></>
            })
        },
        {
            accessor: '',
            Header: 'Fee Name',
            Cell: ((e) => {
                return (
                    <>
                        <div className='frm-cell'>
                            <div className='field-group-wrap'>
                                {e.row.original.editable || e.row.original.add ? (<Form.Control
                                    value={e.row.original.add ? feeTypeName : setFeeTypeName(e.row.original?.feeTypeName)}
                                    size='sm'
                                    type='text'
                                    placeholder='Fee Name'
                                    style={{ width: '200px', margin: 'auto' }}
                                    onChange={handleNameChange}
                                    disabled={e.row.original?.editable}
                                />) : (e.row.original?.feeTypeName)}

                                {/* <input type='text' /> */}
                            </div>
                        </div>
                    </>
                )
            })
        },

        {
            accessor: '',
            Header: 'Payment Frequency',
            Cell: ((e) => {
                return (
                    <>
                        <div className='frm-cell'>
                            <div className='field-group-wrap'>
                                {e.row.original.editable || e.row.original.add ? (<Form.Select
                                    value={e.row.original.add ? feeTypeFrequency : setFeeTypeFrequency(e.row.original?.feeTypeFrequency)}
                                    size='sm'
                                    style={{ width: '200px', margin: "auto" }}
                                    onChange={(val) =>setFeeTypeFrequency(val.target.value)}
                                >
                                    <option>SELECT</option>
                                    {FEE_TYPE_FREQUENCY.map((val) => (
                                        <option value={val.value} key={`${val.value}`}>{val.text}</option>
                                    ))}
                                </Form.Select>) : (e.row.original?.feeTypeFrequency)}
                            </div>
                        </div>
                    </>
                )
            })
        },
        {
            accessor: '',
            Header: ' ',
            Cell: ((e) => {
                return (
                    <>

                        {e.row.original.add && !e.row.original.editable ? <Save
                            style={{ cursor: "pointer" }}
                            onClick={() => console.log(e)} /> : <>
                            <Button onClick={() => handleUpdate(e)}>
                                Edit
                            </Button>
                            <Delete
                                style={{ cursor: "pointer" }}
                                onClick={handleDelete}
                            />
                        </>}
                    </>
                )
            })
        },
    ]

    const handleUpdate = (e) => {
        console.log(e.row.original)

    }

    const handleDelete = () => {
        deleteSchoolFeeType(feeTypeId)
            .then(response => {
                toast.success(response.data);
            })
            .catch(error => {
                toast.error(error.response.data.apierror.message);
            });
        setRefetch(!reFetch)
    }

    useEffect(() => {
        // if(reFetch)
        dispatch(getManageFeesType());
    }, [reFetch])

    // useEffect(() => {
    // if(isLoader) {

    // }
    // }, [isLoader])
    return (
        <div className='content-area-inner inner-page-outer' style={{ width: '100%' }}>
            <div className='internal-page-wrapper'>
                <div className='inner-content-wrap padt8' style={{}}>
                    <div className='title-area' style={{ paddingBottom: 20 }}>
                        <h2>
                            Manage Fee Types
                        </h2>
                        <div className='btn-wrapper'>
                            <Button className='reset-btn'>
                                Reset
                            </Button>
                        </div>
                    </div>
                    <TableComponent
                        data={rowsData}
                        showSelectedAll={false}
                        columns={columns}
                        selectedRows={selectedRows}
                        onSelectedRowsChange={setSelectedRows}

                    />
                </div>

            </div>
        </div>
    )
}
