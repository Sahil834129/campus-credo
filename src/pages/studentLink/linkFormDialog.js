import { Form, Formik } from 'formik';
import InputField from '../../components/form/InputField';
import GenericDialog from '../../dialogs/GenericDialog';
import { Button } from 'react-bootstrap';
import { confirmLinkParentStudent, verifyParentStudent } from '../../utils/services';
import { useState } from 'react';
import { getLocalData } from '../../utils/helper';
import { toast } from 'react-toastify';
import StudentForm from './studentForm';
import { validateStudentLinkOTP } from '../../data/validationSchema';

const LinkFormDialog = ({ setShowForm, showForm, handleClose, setUpdateTable, pageStep, setPageStep }) => {

    const [data, setData] = useState([])
    const userId = getLocalData('userId')

    const confirmLink = () => {
        const payload = {
            "studentId": data.studentId,
            "parentId": userId
        }
        confirmLinkParentStudent(payload)
            .then(res => {
                const temp = res.status
                if (temp === 200) {
                    setShowForm(false)
                    setUpdateTable(val => !val)
                }
            })
            .catch(err =>
                toast.error(err?.response?.data?.apierror?.message || "Please Check Details"))
    }

    const handleOtpSubmit = (OtpData) => {
        const result = OtpData.otp
        const payload = {
            "userId": userId,
            "otp": result
        }
        verifyParentStudent(payload)
            .then(res => setPageStep(3))
            .catch(err => {
                // setPageStep(3)
                toast.error(err?.response?.data?.apierror?.message || "Please Check Details")
            })
    }

    return (
        <GenericDialog
            show={showForm}
            handleClose={handleClose}
            modalHeader="Link Student"
            className="className='signin-model add-child-model"
        >
            <div className='model-body-col'>
                {(pageStep === 1) && <StudentForm setData={setData} setPageStep={setPageStep} />}
                {(pageStep === 2) && <Formik
                    initialValues={{
                        otp: '',
                    }}
                    validationSchema={validateStudentLinkOTP}
                    validateOnBlur
                    onSubmit={(values) => handleOtpSubmit(values)}
                >
                    {({ values, errors, touched, setFieldValue }) => (
                        <Form>
                            <div>
                                <div style={{ textAlign: 'center' }}>Verify your OTP</div>
                                <div style={{ display: 'flex', justifyContent: 'center', margin: '10px' }}>
                                    <InputField
                                        fieldName="otp"
                                        className='frm-cell'
                                        value={values.otp}
                                        fieldType="text"
                                        errors={errors}
                                        touched={touched}
                                        required
                                    />
                                </div>
                                <div>
                                    <Button type="submit" >Submit OTP</Button>
                                </div>
                            </div>
                        </Form>
                    )}

                </Formik>}
                {(pageStep === 3) && <div>
                    <div>
                        <div>
                            <label>Student Name : </label>
                            <label style={{ color: 'blue' }}>{`${data.firstName} ${data.lastName}`}</label>
                        </div>
                        <div>
                            <label>Class Name :</label>
                            <label style={{ color: 'blue' }}>{`${data.className}`}</label>
                        </div>
                        <div>
                            <label>Section :</label>
                            <label style={{ color: 'blue' }}>{`Section ${data.classSection}`}</label>
                        </div>
                        <div>
                            <label>Stream :</label>
                            <label style={{ color: 'blue' }}>{`${data.stream}`}</label>
                        </div>
                        <div className='frm-cell button-wrap' style={{ margin: '5px' }}>
                            <button class='save-btn btn btn-primary' onClick={confirmLink}>CONFIRM</button>
                        </div>
                    </div>
                </div>}
            </div>
        </GenericDialog>
    )
}

export default LinkFormDialog;