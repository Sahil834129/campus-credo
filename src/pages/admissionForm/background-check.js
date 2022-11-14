import React, { useState } from 'react'
import '../../assets/scss/custom-styles.scss'
import { Formik, Form } from 'formik'
import InputField from '../../components/form/InputField'
import { useNavigate } from 'react-router-dom'

import RESTClient from '../../utils/RestClient'
import RestEndPoint from '../../redux/constants/RestEndpoints'
import { toast } from 'react-toastify'
import AdmissionForms from '.'

export default function BackgroundCheckForm ({ selectedChild, setStep }) {
  const history = useNavigate()
  const [submitting, setSubmitting] = useState(false)
  
  const saveData = async(formData) => {
    try {
      formData["childId"] = selectedChild.childId
      setSubmitting(true)
      await RESTClient.patch(RestEndPoint.CREATE_STUDENT_PROFILE_BACKGROUND_CHECK, formData)
      setSubmitting(false)
      setStep(val => val + 1)
    } catch (error) {
      setSubmitting(false)
      toast.error(RESTClient.getAPIErrorMessage(error))  
    }
  }

  return (
    <Formik
      initialValues={{
        childId: selectedChild.childId,
        violenceBehaviour: selectedChild.violenceBehaviour,
        suspension: selectedChild.suspension,
        offensiveConduct: selectedChild.offensiveConduct
      }}
      onSubmit={values => {
        saveData(values)
      }}
    >
      {({ values, errors, touched }) => (
        <Form className='row g-3'>
          <div className='col-md-6'>
            <InputField
              fieldName='violenceBehaviour'
              value={values.violenceBehaviour}
              label='Does the student have any history of violent behaviour? If Yes, Please Specify'
              className='frm-cell'
              fieldType='text'
              placeholder='Please add details...'
              errors={errors}
              touched={touched}
            />
          </div>
          <div className='col-md-6'>
            <InputField
              fieldName='suspension'
              value={values.suspension}
              label='Has the student ever been suspended or expelled from any previous school? If Yes, Please Specify.'
              className='frm-cell'
              fieldType='text'
              placeholder='Please add details...'
              errors={errors}
              touched={touched}
            />
          </div>
          <div className='col-md-6'>
            <label className='form-label'>
              Has the student ever been suspended or expelled from any previous school?If Yes, Please Specify
            </label>
            <InputField
              fieldName='offensiveConduct'
              value={values.offensiveConduct}
              className='frm-cell'
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
              onClick={() => history('/extracurricularform')}
            >
             Cancel
            </button>
            <button
              className='save comn'
              type='submit'
              submitting={submitting}
              // onClick={() => history('/userProfile/ParentsGuardianForm')}
            >
             {submitting ? 'Please wait...' : 'Save & Next'}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  )
}
