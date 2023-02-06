import { Form, Formik } from 'formik';
import React, { useState } from "react";
import { toast } from "react-toastify";
import Button from "../components/form/Button";
import InputField from "../components/form/InputField";
import { RequestCallBackSchema } from '../data/validationSchema';
import RestEndPoint from '../redux/constants/RestEndpoints';
import RESTClient from '../utils/RestClient';
import GenericDialog from "./GenericDialog";

const RequestCallBackDialog = (props) => {
    const [submitting, setSubmitting] = useState(false);
    const submitRequestCallBack = async(values) => {
        setSubmitting(true);
        try {
            const response = await RESTClient.post(RestEndPoint.REQUEST_CALLBACK, values)
            setSubmitting(false);
            toast.success("Request for callback sent.")
        } catch (error) {
            setSubmitting(false);
            toast.error(RESTClient.getAPIErrorMessage(error))
        }
    };
    return (
        <GenericDialog className="calback-model" show={props.show} handleClose={props.handleClose}>
           <div className='model-body-col'>
                <Formik initialValues={{ userName: '' , phoneNumber: "" , message : "" , schoolId: props.schoolId  }}
                    validationSchema={RequestCallBackSchema} validateOnBlur onSubmit={values => { submitRequestCallBack(values) }}>
                    {({ errors, touched }) => (
                        
                        <Form className='form-container forgot-pwd' noValidate>
                            <div className='title'>
                                <h2>Request a Callback?</h2>
                               
                            </div>
                            <div className='frm-cell'>
                                <InputField fieldName="userName" fieldType="text" required placeholder="Please Enter Full Name" errors={errors} touched={touched}  label='Full Name' />
                            </div>
                            <div className='frm-cell'>
                                <InputField fieldName="phoneNumber" fieldType="text" required placeholder="Please Enter Phone Number" errors={errors} touched={touched}    label='Phone Number' />
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
                            <div className="btn-wrapper">
                                <Button class="signin-btn" buttonLabel="Send Request CallBack" submitting={submitting} />
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </GenericDialog>
    );
};

export default RequestCallBackDialog;
