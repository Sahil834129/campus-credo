import { Form, Formik } from 'formik';
import OtpTimer from "otp-timer";
import React, { useState } from "react";
import { Container } from 'react-bootstrap';
import OtpInput from "react-otp-input";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { ReactComponent as SignupLogo } from "../assets/img/singup-logo.svg";
import Button from "../components/form/Button";
import InputField from "../components/form/InputField";
import { VerifyPhoneSchema } from "../data/validationSchema";
import RestEndPoint from "../redux/constants/RestEndpoints";
import RESTClient from "../utils/RestClient";

const VerifyPhone = () => {
    const navigate = useNavigate();
    let {phone} = useParams();
    const [submitting, setSubmitting] = useState(false);
    const [resendOtp, setResendOtp] = useState(false);

    const verifyOTP = (formData) => {
        setSubmitting(true);
        let reqPayload = {phone: phone, otp: formData.otp};
        RESTClient.post(RestEndPoint.VERIFY_PHONE, reqPayload).then((response) => {
            setSubmitting(false);
            navigate("/?login=true");
        }).catch((error) => {
            setSubmitting(false);
            toast.error(RESTClient.getAPIErrorMessage(error));
        });
    };
const resendOtpForPhoneVerify=async()=>
{
    setResendOtp(true);
    try {
        await RESTClient.post(RestEndPoint.SEND_OTP, { "phone" : phone });
    
    } catch (err) {
        toast.error(RESTClient.getAPIErrorMessage(err));
    }
}
    return (
        <Container className="main-container signup-main" fluid>
            <div className="signup-wrapper verify-phone-main">
               
                <div className="signup-col">
                    <SignupLogo />
                    <div className="form-wrapper verify-phone">
                        
                        <div className="form-title">
                            <h2>Verify OTP</h2>
                            <h4>Verify your mobile number with the OTP sent to you via SMS.</h4>
                        </div>
                        <div className="form-container">
                            <Formik initialValues={{ phone: {phone}, otp: ''}} validationSchema={VerifyPhoneSchema} validateOnBlur onSubmit={values => { verifyOTP(values)}}>
                                {({  errors, touched,setFieldValue ,values}) => (
                                <Form className=''>
                                    <InputField fieldName="phone" fieldType="text" value={phone} placeholder="" readOnly={true} errors={errors} touched={touched}/> 
                                    <div className='otp-wrapper'>
                                        <OtpInput
                                        onChange={(otp) =>
                                            setFieldValue("otp", otp)
                                        }
                                        numInputs={4}
                                        className='otp-fld'
                                        isInputNum={true}
                                        shouldAutoFocus
                                        value={values.otp}
                                        placeholder="----"
                                           inputStyle={{
                                        //     color: "blue",
                                             width: "52px",
                                             height: "52px",
                                        //     margin: "15px 0.5rem",
                                        //     fontSize: "2rem",
                                        //     borderRadius: 4,
                                        //     caretColor: "blue",
                                        //     marginLeft:"0px",
                                        //     border: "1px solid rgba(0,0,0,0.3)",
                                           }}
                                        />
                                    </div>
                                    {errors.otp && <span className='error'>{errors.otp}</span>}

                                    <div className='resend-action-wrapper'>
                                    {   resendOtp? 
                                        <OtpTimer minutes={0}
                                            seconds={30}
                                            text="Resend OTP in"
                                            ButtonText="Resend OTP"
                                            resend={() => {
                                                resendOtpForPhoneVerify();
                                            }}
                                        /> : <Link className='resend-otp-btn' onClick={()=>{
                                            resendOtpForPhoneVerify();
                                            }}>Send OTP Again</Link>
                                    }
                                    </div>
                                    <br/>
                                        <div className='button-wrap'>
                                            <Button buttonLabel="Verify" submitting={submitting}/>
                                        </div>
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