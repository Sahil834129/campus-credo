import { Form, Formik } from 'formik'
import React from 'react'
import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import '../../assets/scss/custom-styles.scss'
import InputField from '../../components/form/InputField'
import RestEndPoint from '../../redux/constants/RestEndpoints'
import RESTClient from '../../utils/RestClient'

export default function ExtracurricularForm ({ selectedChild, setSelectedChild, setStep }) {
  const navigate = useNavigate()

  const saveData = async formData => {
    formData['childId'] = selectedChild.childId
    try {
      const response = await RESTClient.patch(
        RestEndPoint.CREATE_STUDENT_PROFILE_EXTRA_CURRICULARS,
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
      setStep(val => val + 1)
    } catch (error) {
      toast.error(RESTClient.getAPIErrorMessage(error))
    }
  }

  return (
    <Formik
      initialValues={{
        childId: selectedChild.childId,
        competitionCertificate: selectedChild.competitionCertificate ? selectedChild.competitionCertificate : '',
        otherInterest: selectedChild.otherInterest
      }}
      validateOnBlur
      onSubmit={values => {
        saveData(values)
      }}
    >
      {({ values, errors, touched }) => (
        <Form className='row g-3 mt-2'>
          <div className='col-12'>
            <label htmlFor='validationServer02' className='form-label'>
              Has the student participated/won any competitions? If Yes, Please
              Specify the level of competition
              <span className='req'>*</span>
            </label>
          </div>
          <div className='d-flex'>
            <div className='form-check ms-3'>
              <InputField
                fieldName='competitionCertificate'
                value='zonal'
                fieldType='radio'
                label='Zonal'
                errors={errors}
                touched={touched}
              />
            </div>
            <div className='form-check ms-3'>
              <InputField
                fieldName='competitionCertificate'
                value='state'
                fieldType='radio'
                label='State'
                errors={errors}
                touched={touched}
              />
            </div>
            <div className='form-check ms-3'>
              <InputField
                fieldName='competitionCertificate'
                value='national'
                fieldType='radio'
                label='National'
                errors={errors}
                touched={touched}
              />
            </div>
            <div className='form-check  ms-3'>
              <InputField
                fieldName='competitionCertificate'
                value='international'
                fieldType='radio'
                label='International'
                errors={errors}
                touched={touched}
              />
            </div>
            <div className='ms-3'>
              <InputField
                fieldName='competitionCertificate'
                value=''
                fieldType='radio'
                label='None'
                errors={errors}
                touched={touched}
              />
            </div>
          </div>

          <div className='col-md-6'>
            <label htmlFor='validationServer02' className='form-label'>
              Does the student have any other interest? If Yes, Please Specify
            </label>
            <InputField
              fieldName='otherInterest'
              className='frm-cell'
              fieldType='text'
              placeholder='Please add details...'
              value={values.otherInterest}
              errors={errors}
              touched={touched}
            />{' '}
          </div>
          <div className="fld-row button-wrap">
            <Button
              type='button'
              className='cancel comn'
              onClick={() => navigate('/userProfile')}
            >
              Cancel
            </Button>
            <Button
              type='button'
              className='save comn'
              onClick={() => {setStep(val => val - 1); window.scrollTo(0, 0)}}
              >
                Back
            </Button>
            <Button className='save comn' type='submit'>
              Save &amp; Next
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  )
}
