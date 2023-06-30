import { useEffect } from 'react';
import { getClassesFeeDetails, getSchoolClassesData } from '../../../utils/services';
import { useState } from 'react';
import { Accordion, Button } from "react-bootstrap";
import { GetClassData } from './getClassData';
import { getManageFeesType } from '../../../redux/actions/manageFeesAction';
import { useDispatch, useSelector } from 'react-redux';


export const ManageClassFees = ({isWritePermission}) => {
    const schoolId = localStorage.getItem('schoolId');
    const feeoption = useSelector(state => state?.manageFees?.feesTypeRows || []);
    const feeTypeOption = feeoption.slice(1)
    const dispatch = useDispatch();
    const [data, setData] = useState([])
    const [openAccord, setOpenAccord] = useState(false)
    const [classId, setClassId]= useState(0)
    const [classTable, setClassTable] = useState([])
    const [reFetch, setReFetch] = useState(false)
    const [resetButton,setResetButton] = useState(false)

    const fetchSchoolClassesData = () => {
        getSchoolClassesData(schoolId)
            .then(response => {
                if (response.status === 200) {
                    setData(response?.data)
                }
            })
            .catch(error => {
                console.log(error);
            });
    }

    const fetchClassesFeeDetails = () => {
        getClassesFeeDetails(classId)
            .then(response => {
                if (response.status === 200) {
                    const temp2 =(response.data || [])
                    const temp=[{classId:'',classFee:''}]
                    const temp1 = [...temp, ...temp2]
                    setClassTable(temp1)
                }
            })
            .catch(error => {
                console.log(error);

            });
    }

    useEffect(() => {
        if (openAccord){
        fetchClassesFeeDetails()
    }
    },[openAccord, classId, reFetch])

    useEffect(() => {
        fetchSchoolClassesData()
    }, [])

    useEffect(() => {
        dispatch(getManageFeesType());
    }, [])
 
    return (
        <>
            <div className='content-area-inner inner-page-outer' style={{ width: '100%' }}>
                <div className='internal-page-wrapper'>
                    <div className='inner-content-wrap padt8  fee-type-wrapp'>
                        <div className='title-area'>
                            <h2>
                                Configure Class Fee
                            </h2>
                            <div className='btn-wrapper'>
                                <Button
                                    className='reset-btn'
                                    onClick={() => setResetButton(val => !val)}
                                    disabled={!isWritePermission}
                                >
                                    RESET
                                </Button>
                            </div>
                        </div>
                        <Accordion flush className='fee-accordian-wrapp'>
                            {data.map((val, index) =>
                                <Accordion.Item key={index} eventKey={index} onClick={() => { setOpenAccord(true); setClassId(val?.classId) }}>
                                    <Accordion.Header>{val?.className}</Accordion.Header>
                                    <Accordion.Body >
                                        <div className="table-wrapper manage-fee-wrapp classesFee">
                                            <table className="table" style={{ width: '100%' }}>
                                                <thead>
                                                    <tr valign="middle">
                                                        <th style={{textAlign:"center", }}>#</th>
                                                        <th style={{paddingLeft: "40px" }}>Fee Type</th>
                                                        <th  style={{paddingLeft: "75px" }}>Fee Amount</th>
                                                        <th style={{textAlign: "center" }}>Is Mandatory</th>
                                                        <th></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {classTable.map((val, i) => <GetClassData
                                                        key={i}
                                                        index={i}
                                                        tableData={val}
                                                        feeoption={feeTypeOption}
                                                        classId={classId}
                                                        setReFetch={setReFetch}
                                                        resetButton={resetButton}
                                                        isWritePermission={isWritePermission}
                                                    />)}
                                                </tbody>
                                            </table>
                                        </div>
                                    </Accordion.Body>
                                </Accordion.Item>
                            )}
                        </Accordion>
                    </div>
                </div>
            </div>
        </>
    )
}