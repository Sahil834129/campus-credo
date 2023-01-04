import { Form, Formik } from 'formik';
import React, { useState } from "react";
import { toast } from "react-toastify";
import Button from "../components/form/Button";
import InputField from "../components/form/InputField";
import { ForgotPasswordSchema } from "../data/validationSchema";
import RestEndPoint from "../redux/constants/RestEndpoints";
import RESTClient from "../utils/RestClient";
import GenericDialog from "./GenericDialog";

const ForgotPasswordDialog = (props) => {
    const [submitting, setSubmitting] = useState(false);
    const submitResetPasswordForm = async(values) => {
        setSubmitting(true);
        try {
            const response = await RESTClient.post(RestEndPoint.FORGOT_PASSWORD, values)
            setSubmitting(false);
            toast.success("Password reset mail sent.")
        } catch (error) {
            setSubmitting(false);
            toast.error(RESTClient.getAPIErrorMessage(error))
        }
    };
    return (
        <GenericDialog className="forgotpwd-model" show={props.show} handleClose={props.handleClose}>
            <div className='model-body-col'>
                <h4>An email will be sent with reset password link.</h4>
                <Formik initialValues={{ email: '' }}
                    validationSchema={ForgotPasswordSchema} validateOnBlur onSubmit={values => { submitResetPasswordForm(values) }}>
                    {({ errors, touched }) => (
                        <Form className=''>
                            <InputField fieldName="email" fieldType="text" placeholder="Email Address" errors={errors} touched={touched} />
                            <div className="btn-wrapper">
                                <Button class="signin-btn" buttonLabel="Reset Password" submitting={submitting} />
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </GenericDialog>
    );
};

export default ForgotPasswordDialog;
