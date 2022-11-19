import React, {useState, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import ListGroup from 'react-bootstrap/ListGroup';
import {Form, Button} from "react-bootstrap";
import { isValidatePhone } from "../utils/helper";
import RESTClient from "../utils/RestClient";
import RestEndPoint from "../redux/constants/RestEndpoints";
import ForgotPasswordDialog from "./forgotPassword";
import { setUserLoginData, resetUserLoginData } from "../utils/helper";
import { useDispatch } from "react-redux";
import { getItemsInCart } from "../redux/actions/cartAction";
import { getChildsList } from "../redux/actions/childAction";
import { toast } from "react-toastify";
import OtpTimer from "otp-timer";
import OtpInput from "react-otp-input";
import { DEFAULT_ROLES } from "../constants/app";

const LoginDialog = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [submitting, setSubmitting] = useState(false);
    const [sendingOTP, setSendingOTP] = useState(false);
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState('');
    const [phone, setPhone] = useState('');
    const [loginWithOTP, setLoginWithOTP] = useState(false);
    const [password, setPassword] = useState('');
    const [showForgotPasswordDialog, setShowForgotPasswordDialog] = useState(false);
    const [otpSentCounter, setOtpSentCounter] = useState(1);
    const [otpMinutes, setOtpMinutes] = useState(0);

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
            console.log("Invalid mobile number.")
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
    const handleShowPasswordDialog = () => {
        props.handleClose();
        setShowForgotPasswordDialog(true);
    }
    const handleForgotPasswordClose = () => { setShowForgotPasswordDialog(false) };
    const signIn = () => {
        const reqPayload = {phone: phone}
        reqPayload[(loginWithOTP ? "otp" : "password")] = loginWithOTP ? otp : password;
        const action = loginWithOTP ? RestEndPoint.LOGIN_WITH_OTP : RestEndPoint.LOGIN_WITH_PASSWORD
        setSubmitting(true);
        resetUserLoginData();
        RESTClient.post(action, reqPayload).then((response) => {
            setUserLoginData(response.data);
            setSubmitting(false);
            loadUserData();
            props.handleClose();
            const roles = response.data.roles
            if (roles.find(val => val === DEFAULT_ROLES.SCHOOL_ADMIN)) {
                window.location.href = '/admin-dashboard'
            }
        }).catch((error) => {
            setSubmitting(false);
            toast.error(RESTClient.getAPIErrorMessage(error));
        });
    }

    const redirectSignUp = () => {
        navigate("/signUp");
    }

    const loadUserData = () => {
        dispatch(getItemsInCart());
        dispatch(getChildsList());
    }

    const handleOtpChange = (otps) => {
        setOtp(otps);
    }

    const handleClose = () => {
        setOtpSent(false);
        setSendingOTP(false);
        setLoginWithOTP(false);
        props.handleClose();
    }


    return (
        <>
        <Modal dialogClassName="signin-model" show={props.show} onHide={handleClose}>
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body dialogClassName="model-body">
                <div className='model-body-col left'>
                    <h2>Sign in</h2>
                    <h4>Sign in to check your favourite schools, filled forms and status of admission process.</h4>
                    <div className="form-container">
                            <Form>
                                <Form.Group className="mb-3">
                                    <Form.Control type="phone" onChange={e=> setPhone(e.target.value)} placeholder="Mobile Number" />
                                </Form.Group>
                                <div className="loginoption">
                                    <span className="loginoption-cell"><h2>Sign in using</h2></span> 
                                    <span className="loginoption-cell">
                                        <Form.Check inline type="radio" name="loginWithOTP" checked={!loginWithOTP} onChange={e => setLoginWithOTP(!e.target.checked)}/><label className="lbl">Password</label>
                                    </span> 
                                    <span className="loginoption-cell">
                                    <Form.Check inline type="radio" name="loginWithOTP" checked={loginWithOTP} onChange={e => setLoginWithOTP(e.target.checked)} /><label>Mobile OTP</label>
                                    </span>
                                </div>
                                <Form.Group className="mb-3">
                                    <div className="otp-fields-wrapper mt-3 mb-3">
                                        {loginWithOTP == true ? (
                                            <OtpInput
                                                onChange={handleOtpChange}
                                                numInputs={4}
                                                isInputNum={true}
                                                shouldAutoFocus
                                                value={otp}
                                                className='otpfield'
                                               
                                                placeholder="------"
                                                inputStyle={{
                                                    width: "52px",
                                                    height: "52px",
                                                    caretColor: "#000000",
                                                }}

                                            />
                                        ) : <Form.Control type="password" placeholder={loginWithOTP ? "OTP" : "Password"} onChange={e=> setOtpOrPassword(e.target.value)}/>}
                                        {loginWithOTP ? getSendOTPLinkMessage() : ''}
                                    </div>
                                </Form.Group>
                                
                                <div className="form-group mb-3 forgot-pwd-container">
                                    <Link onClick={handleShowPasswordDialog}>Forgot Password?</Link>
                                </div>
                                <Form.Group className="mb-3 button-wrap">
                                    <Button variant="primary signin-btn" disabled={submitting} onClick={signIn}>{submitting ? "Please wait..." :"Sign In"}</Button>
                                </Form.Group>
                            </Form>
                        </div>
                </div>
                <div className='model-body-col right'>
                    <h2>Create an account</h2>
                    <h4>Join theEduSmart to find best featured schools, seats available, their benefits, pay school fees and fill admission form online.</h4>
                    <ListGroup as="ul" className='benfits-list'>
                        <ListGroup.Item as="li"><i className='icons schoollisting-icon'></i> Popular School Listing</ListGroup.Item>
                        <ListGroup.Item as="li"><i className='icons onlineadmission-icon'></i> Online Admission </ListGroup.Item>
                        <ListGroup.Item as="li"><i className='icons payfeeonline-icon'></i> Pay Fee Online</ListGroup.Item>
                    </ListGroup>
                    <Form.Group className="mb-3 button-wrap">
                        <Button variant="primary" className='signup-btn' disabled={submitting} onClick={redirectSignUp}>Sign Up</Button>
                    </Form.Group>
                </div>
            </Modal.Body>
        </Modal>
        <ForgotPasswordDialog show={showForgotPasswordDialog} handleClose={handleForgotPasswordClose}/>
        </>
    );
}

export default LoginDialog;