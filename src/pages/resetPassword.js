import { Form, Formik } from 'formik';
import React, { useState } from "react";
import { Container } from 'react-bootstrap';
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../components/form/Button";
import InputField from "../components/form/InputField";
import { ChangePasswordSchema } from "../data/validationSchema";
import RestEndPoint from "../redux/constants/RestEndpoints";
import RESTClient from "../utils/RestClient";

const ResetPassword = () => {
    const navigate = useNavigate()
    const [submitting, setSubmitting] = useState(false);
    let {token} = useParams();
    
    const resetPassword = async (formData) => {
        setSubmitting(true);
        try {
            const response = await RESTClient.post(RestEndPoint.RESET_PASSWORD + `/${token}`, formData)
            setSubmitting(false);
            toast.success("Password changed successfully")
            navigate("/?login=true")
        } catch (error) {
            setSubmitting(false);
            toast.error(RESTClient.getAPIErrorMessage(error))
        }
    };

    return (
        <Container className="main-container signup-main" fluid>
            <div className="signup-wrapper">
                
                <div className="signup-col">
                    <div className="form-wrapper">
                        <div className="form-title"><h4>Reset Password</h4></div>
                        <div className="form-container">
                            <Formik initialValues={{
                                password: '', confirmPassword: ''
                            }}
                                validationSchema={ChangePasswordSchema} validateOnBlur
                                onSubmit={values => { resetPassword(values) }}>
                                {({ errors, touched }) => (
                                    <Form>
                                        <InputField fieldName="password" required label="Password" fieldType="password" placeholder="Enter new password" errors={errors} touched={touched} />
                                        <InputField fieldName="confirmPassword" required label="Confirm Password" fieldType="password" placeholder="Re-enter Password" errors={errors} touched={touched} />
                                        <Button class="signin-btn" buttonLabel="Save" submitting={submitting} />
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default ResetPassword;


