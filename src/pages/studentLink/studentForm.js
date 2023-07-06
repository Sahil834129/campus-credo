import { Form, Formik } from 'formik';
import { linkParentStudent } from '../../utils/services';
import { toast } from 'react-toastify';
import InputField from '../../components/form/InputField';
import DatePickerField from '../../components/form/DatePickerField';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getStates } from '../../redux/actions/masterData';
import { useEffect } from 'react';
import { populateCities, populateClass, populateSchool } from '../../utils/populateOptions';
import { useState } from 'react';

const StudentForm = ({ setData, setPageStep }) => {

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
            .then(res => { setData(res?.data); setPageStep(2) })
            .catch(err =>
                toast.error(err?.response?.data?.apierror?.message || "Please Check Details")
            )
    }

    useEffect(() => {
        dispatch(getStates());
    }, []);

    return (
        <Formik
            initialValues={{
                schoolStudentId: '',
                dateOfBirth: '',
                classId: '',
                schoolId: ''
            }}
            onSubmit={(values) => handleSubmit(values)}
        >
            {({ values, errors, touched, setFieldValue }) => (
                <Form className='model-frm' >
                    <div style={{ display: 'flex', justifyContent: 'space-between', margin:'20px 0px' }}>
                        <div style={{ width: "45%" }}>
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
                        <div style={{ width: "45%" }}>
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
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', margin:'20px 0px'  }}>
                        <div style={{ width: "45%" }}>
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
                        <div style={{ width: "45%" }}>
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
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', margin:'20px 0px'  }}>
                        <div style={{ width: "45%" }}>
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
                        <div style={{ width: "45%" }}>
                            <label>Date Of Birth</label>
                            <DatePickerField
                                name='dateOfBirth'
                                value={values.dateOfBirth}
                                setFieldValue={setFieldValue}
                                errors={errors}
                                touched={touched}
                                dateFormat='yyyy-MM-dd'
                                required
                                maxDate ={new Date()}
                            />
                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'end', margin:'20px 0px' }}>
                        <Button type='submit'>SUBMIT</Button>
                    </div>
                </Form>
            )}
        </Formik>

    )
}

export default StudentForm;