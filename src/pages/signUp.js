import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as SignupLogo } from "../assets/img/singup-logo.svg";
import "../assets/scss/custom-styles.scss";

import { Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import Button from "../components/form/Button";
import InputField from "../components/form/InputField";
import RegisterInfoGraphic from "../components/user/RegisterInfoGraphic";
import { SignUpSchema } from "../data/validationSchema";
import { getStates } from "../redux/actions/masterData";
import RestEndPoint from "../redux/constants/RestEndpoints";
import { populateCities } from "../utils/populateOptions";
import RESTClient from "../utils/RestClient";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [submitting, setSubmitting] = useState(false);
  const [cityOptions, setCityOptions] = useState([
    { text: "Select City", value: "" },
  ]);
  const stateOptions = useSelector((state) => state.masterData.states);
  useEffect(() => {
    dispatch(getStates());
  }, []);

  const signUp = (formData) => {
    setSubmitting(true);
    RESTClient.post(RestEndPoint.REGISTER, formData)
      .then((response) => {
        setSubmitting(false);
        navigate("/verifyPhone/" + formData.phone);
      })
      .catch((error) => {
        setSubmitting(false);
        toast.error(RESTClient.getAPIErrorMessage(error));
      });
  };

  return (
    <Container className="main-container signup-main" fluid>
      <div className="signup-wrapper">
        <div className="signup-col left">
          <RegisterInfoGraphic />
        </div>
        <div className="signup-col right">
          <SignupLogo />
          <div className="form-wrapper">
            <div className="form-title">
              <h4>Create your free account</h4>
            </div>
            <div className="form-container">
              <Formik
                initialValues={{
                  firstName: "",
                  lastName: "",
                  email: "",
                  password: "",
                  confirmPassword: "",
                  phone: "",
                  state: "",
                  city: "",
                  receiveEmailUpdates: "",
                  receiveSMSUpdates: "",
                }}
                validationSchema={SignUpSchema}
                validateOnBlur
                onSubmit={(values) => {
                  signUp(values);
                }}
              >
                {({ values, errors, touched, setFieldValue }) => (
                  <Form className="form-wrapper">
                    <div className="frm-row">
                      <div className="frm-cell">
                        <label className="">
                          First Name <span className="text-danger">*</span>
                        </label>
                          <InputField
                            fieldName="firstName"
                            fieldType="text"
                            placeholder="First Name"
                            errors={errors}
                            touched={touched}
                          />
                      </div>
                      <div className="frm-cell">
                        <label className="">
                          Last Name <span className="text-danger">*</span>
                        </label>
                          <InputField
                            fieldName="lastName"
                            fieldType="text"
                            placeholder="Last Name"
                            errors={errors}
                            touched={touched}
                          />
                      </div>
                    </div>
                    <div className="frm-row">
                      <div className="frm-cell">
                        <label className="">
                          Email Address <span className="text-danger">*</span>
                        </label>
                          <InputField
                            fieldName="email"
                            fieldType="text"
                            placeholder="Email Address"
                            errors={errors}
                            touched={touched}
                          />
                      </div>
                      <div className="frm-cell">
                        <label className="">
                          Phone Number<span className="text-danger">*</span>
                        </label>
                        <InputField
                          fieldName="phone"
                          fieldType="text"
                          //placeholder="Phone Number"
                          errors={errors}
                          touched={touched}
                        />
                      </div>{" "}
                    </div>
                    <div className="frm-row">
                      <div className="frm-cell">
                        <label className="">
                          Password<span className="text-danger">*</span>
                        </label>
                          <InputField
                            fieldName="password"
                            fieldType="password"
                            placeholder="Password"
                            errors={errors}
                            touched={touched}
                          />
                      </div>{" "}
                      
                      <div className="frm-cell">
                        <label className="">
                          Confirm Password<span className="text-danger">*</span>
                        </label>
                        <InputField
                          fieldName="confirmPassword"
                          fieldType="password"
                          placeholder="Confirm Password"
                          errors={errors}
                          touched={touched}
                        />
                      </div>{" "}
                    </div>
                    <div className="frm-row">
                      <div className="frm-cell">
                        <label className="">
                          Select State <span className="text-danger">*</span>
                        </label>
                        <InputField
                          fieldName="state"
                          fieldType="select"
                          placeholder=""
                          selectOptions={stateOptions}
                          value={values.state}
                          onChange={(e) => {
                              setFieldValue('state', e.target.value);
                              setFieldValue("city" , "");
                              populateCities(e.target.value, setCityOptions);
                            }
                          }
                          errors={errors}
                          touched={touched}
                        />
                      </div>{" "}
                      
                      <div className="frm-cell">
                        <label className="">
                          Select City <span className="text-danger">*</span>
                        </label>
                        <InputField
                          fieldName="city"
                          fieldType="select"
                          placeholder=""
                          value={values.city}
                          selectOptions={cityOptions}
                          errors={errors}
                          touched={touched}
                        />
                      </div>
                    </div>
                    
                    
                    {/* <div className='frm-cell frm-lbl-cell'>
                      <InputField
                        fieldName='receiveEmailUpdates'
                        fieldType='checkbox'
                        label=' I agree to receive school admission updates, School facilities related emails.'
                        errors={errors}
                        touched={touched}
                      />
                    </div> */}
                    {/* <div className='frm-cell frm-lbl-cell'>
                    <InputField
                      fieldName='receiveSMSUpdates'
                      fieldType='checkbox'
                      label=' I want to receive real time updates on WhatsApp.'
                      errors={errors}
                      touched={touched}
                    />
                    </div> */}
                    <div className="frm-cell termslink">
                      By continuing, you agree to CampusCredo’s{" "}
                      <Link to={"/terms"}>Terms of Use</Link> and{" "}
                      <Link to={"/disclaimerpolicy"}>Privacy Policy</Link>.
                    </div>
                    <div className="button-wrap">
                      <Button
                        type="submit"
                        buttonLabel="Sign Up"
                        submitting={submitting}
                      />
                    </div>
                    <div className="form-group mb-3 linkback-wrap">
                      {/* <div className='linkback-cell left'><Link to={"/disclaimerpolicy"}>* Policy Disclaimer</Link></div> */}
                      <div className="linkback-cell right">
                        Have an account?<Link to="/?login=true">Sign In</Link>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer autoClose={2000} position="top-right" />
    </Container>
  );
};

export default SignUp;
