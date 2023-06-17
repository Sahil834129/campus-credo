import { useEffect } from 'react';
import { getClassesFeeDetails, getSchoolClassesData } from '../../../utils/services';
import { useState } from 'react';
import { Accordion } from "react-bootstrap";
import { GetClassData } from './getClassData';
import { getManageFeesType } from '../../../redux/actions/manageFeesAction';
import { useDispatch, useSelector } from 'react-redux';


export const ManageClassFees = () => {
    const schoolId = localStorage.getItem('schoolId');
    const feeoption = useSelector(state => state?.manageFees?.feesTypeRows || []);
    const feeTypeOption = feeoption.slice(1)
    const dispatch = useDispatch();
    const [data, setData] = useState([])
    const [openAccord, setOpenAccord] = useState(false)
    const [classId, setClassId]= useState(0)
    const [classTable, setClassTable] = useState([])
    const [reFetch, setReFetch] = useState(false)

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
                <Accordion flush >
                    {data.map((val, index) =>
                        <Accordion.Item key={index} eventKey={index} onClick={()=>{setOpenAccord(true);setClassId(val?.classId)}}>
                            <Accordion.Header>{val?.className}</Accordion.Header>
                            <Accordion.Body >
                                <div>
                                    <table style={{ width: '100%' }}>
                                        <thead>
                                            <tr>
                                                <th >#</th>
                                                <th>Fee Type</th>
                                                <th>Fee Amount</th> 
                                                <th>Is Mandatory</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {classTable.map((val, i)=><GetClassData 
                                            key={i} 
                                            index={i} 
                                            tableData={val} 
                                            feeoption={feeTypeOption} 
                                            classId={classId}
                                            setReFetch={setReFetch}
                                            />)}
                                        </tbody>
                                    </table>
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                    )}
                </Accordion>

            </div>
        </>
    )
}