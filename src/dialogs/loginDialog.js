import OtpTimer from "otp-timer";
import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import OtpInput from "react-otp-input";
import { useDispatch , useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AlertDialog from "../common/AlertDialog";
import { DEFAULT_ROLES } from "../constants/app";
import {
  ChangePasswordSchema,
  SignInSchema,
  UpdatePhoneSchema
} from "../data/validationSchema";
import { getItemsInCart } from "../redux/actions/cartAction";
import { getChildsList } from "../redux/actions/childAction";
import { setIsAdmin, setIsUserLoggedIn } from "../redux/actions/userAction";
import RestEndPoint from "../redux/constants/RestEndpoints";
import {
  isLoggedIn,
  isValidatePhone,
  resetUserLoginData,
  setLocalData,
  setUserLoginData
} from "../utils/helper";
import RESTClient from "../utils/RestClient";
import ForgotPasswordDialog from "./forgotPassword";
import GenericDialog from "./GenericDialog";

const LoginDialog = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [sendingOTP, setSendingOTP] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [phone, setPhone] = useState("");
  const [loginWithOTP, setLoginWithOTP] = useState(false);
  const [password, setPassword] = useState("");
  const [showForgotPasswordDialog, setShowForgotPasswordDialog] =
    useState(false);
  const [otpSentCounter, setOtpSentCounter] = useState(1);
  const [otpMinutes, setOtpMinutes] = useState(0);
  const [validationErrors, setValidationErrors] = useState({});
  const [showMobileNotVerifiedDialog, setShowMobileNotVerifiedDialog] =
    useState(false);
  const [passwordType, setPasswordType] = useState("password");
  const selectedLocation = useSelector((state) => state.locationData.selectedLocation);

  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };
  useEffect(() => {
    if (otpSentCounter === 4) {
      setOtpMinutes(2);
    } else if (otpSentCounter === 1) {
      setOtpMinutes(0);
    }
  }, [otpSentCounter]);

  const sendOTP = () => {
    if (isValidatePhone(phone)) {
      const reqPayload = { phone: phone };
      setSendingOTP(true);
      RESTClient.post(RestEndPoint.SEND_OTP, reqPayload)
        .then((response) => {
          setSendingOTP(false);
          setOtpSent(true);
        })
        .catch((error) => {
          toast.error(RESTClient.getAPIErrorMessage(error));
          setSendingOTP(false);
          setOtpSent(false);
        });
    } else {
      console.log("Invalid mobile number.");
    }
  };
  const getSendOTPLinkMessage = () => {
    return sendingOTP ? (
      "Sending OTP..."
    ) : otpSent ? (
      <OtpTimer
        minutes={otpMinutes}
        seconds={30}
        text="Resend OTP in"
        ButtonText="Send OTP"
        resend={() => {
          sendOTP();
          setOtp("");
          setOtpSentCounter((val) => (val === 2 ? 1 : val + 1));
        }}
      />
    ) : (
      <Link onClick={sendOTP}>Send OTP</Link>
    );
  };
  const setOtpOrPassword = (value) => {
    loginWithOTP ? setOtp(value) : setPassword(value);
  };
  const handleShowPasswordDialog = () => {
    props.handleClose();
    setShowForgotPasswordDialog(true);
  };
  const handleForgotPasswordClose = () => {
    setShowForgotPasswordDialog(false);
  };
  const signIn = async () => {
    resetValidationErrors();
    const reqPayload = { phone: phone };
    reqPayload[loginWithOTP ? "otp" : "password"] = loginWithOTP
      ? otp
      : password;
    const action = loginWithOTP
      ? RestEndPoint.LOGIN_WITH_OTP
      : RestEndPoint.LOGIN_WITH_PASSWORD;

    if (!isValidSignInPayload(reqPayload)) return;

    setSubmitting(true);
    resetUserLoginData();
    try {
      const response = await RESTClient.post(action, reqPayload);
      setUserLoginData(response.data);
      setLocalData("selectedLocation", selectedLocation);
      dispatch(setIsUserLoggedIn(isLoggedIn()));


      if (props.loginCallbackFunction) props.loginCallbackFunction();

      const roles = response.data.roles;
      const isParent = roles.find((val) => val === DEFAULT_ROLES.PARENT);
      dispatch(setIsAdmin(!isParent));
      if (isParent) {
        loadUserData();
        navigate('/userProfile');
      } else {
        window.location.href = "/dashboard";
      }
      setSubmitting(false);
      props.handleClose();
      resetSignInFormValues();
    } catch (error) {
      let errorMsg = RESTClient.getAPIErrorMessage(error);
      if (errorMsg.toUpperCase() === "MOBILE NOT VERIFIED") {
        props.handleClose();
        setShowMobileNotVerifiedDialog(true);
      } else {
        toast.error(RESTClient.getAPIErrorMessage(error));
        setOtp("");
      }
      setSubmitting(false);
    }
  };

  const redirectSignUp = () => {
    navigate("/signUp");
  };

  const loadUserData = () => {
    dispatch(getItemsInCart());
    dispatch(getChildsList());
  };

  const handleOtpChange = (otps) => {
    setOtp(otps);
  };

  const handleClose = () => {
    setOtpSent(false);
    setSendingOTP(false);
    setLoginWithOTP(false);
    props.handleClose();
    setValidationErrors({});
  };

  function resetValidationErrors() {
    setValidationErrors({});
  }

  function resetSignInFormValues() {
    setPassword("");
    setPhone("");
    setOtp("");
  }

  function isValidSignInPayload(payload) {
    let isValidPayload = true;
    try {
      UpdatePhoneSchema.validateSync({ phone: phone });
      SignInSchema.validateSync({ ...payload, loginWithOTP: loginWithOTP });
    } catch (error) {
      addPayloadError(error);
      isValidPayload = false;
    }
    return isValidPayload;
  }

  function addPayloadError(error) {
    let errors = {};
    errors[error.path] = error.message;
    setValidationErrors(errors);
  }

  function handlePhoneBlur(phone) {
    try {
      UpdatePhoneSchema.validateSync({ phone: phone });
      setValidationErrors({ ...validationErrors, phone: "" });
    } catch (error) {
      addPayloadError(error);
    }
  }
  function handlePasswordBlur(phone) {
    try {
      ChangePasswordSchema.validateSync({ password: password });
      setValidationErrors({ ...validationErrors, password: "" });
    } catch (error) {
      addPayloadError(error);
    }
  }

  const verifyPhoneDialog = async () => {
    try {
      await RESTClient.post(RestEndPoint.SEND_OTP, { phone: phone });
      navigate("/verifyPhone/" + phone);
    } catch (err) {
      toast.error(RESTClient.getAPIErrorMessage(err));
    }
  };
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      signIn();
    }
  };
  return (
    <>
      <GenericDialog
        className="signin-model"
        show={props.show}
        handleClose={handleClose}
      >
        <div className="model-body-col left">
          <h2>Sign in</h2>
          <h4>
            Sign in to check your favourite schools, filled forms and status of
            admission process.
          </h4>
          <div className="form-container">
            <Form>
              <Form.Group className="signin-fld-grp">
                <Form.Control
                  type="phone"
                  maxLength="10"
                  onKeyDown={handleKeyDown}
                  onChange={(e) =>{
                    handlePhoneBlur(e.target.value);
                     setPhone(e.target.value)}
                    }
                  onBlur={(e) => handlePhoneBlur(e.target.value)}
                  placeholder="Mobile Number"
                />
                {validationErrors.hasOwnProperty("phone") ? (
                  <div className="error-exception">
                    {validationErrors.phone}
                  </div>
                ) : (
                  ""
                )}
              </Form.Group>
              <div className="loginoption">
                <span className="loginoption-cell">
                  <h2>Sign in using</h2>
                </span>
                <span className="loginoption-cell">
                  <Form.Check
                    inline
                    type="radio"
                    name="loginWithOTP"
                    checked={!loginWithOTP}
                    onChange={(e) => setLoginWithOTP(!e.target.checked)}
                  />
                  <label className="lbl">Password</label>
                </span>
                <span className="loginoption-cell">
                  <Form.Check
                    inline
                    type="radio"
                    name="loginWithOTP"
                    checked={loginWithOTP}
                    onChange={(e) => setLoginWithOTP(e.target.checked)}
                  />
                  <label>Mobile OTP</label>
                </span>
              </div>
              <Form.Group className="signin-fld-grp pwd-fld-wrap otp-fld-outer">
                <div className="otp-fields-wrapper otp-comp">
                  {loginWithOTP === true ? (
                    <div className="otp-inner-fld">
                      <OtpInput
                        onChange={handleOtpChange}
                        numInputs={4}
                        isInputNum={true}
                        shouldAutoFocus
                        value={otp}
                        className="otpfield"
                        placeholder="----"
                        inputStyle={{
                          width: "52px",
                          height: "52px",
                          caretColor: "#000000",
                        }}
                      />
                    </div>
                  ) : (
                    <div className="pwd-fld-outer">
                      <Form.Control
                        type={passwordType}
                        placeholder={loginWithOTP ? "OTP" : "Password"}
                        onChange={(e) => setOtpOrPassword(e.target.value)}
                        onBlur={(e) => handlePasswordBlur(e.target.value)}
                        onCopy={(e) => e.preventDefault()}
                        onPaste={(e) => e.preventDefault()}
                        onKeyDown={handleKeyDown}
                      />
                      <span className="view-pwd-icon" onClick={togglePassword} >
                        {passwordType === "password" ? <i className="bi bi-eye-slash"></i> : <i className="bi bi-eye"></i>}
                      </span>
                    </div>
                  )}
                  {loginWithOTP ? getSendOTPLinkMessage() : ""}
                </div>
                {loginWithOTP ? (
                  validationErrors.hasOwnProperty("otp") ? (
                    <div className="error-exception">
                      {validationErrors.otp}
                    </div>
                  ) : (
                    ""
                  )
                ) : validationErrors.hasOwnProperty("password") ? (
                  <div className="error-exception">
                    {validationErrors.password}
                  </div>
                ) : (
                  ""
                )}
              </Form.Group>

              <div className="form-group mb-3 forgot-pwd-container">
                <Link onClick={handleShowPasswordDialog}>Forgot Password?</Link>
              </div>
              <Form.Group className="mb-3 button-wrap">
                <Button
                  variant="primary signin-btn"
                  disabled={submitting}
                  onClick={signIn}
                >
                  {submitting ? "Please wait..." : "Sign In"}
                </Button>
              </Form.Group>
            </Form>
          </div>
        </div>
        <div className="model-body-col right">
          <h2>Create an account</h2>
          <h4>
            Join the CampusCredo to find best featured schools, seats available,
            their benefits, pay school fees and fill admission form online.
          </h4>
          <ListGroup as="ul" className="benfits-list">
            <ListGroup.Item as="li">
              <i className="icons schoollisting-icon"></i> Popular School
              Listing
            </ListGroup.Item>
            <ListGroup.Item as="li">
              <i className="icons onlineadmission-icon"></i> Online Admission{" "}
            </ListGroup.Item>
            <ListGroup.Item as="li">
              <i className="icons payfeeonline-icon"></i> Pay Fee Online
            </ListGroup.Item>
          </ListGroup>
          <Form.Group className="mb-3 button-wrap">
            <Button
              variant="primary"
              className="signup-btn"
              disabled={submitting}
              onClick={redirectSignUp}
            >
              Sign Up
            </Button>
          </Form.Group>
        </div>
      </GenericDialog>
      <ForgotPasswordDialog
        show={showForgotPasswordDialog}
        handleClose={handleForgotPasswordClose}
      />
      <AlertDialog
        show={showMobileNotVerifiedDialog}
        handleClose={verifyPhoneDialog}
        buttonLabel="Veirfy"
        message="Mobile number not verified."
      />
    </>
  );
};

export default LoginDialog;
