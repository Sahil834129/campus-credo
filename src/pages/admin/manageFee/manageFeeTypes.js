import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import { getManageFeesType } from '../../../redux/actions/manageFeesAction';
import { useDispatch, useSelector } from 'react-redux';
import { GetData } from './getData';
import { SESSION } from "../../../constants/app";
import { getClassAdmissionSessionData } from "../../../utils/services";
import { Form } from "react-bootstrap";


export const ManageFeesTypes = ({ isWritePermission }) => {

    const rowsData = useSelector(state => state?.manageFees?.feesTypeRows || []);
    const dispatch = useDispatch();
    const [reFetch, setRefetch] = useState(false);
    const [resetButton, setResetButton] = useState(false);
    const [session, setSession] = useState(SESSION);
    const [sessionOption, setSessionOption] = useState([]);

    const fetchAdmissionSession = () => {
        getClassAdmissionSessionData()
            .then(response => {
                console.log(response.data);
                if (response.data?.length > 2) {
                    response.data.pop();
                    setSessionOption(response.data);
                    setSession(response.data[1]);
                }
            })
            .catch(error => {
                console.log(error);
            });
    };

    useEffect(() => {
        dispatch(getManageFeesType(session));
    }, [reFetch]);

    useEffect(() => {
        fetchAdmissionSession();
    }, []);
    return (
        <div className='content-area-inner inner-page-outer' style={{ width: '100%' }}>
            <div className='internal-page-wrapper'>
                <div className='inner-content-wrap padt8'>
                    <div className='title-area'>
                        <h2>
                            Create Fee Type
                        </h2>
                        <div className="admission-fld-wrap">
                            <h2>
                                Select Session
                            </h2>
                            <Form.Select
                                size='sm'
                                value={session}
                                style={{ width: '150px', }}
                                // disabled={!isWritePermission}
                                onChange={(e) => {
                                    setSession(e.target.value);
                                }}
                            >
                                {sessionOption.map((val, index) => (
                                    <option value={val} key={`select${index}`}>{val}</option>
                                ))}
                            </Form.Select>
                        </div>
                        <div className='btn-wrapper'>
                            <Button
                                className='reset-btn'
                                onClick={() => setResetButton(val => !val)}
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
                                    <th style={{ textAlign: "center", backgroundColor: "rgba(65, 40, 95, 0.02)", boxShadow: "0px -1px 0px 0px rgba(0, 0, 0, 0.12) inset" }}>#</th>
                                    <th style={{ paddingLeft: "35px" }}>Fee Name</th>
                                    <th style={{ paddingLeft: "30px" }}>Payment Frequency</th>
                                    <th style={{ textAlign: "right", paddingRight: "16px" }}> </th>
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
                                        session={session}
                                    />
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
};
