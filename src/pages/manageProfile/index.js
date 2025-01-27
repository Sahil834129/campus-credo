import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Col, Container, Row, Tab, Tabs } from "react-bootstrap";
import Accordion from 'react-bootstrap/Accordion';
import OtpInput from "react-otp-input";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ReactComponent as Exclamation } from "../../assets/img/icons/exclamation.svg";
import AlertDialog from "../../common/AlertDialog";
import Breadcrumbs from "../../common/Breadcrumbs";
import ConfirmDialog from "../../common/ConfirmDialog";
import Layout from "../../common/layout";
import LeftMenuBar from "../../common/LeftMenuBar";
import InputField from "../../components/form/InputField";
import {
  ChangePasswordSchema,
  UpdatePhoneSchema,
  UpdateProfileSchema,
} from "../../data/validationSchema";
import RestEndPoint from "../../redux/constants/RestEndpoints";
import PageContent from "../../resources/pageContent";
import { getLocalData, isEmpty, resetUserLoginData } from "../../utils/helper";
import RESTClient from "../../utils/RestClient";
import AddAddress from "./addAddress";

export const ManageProfile = () => {
  const navigate = useNavigate();
  const [key, setKey] = useState("userProfile");
  const [submitting, setSubmitting] = useState(false);
  const [cities, setCities] = useState([]);
  const [cityOptions, setCityOptions] = useState([
    { text: "Select City", value: "" },
  ]);

  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    city: "",
    state: "",
  });


  const [showOTP, setShowOTP] = useState(false);
  const [passwordType, setPasswordType] = useState("password");
  const [confirmPasswordType, setConfirmPasswordType] = useState("password");
  const [currentPasswordType, setCurrentPasswordType] = useState("password");
  const [updatePhoneObject, setUpdatePhoneObject] = useState({
    phone: "",
    otp: "",
  });
  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };
  const toggleConfirmPassword = () => {
    if (confirmPasswordType === "password") {
      setConfirmPasswordType("text");
      return;
    }
    setConfirmPasswordType("password");
  };
  const toggleCurrentPassword = () => {
    if (currentPasswordType === "password") {
      setCurrentPasswordType("text");
      return;
    }
    setCurrentPasswordType("password");
  };
  const confirmMessage =
    "You will not be able to login with the previous mobile number and your current login session will expire once you update the mobile number. Please confirm to continue?";
  const [showUpdatePhoneConfirmDialog, setShowUpdatePhoneConfirmDialog] =
    useState({ show: false });
  const [showMobileVerificationDialog, setShowMobileVerificationDialog] =
    useState(false);


  const populateCities = (stateId) => {
    RESTClient.get(RestEndPoint.GET_STATE_CITIES + "/" + stateId)
      .then((response) => {
        let cities = [{ text: "Select City", value: "" }];
        if (response.data.success) {
          setCities(response.data.cities)
          setCityOptions(
            cities.concat(
              response.data.cities.map((it) => ({
                value: it.id,
                text: it.name,
              }))
            )
          );
        }
      })
      .catch((error) => {
        console.log("Error while getting cities list" + error);
      });
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  async function getUserDetails() {
    try {
      const response = await RESTClient.get(RestEndPoint.GET_USER_DETAILS);
      setUserDetails({
        ...userDetails,
        firstName: response.data.firstName,
        lastName: response.data.lastName,
        email: response.data.email,
        city: response.data.city,
        state: response.data.state,
      });
    } catch (error) { }
  }


  const updateUserProfile = async (formData) => {
    setSubmitting(true);
    RESTClient.patch(RestEndPoint.UPDATE_USER, formData)
      .then((response) => {
        toast.success("Profile Updated successfully");
        setSubmitting(false);
        navigate("/manageProfile");
        setUserDetails({
          ...userDetails,
        });
      })
      .catch((error) => {
        setSubmitting(false);
        toast.error(RESTClient.getAPIErrorMessage(error));
      });
  };


  const changePassword = async (formData) => {
    setSubmitting(true);
    RESTClient.post(RestEndPoint.CHANGE_PASSWORD, formData)
      .then((response) => {
        toast.success("Password changed successfully");
        setSubmitting(false);
        navigate("/manageProfile");
      })
      .catch((error) => {
        setSubmitting(false);
        toast.error(RESTClient.getAPIErrorMessage(error));
      });
  };

  const updatePhone = async (formData) => {
    showOTP
      ? verifyPhone(formData)
      : setShowUpdatePhoneConfirmDialog({ show: true, formData: formData });
  };

  const handleUpdatePhoneConfirm = async () => {
    setSubmitting(true);
    const formData = { ...showUpdatePhoneConfirmDialog.formData };
    delete formData.otp;
    try {
      await RESTClient.patch(RestEndPoint.UPDATE_PHONE, formData);
      toast.success("Mobile number updated and an OTP sent successfully");
      setShowOTP(true);
      setSubmitting(false);
      closeUpdatePhoneConfirmDialog();
    } catch (error) {
      toast.error(RESTClient.getAPIErrorMessage(error));
      setSubmitting(false);
    }
  };

  const verifyPhone = async (formData) => {
    setSubmitting(true);
    try {
      await RESTClient.post(RestEndPoint.VERIFY_PHONE, formData);
      setUpdatePhoneObject({ phone: "", otp: "" });
      setShowMobileVerificationDialog(true);
    } catch (error) {
      toast.error(RESTClient.getAPIErrorMessage(error));
    }
    setSubmitting(false);
  };

  const closeUpdatePhoneConfirmDialog = () => {
    setShowUpdatePhoneConfirmDialog({ show: false });
  };

  const handleMobileVerifiedDialogClose = () => {
    resetUserLoginData();
    navigate("/?login=true");
  };

  function handleProfileFormReset(resetForm) {
    populateCities(userDetails.state);
    resetForm();
  }

  return (
    <>
      <Layout>
        <section className="content-area">
          <Container className="content-area-inner profile-page-wrap">
            <Col className="inner-page-content">
              <Row className="content-section profile-bc-section">
                <Col className="bc-col">
                  <Breadcrumbs />
                </Col>
              </Row>
              <div className="content-section profile-content-main">
                <Col className="left profile-sidebar">
                  <Accordion className="sidebar-collapsible" defaultActiveKey={['0']} alwaysOpen>
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>Main Categories</Accordion.Header>
                      <Accordion.Body>
                        <LeftMenuBar menuItems={PageContent.USER_PROFILE_SIDEBAR_MENU_ITEMS} />
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>

                </Col>
                <Col className="profile-content right">
                  <div className="tab_btn_wrapper">
                    <Tabs
                      id="manage-profile-tab"
                      activeKey={key}
                      onSelect={(k) => setKey(k)}
                      className=""
                    >
                      <Tab eventKey="userProfile" title="Profile">
                        <Formik
                          initialValues={userDetails}
                          validationSchema={UpdateProfileSchema}
                          validateOnBlur
                          enableReinitialize={true}
                          onSubmit={(values) => {
                            updateUserProfile(values);
                          }}
                        >
                          {({ values, resetForm, errors, touched, setFieldValue }) => (
                            <Form className="row g-3">
                              <div className="col-md-6">
                                <InputField
                                  fieldName="firstName"
                                  value={values.firstName}
                                  label="First Name"
                                  disabled
                                  fieldType="text"
                                  placeholder="First Name"
                                  errors={errors}
                                  touched={touched}
                                />
                              </div>
                              <div className="col-md-6">
                                <InputField
                                  fieldName="lastName"
                                  value={values.lastName}
                                  label="Last Name"
                                  disabled
                                  fieldType="text"
                                  placeholder="Last Name"
                                  errors={errors}
                                  touched={touched}
                                />
                              </div>
                              <div className="col-md-6">
                                <InputField
                                  fieldName="email"
                                  required
                                  value={values.email}
                                  label="Email"
                                  fieldType="text"
                                  placeholder="Email Address"
                                  errors={errors}
                                  touched={touched}
                                />
                              </div>
                              <div className="form-group mb-3 button-wrap">
                                <button
                                  type="button"
                                  className="cancel comn"
                                  onClick={() =>
                                    handleProfileFormReset(resetForm)
                                  }
                                >
                                  Cancel
                                </button>
                                <button
                                  className="save comn"
                                  type="submit"
                                  disabled={submitting}
                                >
                                  {submitting ? "Please wait" : "Update"}
                                </button>
                              </div>
                            </Form>
                          )}
                        </Formik>
                      </Tab>
                      <Tab eventKey="changePassword" title="Password">
                        <Formik
                          initialValues={{
                            currentPassword: "",
                            password: "",
                            confirmPassword: "",
                          }}
                          validationSchema={ChangePasswordSchema}
                          enableReinitialize
                          onSubmit={(values, { resetForm }) => {
                            changePassword(values);
                            resetForm();
                          }}
                        >
                          {({ values, resetForm, errors, touched }) => (
                            <Form className="row g-3">
                              <div className="col-md-6 pwd-cell">
                                <InputField
                                  fieldName="currentPassword"
                                  required
                                  value={values.currentPassword}
                                  label="Current Password"
                                  fieldType={currentPasswordType}
                                  placeholder="Enter current password"
                                  errors={errors}
                                  touched={touched}
                                />
                                <span className="view-pwd-icon" onClick={() => {
                                  if (values.currentPassword !== "") {
                                    toggleCurrentPassword();
                                  }
                                }}>
                                  {values.currentPassword !== "" ? currentPasswordType === "password" ? <i className="bi bi-eye-slash"></i> : <i className="bi bi-eye"></i> : <i className="bi bi-eye-slash"></i>}
                                </span>
                              </div>
                              <div className="col-md-6"></div>
                              <div className="col-md-6 pwd-cell">
                                <InputField
                                  fieldName="password"
                                  required
                                  value={values.password}
                                  label="New Password"
                                  fieldType={passwordType}
                                  placeholder="Enter new password"
                                  errors={errors}
                                  touched={touched}
                                />
                                <span className="view-pwd-icon" onClick={() => {
                                  if (values.password !== "") {
                                    togglePassword();
                                  }
                                }}>
                                  {values.password !== "" ? passwordType === "password" ? <i className="bi bi-eye-slash"></i> : <i className="bi bi-eye"></i> : <i className="bi bi-eye-slash"></i>}
                                </span>
                              </div>
                              <div className="col-md-6"></div>
                              <div className="col-md-6 pwd-cell">
                                <InputField
                                  fieldName="confirmPassword"
                                  required
                                  value={values.confirmPassword}
                                  label="Re-enter Password"
                                  fieldType={confirmPasswordType}
                                  placeholder="Re-enter Password"
                                  errors={errors}
                                  touched={touched}
                                />
                                <span className="view-pwd-icon" onClick={() => {
                                  if (values.confirmPassword !== "") {
                                    toggleConfirmPassword();
                                  }
                                }}>
                                  {values.confirmPassword !== "" ? confirmPasswordType === "password" ? <i className="bi bi-eye-slash"></i> : <i className="bi bi-eye"></i> : <i className="bi bi-eye-slash"></i>}
                                </span>
                              </div>
                              <div className="col-md-6"></div>
                              <div className="form-group mb-3 button-wrap">
                                <button
                                  type="button"
                                  className="cancel comn"
                                  onClick={() => resetForm()}
                                >
                                  Cancel
                                </button>
                                <button className="save comn" type="submit">
                                  Update
                                </button>
                              </div>
                            </Form>
                          )}
                        </Formik>
                      </Tab>
                      <Tab eventKey="updateMobile" title="Update mobile">
                        <Formik
                          initialValues={updatePhoneObject}
                          enableReinitialize
                          validationSchema={UpdatePhoneSchema}
                          validateOnBlur
                          onSubmit={(values) => {
                            updatePhone(values);
                          }}
                        >
                          {({
                            values,
                            setFieldValue,
                            resetForm,
                            errors,
                            touched,
                          }) => (
                            <Form className="application-form-wrap">
                              <div className="fld-row">
                                <div className="fld-cell">
                                  <InputField
                                    fieldName="phone"
                                    value={values.phone}
                                    label="Mobile Number"
                                    fieldType="text"
                                    placeholder="Enter mobile number"
                                    errors={errors}
                                    touched={touched}
                                  />
                                </div>
                                <div className="fld-cell">
                                  {showOTP ? (
                                    <>
                                      <div className="otp-block">
                                        <div className="item-cell label">
                                          <h2>An OTP is sent to the mobile number.</h2>
                                          <h4>Please enter the OTP below to verify the mobile number</h4>
                                        </div>
                                        <div className="item-cell otpinput-box">
                                          <OtpInput
                                            onChange={(otp) =>
                                              setFieldValue("otp", otp)
                                            }
                                            numInputs={4}
                                            isInputNum={true}
                                            shouldAutoFocus
                                            value={values.otp}
                                            placeholder="----"
                                            inputStyle={{
                                              color: "blue",
                                              width: "2.5rem",
                                              height: "3rem",
                                              margin: "0 0.5rem",
                                              fontSize: "2rem",
                                              borderRadius: 4,
                                              caretColor: "blue",
                                              border: "1px solid rgba(0,0,0,0.3)",
                                            }}
                                          />
                                        </div>
                                      </div>
                                    </>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </div>
                              <div className="fld-row button-wrap">
                                <button
                                  type="button"
                                  className="cancel comn"
                                  onClick={() => resetForm()}
                                >
                                  Cancel
                                </button>
                                <button className="save comn" type="submit">
                                  {showOTP ? "Verify" : "Update"}
                                </button>
                              </div>
                            </Form>
                          )}
                        </Formik>
                      </Tab>



                      <Tab eventKey="addAdress" title={!isEmpty(getLocalData("userLocation")) ? <span>Location</span> : <span>Location  <Exclamation title="Please save your address." /></span>}>
                        <AddAddress
                          setKey={setKey}
                          cityOptions={cityOptions}
                          setUserDetails={setUserDetails}
                          userDetails={userDetails}
                          populateCities={populateCities}
                          cities={cities}
                        />
                      </Tab>
                    </Tabs>
                  </div>
                </Col>
              </div>
            </Col>
          </Container>
        </section>
      </Layout>
      <ConfirmDialog
        show={showUpdatePhoneConfirmDialog.show}
        message={confirmMessage}
        handleConfirm={handleUpdatePhoneConfirm}
        handleClose={closeUpdatePhoneConfirmDialog}
      />
      <AlertDialog
        show={showMobileVerificationDialog}
        message="Mobile number verified successfully. You need to login again with the new mobile number."
        handleClose={handleMobileVerifiedDialogClose}
      />
    </>
  );
};

export default ManageProfile;
