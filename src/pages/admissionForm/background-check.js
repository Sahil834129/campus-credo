import React, { useState } from 'react'
import '../../assets/scss/custom-styles.scss'
import { Formik, Form } from 'formik'
import InputField from '../../components/form/InputField'
import { useNavigate } from 'react-router-dom'

import RESTClient from '../../utils/RestClient'
import RestEndPoint from '../../redux/constants/RestEndpoints'
import { toast } from 'react-toastify'
import { StudentBackgroundCheckSchema } from '../../data/validationSchema'

export default function BackgroundCheckForm ({ selectedChild, setSelectedChild, setStep }) {
  const history = useNavigate()
  const [submitting, setSubmitting] = useState(false)

  const saveData = async formData => {
    try {
      formData['childId'] = selectedChild.childId
      delete formData.hadViolenceBehavior
      delete formData.hadSuspension
      delete formData.anyOffensiveConduct

      setSubmitting(true)
      const response = await RESTClient.patch(
        RestEndPoint.CREATE_STUDENT_PROFILE_BACKGROUND_CHECK,
        formData
      )
      setSelectedChild(val => {
        return {
          ...val,
          ...response.data,
          isProvidingCurrentSchoolInfo: response.data.schoolName
            ? 'Yes'
            : 'No'
        }
      })
      setSubmitting(false)
      setStep(val => val + 1)
      window.scrollTo(0, 0)
    } catch (error) {
      setSubmitting(false)
      toast.error(RESTClient.getAPIErrorMessage(error))
    }
  }

  return (
    <Formik
      initialValues={{
        childId: selectedChild.childId,
        violenceBehaviour: selectedChild.violenceBehaviour ? selectedChild.violenceBehaviour :'',
        hadViolenceBehavior: selectedChild.violenceBehaviour ? 'Yes' : 'No',
        suspension: selectedChild.suspension ? selectedChild.suspension : '',
        hadSuspension: selectedChild.suspension ? 'Yes' : 'No',
        offensiveConduct: selectedChild.offensiveConduct ? selectedChild.offensiveConduct : '',
        anyOffensiveConduct: selectedChild.offensiveConduct ? 'Yes' : 'No'
      }}
      validationSchema={StudentBackgroundCheckSchema}
      onSubmit={values => {
        saveData(values)
      }}
    >
      {({ values, setFieldValue, errors, touched }) => (
        <Form className='row g-3'>
          <div className='col-md-6'>
            <label className="form-label">
              Does the student have any history of violent behaviour?
            </label>
            <div className="d-flex  align-items-center py-2">
              <InputField
                fieldName='hadViolenceBehavior'
                value={'Yes'}
                label='Yes'
                checked={values.hadViolenceBehavior === 'Yes'}
                fieldType='radio'
                errors={errors}
                touched={touched}
              />
              <InputField
                fieldName='hadViolenceBehavior'
                value={'No'}
                label='No'
                checked={values.hadViolenceBehavior === 'No'}
                fieldType='radio'
                onClick={e => {
                    setFieldValue('violenceBehaviour', '')
                }}
                errors={errors}
                touched={touched}
              />
            </div>
          </div>
          <div className='col-md-6'>
            <InputField
              fieldName='violenceBehaviour'
              value={values.violenceBehaviour}
              label='If Yes, Please Specify'
              className='frm-cell'
              fieldType='text'
              placeholder='Please add details...'
              disabled={values.hadViolenceBehavior === 'No'}
              errors={errors}
              touched={touched}
            />
          </div>

          <div className='col-md-6'>
            <label className="form-label">
              Has the student ever been suspended or expelled from any previous school?
            </label>
            <div className="d-flex  align-items-center py-2">
              <InputField
                fieldName='hadSuspension'
                value={'Yes'}
                label='Yes'
                checked={values.hadSuspension === 'Yes'}
                fieldType='radio'
                errors={errors}
                touched={touched}
              />
              <InputField
                fieldName='hadSuspension'
                value={'No'}
                label='No'
                checked={values.hadSuspension === 'No'}
                fieldType='radio'
                onClick={e => {
                    setFieldValue('suspension', '')
                }}
                errors={errors}
                touched={touched}
              />
            </div>
          </div>
          <div className='col-md-6'>
            <InputField
              fieldName='suspension'
              value={values.suspension}
              label='If Yes, Please Specify.'
              className='frm-cell'
              fieldType='text'
              placeholder='Please add details...'
              disabled={values.hadSuspension === 'No'}
              errors={errors}
              touched={touched}
            />
          </div>

          <div className='col-md-6'>
            <label className="form-label">
              Has the student been involved in any incidents outside of school that involve serious behaviours?
            </label>
            <div className="d-flex  align-items-center py-2">
              <InputField
                fieldName='anyOffensiveConduct'
                value={'Yes'}
                label='Yes'
                checked={values.anyOffensiveConduct === 'Yes'}
                fieldType='radio'
                errors={errors}
                touched={touched}
              />
              <InputField
                fieldName='anyOffensiveConduct'
                value={'No'}
                label='No'
                checked={values.anyOffensiveConduct === 'No'}
                fieldType='radio'
                onClick={e => {
                    setFieldValue('offensiveConduct', '')
                }}
                errors={errors}
                touched={touched}
              />
            </div>
          </div>
          <div className='col-md-6'>
            <label className='form-label'>
              If Yes, Please Specify
            </label>
            <InputField
              fieldName='offensiveConduct'
              value={values.offensiveConduct}
              className='frm-cell'
              fieldType='text'
              placeholder='Please add details...'
              disabled={values.anyOffensiveConduct === 'No'}
              errors={errors}
              touched={touched}
            />
          </div>
          <div className='form-group mb-3 button-wrap'>
            <button
              type='button'
              className='cancel comn'
              onClick={() => history('/userProfile')}
            >
              Cancel
            </button>
            <button
              type='button'
              className='save comn me-2'
              onClick={() => {setStep(val => val - 1); window.scrollTo(0, 0)}}
              >
                Back
            </button>
            <button
              className='save comn'
              type='submit'
              disabled={submitting}
            >
              {submitting ? 'Please wait...' : 'Save & Next'}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  )
}
