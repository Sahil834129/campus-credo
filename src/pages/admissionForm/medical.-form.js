import React, { useState } from 'react'
import '../../assets/scss/custom-styles.scss'
import { Formik, Form, Field } from 'formik'
import InputField from '../../components/form/InputField'
import { useNavigate } from 'react-router-dom'
import AdmissionForms from '.'
import { BLOOD_OPTIONS } from '../../constants/formContanst'
import RestEndPoint from '../../redux/constants/RestEndpoints'
import RESTClient from '../../utils/RestClient'
import { ToastContainer, toast } from 'react-toastify'

export const MedicalForm = () => {
  const history = useNavigate()
  const [submitting, setSubmitting] = useState(false)
  const childId = JSON.parse(localStorage.getItem('childId'))

  const saveData = formData => {
    setSubmitting(true)
    RESTClient.post(RestEndPoint.MEDICAL_DETAIL, formData)
      .then(() => {
        setSubmitting(false)
        history('/userProfile/ExtracurricularForm')
      })
      .catch(error => {
        setSubmitting(false)
        toast.error(RESTClient.getAPIErrorMessage(error))
      })
    console.log(JSON.stringify(formData))
  }

  return (
    <AdmissionForms pageTitle={'Medical Details'}>
      <Formik
        initialValues={{
          childId: childId,
          bloodGroup: '',
          allergies: '',
          medicalConditions: '',
          specialCare: '',
          disability: []
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
                selectOptions={BLOOD_OPTIONS}
                errors={errors}
                touched={touched}
              />
            </div>
            <div className='col-md-6'>
              <InputField
                fieldName='allergies'
                label='Does the student have any allergies? If yes, Please Specify'
                required
                fieldType='text'
                placeholder='Please add details...'
                errors={errors}
                touched={touched}
              />
            </div>
            <div className='col-md-6'>
              <InputField
                fieldName='medicalConditions'
                label='Is the student being treated for any medical conditions? If yes, Please Specify'
                required
                fieldType='text'
                placeholder='Please add details...'
                errors={errors}
                touched={touched}
              />
            </div>
            <div className='col-md-6'>
              <InputField
                fieldName='specialCare'
                label='Does the student need any special care due to any allergies/medical conditions? If Yes, Please Specify'
                required
                fieldType='text'
                placeholder='Please add details...'
                errors={errors}
                touched={touched}
              />
            </div>
            <div className='col-12 border-bottom'></div>
            <div className='col-md-6'>
              <label htmlFor='validationServer02' className='form-label'>
                Does the student have any disability?{' '}
                <span className='req'>*</span>
              </label>
              <div className='d-flex align-items-center py-2'>
                <div className=''>
                  <InputField
                    className='form-check-input'
                    label='Yes'
                    fieldName='disabile'
                    fieldType='radio'
                    value={'Yes'}
                    checked={values.disabile === 'Yes'}
                    errors={errors}
                    touched={touched}
                  />
                </div>
                <div className='form-check ms-2'>
                  <InputField
                    className='form-check-input'
                    label='No'
                    value={'No'}
                    fieldName='disabile'
                    fieldType='radio'
                    checked={values.disabile === 'No'}
                    errors={errors}
                    touched={touched}
                  />
                </div>
              </div>
            </div>
            {values.disabile === 'Yes' && (
              <>
                <div className='d-flex'>
                  <div className='form-check'>
                    <InputField
                      fieldName='disability'
                      fieldType='checkbox'
                      value='Autism'
                      label='Autism'
                      errors={errors}
                      touched={touched}
                    />
                  </div>
                  <div className='form-check ms-3'>
                    <InputField
                      fieldName='disability'
                      value='hearingImpairment'
                      fieldType='checkbox'
                      label='Hearing impairment'
                      errors={errors}
                      touched={touched}
                    />
                  </div>
                  <div className='form-check ms-3'>
                    <InputField
                      fieldName='disability'
                      value='languageDisorder'
                      fieldType='checkbox'
                      label='Language disorder'
                      errors={errors}
                      touched={touched}
                    />
                  </div>
                  <div className='form-check  ms-3'>
                    <InputField
                      fieldName='disability'
                      value='physicalDisability'
                      fieldType='checkbox'
                      label='Physical disability'
                      errors={errors}
                      touched={touched}
                    />
                  </div>
                  <div className='form-check ms-3'>
                    <InputField
                      fieldName='disability'
                      value='learningDifficulty'
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
                      fieldName='disability'
                      value='behaviourDisorder'
                      fieldType='checkbox'
                      label='Behaviour disorder'
                      errors={errors}
                      touched={touched}
                    />
                  </div>
                  <div className='form-check ms-3'>
                    <InputField
                      fieldName='disability'
                      value='mentalHealth'
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
                      fieldName='disability'
                      value='visionImpairment'
                      fieldType='checkbox'
                      label='Vision impairment'
                      errors={errors}
                      touched={touched}
                    />
                  </div>
                  <div className='form-check ms-3'>
                    <InputField
                      fieldName='disability'
                      value='Other'
                      fieldType='checkbox'
                      label='Other'
                      errors={errors}
                      touched={touched}
                    />
                  </div>
                </div>

                <div className='col-md-6'>
                  <InputField
                    fieldName='disabilityDescribtion'
                    label='If Yes, Please Specify'
                    required
                    fieldType='text'
                    placeholder='Please add details...'
                    errors={errors}
                    touched={touched}
                  />
                </div>
              </>
            )}
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
    </AdmissionForms>
  )
}
export default MedicalForm
