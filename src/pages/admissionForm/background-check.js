import React, { useState } from 'react';
import "../../assets/scss/custom-styles.scss";
import Container from "react-bootstrap/Container";
import Button from "../../components/form/Button";
import { Formik, Form, Field } from 'formik';
import InputField from "../../components/form/InputField";
import { useNavigate } from "react-router-dom";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Breadcrumbs from '../../common/Breadcrumbs';
import Layout from '../../common/layout';
import LeftMenuBar from '../../common/LeftMenuBar';
import PageContent from '../../resources/pageContent';
import RESTClient from '../../utils/RestClient';
import RestEndPoint from '../../redux/constants/RestEndpoints';
import { ToastContainer, toast } from "react-toastify";

export const BackgroundCheckForm = (BackgroundCheckForm) => {
  const history = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const saveData = (formData) => {
    // setSubmitting(true);
    // RESTClient.PATCH(RestEndPoint.STUDENT_BACKGROUND, formData).then(() => {
    //   setSubmitting(false);
    //   history("/userProfile/BackgroundCheckForm")
    // }).catch((error) => {
    //   setSubmitting(false);
    //   toast.error(RESTClient.getAPIErrorMessage(error));
    // });
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
                    <h6 className="student-heading">Background Check</h6>
                    <p className="Stud-info">
                      Please provide accurate details of the student applying
                      for admission. This information is used to help the school
                      best cater for the educational needs of the student.
                    </p>
                    <Formik initialValues={{ violenceBehaviour: 'true', suspension: 'false', offensiveConduct: 'true' }}
                      onSubmit={values => { saveData(values) }}>
                      {({ values, errors, touched }) => (
                        <Form className="row g-3">
                          <div className="col-12 mt-5">
                            <label for="validationServer02" className="form-label">
                              Does the student have any history of violent behaviour?<span className="req">*</span>
                            </label>
                            <div className="d-flex  align-items-center py-2">
                              <div className="form-check">
                                <InputField className="form-check-input" label="Yes" value="true" fieldName="violenceBehaviour" checked={values.violenceBehaviour} fieldType="radio" errors={errors} touched={touched} />
                              </div>
                              <div className="form-check ms-2">
                                <InputField className="form-check-input" label="No" value="true" fieldName="violenceBehaviour"  checked={values.violenceBehaviour} fieldType="radio" errors={errors} touched={touched} />
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <InputField fieldName="details" label="If Yes, Please Specify" className="frm-cell" fieldType="text" placeholder="Please add details..." errors={errors} touched={touched} />
                          </div>
                          <div className="col-12 mt-n77">
                            <label for="validationServer02" className="form-label">
                              Has the student ever been suspended or expelled from any previous school?<span className="req">*</span>
                            </label>
                            <div className="d-flex  align-items-center py-2">
                              <div className="form-check">
                                <InputField className="form-check-input" label="Yes" value="true" fieldName="suspension" fieldType="radio" checked={values.suspension}  errors={errors} touched={touched} />
                              </div>
                              <div className="form-check ms-2">
                                <InputField className="form-check-input" label="No" value="true" fieldName="suspension" fieldType="radio"  checked={values.suspension}  errors={errors} touched={touched} />
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <InputField fieldName="detailsTwo" label="If Yes, Please Specify" className="frm-cell" fieldType="text" placeholder="Please add details..." errors={errors} touched={touched} />
                          </div>
                          <div className="col-12 mt-n47">
                            <label for="validationServer02" className="form-label">
                              Has the student been involved in any incidents
                              outside of school that involve serious behaviours?<span className="req">*</span>
                            </label>
                            <div className="d-flex  align-items-center py-2">
                              <div className="form-check">
                                <InputField className="form-check-input" label="Yes" value="true" fieldName="offensiveConduct" fieldType="radio" checked={values.offensiveConduct} errors={errors} touched={touched} />
                              </div>
                              <div className="form-check ms-2">
                                <InputField className="form-check-input" label="No" value="true" fieldName="offensiveConduct" fieldType="radio" checked={values.offensiveConduct} errors={errors} touched={touched} />
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <label for="validationServer02" className="form-label">
                              If Yes, Please Specify
                            </label>
                            <InputField fieldName="validationServer02" className="frm-cell" fieldType="text" placeholder="Please add details..." errors={errors} touched={touched} />
                          </div>
                          <div className="form-group mb-3 button-wrap">
                            <button type="button" className='cancel comn' onClick={() => history("/extracurricularform")}>{submitting ? "Please wait..." : "Cancel"}</button>
                            <button className='save comn' type="submit" submitting={submitting}
                            // onClick={() => history('/userProfile/ParentsGuardianForm')}
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
export default BackgroundCheckForm;