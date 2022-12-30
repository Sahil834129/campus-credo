import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import { toast } from "react-toastify";
import Breadcrumbs from "../common/Breadcrumbs";
import Layout from "../common/layout";
import Button from "../components/form/Button";
import InputField from "../components/form/InputField";
import { CATEGORY_OPTIONS_CONTACT_FORM } from "../constants/formContanst";
import RestEndPoint from "../redux/constants/RestEndpoints";
import RESTClient from "../utils/RestClient";

const initalValue = {
  fullName: "",
  phone: "",
  email: "",
  category: "",
  message: "",
  otherCategory: "",
};
const ContactUs = () => {
  const [validationErrors, setValidationErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [values, setValues] = useState("");
  const [otherCategoryText, setOtherCategoryText] = useState("");
  const saveData = (formData) => {
    setSubmitting(true);
    delete formData.initalValue;
    console.log(formData, "----------");
    RESTClient.post(RestEndPoint.Contact_US, formData)
      .then((response) => {
        setSubmitting(false);
      })
      .catch((error) => {
        setSubmitting(false);
        toast.error(RESTClient.getAPIErrorMessage(error));
      });
  };
  const handleOther = (e) => {
    setOtherCategoryText(e);
  };
  useEffect(() => {
    handleOther();
  }, []);
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
            <section className="section-wrapper ">
              <Formik
                initialValues={{ initalValue }}
                // validationSchema={ContactInfoSchema}
                validateOnBlur
                onSubmit={(values) => {
                  saveData(values);
                }}
              >
                {({ errors, touched, onBlur }) => (
                  <Form className="">
                    <label className="">
                      First Name <span className="text-danger">*</span>
                    </label>
                    <div className="frm-cell">
                      <InputField
                        fieldName="fullName"
                        fieldType="text"
                        placeholder="Full Name"
                        errors={errors}
                        touched={touched}
                      />
                    </div>
                    <label className="">
                      Email Address <span className="text-danger">*</span>
                    </label>
                    <div className="frm-cell">
                      <InputField
                        fieldName="email"
                        fieldType="text"
                        placeholder="Email Address"
                        errors={errors}
                        touched={touched}
                      />
                    </div>
                    <label className="">
                      Phone Number<span className="text-danger">*</span>
                    </label>
                    <div className="frm-cell">
                      <InputField
                        fieldName="phone"
                        fieldType="text"
                        placeholder="Phone Number"
                        errors={errors}
                        touched={touched}
                      />
                    </div>{" "}
                    <label className="">
                      Select Category <span className="text-danger">*</span>
                    </label>
                    <div className="frm-cell">
                      <InputField
                        fieldName="category"
                        fieldType="select"
                        placeholder=""
                        selectOptions={CATEGORY_OPTIONS_CONTACT_FORM}
                        errors={errors}
                        touched={touched}
                        onChange={(e) => handleOther(e.target.value)}
                      />
                    </div>{" "}
                    <div className="fld-cell identification-mark-cell">
                      <label className="form-label">
                        If other, please specify
                        {otherCategoryText === "Others" ? (
                          <span className="req">*</span>
                        ) : (
                          ""
                        )}
                      </label>
                      <InputField
                        fieldName="otherCategory"
                        fieldType="text"
                        disabled={otherCategoryText !== "Others"}
                        placeholder="Please Specify"
                        errors={errors}
                        touched={touched}
                      />
                      {validationErrors.hasOwnProperty("otherCategory") ? (
                        <div className="error-exception">
                          {validationErrors.otherCategory}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                    <label className="">
                      Leave a Message<span className="text-danger">*</span>
                    </label>
                    <div className="frm-cell">
                      <InputField
                        fieldName="message"
                        fieldType="text"
                        placeholder="type here"
                        errors={errors}
                        touched={touched}
                      />
                    </div>
                    <div className="">
                      <Button
                        type="submit"
                        buttonLabel="Submit the Response"
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
