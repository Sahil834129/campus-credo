import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import TableComponent from '../../../common/TableComponent';
import { getSchoolFeeType, deleteSchoolFeeType, addSchoolFeeType } from '../../../utils/services';
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
    const [rowData, setRowData] = useState(rowsData);
    const dispatch = useDispatch();
    const [feeTypeName, setFeeTypeName] = useState('')
    const [feeTypeFrequency, setFeeTypeFrequency] = useState('')
    const [reFetch, setRefetch] = useState(false)

    const handleFeetypeName = (feeName, index, rowData) => {
        const updatedRows = rowData.map((v,i) => {
            console.log(i === index, i , index)
            if(i == index) {
                v.feeTypeName = feeName;
                console.log(v, 'sss');
                return v;
            }
            console.log(v, 'dddd');
            return v;
        });
        setRowData(JSON.parse(JSON.stringify(updatedRows)));
    }

    useEffect(() => {
        console.log(rowData)
    }, [rowData])

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
            accessor: 'feeTypeName',
            Header: 'Fee Name',
            Cell: ((e) => {
                console.log(e);
                return (
                    <>
                        <div className='frm-cell'>
                            <div className='field-group-wrap'>
                                {e.row.original.editable || e.row.original.add ? (
                                //     <Form.Control
                                //     value={feeTypeName}
                                //     size='sm'
                                //     type='text'
                                //     placeholder='Fee Name'
                                //     style={{ width: '200px', margin: 'auto' }}
                                //     onChange={val =>setFeeTypeName(val.target.value)}
                                //     disabled={e.row.original?.editable}
                                // />
                                <input 
                                type="text" 
                                value={e.row.values?.feeTypeName} 
                                onChange={val => {
                                    console.log(val);
                                   handleFeetypeName(val?.target?.value, e.row.id, rowData)
                                }}/>
                                ) : (e.row.original?.feeTypeName)}

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
                                    value={feeTypeFrequency}
                                    size='sm'
                                    style={{ width: '200px', margin: "auto" }}
                                    onChange={val => setFeeTypeFrequency(val.target.value)}
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
                            onClick={() => handleAdd(e)} /> : <>
                            <Button onClick={() => handleUpdate(e)}>
                                Edit
                            </Button>
                            <Delete
                                style={{ cursor: "pointer" }}
                                onClick={() => handleDelete(e)}
                            />
                        </>}
                    </>
                )
            })
        },
    ]

    const handleUpdate = (e) => {
        e.row.original.editable = true
        console.log('e.row.original')

    }
    console.log(reFetch)

    const handleAdd = (val, id) => {
        const data = {}
        data['feeTypeFrequency'] = feeTypeFrequency
        data['feeTypeName'] = feeTypeName
        addSchoolFeeType(data)
            .then(response => {
                toast.success(response.data);
                setRefetch(!reFetch)
            })
            .catch(error => {
                toast.error(error.response.data.apierror.message);
                setRefetch(!reFetch)
            });
    }

    const handleDelete = (e) => {
        deleteSchoolFeeType(e.row.original.feeTypeId)
            .then(response => {
                toast.success(response.data);
                setRefetch(!reFetch)
            })
            .catch(error => {
                toast.error(error.response.data.apierror.message);
                setRefetch(!reFetch)
            });
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
                        data={rowData}
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
