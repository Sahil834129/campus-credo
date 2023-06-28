import { useEffect } from "react"
import { Button, Form } from "react-bootstrap"
import { findStudentsDetails, getSchoolClassesData } from "../../../../utils/services";
import { useState } from "react";
import { CLASS_SECTION, OPERATORS } from "../../../../constants/app";
import { GetStudent } from "./getStudent";
import { hideLoader, showLoader } from "../../../../common/Loader"
import { useDispatch } from "react-redux";



export const ManageStudentFee = () => {
    const [classes, setClasses] = useState([])
    const [classId, setClassId] = useState('')
    const [classSection, setClassSection] = useState('')
    const [studentDetails, setStudentDetails] = useState([])
    const dispatch = useDispatch();

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
        const payload = {}
        const load = [
            {
                field: "classes",
                operator: OPERATORS.EQUALS,
                value: classId
            },
            {
                field: "classSection",
                operator: OPERATORS.EQUALS,
                value: classSection
            },
        ]
        payload['filters'] = load;
        showLoader(dispatch);
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

    useEffect(() => {
        fetchSchoolClassesData()
    }, [])

    return (
        <div className='content-area-inner inner-page-outer' style={{ width: '100%' }}>
            <div className='internal-page-wrapper'>
                <div className='inner-content-wrap padt8'>
                    <div className='title-area' style={{ paddingTop: 10, display: 'flex' }}>
                        <div style={{ display: 'flex' }}>
                            <div style={{ display: 'flex', marginRight: '10px' }}>
                                <h2 style={{ width: 'auto', marginRight: '10px', paddingTop: '10px' }}>
                                    Select Class
                                </h2>
                                <Form.Select
                                    size='sm'
                                    value={classId}
                                    style={{ width: '100px', }}
                                    onChange={(e) => { setClassId(e.target.value); }}
                                >
                                    <option value=''>SELECT</option>
                                    {classes.map((val, index) => <option key={index} value={val.classId}>{val.className}</option>)}

                                </Form.Select>
                            </div>
                            <div style={{ display: 'flex' }}>
                                <h2 style={{ width: 'auto', marginRight: '10px', paddingTop: '10px' }}>
                                    Select Section
                                </h2>
                                <Form.Select
                                    size='sm'
                                    value={classSection}
                                    style={{ width: 'auto' }}
                                    onChange={(e) => { setClassSection(e.target.value); }}
                                >
                                    <option value=''>SELECT</option>
                                    {CLASS_SECTION.map((val, i) => <option key={i} value={val.value}>{val.text}</option>)}
                                </Form.Select>
                            </div>
                        </div>
                        <Button onClick={findStudents}>GO</Button>
                    </div>
                    <div>
                        <table style={{ width: '100%' }}>
                            <thead>
                                <tr>
                                    <th >#</th>
                                    <th>Student Name</th>
                                    <th>Student ID</th>
                                    <th>Roll No.</th>
                                    <th>DOB</th>
                                    <th>Section</th>
                                    <th>Stream</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {studentDetails.map((val, i) => <GetStudent student={val} key={i} index={i} classes={classes} />)}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}