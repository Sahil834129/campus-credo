import React, { useState } from 'react'
import '../../assets/scss/custom-styles.scss'
import { useNavigate } from 'react-router-dom'
import { Formik, Form, Field } from 'formik'
import InputField from '../../components/form/InputField'
import RESTClient from '../../utils/RestClient'
import RestEndPoint from '../../redux/constants/RestEndpoints'
import { toast } from 'react-toastify'
import AdmissionForms from '.'

export const ExtracurricularForm = ExtracurricularForm => {
  const history = useNavigate()
  const [submitting, setSubmitting] = useState(false)
  const childId = JSON.parse(localStorage.getItem('childId'))

  const saveData = formData => {
    setSubmitting(true)
    RESTClient.patch(RestEndPoint.STUDENT_EXTRACURRICULAR, formData)
      .then(() => {
        setSubmitting(false)
        history('/userProfile/BackgroundCheckForm')
      })
      .catch(error => {
        setSubmitting(false)
        toast.error(RESTClient.getAPIErrorMessage(error))
      })
    console.log(JSON.stringify(formData))
  }

  return (
    <AdmissionForms pageTitle={'Extracurriculars'}>
      <Formik
        initialValues={{
          childId: childId,
          competitionCertificate: '',
          otherInterest: ''
        }}
        validateOnBlur
        onSubmit={values => {
          saveData(values)
        }}
      >
        {({ errors, setFieldValue, touched }) => (
          <Form className='row g-3 mt-2'>
            <div className='col-12'>
              <label htmlFor='validationServer02' className='form-label'>
                Has the student participated/won any competitions?
                <span className='req'>*</span>
              </label>
              <div className='d-flex  align-items-center py-2'>
                <div className='form-check'>
                  <InputField
                    className='form-check-input'
                    label='Yes'
                    value='true'
                    fieldName='participat'
                    fieldType='radio'
                    errors={errors}
                    touched={touched}
                  />
                </div>
                <div className='form-check ms-2'>
                  <InputField
                    className='form-check-input'
                    label='No'
                    value='false'
                    fieldName='participat'
                    fieldType='radio'
                    errors={errors}
                    touched={touched}
                  />
                </div>
              </div>
            </div>
            <div className='d-flex'>
              <div className='form-check'>
                <InputField
                  fieldName='zonal'
                  fieldType='checkbox'
                  label='Zonal'
                  errors={errors}
                  touched={touched}
                />
              </div>
              <div className='form-check ms-3'>
                <InputField
                  fieldName='state'
                  fieldType='checkbox'
                  label='State'
                  errors={errors}
                  touched={touched}
                />
              </div>
              <div className='form-check ms-3'>
                <InputField
                  fieldName='national'
                  fieldType='checkbox'
                  label='National'
                  errors={errors}
                  touched={touched}
                />
              </div>
              <div className='form-check  ms-3'>
                <InputField
                  fieldName='international'
                  fieldType='checkbox'
                  label='International'
                  errors={errors}
                  touched={touched}
                />
              </div>
            </div>
            <div className='col-md-6'>
              <label htmlFor='validationServer02' className='form-label'>
                If Yes, Please Specify
              </label>
              <InputField
                fieldName='competitionCertificate'
                className='frm-cell'
                fieldType='text'
                placeholder='Please add details...'
                errors={errors}
                touched={touched}
              />
            </div>

            <div className='col-12 mt-4'>
              <label htmlFor='validationServer02' className='form-label'>
                Does the student have any other interest?
                <span className='req'>*</span>
              </label>
              <div className='d-flex  align-items-center py-2'>
                <div className='form-check'>
                  <InputField
                    className='form-check-input'
                    label=' Yes'
                    value='true'
                    fieldName='interest'
                    fieldType='radio'
                    errors={errors}
                    touched={touched}
                  />
                </div>
                <div className='form-check ms-2'>
                  <InputField
                    className='form-check-input'
                    label=' No'
                    value='false'
                    fieldName='interest'
                    fieldType='radio'
                    errors={errors}
                    touched={touched}
                  />
                </div>
              </div>
            </div>
            <div className='col-md-6'>
              <label htmlFor='validationServer02' className='form-label'>
                If Yes, Please Specify
              </label>
              <InputField
                fieldName='otherInterest'
                className='frm-cell'
                fieldType='text'
                placeholder='Please add details...'
                errors={errors}
                touched={touched}
              />{' '}
            </div>
            <div className='form-group mb-3 button-wrap'>
              <button type='button' className='cancel comn'>
                {submitting ? 'Please wait...' : 'Cancel'}
              </button>
              <button
                className='save comn'
                type='submit'
                submitting={submitting}
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
export default ExtracurricularForm
