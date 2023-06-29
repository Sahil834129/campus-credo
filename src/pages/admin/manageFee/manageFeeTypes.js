import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import { getManageFeesType } from '../../../redux/actions/manageFeesAction';
import { useDispatch, useSelector } from 'react-redux';
import { GetData } from './getData';


export const ManageFeesTypes = ({isWritePermission}) => {

    const rowsData = useSelector(state => state?.manageFees?.feesTypeRows || []);
    const dispatch = useDispatch();
    const [reFetch, setRefetch] = useState(false)
    const [resetButton,setResetButton] = useState(false)

    useEffect(() => {
        dispatch(getManageFeesType());
    }, [reFetch])

    return (
        <div className='content-area-inner inner-page-outer' style={{ width: '100%' }}>
            <div className='internal-page-wrapper'>
                <div className='inner-content-wrap padt8'>
                    <div className='title-area'>
                        <h2>
                            Create Fee Type
                        </h2>
                        <div className='btn-wrapper'>
                            <Button 
                            className='reset-btn'
                            onClick={()=>setResetButton(val=>!val)}
                            disabled={isWritePermission}    
                            >
                                RESET
                            </Button>
                        </div>
                    </div>
                    <div className="table-wrapper manage-fee-wrapp">
                        <table className="table" style={{ width: '100%' }}>
                            <thead>
                                <tr valign="middle">
                                    <th style={{textAlign:"center", backgroundColor:"rgba(65, 40, 95, 0.02)", boxShadow:"0px -1px 0px 0px rgba(0, 0, 0, 0.12) inset" }}>#</th>
                                    <th style={{paddingLeft: "35px" }}>Fee Name</th>
                                    <th style={{paddingLeft: "30px" }}>Payment Frequency</th>
                                    <th style={{ textAlign:"right", paddingRight:"16px"}}> </th>
                                </tr>
                            </thead>
                            <tbody>
                                {rowsData.map((val, index) =>
                                    <GetData
                                        key={index}
                                        rowData={val}
                                        index={index}
                                        reFetch={reFetch}
                                        setRefetch={setRefetch}
                                        resetButton={resetButton}
                                        isWritePermission={isWritePermission}
                                    />
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    )
}
