import React, { useState } from 'react'
import '../../assets/scss/custom-styles.scss'
import Container from 'react-bootstrap/Container'
import Button from '../../components/form/Button'
import { Formik, Form, Field } from 'formik'
import InputField from '../../components/form/InputField'
import { Link, useNavigate } from 'react-router-dom'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Layout from '../../common/layout'
import Breadcrumbs from '../../common/Breadcrumbs'
import LeftMenuBar from '../../common/LeftMenuBar'
import PageContent from '../../resources/pageContent'
import { GENDER_OPTOPNS } from '../../constants/formContanst'

export const ParentsGuardianForm = ParentsGuardianForm => {
  const history = useNavigate()
  const [submitting, setSubmitting] = useState(false)
  const Options = [
    { value: "Master's", text: "Master's" },
    { value: "Bachelor's", text: "Bachelor's" },
    { value: 'Diploma', text: 'Diploma' }
  ]
  const occupation = [
    { value: 'Teacher', text: 'Teacher' },
    { value: 'Lawyer', text: 'Lawyer' },
    { value: 'Social Worker', text: 'Social Worker' }
  ]
  const income = [
    { value: '10000000', text: '10000000' },
    { value: '1000000', text: '1000000' },
    { value: '100000', text: '100000' }
  ]

  const saveData = formData => {
    console.log(JSON.stringify(formData))
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
                  menuItems={PageContent.ADMISSION_FORM_SIDEBAR_MENU_ITEMS}
                  parentPage='userProfile'
                />
                <div className='inner-page-content right'>
                  <div className='inner-page-right-container'>
                    <h6 className='student-heading'>Parents/Guardian</h6>
                    <p className='Stud-info'>
                      Please provide accurate details of the student applying
                      for admission. This information is used to help the school
                      best cater for the educational needs of the student.
                    </p>
                    <Formik
                      initialValues={{
                        relation: 'false',
                        firstName: '',
                        lastName: '',
                        gender: '',
                        nationality: 'false',
                        maritalStatus: 'true',
                        addressLine1: 'false',
                        qualification: '',
                        occupation: '',
                        annualFamilyIncome: '',
                        dateOfBirth: new Date()
                      }}
                      onSubmit={values => {
                        saveData(values)
                      }}
                    >
                      {({ values, errors, touched }) => (
                        <Form className='row g-3'>
                          <div className='tab_btn'>
                            <ul className='nav nav-tabs my-3'>
                              <li className='nav-item'>
                                <a
                                  href='#demo1'
                                  className='nav-link active'
                                  data-bs-toggle='tab'
                                >
                                  Father
                                </a>
                              </li>
                              <li className='nav-item'>
                                <a
                                  href='#demo2'
                                  className='nav-link'
                                  data-bs-toggle='tab'
                                >
                                  Mother
                                </a>
                              </li>
                              <li className='nav-item'>
                                <a
                                  href='#demo3'
                                  className='nav-link'
                                  data-bs-toggle='tab'
                                >
                                  Guardian(If Applicable)
                                </a>
                              </li>
                            </ul>
                            <div className='tab-content'>
                              <div className='tab-pane active' id='demo1'>
                                <form className='row g-3'>
                                  <div className='col-md-6'>
                                    <label
                                      for='validationServer02'
                                      className='form-label'
                                    >
                                      Relationship with Student{' '}
                                      <span className='req'>*</span>
                                    </label>
                                    <div className='d-flex  align-items-center py-2'>
                                      <div className='form-check'>
                                        <InputField
                                          className='form-check-input'
                                          label='Father'
                                          value='true'
                                          fieldName='relation'
                                          fieldType='radio'
                                          checked={values.Student}
                                          errors={errors}
                                          touched={touched}
                                        />
                                      </div>
                                      <div className='form-check ms-2'>
                                        <InputField
                                          className='form-check-input'
                                          label='Mother'
                                          value='true'
                                          fieldName='relation'
                                          fieldType='radio'
                                          errors={errors}
                                          touched={touched}
                                        />
                                      </div>
                                      <div className='form-check ms-2'>
                                        <InputField
                                          className='form-check-input'
                                          label='Other'
                                          value='true'
                                          fieldName='relation'
                                          fieldType='radio'
                                          errors={errors}
                                          touched={touched}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className='col-md-6'>
                                    <InputField
                                      fieldName='firstName'
                                      label='First Name'
                                      required
                                      fieldType='text'
                                      placeholder='Please add details...'
                                      errors={errors}
                                      touched={touched}
                                    />
                                  </div>
                                  <div className='col-md-6'>
                                    {/* <label htmlFor="Pincode" className="form-label">If Other, Please Specify</label> */}
                                    <InputField
                                      fieldName='detailTwo'
                                      label='If Other, Please Specify'
                                      required
                                      fieldType='text'
                                      placeholder='Please add details...'
                                      errors={errors}
                                      touched={touched}
                                    />
                                  </div>
                                  <div className='col-md-6'>
                                    <InputField
                                      fieldName='lastName'
                                      label='Last Name'
                                      required
                                      fieldType='text'
                                      placeholder='Please add details...'
                                      errors={errors}
                                      touched={touched}
                                    />
                                  </div>
                                  <div className='col-md-6'>
                                    <InputField
                                      fieldName='dateOfBirth'
                                      value={values.dateOfBirth}
                                      label='Date of Birth'
                                      fieldType='text'
                                      placeholder='DD-MM-YYYY'
                                      errors={errors}
                                      touched={touched}
                                    />
                                  </div>
                                  <div className='col-md-6'>
                                    <label
                                      for='validationServer02'
                                      className='form-label'
                                    >
                                      Select Gender{' '}
                                      <span className='req'>*</span>
                                    </label>
                                    <div className='d-flex  align-items-center py-2'>
                                      {GENDER_OPTOPNS.map(val => (
                                        <div
                                          className='form-check'
                                          key={`gender-parent-${val.value}`}
                                        >
                                          <InputField
                                            className='form-check-input'
                                            label={val.Value}
                                            value='true'
                                            fieldName='gender'
                                            fieldType='radio'
                                            errors={errors}
                                            touched={touched}
                                          />
                                        </div>
                                      ))}
                                    </div>
                                  </div>

                                  <div className='col-md-6'>
                                    <label
                                      for='validationServer02'
                                      className='form-label'
                                    >
                                      Nationality <span className='req'>*</span>
                                    </label>

                                    <div className='d-flex  align-items-center py-2'>
                                      <div className='form-check'>
                                        <InputField
                                          className='form-check-input'
                                          label='Indian'
                                          value='true'
                                          fieldName='nationality'
                                          fieldType='radio'
                                          errors={errors}
                                          touched={touched}
                                        />
                                      </div>
                                      <div className='form-check ms-2'>
                                        <InputField
                                          className='form-check-input'
                                          label='Other'
                                          value='true'
                                          fieldName='nationality'
                                          fieldType='radio'
                                          errors={errors}
                                          touched={touched}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className='col-md-6'>
                                    <label
                                      for='validationServer02'
                                      className='form-label'
                                    >
                                      Marital Status
                                      <span className='req'>*</span>
                                    </label>
                                    <div className='d-flex  align-items-center py-2'>
                                      <div className='form-check'>
                                        <InputField
                                          className='form-check-input'
                                          label='Married'
                                          value='true'
                                          fieldName='maritalStatus'
                                          fieldType='radio'
                                          errors={errors}
                                          touched={touched}
                                        />
                                      </div>
                                      <div className='form-check ms-2'>
                                        <InputField
                                          className='form-check-input'
                                          label='Widowed'
                                          value='true'
                                          fieldName='maritalStatus'
                                          fieldType='radio'
                                          errors={errors}
                                          touched={touched}
                                        />
                                      </div>
                                      <div className='form-check ms-2'>
                                        <InputField
                                          className='form-check-input'
                                          label='Divorced'
                                          value='true'
                                          fieldName='maritalStatus'
                                          fieldType='radio'
                                          errors={errors}
                                          touched={touched}
                                        />
                                      </div>
                                      <div className='form-check ms-2'>
                                        <InputField
                                          className='form-check-input'
                                          label='Seperated'
                                          value='true'
                                          fieldName='maritalStatus'
                                          fieldType='radio'
                                          errors={errors}
                                          touched={touched}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className='col-md-6'>
                                    <label
                                      htmlFor='Pincode'
                                      className='form-label'
                                    >
                                      If Other, Please Specify
                                    </label>
                                    <InputField
                                      fieldName='detailsThree'
                                      className='frm-cell'
                                      fieldType='text'
                                      placeholder='Please add details...'
                                      errors={errors}
                                      touched={touched}
                                    />
                                  </div>
                                  <div className=' col-md-6'>
                                    <div className='form-check'>
                                      <InputField
                                        className='form-check-input'
                                        label='Never Married'
                                        value='true'
                                        fieldName='gridRadios'
                                        fieldType='radio'
                                        errors={errors}
                                        touched={touched}
                                      />
                                    </div>
                                  </div>
                                  <div className='col-md-6'>
                                    <label
                                      for='validationServer02'
                                      className='form-label'
                                    >
                                      Residential Address - Same as student?{' '}
                                      <span className='req'>*</span>
                                    </label>
                                    <div className='d-flex  align-items-center py-2'>
                                      <div className='form-check'>
                                        <InputField
                                          className='form-check-input'
                                          label='Yes'
                                          value='true'
                                          fieldName='addressLine1'
                                          fieldType='radio'
                                          errors={errors}
                                          touched={touched}
                                        />
                                      </div>
                                      <div className='form-check ms-2'>
                                        <InputField
                                          className='form-check-input'
                                          label='No'
                                          value='true'
                                          fieldName='addressLine1'
                                          fieldType='radio'
                                          errors={errors}
                                          touched={touched}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className='col-md-6'>
                                    <InputField
                                      fieldName='qualification'
                                      label='Qualitfication'
                                      required
                                      fieldType='select'
                                      placeholder=''
                                      selectOptions={Options}
                                      errors={errors}
                                      touched={touched}
                                    />
                                  </div>
                                  <div className='col-md-6'>
                                    <InputField
                                      fieldName='occupation'
                                      label='Occupation'
                                      required
                                      fieldType='select'
                                      placeholder=''
                                      selectOptions={occupation}
                                      errors={errors}
                                      touched={touched}
                                    />
                                  </div>
                                  <div className='col-md-6'>
                                    <InputField
                                      fieldName='annualFamilyIncome'
                                      label=' Annual Family Income'
                                      required
                                      fieldType='select'
                                      placeholder=''
                                      selectOptions={income}
                                      errors={errors}
                                      touched={touched}
                                    />
                                  </div>
                                </form>
                              </div>
                              <div className='tab-pane' id='demo2'>
                                <h1>hello shiv</h1>
                              </div>
                              <div className='tab-pane' id='demo3'>
                                <h1>hello </h1>
                              </div>
                            </div>
                          </div>
                          <div className='form-group mb-3 button-wrap'>
                            <button
                              type='button'
                              className='cancel comn'
                              onClick={() => history('/backgroundcheckform')}
                            >
                              {submitting ? 'Please wait...' : 'Cancel'}
                            </button>
                            <button
                              className='save comn'
                              type='submit'
                              submitting={submitting}
                              // onClick={() => history('/userProfile/SupportingDocumentForm')}
                            >
                              Save &amp; Next
                            </button>
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
  )
}
export default ParentsGuardianForm
