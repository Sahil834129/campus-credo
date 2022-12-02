import React, {useState} from "react";
import Modal from 'react-bootstrap/Modal';
import { Formik, Form } from 'formik';
import InputField from "../components/form/InputField";
import Button from "../components/form/Button";
import { ForgotPasswordSchema } from "../data/validationSchema";
import RESTClient from "../utils/RestClient";
import RestEndPoint from "../redux/constants/RestEndpoints";
import { toast } from "react-toastify";

const ForgotPasswordDialog = (props) => {
    const [submitting, setSubmitting] = useState(false);
    const submitResetPasswordForm = async(values) => {
        setSubmitting(true);
        try {
            const response = await RESTClient.post(RestEndPoint.FORGOT_PASSWORD, values)
            console.log("response : " + JSON.stringify(response))
            setSubmitting(false);
            toast.success("Password reset mail sent.")
        } catch (error) {
            setSubmitting(false);
            toast.error(RESTClient.getAPIErrorMessage(error))
        }
    };
    return (
        <Modal dialogClassName="forgotpwd-model" show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body dialogClassName="model-body">
                <div className='model-body-col'>
                    <h4>An email will be sent with reset password link.</h4>
                    <Formik initialValues={{ email: '' }}
                        validationSchema={ForgotPasswordSchema} validateOnBlur onSubmit={values => { submitResetPasswordForm(values) }}>
                        {({ errors, touched }) => (
                            <Form>
                                <InputField fieldName="email" fieldType="text" placeholder="Email Address" errors={errors} touched={touched} />
                                <Button class="signin-btn" buttonLabel="Reset Password" submitting={submitting} />
                            </Form>
                        )}
                    </Formik>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default ForgotPasswordDialog;
