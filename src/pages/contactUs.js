import { Form, Formik } from "formik";
import { useState } from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import { toast } from "react-toastify";
import Breadcrumbs from "../common/Breadcrumbs";
import Layout from "../common/layout";
import Button from "../components/form/Button";
import InputField from "../components/form/InputField";
import { CATEGORY_OPTIONS_CONTACT_FORM } from "../constants/formContanst";
import { ContactInfoSchema } from "../data/validationSchema";
import RestEndPoint from "../redux/constants/RestEndpoints";
import RESTClient from "../utils/RestClient";

const initialValue = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  category: "",
  message: "",
  otherCategory: "",
};
const ContactUs = () => {
  const [submitting, setSubmitting] = useState(false);
  
  const saveData = (formData) => {
    setSubmitting(true);
    let postData = {...formData}
    let fullName = postData.firstName + postData.lastName
    delete postData.firstName
    delete postData.lastName

    postData['fullName'] = fullName

    RESTClient.post(RestEndPoint.CONTACT_US, postData)
      .then((response) => {
        setSubmitting(false);
        toast.success("Request submitted successfully.")
      })
      .catch((error) => {
        setSubmitting(false);
        toast.error(RESTClient.getAPIErrorMessage(error));
      });
  };

  function resetContactFrom(resetForm) {
    resetForm();
  }
  
  return (
    <Layout>
      <section className="content-area about-page">
        <Container className="content-area-inner inner-page-container">
          <Row className="content-section bc-section">
            <Col className="bc-col">
              <Breadcrumbs />
            </Col>
          </Row>
          <Row className="content-section about-content-main">
            
            <section className="contact-section-wrapper">
            <h6 class="student-heading">Please add your contact details below</h6>
              <Formik
                initialValues={initialValue}
                validationSchema={ContactInfoSchema}
                validateOnBlur
                onSubmit={(values) => {
                  saveData(values);
                }}
              >
                {({ errors, touched, values, resetForm }) => (
                  <Form className="application-form-wrap" noValidate>
                    <div className="fld-row">
                      <div className="fld-cell">
                        <InputField
                          fieldName="firstName"
                          fieldType="text"
                          value={values.firstName}
                          label='First Name'
                          placeholder='First Name'
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
                            placeholder='Last Name'
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
                          placeholder="Phone Number"
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
                            placeholder="Email Address"
                            required
                            errors={errors}
                            touched={touched}
                          />
                      </div>
                    </div>

                    <div className="fld-row">
                    <div className="fld-cell">
                        <InputField
                          fieldName="category"
                          fieldType="select"
                          label='Select Category'
                          value={values.category}
                          placeholder=""
                          required
                          selectOptions={CATEGORY_OPTIONS_CONTACT_FORM}
                          errors={errors}
                          touched={touched}
                        />
                      </div>
                      <div className="fld-cell">
                        <InputField
                          fieldName="otherCategory"
                          fieldType="text"
                          value={values.otherCategory}
                          label= 'If other, please specify'
                          required={values.category === 'Others'}
                          disabled={values.category !== "Others"}
                          placeholder="Please Specify"
                          errors={errors}
                          touched={touched}
                        />
                      </div>
                      </div>
                    <div className="fld-row">
                    <div className="frm-cell">
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
                      <button type="button" class="reset btn-primary" onClick={() =>  resetForm()} >Reset</button>
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
            </section>
          </Row>
        </Container>
      </section>
    </Layout>
  );
};
export default ContactUs;
