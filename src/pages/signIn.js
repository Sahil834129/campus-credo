import OtpTimer from "otp-timer";
import React, { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import OtpInput from "react-otp-input";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import RegisterInfoGraphic from "../components/user/RegisterInfoGraphic";
import RestEndPoint from "../redux/constants/RestEndpoints";
import { isValidatePhone, resetUserLoginData, setUserLoginData } from "../utils/helper";
import RESTClient from "../utils/RestClient";

const SignIn = () => {
    const navigate = useNavigate();
    const [submitting, setSubmitting] = useState(false);
    const [sendingOTP, setSendingOTP] = useState(false);
    const [otpSent, setOtpSent] = useState(false);
    const [loginWithOTP, setLoginWithOTP] = useState(false);
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState('');
    const [password, setPassword] = useState('');
    const [otpSentCounter, setOtpSentCounter] = useState(1);
    const [otpMinutes, setOtpMinutes] = useState(0);
    //const handleShowPasswordDialog = () => {}

    useEffect(() => {
        if (otpSentCounter === 4) {
            setOtpMinutes(2);
        } else if (otpSentCounter === 1) {
            setOtpMinutes(0);
        }
    }, [otpSentCounter]);

    const sendOTP = () => {
        if (isValidatePhone(phone)) {
            const reqPayload = {phone: phone}
            setSendingOTP(true);
            RESTClient.post(RestEndPoint.SEND_OTP, reqPayload).then((response) => {
                setSendingOTP(false);
                setOtpSent(true);
            }).catch((error) => {
                toast.error(RESTClient.getAPIErrorMessage(error));
                setSendingOTP(false);
            });
        } else {
            toast.error("Invalid mobile number.");
        }
    }

    const getSendOTPLinkMessage = () => {
        return (
            sendingOTP ? 'Sending OTP...' : (otpSent ? <OtpTimer minutes={otpMinutes}
                seconds={30}
                text="Resend OTP in"
                ButtonText="Send OTP"
                resend={() => {
                    sendOTP();
                    setOtpSentCounter((val) =>
                        val === 2 ? 1 : val + 1,
                    );
                }}
            /> : <Link onClick={sendOTP}>Send OTP</Link>)
        )
        
    }

    const setOtpOrPassword = (value) => {
        loginWithOTP ? setOtp(value) : setPassword(value);
    }

    const signIn = () => {
        const reqPayload = {phone: phone}
        reqPayload[(loginWithOTP ? "otp" : "password")] = loginWithOTP ? otp : password;
        const action = loginWithOTP ? RestEndPoint.LOGIN_WITH_OTP : RestEndPoint.LOGIN_WITH_PASSWORD
        setSubmitting(true);
        const SchoolDetailsLatitude = localStorage.getItem('SchoolDetailsLatitude');
        const SchoolDetailsLongitude = localStorage.getItem('SchoolDetailsLongitude');
        const cities = localStorage.getItem('cities');
        resetUserLoginData();
        RESTClient.post(action, reqPayload).then((response) => {
            setUserLoginData(response.data, SchoolDetailsLatitude, SchoolDetailsLongitude, cities);
            setSubmitting(false);
            navigate("/");
        }).catch((error) => {
            toast.error(RESTClient.getAPIErrorMessage(error));
            setSubmitting(false);
        });
    }

    const handleOtpChange = (otps) => {
        setOtp(otps);
    }

    return (
        <Container className="main-container signup-main" fluid>
            <div className="signup-wrapper">
                <div className="signup-col left">
                    <RegisterInfoGraphic />
                </div>
                <div className="signup-col right">
                    <div className="form-wrapper">
                        <div className="form-title"><span>Sign In</span></div>
                        <div className="form-container">
                            <Form>
                                <Form.Group className="signin-fld-grp">
                                    <Form.Control type="phone" onChange={e=> setPhone(e.target.value)} placeholder="Mobile Number" />
                                </Form.Group>
                                <div className="singin-options-wrap">Sign in using <Form.Check inline type="radio" name="loginWithOTP" checked={!loginWithOTP} onChange={e => setLoginWithOTP(!e.target.checked)}/>
                                    password <Form.Check inline type="radio" name="loginWithOTP" checked={loginWithOTP} onChange={e => setLoginWithOTP(e.target.checked)} />
                                    Mobile OTP</div>
                                <Form.Group className="signin-fld-grp" controlId="formBasicCheckbox">
                                <div className="otp-fields-wrapper mt-3 mb-3">
                                        {loginWithOTP === true ? (
                                            <OtpInput
                                                onChange={handleOtpChange}
                                                numInputs={4}
                                                
                                                isInputNum={true}
                                                shouldAutoFocus
                                                value={otp}
                                                placeholder="------"
                                                inputStyle={{
                                                    // color: "blue",
                                                    // width: "2.5rem",
                                                    // height: "3rem",
                                                    // margin: "0 0.5rem",
                                                    // fontSize: "2rem",
                                                    // borderRadius: 4,
                                                    // caretColor: "blue",
                                                    // border: "1px solid rgba(0,0,0,0.3)",
                                                    
                                                }}

                                            />
                                        ) : <Form.Control type="password" placeholder={loginWithOTP ? "OTP" : "Password"} onChange={e=> setOtpOrPassword(e.target.value)}/>}
                                        {loginWithOTP ? getSendOTPLinkMessage() : ''}
                                    </div>
                                </Form.Group>
                                {/* <div className="form-group mb-3 forgot-pwd-container">
                                    <Link onClick={handleShowPasswordDialog}>Forgot Password?</Link>
                                </div> */}
                                <Form.Group className="mb-3 button-wrap">
                                    <Button variant="primary" disabled={submitting} onClick={signIn}>{submitting ? "Please wait..." :"Sign In"}</Button>
                                </Form.Group>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer autoClose={2000} position="top-right"/>
        </Container>
    );
};

export default SignIn;