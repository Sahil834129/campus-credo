import React, {useState, useEffect} from "react"
import { useNavigate } from "react-router-dom"
import Layout from '../common/layout'
import Breadcrumbs from '../common/Breadcrumbs'
import LeftMenuBar from '../common/LeftMenuBar'
import PageContent from '../resources/pageContent'
import RESTClient from "../utils/RestClient"
import RestEndPoint from "../redux/constants/RestEndpoints"
import {
    Container,
    Row,
    Col,
    Tabs,
    Tab
} from "react-bootstrap"
import { Formik, Form } from "formik"
import InputField from '../components/form/InputField';
import { UpdateProfileSchema, ChangePasswordSchema, UpdatePhoneSchema } from "../data/validationSchema"
import { toast } from "react-toastify"
import OtpInput from "react-otp-input";

export const ManageProfile = () => {
    const navigate = useNavigate()
    const [key, setKey] = useState("userProfile")
    const [submitting, setSubmitting] = useState(false);
    const [stateOptions, setStateOptions] = useState([{ "text": "Select State" }]);
    const [cityOptions, setCityOptions] = useState([{ "text": "Select City" }]);
    const [userDetails, setUserDetails] = useState({ firstName: '', lastName: '', email: '', city: '', state: '' })
    const [showOTP, setShowOTP] = useState(false)
    
    const populateStateList = () => {
        RESTClient.get(RestEndPoint.GET_STATE).then((response) => {
            let states = [{ "text": "Select State" }];
            if (response.data.success)
                setStateOptions(states.concat(response.data.states.map(it => ({ value: it.id, text: it.name }))));
        }).catch((error) => {
            console.log("Error while getting state list" + error);
        });
    }

    const populateCities = (stateId) => {
        RESTClient.get(RestEndPoint.GET_STATE_CITIES + "/" + stateId).then((response) => {
            let cities = [{ "text": "Select City" }];
            if (response.data.success)
                setCityOptions(cities.concat(response.data.cities.map(it => ({ value: it.id, text: it.name }))));
        }).catch((error) => {
            console.log("Error while getting cities list" + error);
        });
    }
    
    useEffect(() => { getUserDetails(); }, []);
    useEffect(() => { populateStateList(); }, []);

    async function getUserDetails() {
        try{
            const response = await RESTClient.get(RestEndPoint.GET_USER_DETAILS)
            populateCities(response.data.state)
            setUserDetails({
                ...userDetails,
                firstName: response.data.firstName,
                lastName: response.data.lastName,
                email: response.data.email,
                city: response.data.city,
                state: response.data.state
            })
        } catch(error){}
    }
    
    const updateUserProfile = async(formData) =>{
        setSubmitting(true)
        RESTClient.patch(RestEndPoint.UPDATE_USER, formData).then((response) => {
            toast.success('Profile Updated successfully')
            setSubmitting(false)
            navigate('/manageProfile')
        }).catch((error) => {
            setSubmitting(false);
            toast.error(RESTClient.getAPIErrorMessage(error));
        })
    }

    const changePassword = async(formData) => {
        setSubmitting(true);
        RESTClient.post(RestEndPoint.CHANGE_PASSWORD,formData).then((response) => {
            toast.success('Password changed successfully')
        }).catch((error) => {
            setSubmitting(false);
            toast.error(RESTClient.getAPIErrorMessage(error));
        })
    }

    const updatePhone = async(formData) => {
        if (!showOTP) {
            //sendOTP(formData.phone);
            setShowOTP(true)
            return
        }

    }

    return (
        <Layout>
            <section className='content-area'>
                <Container className='content-area-inner pt-n16 admmission-sequence-wrap'>
                    <Col className='inner-page-content'>
                        <Row className='content-section'>
                            <Breadcrumbs />
                            <div className='content-area-inner internal-page-wrapper'>
                                <LeftMenuBar
                                    menuItems={PageContent.USER_PROFILE_SIDEBAR_MENU_ITEMS}
                                />
                                <div className='inner-page-content right'>
                                    <div className='inner-page-right-container'>
                                        <div className='tab_btn'>
                                            <Tabs id="manage-profile-tab"
                                                activeKey={key}
                                                onSelect={k => setKey(k)}
                                                className='mb-3'>
                                                <Tab eventKey='userProfile' title='Profile'>
                                                    <Formik 
                                                        initialValues={userDetails}
                                                        validationSchema={UpdateProfileSchema} validateOnBlur
                                                        enableReinitialize={true} 
                                                        onSubmit={values => { updateUserProfile(values) }}>
                                                        {({ values, errors, touched }) => (
                                                            <Form className='row g-3'>
                                                                <div className='col-md-6'>
                                                                    <InputField fieldName="firstName" value={values.firstName} label="First Name" disabled fieldType="text" placeholder="First Name" errors={errors} touched={touched} />
                                                                </div>
                                                                <div className='col-md-6'>
                                                                    <InputField fieldName="lastName" value={values.lastName} label="Last Name" disabled fieldType="text" placeholder="Last Name" errors={errors} touched={touched} />
                                                                </div>
                                                                <div className='col-md-6'>
                                                                    <InputField fieldName="email" value={values.email} label="Email" fieldType="text" placeholder="Email Address" errors={errors} touched={touched} />
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <InputField fieldName="state" label="State" fieldType="select" placeholder="" selectOptions={stateOptions} onChange={e => populateCities(e.target.value)} errors={errors} touched={touched} />
                                                                </div>
                                                                <div className="col-md-6">
                                                                <InputField fieldName="city" label="City" fieldType="select" placeholder="" selectOptions={cityOptions} errors={errors} touched={touched} />
                                                                </div>
                                                                <div className='form-group mb-3 button-wrap'>
                                                                    <button type='button' className='cancel comn'>Cancel</button>
                                                                    <button className='save comn' type='submit' disabled={submitting}>{submitting ? 'Please wait' : 'Update'}</button>
                                                                </div>
                                                            </Form>
                                                        )}
                                                    </Formik>
                                                </Tab>
                                                <Tab eventKey='changePassword' title='Password'>
                                                <Formik initialValues={{ currentPassword: '', password:'',confirmPassword:'' }}
                                                    validationSchema={ChangePasswordSchema} validateOnBlur 
                                                    onSubmit={values => { changePassword(values) }}>
                                                    {({ values, errors, touched }) => (
                                                        <Form className='row g-3'>
                                                            <div className='col-md-6'>
                                                                <InputField fieldName="currentPassword" required label="Current Password" fieldType="password" placeholder="Enter current password" errors={errors} touched={touched}/>
                                                            </div>
                                                            <div className='col-md-6'></div>
                                                            <div className='col-md-6'>
                                                                <InputField fieldName="password" required label="New Password" fieldType="password" placeholder="Enter new password" errors={errors} touched={touched}/> 
                                                            </div>
                                                            <div className='col-md-6'></div>
                                                            <div className='col-md-6'>
                                                                <InputField fieldName="confirmPassword" required label="Re-enter Password" fieldType="password" placeholder="Re-enter Password" errors={errors} touched={touched}/> 
                                                            </div>
                                                            <div className='col-md-6'></div>
                                                            <div className='form-group mb-3 button-wrap'>
                                                                <button type='button' className='cancel comn'>Cancel</button>
                                                                <button className='save comn' type='submit'>Update</button>
                                                            </div>
                                                        </Form>
                                                    )}
                                                </Formik>
                                                </Tab>
                                                <Tab eventKey='updateMobile' title='Update mobile'>
                                                    <Formik initialValues={{ phone: '', otp: '' }}
                                                        validationSchema={UpdatePhoneSchema} validateOnBlur onSubmit={values => { updatePhone(values) }}>
                                                        {({ values, errors, touched }) => (
                                                            <Form className='row g-3' onSubmit={updatePhone}>
                                                                <div className='col-md-6'>
                                                                    <InputField fieldName="phone" required label="Mobile Number" fieldType="text" placeholder="Enter mobile number" errors={errors} touched={touched}/>
                                                                </div>
                                                                <div className='col-md-6'></div>
                                                                {showOTP ? <>
                                                                    <div className='col-md-6'>
                                                                        <label>An OTP is sent to the mobile number. Please enter the OTP below</label>
                                                                        <OtpInput
                                                                            //onChange={handleOtpChange}
                                                                            numInputs={4}
                                                                            isInputNum={true}
                                                                            shouldAutoFocus
                                                                            //value={values.otp}
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
                                                                    </> : ''}
                                                                <div className='form-group mb-3 button-wrap'>
                                                                    <button type='button' className='cancel comn'>Cancel</button>
                                                                    <button className='save comn' type='submit'>{showOTP ? 'Update' : 'Get OTP'}</button>
                                                                </div>
                                                            </Form>
                                                        )}
                                                    </Formik>
                                                </Tab>
                                            </Tabs>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Row>
                    </Col>
                </Container>
            </section>
        </Layout>
    )
}

export default ManageProfile