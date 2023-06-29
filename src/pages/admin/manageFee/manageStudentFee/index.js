import { useEffect, useRef } from "react"
import { Button, Form } from "react-bootstrap"
import { findStudentsDetails, getSchoolClassesData } from "../../../../utils/services";
import { useState } from "react";
import { CLASS_SECTION, OPERATORS } from "../../../../constants/app";
import { GetStudent } from "./getStudent";
import Loader, { hideLoader, showLoader } from "../../../../common/Loader"
import { useDispatch } from "react-redux";



export const ManageStudentFee = ({isWritePermission, module}) => {
    const [classes, setClasses] = useState([])
    const [classId, setClassId] = useState('')
    const [classSection, setClassSection] = useState('')
    const [studentDetails, setStudentDetails] = useState([])
    const classSelected = useRef('')
    const dispatch = useDispatch()

    const fetchSchoolClassesData = () => {
        const schoolId = localStorage.getItem('schoolId');
        getSchoolClassesData(schoolId)
            .then(response => {
                if (response.status === 200) {
                    setClasses(response?.data)
                }
            })
            .catch(error => {
                console.log(error);
            });
    }

    const findStudents = () => {
        if (classId === null || classId === '') {
            classSelected.current.style.borderColor = 'red'
        } else {
            showLoader(dispatch);
            const payload = {}
            const load = [
                {
                    field: "classes",
                    operator: OPERATORS.EQUALS,
                    value: classId
                },
            ]
            if (!(classSection === '')) {
                load.push({
                    field: "classSection",
                    operator: OPERATORS.EQUALS,
                    value: classSection
                })
            }
            payload['filters'] = load;
            findStudentsDetails(payload)
                .then(response => {
                    if (response.status === 200) {
                        setStudentDetails(response.data);
                        hideLoader(dispatch);
                    }
                })
                .catch(error => {
                    console.log(error);
                    hideLoader(dispatch);
                });
        }
    }

    useEffect(() => {
        setClassId('')
        setClassSection('')
        setStudentDetails([])
        fetchSchoolClassesData()
    }, [module])

    return (
        <div className='inner-content-wrap' style={{ width: '100%' }}>
            <div className='internal-page-wrapper'>
                <div className='inner-content-wrap padt8'>
                    <div className='title-area'>
                        <div className="admission-fld-wrap">
                            <div className="admission-fld-wrap">
                                <h2>
                                    Select Class
                                </h2>
                                <Form.Select
                                    ref={classSelected}
                                    size='sm'
                                    value={classId}
                                    style={{ width: '100px', }}
                                    disabled={!isWritePermission}
                                    onChange={(e) => {
                                        setClassId(e.target.value);
                                        classSelected.current.style.borderColor = ''
                                    }}
                                >
                                    <option value=''>SELECT</option>
                                    {classes.map((val, index) => <option key={index} value={val.classId}>{val.className}</option>)}

                                </Form.Select>
                            </div>
                            <div className="admission-fld-wrap">
                                <h2>
                                    Select Section
                                </h2>
                                <Form.Select
                                    size='sm'
                                    value={classSection}
                                    style={{ width: 'auto' }}
                                    disabled={!isWritePermission}
                                    onChange={(e) => { setClassSection(e.target.value); }}
                                >
                                    <option value=''>SELECT</option>
                                    {CLASS_SECTION.map((val, i) => <option key={i} value={val.value}>{val.text}</option>)}
                                </Form.Select>
                            </div>
                        </div>
                        <div className="btn-wrapper">
                        <Button className="save-btn" onClick={findStudents}>GO</Button>
                        </div>
                    </div>
                    <Loader/>
                    <div className="table-wrapper manage-fee-wrapp">
                        <table className="table" style={{ width: '100%' }}>
                            <thead>
                                <tr valign="middle">
                                    <th style={{textAlign:"center", backgroundColor:"rgba(65, 40, 95, 0.02)", boxShadow:"0px -1px 0px 0px rgba(0, 0, 0, 0.12) inset" }}>#</th>
                                    <th>Student Name</th>
                                    <th>Student ID</th>
                                    <th>Roll No.</th>
                                    <th>DOB</th>
                                    <th>Section</th>
                                    <th>Stream</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {studentDetails.length > 0
                                    ? studentDetails.map(
                                        (val, i) => <GetStudent student={val} key={i} index={i} classes={classes} module={module}/>
                                    )
                                    : <tr>
                                        <td colSpan='8'>
                                            NO DATA FOUND
                                        </td>
                                    </tr>
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}