import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {Container} from 'react-bootstrap';
import "../assets/scss/custom-styles.scss";
import { ReactComponent as SignupLogo } from "../assets/img/singup-logo.svg";

import { Formik, Form } from 'formik';
import { SignUpSchema } from "../data/validationSchema";
import InputField from "../components/form/InputField";
import Button from "../components/form/Button";
import RESTClient from "../utils/RestClient";
import RestEndPoint from "../redux/constants/RestEndpoints";
import RegisterInfoGraphic from "../components/user/RegisterInfoGraphic";
import {ToastContainer, toast} from "react-toastify";

const SignUp = () => {
    const navigate = useNavigate();
    const [submitting, setSubmitting] = useState(false);
    const [stateOptions, setStateOptions] = useState([{"text":"Select State"}]);
    const [cityOptions, setCityOptions] = useState([{"text":"Select City"}]);

    useEffect(() => { populateStateList();}, []);
    
    const signUp = (formData) => {
        setSubmitting(true);
        RESTClient.post(RestEndPoint.REGISTER, formData).then((response) => {
            setSubmitting(false);
            navigate("/verifyPhone/"+ formData.phone)
        }).catch((error) => {
            setSubmitting(false);
            toast.error(RESTClient.getAPIErrorMessage(error));
        });
    }
        
    const populateStateList = () => {
        RESTClient.get(RestEndPoint.GET_STATE).then((response)=>{
            let states = [{"text":"Select State"}];
            if (response.data.success)
                setStateOptions(states.concat(response.data.states.map(it => ({value:it.id, text: it.name}))));
        }).catch((error)=>{
            console.log("Error while getting state list" + error);
        });
    }

    const populateCities = (stateId) => {
        RESTClient.get(RestEndPoint.GET_STATE_CITIES + "/" + stateId).then((response) => {
            let cities = [{"text":"Select State"}];
            if (response.data.success)
                setCityOptions(cities.concat(response.data.cities.map(it => ({value: it.id, text: it.name}))));
        }).catch((error)=>{
            console.log("Error while getting cities list" + error);
        });
    }

    return (
        <Container className="main-container signup-main" fluid>
            <div className="signup-wrapper">
                <div className="signup-col left">
                    <RegisterInfoGraphic/>
                </div>
                <div className="signup-col right">
                    <SignupLogo />
                    <div className="form-wrapper">
                        <div className="form-title"><h4>Create your free account</h4></div>
                        <div className="form-container">
                            <Formik initialValues={{ firstName: '', lastName: '', email: '', password: '', confirmPassword: '', phone: '', state: '', city: '', receiveEmailUpdates: '', receiveSMSUpdates: '' }}
                                validationSchema={SignUpSchema} validateOnBlur onSubmit={values => { signUp(values)}}>
                                {({  errors, touched }) => (
                                    <Form>
                                        <InputField fieldName="firstName" fieldType="text" placeholder="First Name" errors={errors} touched={touched}/> 
                                        <InputField fieldName="lastName" fieldType="text" placeholder="Last Name" errors={errors} touched={touched}/> 
                                        <InputField fieldName="email" fieldType="text" placeholder="Email Address" errors={errors} touched={touched}/> 
                                        <InputField fieldName="password" fieldType="password" placeholder="Password" errors={errors} touched={touched}/> 
                                        <InputField fieldName="confirmPassword" fieldType="password" placeholder="Confirm Password" errors={errors} touched={touched}/> 
                                        <InputField fieldName="phone" fieldType="text" placeholder="Phone Number" errors={errors} touched={touched}/>
                                        <InputField fieldName="state" fieldType="select" placeholder="" selectOptions={stateOptions} onBlur={e=> populateCities(e.target.value)} errors={errors} touched={touched}/>
                                        <InputField fieldName="city" fieldType="select" placeholder="" selectOptions={cityOptions} errors={errors} touched={touched}/>
                                        <InputField fieldName="receiveEmailUpdates" fieldType="checkbox" label=" I agree to receive school admission updates, School facilities related emails." errors={errors} touched={touched}/>
                                        <InputField fieldName="receiveSMSUpdates" fieldType="checkbox" label=" I want to receive real time updates on WhatsApp." errors={errors} touched={touched}/>
                                        <Button type="submit" buttonLabel="Sign Up" submitting={submitting}/>
                                        <div className="form-group mb-3 linkback-wrap">
                                            Have an account?<Link to="/signIn">Sign In</Link>
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

export default SignUp;