import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import { getManageFeesType } from '../../../redux/actions/manageFeesAction';
import { useDispatch, useSelector } from 'react-redux';
import { GetData } from './getData';


export const ManageFeesTypes = () => {

    const rowsData = useSelector(state => state?.manageFees?.feesTypeRows || []);
    const dispatch = useDispatch();
    const [reFetch, setRefetch] = useState(false)

    useEffect(() => {
        dispatch(getManageFeesType());
    }, [reFetch])

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
                                RESET
                            </Button>
                        </div>
                    </div>
                    <div >
                        <table style={{ width: '100%' }}>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Fee Name</th>
                                    <th>Payment Frequency</th>
                                    <th>Action</th>
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
