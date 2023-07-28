import { Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import DatePickerField from '../../components/form/DatePickerField';
import InputField from '../../components/form/InputField';
import { getStates } from '../../redux/actions/masterData';
import { populateCities, populateClass, populateSchool } from '../../utils/populateOptions';
import { linkParentStudent } from '../../utils/services';

const StudentForm = ({ setData, setSearchResponse, setDisplayCss, }) => {

    const dispatch = useDispatch()
    const stateOptions = useSelector((state) => state.masterData.states);
    const [cityOptions, setCityOptions] = useState([
        { text: "Select City", value: "" },
    ]);
    const [schoolOptions, setSchoolOptions] = useState([
        { text: "Select School", value: "" },
    ]);
    const [classOptions, setClassOptions] = useState([
        { text: "Select Class", value: "" },
    ]);

    const handleSubmit = (formDataValue) => {
        const payload = {
            "schoolStudentId": formDataValue.schoolStudentId,
            "dateOfBirth": formDataValue.dateOfBirth,
            "classId": parseInt(formDataValue.classId),
            "schoolId": parseInt(formDataValue.schoolId)
        }
        linkParentStudent(payload)
            .then(res => { setData(res?.data); setSearchResponse(2); setDisplayCss(true) })
            .catch(err => { setDisplayCss(false); setSearchResponse(1); }

            )
    }

    useEffect(() => {
        dispatch(getStates());
    }, []);

    return (
        <div className='esf-content-inner' 
        // style={{
        //     width: '100%',
        //     margin: '10px 10px 20px 20px'
        // }}
        
        >
            <div className='cell-block left' 
                // style={{
                //     border: '1px solid lightGrey',
                //     borderRadius: '5px',
                //     padding: '10px'
                // }}
            >
                <h2>Search Registered student by following <span className='red-star'>*</span></h2>
                <Formik
                    initialValues={{
                        schoolStudentId: '',
                        dateOfBirth: '',
                        classId: '',
                        schoolId: '',
                        state: '',
                        city: ''
                    }}
                    onSubmit={(values) => handleSubmit(values)}
                >
                    {({ values, errors, touched, setFieldValue }) => (
                        <Form className='enroll-student-frm'>
                            <div className='frm-fld' 
                            // style={{ marginBottom: '10px' }}
                            
                            >
                                <label>State :</label>
                                <InputField
                                    fieldName="state"
                                    fieldType="select"
                                    placeholder=""
                                    value={values.state}
                                    selectOptions={stateOptions}
                                    onChange={(e) => {
                                        setFieldValue('state', e.target.value);
                                        setFieldValue("city", "");
                                        populateCities(e.target.value, setCityOptions);
                                    }
                                    }
                                    errors={errors}
                                    touched={touched}
                                    required
                                />
                            </div>
                            <div className='frm-fld'>
                                <label>City :</label>
                                <InputField
                                    fieldName="city"
                                    fieldType="select"
                                    placeholder=""
                                    value={values.city}
                                    selectOptions={cityOptions}
                                    onChange={(e) => {
                                        setFieldValue('city', e.target.value);
                                        setFieldValue("schoolId", "");
                                        populateSchool(e.target.value, cityOptions, setSchoolOptions);
                                    }
                                    }
                                    errors={errors}
                                    touched={touched}
                                    required
                                />
                            </div>
                            <div className='frm-fld'>
                                <label>School Name</label>
                                <div className='field-group-wrap'>
                                    <InputField
                                        fieldName="schoolId"
                                        fieldType="select"
                                        placeholder=""
                                        value={values.schoolId}
                                        selectOptions={schoolOptions}
                                        onChange={(e) => {
                                            setFieldValue('schoolId', e.target.value)
                                            populateClass(e.target.value, setClassOptions);
                                            setFieldValue("classId", "");
                                        }
                                        }
                                        errors={errors}
                                        touched={touched}
                                        required
                                    />
                                </div>
                            </div>
                            <div className='frm-fld'>
                                <label>class Name</label>
                                <div className='field-group-wrap'>
                                    <InputField
                                        fieldName="classId"
                                        fieldType="select"
                                        placeholder=""
                                        value={values.classId}
                                        selectOptions={classOptions}
                                        onChange={(e) => {
                                            setFieldValue('classId', e.target.value);
                                        }
                                        }
                                        errors={errors}
                                        touched={touched}
                                        required
                                    />
                                </div>
                            </div>
                            <div className='frm-fld'>
                                <label>School Student Id</label>
                                <div className='field-group-wrap'>
                                    <InputField
                                        fieldName="schoolStudentId"
                                        value={values.schoolStudentId}
                                        fieldType="text"
                                        className='frm-cell'
                                        placeholder="Enter ID"
                                        errors={errors}
                                        touched={touched}
                                        required
                                    />
                                </div>
                            </div>
                            <div className='frm-fld'>
                                <label>Date Of Birth</label>
                                <DatePickerField
                                    name='dateOfBirth'
                                    value={values.dateOfBirth}
                                    setFieldValue={setFieldValue}
                                    errors={errors}
                                    touched={touched}
                                    dateFormat='yyyy-MM-dd'
                                    required
                                    maxDate={new Date()}
                                />
                            </div>
                            <div className='btn-wrapper' 
                            
                            // style={{ display: 'flex', justifyContent: 'start', marginTop: '10px' }}
                            
                            >
                                <Button
                                    type='submit'
                                    disabled={values.dateOfBirth === '' || values.schoolStudentId === '' || values.classId === ''}
                                    style={{
                                        backgroundColor:`${values.dateOfBirth === '' || values.schoolStudentId === '' || values.classId === '' ? 'grey' : ''}`,
                                        border:`${(values.dateOfBirth === '' || values.schoolStudentId === '' || values.classId === '') ? '1px solid grey' : ''}`
                                    }}
                                >LOCATE STUDENT</Button>
                                <Button
                                    style={{ backgroundColor: 'grey', border: '1px solid grey', marginLeft: '10px' }}
                                    type='reset'
                                    onClick={() => { setSearchResponse(0); setDisplayCss(true) }}
                                >RESET</Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>

    )
}

export default StudentForm;