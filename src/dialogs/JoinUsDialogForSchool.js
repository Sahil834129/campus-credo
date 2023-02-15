import { Form, Formik } from "formik";
import React, { useState } from "react";
import { toast } from "react-toastify";
import Button from "../components/form/Button";
import InputField from "../components/form/InputField";
import { JoinUsDialogForSchoolSchema } from "../data/validationSchema";
import RestEndPoint from "../redux/constants/RestEndpoints";
import RESTClient from "../utils/RestClient";
import GenericDialog from "./GenericDialog";

const initialValue = {
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    institutionName: "",
    message: "",
    
  };
const JoinUsDialogForSchool =(props)=>
{
    const [submitting, setSubmitting] = useState(false);
   
    const submitJoinUsForm = async (values ,  resetForm) => {
        setSubmitting(true);
        console.log(values);
        resetForm();
        try {
            const response = await RESTClient.post(RestEndPoint.JOIN_US, values)
            setSubmitting(false);
            toast.success("Your Data is Saved Successfully")
        } catch (error) {
            setSubmitting(false);
            toast.error(RESTClient.getAPIErrorMessage(error))
        }
    };
 return (
    <GenericDialog className="joinus-model" show={props.show} handleClose={props.handleClose}>
    <div className='model-body-col'>
    <Formik
                initialValues={initialValue}
                validationSchema={JoinUsDialogForSchoolSchema}
                validateOnBlur
                onSubmit={ async(values, { resetForm }) => {
                    submitJoinUsForm(values, resetForm)
                  }}
              >
                {({ errors, touched, values, resetForm }) => (
                  <Form className="application-form-wrap" noValidate>
                    <div className='title'>
                                <h2>Join Us</h2>
                    </div>
                    <div className="fld-row">
                      <div className="fld-cell">
                        <InputField
                          fieldName="firstName"
                          fieldType="text"
                          value={values.firstName}
                          label='First Name'
                          placeholder='Enter First Name'
                          required
                          errors={errors}
                          touched={touched}
                        />
                      </div>
                      <div className="fld-cell">
                          <InputField
                            fieldName="lastName"
                            label='Last Name'
                            value={values.lastName}
                            placeholder='Enter Last Name'
                            fieldType="text"
                            required
                            errors={errors}
                            touched={touched}
                          />
                      </div>
                    </div>

                    <div className="fld-row">
                      <div className="fld-cell">
                        <InputField
                          fieldName="phone"
                          fieldType="text"
                          label='Phone Number'
                          value={values.phone}
                          required
                          placeholder="Enter Phone Number"
                          errors={errors}
                          touched={touched}
                        />
                      </div>
                      <div className="fld-cell">
                          <InputField
                            fieldName="email"
                            label='Email Address'
                            value={values.email}
                            fieldType="text"
                            placeholder="Enter Email Address"
                            required
                            errors={errors}
                            touched={touched}
                          />
                      </div>
                    </div>

                    <div className="fld-row">
                      <div className="fld-cell">
                        <InputField
                          fieldName="institutionName"
                          fieldType="text"
                          label='Institution Name'
                          value={values.institutionName}
                          placeholder="Enter Institution Name"
                          required
                          errors={errors}
                          touched={touched}
                        />
                      </div>
                      
                      </div>
                    <div className="fld-row">
                      <div className="fld-cell">
                        <InputField
                          fieldName="message"
                          fieldType="textarea"
                          value={values.message}
                          rows={3}
                          label='Leave a Message'
                          required
                          placeholder="Type message here"
                          errors={errors}
                          touched={touched}
                        />
                      </div>
                    </div>
                    <div className="fld-row button-wrap">
                      <button type="button" class="reset-btn btn-primary" onClick={() =>  resetForm()}>Reset</button>
                      <Button
                          className="submit-btn"
                          type="submit"
                          buttonLabel="Submit"
                          submitting={submitting}
                        />
                    </div>
                 
                  </Form>
                )}
              </Formik>
     </div>
 </GenericDialog>
 );
}
export default JoinUsDialogForSchool;
