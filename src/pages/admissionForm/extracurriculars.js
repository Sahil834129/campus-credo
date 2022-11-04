import React, { useState } from 'react';
import "../../assets/scss/custom-styles.scss";
import Breadcrumbs from '../../common/Breadcrumbs';
import Button from "../../components/form/Button";
import Container from "react-bootstrap/Container";
import { useNavigate } from "react-router-dom";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import LeftMenuBar from '../../common/LeftMenuBar';
import PageContent from '../../resources/pageContent';
import { Formik, Form, Field } from 'formik';
import InputField from "../../components/form/InputField";
import Layout from '../../common/layout';
import RESTClient from '../../utils/RestClient';
import RestEndPoint from '../../redux/constants/RestEndpoints';
import { ToastContainer, toast } from "react-toastify";

export const ExtracurricularForm = (ExtracurricularForm) => {
  const history = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const saveData = (formData) => {
    setSubmitting(true);
    RESTClient.PATCH(RestEndPoint.STUDENT_CERTIFICATES, formData).then(() => {
      setSubmitting(false);
      history("/userProfile/BackgroundCheckForm")
    }).catch((error) => {
      setSubmitting(false);
      toast.error(RESTClient.getAPIErrorMessage(error));
    });
    console.log(JSON.stringify(formData));
  }

  return (
    <Layout>
      <section className="content-area">
        <Container className="content-area-inner pt-n16 admmission-sequence-wrap">
          <Col className="inner-page-content">
            <Row className="content-section">
              <Breadcrumbs />
              <div className="content-area-inner internal-page-wrapper">
                <LeftMenuBar menuItems={PageContent.ADMISSION_FORM_SIDEBAR_MENU_ITEMS} parentPage="userProfile" />
                <div className="inner-page-content right">
                  <div className="inner-page-right-container">
                    <h6 className="student-heading">Extracurriculars</h6>
                    <p className="Stud-info">
                      Please provide accurate details of the student applying
                      for admission. This information is used to help the school
                      best cater for the educational needs of the student.
                    </p>
                    <Formik initialValues={{ participat: 'false', zonal: '', state: '', national: '', international: '', interest: 'false', competitionCertificate: '', otherInterest: '' }}
                      validateOnBlur onSubmit={values => { saveData(values) }}>
                      {({ errors, setFieldValue, touched }) => (
                        <Form className="row g-3 mt-2">
                          <div className="col-12">
                            <label for="validationServer02" className="form-label">
                              Has the student participated/won any competitions?<span className="req">*</span>
                            </label>
                            <div className="d-flex  align-items-center py-2">
                              <div className="form-check">
                                <InputField className="form-check-input" label="Yes" value="true" fieldName="participat" fieldType="radio" errors={errors} touched={touched} />
                              </div>
                              <div className="form-check ms-2">
                                <InputField className="form-check-input" label="No" value="false" fieldName="participat" fieldType="radio" errors={errors} touched={touched} />
                              </div>
                            </div>
                          </div>
                          <div className='d-flex'>
                            <div className="form-check">
                              <InputField fieldName="zonal" fieldType="checkbox" label="Zonal" errors={errors} touched={touched} />
                            </div>
                            <div className="form-check ms-3">
                              <InputField fieldName="state" fieldType="checkbox" label="State" errors={errors} touched={touched} />
                            </div>
                            <div className="form-check ms-3">
                              <InputField fieldName="national" fieldType="checkbox" label="National" errors={errors} touched={touched} />
                            </div>
                            <div className="form-check  ms-3">
                              <InputField fieldName="international" fieldType="checkbox" label="International" errors={errors} touched={touched} />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <label for="validationServer02" className="form-label">
                              If Yes, Please Specify
                            </label>
                            <InputField fieldName="competitionCertificate" className="frm-cell" fieldType="text" placeholder="Please add details..." errors={errors} touched={touched} />
                          </div>

                          <div className="col-12 mt-4">
                            <label for="validationServer02" className="form-label">
                              Does the student have any other interest?<span className="req">*</span>
                            </label>
                            <div className="d-flex  align-items-center py-2">
                              <div className="form-check">
                                <InputField className="form-check-input" label=" Yes" value="true" fieldName="interest" fieldType="radio" errors={errors} touched={touched} />
                              </div>
                              <div className="form-check ms-2">
                                <InputField className="form-check-input" label=" No" value="false" fieldName="interest" fieldType="radio" errors={errors} touched={touched} />
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <label for="validationServer02" className="form-label">
                              If Yes, Please Specify
                            </label>
                            <InputField fieldName="otherInterest" className="frm-cell" fieldType="text" placeholder="Please add details..." errors={errors} touched={touched} />                      </div>
                          <div className="form-group mb-3 button-wrap">
                            <button type="button" className='cancel comn'>{submitting ? "Please wait..." : "Cancel"}</button>
                            <button className='save comn' type="submit" submitting={submitting}
                            
                             >Save &amp; Next</button>
                          </div>
                        </Form>
                      )}
                    </Formik>
                  </div>
                </div>
              </div>
            </Row>
          </Col>
        </Container>
      </section>

    </Layout>
  );
};
export default ExtracurricularForm;