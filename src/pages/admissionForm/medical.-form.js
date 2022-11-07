import React, { useState } from 'react'
import '../../assets/scss/custom-styles.scss'
import Container from 'react-bootstrap/Container'
import Button from '../../components/form/Button'
import { Formik, Form } from 'formik'
import InputField from '../../components/form/InputField'
import { useNavigate } from 'react-router-dom'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import LeftMenuBar from '../../common/LeftMenuBar'
import PageContent from '../../resources/pageContent'
import Layout from '../../common/layout'
import Breadcrumbs from '../../common/Breadcrumbs'
import RESTClient from '../../utils/RestClient'
import RestEndPoint from '../../redux/constants/RestEndpoints'
import { ToastContainer, toast } from 'react-toastify'

export const MedicalForm = () => {
  const history = useNavigate()
  const [submitting, setSubmitting] = useState(false)
  const Option = [
    { value: 'A+', text: 'A+' },
    { value: 'A-', text: 'A-' },
    { value: 'B+', text: 'B+' },
    { value: 'B-', text: 'B-' },
    { value: 'AB+', text: 'AB+' },
    { value: 'AB-', text: 'AB-' },
    { value: 'O+', text: 'O+' },
    { value: 'O-', text: 'O-' }
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
                    <h6 className='student-heading'>Medical Condition</h6>
                    <p className='Stud-info'>
                      Please provide accurate details of the student applying
                      for admission. This information is used to help the school
                      best cater for the educational needs of the student.
                    </p>
                    <Formik
                      initialValues={{
                        bloodGroup: '',
                        allergies: 'true',
                        medicalConditions: 'true',
                        specialCare: 'true',
                        disability: 'true'
                      }}
                      onSubmit={values => {
                        saveData(values)
                      }}
                    >
                      {({ values, errors, touched }) => (
                        <Form className='row g-3'>
                          <div className='col-md-6'>
                            <InputField
                              fieldName='bloodGroup'
                              label='Select Blood Group'
                              required
                              fieldType='select'
                              placeholder=''
                              selectOptions={Option}
                              errors={errors}
                              touched={touched}
                            />
                          </div>
                          <div className='col-md-6'>
                            <InputField
                              fieldName=''
                              label='If Other, Please Specify'
                              required
                              fieldType='text'
                              placeholder='Please add details...'
                              errors={errors}
                              touched={touched}
                            />
                          </div>
                          <div className='col-md-6'>
                            <label
                              htmlFor='validationServer02'
                              className='form-label'
                            >
                              Does the student have any allergies?
                              <span className='req'>*</span>
                            </label>
                            <div className='d-flex  align-items-center py-2'>
                              <div className='form-check'>
                                <InputField
                                  className='form-check-input'
                                  label=' Yes'
                                  fieldName='allergies'
                                  fieldType='radio'
                                  checked={values.allergies}
                                  errors={errors}
                                  touched={touched}
                                />
                              </div>
                              <div className='form-check ms-2'>
                                <InputField
                                  className='form-check-input'
                                  label='No'
                                  fieldName='allergies'
                                  fieldType='radio'
                                  checked={values.allergies}
                                  errors={errors}
                                  touched={touched}
                                />
                              </div>
                            </div>
                          </div>
                          <div className='col-md-6'>
                            <InputField
                              fieldName=''
                              label='If Other, Please Specify'
                              required
                              fieldType='text'
                              placeholder='Please add details...'
                              errors={errors}
                              touched={touched}
                            />
                          </div>
                          <div className='col-md-6'>
                            <label
                              htmlFor='validationServer02'
                              className='form-label'
                            >
                              Is the student being treated for any medical
                              conditions? <span className='req'>*</span>
                            </label>
                            <div className='d-flex  align-items-center py-2'>
                              <div className='form-check'>
                                <InputField
                                  className='form-check-input'
                                  label='Yes'
                                  fieldName='medicalConditions'
                                  fieldType='radio'
                                  checked={values.medicalConditions}
                                  errors={errors}
                                  touched={touched}
                                />
                              </div>
                              <div className='form-check ms-2'>
                                <InputField
                                  className='form-check-input'
                                  label='No'
                                  fieldName='medicalConditions'
                                  fieldType='radio'
                                  checked={values.medicalConditions}
                                  errors={errors}
                                  touched={touched}
                                />
                              </div>
                            </div>
                          </div>
                          <div className='col-md-6'>
                            <InputField
                              fieldName=''
                              label='If Yes, Please Specify'
                              required
                              fieldType='text'
                              placeholder='Please add details...'
                              errors={errors}
                              touched={touched}
                            />
                          </div>
                          <div className='col-md-6'>
                            <label
                              htmlFor='validationServer02'
                              className='form-label'
                            >
                              Does the student need any special care due to any
                              allergies/medical conditions?
                              <span className='req'>*</span>
                            </label>
                            <div className='d-flex  align-items-center py-2'>
                              <div className='form-check'>
                                <InputField
                                  className='form-check-input'
                                  label='Yes'
                                  fieldName='specialCare'
                                  fieldType='radio'
                                  checked={values.specialCare}
                                  errors={errors}
                                  touched={touched}
                                />
                              </div>
                              <div className='form-check ms-2'>
                                <InputField
                                  className='form-check-input'
                                  label='No'
                                  fieldName='specialCare'
                                  fieldType='radio'
                                  checked={values.specialCare}
                                  errors={errors}
                                  touched={touched}
                                />
                              </div>
                            </div>
                          </div>
                          <div className='col-md-6'>
                            <InputField
                              fieldName=''
                              label='If Yes, Please Specify'
                              required
                              fieldType='text'
                              placeholder='Please add details...'
                              errors={errors}
                              touched={touched}
                            />
                          </div>
                          <div className='col-12 border-bottom'></div>
                          <div className='col-md-6'>
                            <label
                              htmlFor='validationServer02'
                              className='form-label'
                            >
                              Does the student have any disability?{' '}
                              <span className='req'>*</span>
                            </label>
                            <div className='d-flex  align-items-center py-2'>
                              <div className='form-check'>
                                <InputField
                                  className='form-check-input'
                                  label='Yes'
                                  fieldName='disability'
                                  fieldType='radio'
                                  checked={values.disability}
                                  errors={errors}
                                  touched={touched}
                                />
                              </div>
                              <div className='form-check ms-2'>
                                <InputField
                                  className='form-check-input'
                                  label='No'
                                  fieldName='disability'
                                  fieldType='radio'
                                  checked={values.disability}
                                  errors={errors}
                                  touched={touched}
                                />
                              </div>
                            </div>
                          </div>
                          <div className='d-flex'>
                            <div className='form-check'>
                              <InputField
                                fieldName='Autism'
                                fieldType='checkbox'
                                label='Autism'
                                errors={errors}
                                touched={touched}
                              />
                            </div>
                            <div className='form-check ms-3'>
                              <InputField
                                fieldName='hearingImpairment'
                                fieldType='checkbox'
                                label='Hearing impairment'
                                errors={errors}
                                touched={touched}
                              />
                            </div>
                            <div className='form-check ms-3'>
                              <InputField
                                fieldName='languageDisorder'
                                fieldType='checkbox'
                                label='Language disorder'
                                errors={errors}
                                touched={touched}
                              />
                            </div>
                            <div className='form-check  ms-3'>
                              <InputField
                                fieldName='physicalDisability'
                                fieldType='checkbox'
                                label='Physical disability'
                                errors={errors}
                                touched={touched}
                              />
                            </div>
                            <div className='form-check ms-3'>
                              <InputField
                                fieldName='learningDifficulty'
                                fieldType='checkbox'
                                label='Learning difficulty'
                                errors={errors}
                                touched={touched}
                              />
                            </div>
                          </div>
                          <div className='d-flex'>
                            <div className='form-check'>
                              <InputField
                                fieldName='behaviourDisorder'
                                fieldType='checkbox'
                                label='Behaviour disorder'
                                errors={errors}
                                touched={touched}
                              />
                            </div>
                            <div className='form-check ms-3'>
                              <InputField
                                fieldName='mentalHealth'
                                fieldType='checkbox'
                                label='Mental health disorder'
                                errors={errors}
                                touched={touched}
                              />
                            </div>
                            <div className='form-check ms-3'>
                              <InputField
                                fieldName='speechImpairment'
                                fieldType='checkbox'
                                label='Speech impairment'
                                errors={errors}
                                touched={touched}
                              />
                            </div>
                            <div className='form-check  ms-3'>
                              <InputField
                                fieldName='visionImpairment'
                                fieldType='checkbox'
                                label='Vision impairment'
                                errors={errors}
                                touched={touched}
                              />
                            </div>
                            <div className='form-check ms-3'>
                              <InputField
                                fieldName='Other'
                                fieldType='checkbox'
                                label='Other'
                                errors={errors}
                                touched={touched}
                              />
                            </div>
                          </div>
                          <div className='col-md-6'>
                            <InputField
                              fieldName=''
                              label='If Yes, Please Specify'
                              required
                              fieldType='text'
                              placeholder='Please add details...'
                              errors={errors}
                              touched={touched}
                            />
                          </div>
                          <div className='form-group mb-3 button-wrap'>
                            <button
                              type='button'
                              className='cancel comn'
                              onClick={() => history('/school-admission')}
                            >
                              {submitting ? 'Please wait...' : 'Cancel'}
                            </button>
                            <button
                              className='save comn'
                              type='submit'
                              submitting={submitting}
                              // onClick={() => history('/userProfile/ExtracurricularForm')}
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
export default MedicalForm
