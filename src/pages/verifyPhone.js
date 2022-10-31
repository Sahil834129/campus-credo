import React, {useState} from "react";
import {useParams, useNavigate} from "react-router-dom";
import InputField from "../components/form/InputField";
import {Container} from 'react-bootstrap';
import { ReactComponent as SignupLogo } from "../assets/img/singup-logo.svg";
import { Formik, Form } from 'formik';
import Button from "../components/form/Button";
import { VerifyPhoneSchema } from "../data/validationSchema";
import RestEndPoint from "../redux/constants/RestEndpoints";
import RESTClient from "../utils/RestClient";
import RegisterInfoGraphic from "../components/user/RegisterInfoGraphic";
import {ToastContainer, toast} from "react-toastify";

const VerifyPhone = () => {
    const navigate = useNavigate();
    let {phone} = useParams();
    const [submitting, setSubmitting] = useState(false);

    const verifyOTP = (formData) => {
        setSubmitting(true);
        let reqPayload = {phone: phone, otp: formData.otp};
        RESTClient.post(RestEndPoint.VERIFY_PHONE, reqPayload).then((response) => {
            setSubmitting(false);
            navigate("/signIn");
        }).catch((error) => {
            setSubmitting(false);
            toast.error(RESTClient.getAPIErrorMessage(error));
        });
    };

    return (
        <Container className="main-container singup-main" fluid>
            <div className="signup-wrapper">
                <div className="signup-col left">
                    <RegisterInfoGraphic/>
                </div>
                <div className="signup-col right">
                    <SignupLogo />
                    <div className="form-wrapper">
                        <div className="form-title"><span>Verify your mobile number with the OTP sent to you via SMS.</span></div>
                        <div className="form-container">
                            <Formik initialValues={{ phone: {phone}, otp: ''}} validationSchema={VerifyPhoneSchema} validateOnBlur onSubmit={values => { verifyOTP(values)}}>
                                {({  errors, touched }) => (
                                    <Form>
                                        <InputField fieldName="phone" fieldType="text" value={phone} placeholder="" readOnly={true} errors={errors} touched={touched}/> 
                                        <InputField fieldName="otp" fieldType="password" placeholder="Enter OTP" errors={errors} touched={touched}/> 
                                        <Button buttonLabel="Verify" submitting={submitting}/>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer autoClose={2000} position="top-right"/>
        </Container>
    );
};

export default VerifyPhone;