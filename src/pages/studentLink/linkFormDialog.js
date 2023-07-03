import { Form, Formik } from 'formik';
import InputField from '../../components/form/InputField';
import DatePickerField from '../../components/form/DatePickerField';
import GenericDialog from '../../dialogs/GenericDialog';
import { Button } from 'react-bootstrap';
import { linkParentStudent } from '../../utils/services';
import { useState } from 'react';

const LinkFormDialog = ({ showForm, handleClose }) => {

    const [showOtpDialog, setShowOtpDialog] = useState(false)

    const handleOtpSubmit=(OtpData)=>{
        console.log(OtpData)
    }

    const handleSubmit = (formDataValue) => {
        const payload = {
            "schoolStudentId": formDataValue.schoolStudentId,
            "dateOfBirth": formDataValue.dateOfBirth,
            "classId": parseInt(formDataValue.classId),
            "schoolId": parseInt(formDataValue.schoolId)
        }
        // setShowOtpDialog(true)
        linkParentStudent(payload)
            .then(res => {console.log(res); setShowOtpDialog(true)})
            .catch(err => console.log(err))
    }


    return (
        <>
            <GenericDialog
                show={showForm}
                handleClose={handleClose}
                modalHeader="Enter Student Details"
                className="className='signin-model add-child-model"
            >
                <div className='model-body-col'>
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
                                <div className='frm-cell'>
                                    <label>School Student Id</label>
                                    <div className='field-group-wrap'>
                                        <InputField
                                            fieldName="schoolStudentId"
                                            className='frm-cell'
                                            value={values.schoolStudentId}
                                            fieldType="text"
                                            placeholder="School Student Id"
                                            errors={errors}
                                            touched={touched}
                                        />
                                    </div>
                                </div>
                                <div className="frm-cell">
                                    <label>Date Of Birth</label>
                                    <DatePickerField
                                        name='dateOfBirth'
                                        value={values.dateOfBirth}
                                        setFieldValue={setFieldValue}
                                        errors={errors}
                                        touched={touched}
                                        dateFormat='yyyy-MM-dd'
                                    />
                                </div>
                                <div className='frm-cell'>
                                    <label>class Id</label>
                                    <div className='field-group-wrap'>
                                        <InputField
                                            fieldName="classId"
                                            value={values.classId}
                                            className='frm-cell'
                                            fieldType="text"
                                            placeholder="class Id"
                                            errors={errors}
                                            touched={touched}
                                        />
                                    </div>
                                </div>
                                <div className='frm-cell'>
                                    <label>School Id</label>
                                    <div className='field-group-wrap'>
                                        <InputField
                                            fieldName="schoolId"
                                            value={values.schoolId}
                                            fieldType="text"
                                            className='frm-cell'
                                            placeholder="School Id"
                                            errors={errors}
                                            touched={touched}
                                        />
                                    </div>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'end' }}>
                                    <Button type='submit'>SUBMIT</Button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </GenericDialog>
            {showOtpDialog && <Formik
                initialValues={{
                    one: '',
                    two: '',
                    three: '',
                    four: ''
                }}
                onSubmit={(values)=>handleOtpSubmit(values)}
            >
                {({ values, errors, touched, setFieldValue }) => (
                    <div>
                        <div>Enter Your One Time Password (OTP)</div>
                        <div style={{display:'flex', justifyContent:'center', margin:'10px'}}>
                            <InputField
                                fieldName="one"
                                className='frm-cell'
                                value={values.one}
                                fieldType="text"
                                errors={errors}
                                touched={touched}
                            />
                            <InputField
                                fieldName="two"
                                className='frm-cell'
                                value={values.two}
                                fieldType="text"
                                errors={errors}
                                touched={touched}
                            />
                            <InputField
                                fieldName="three"
                                className='frm-cell'
                                value={values.three}
                                fieldType="text"
                                errors={errors}
                                touched={touched}
                            />
                            <InputField
                                fieldName="four"
                                className='frm-cell'
                                value={values.four}
                                fieldType="text"
                                errors={errors}
                                touched={touched}
                            />
                        </div>
                        <div>
                            <Button type="submit">Submit</Button>
                        </div>
                    </div>
                )}

            </Formik>}
        </>
    )
}

export default LinkFormDialog;