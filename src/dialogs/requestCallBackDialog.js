import { Form, Formik } from 'formik';
import React, { useState } from "react";
import { toast } from "react-toastify";
import NoRecordsFound from '../common/NoRecordsFound';
import Button from "../components/form/Button";
import InputField from "../components/form/InputField";
import { RequestCallBackSchema } from '../data/validationSchema';
import RestEndPoint from '../redux/constants/RestEndpoints';
import RESTClient from '../utils/RestClient';
import GenericDialog from "./GenericDialog";

const RequestCallBackDialog = (props) => {
    const [submitting, setSubmitting] = useState(false);
    const submitRequestCallBack = async(values) => {
        console.log(values);
        setSubmitting(true);
        try {
            const response = await RESTClient.post(RestEndPoint.REQUEST_CALLBACK, values)
            setSubmitting(false);
            toast.success("Request Callback mail sent")
        } catch (error) {
            setSubmitting(false);
            toast.error(RESTClient.getAPIErrorMessage(error))
        }
    };
    return (
        <GenericDialog className="forgotpwd-model" show={props.show} handleClose={props.handleClose}>
           {props && props.schoolEmail ?
            (<div className='model-body-col'>
                {/* <h4>An email will be sent with a Request CallBack.</h4> */}
                <Formik initialValues={{ userName: '' , phoneNumber: "" , message : "" , schoolId: props.schoolId  }}
                    validationSchema={RequestCallBackSchema} validateOnBlur onSubmit={values => { submitRequestCallBack(values) }}>
                    {({ errors, touched }) => (
                        <Form className='form-container forgot-pwd'>
                            <div className='frm-cell'>
                                <InputField fieldName="userName" fieldType="text" placeholder="Name" errors={errors} touched={touched}    label='Name' />
                                
                                </div>
                                <div className='frm-cell'>
                                <InputField fieldName="phoneNumber" fieldType="text" placeholder="Phone Number" errors={errors} touched={touched}    label='Phone Number' />
                                
                                </div>
                                <div className='frm-cell'>
                                <InputField
                                      fieldName="message"
                                     fieldType="textarea"
                                    rows={3}
                                     label='Leave a Message'
                                     placeholder="Type message here"
                                     errors={errors}
                                     touched={touched}
                                     />
                                
                                </div>
                                <input type="hidden" id="schoolId" name="schoolId" value={props.schoolId}></input>
                            <div className="btn-wrapper">
                                <Button class="signin-btn" buttonLabel="Send Request CallBack" submitting={submitting} />
                            </div>
                        </Form>
                    )}
                </Formik>
            </div> ) :  (
            <div className='model-body-col'>
                <h4>An email will be sent with a Request CallBack.</h4>
                <NoRecordsFound message="No Registered Email found" />
                </div>
                )}
        </GenericDialog>
    );
};

export default RequestCallBackDialog;
