import React, { useState, useEffect } from 'react'
import '../../assets/scss/custom-styles.scss'
import { Formik, Form } from 'formik'
import InputField from '../../components/form/InputField'
import { useNavigate } from 'react-router-dom'
import { BLOOD_OPTIONS, DISABILITY_LIST } from '../../constants/formContanst'
import RestEndPoint from '../../redux/constants/RestEndpoints'
import RESTClient from '../../utils/RestClient'
import { toast } from 'react-toastify'

export const MedicalForm = ({ selectedChild, setStep }) => {
  const history = useNavigate()
  const [submitting, setSubmitting] = useState(false)
  const [medicalProfile, setMedicalProfile] = useState({
    childId: selectedChild.childId,
    bloodGroup: '',
    allergies: '',
    medicalConditions: '',
    specialCare: '',
    disability: [],
    disabilities: "No"
  })
  const [isMedicalProfileExists, setIsMedicalProfileExists] = useState(false)
  
  useEffect(() => {
    if (selectedChild.childId) getMedicalProfile(selectedChild.childId)
  }, [selectedChild])

  async function getMedicalProfile(childId) {
    try {
      const response = await RESTClient.get(RestEndPoint.GET_STUDENT_MEDICAL_DETAILS + `/${childId}`)
      if (response.data !== '') {
        let disabilityArray = response.data.disabilities.replace('[','').replace(']','').split(',')
        disabilityArray = disabilityArray.map(it => it.toString().trim())
        setMedicalProfile({
          ...medicalProfile,
          id: response.data.id,
          bloodGroup: response.data.bloodGroup,
          allergies: response.data.allergies,
          medicalConditions: response.data.medicalConditions,
          specialCare: response.data.specialCare,
          disability: disabilityArray,
          disabilities: response.data.disabilities.length > 0 ? "Yes" : "No"
        })
        setIsMedicalProfileExists(true)
      }
    } catch (error) {}
  }

  const saveData = async formData => {
    let response
    formData = {
      ...formData,
      childId: selectedChild.childId
    }
    delete formData.disabilities;
    
    try {
      setSubmitting(true)
      if (isMedicalProfileExists) {
        formData["id"] = medicalProfile.id
        response = await RESTClient.put(RestEndPoint.CREATE_STUDENT_MEDICAL_DETAILS, formData)
      } else {
        response = await RESTClient.post(RestEndPoint.GET_STUDENT_MEDICAL_DETAILS, formData)   
      }
      setSubmitting(false)
      setStep(val => val + 1)
    } catch (error) {
      toast.error(RESTClient.getAPIErrorMessage(error))
    }
  }

  const getDisabilites = (disabilities, value) => {
    const valueIndex = disabilities.indexOf(value)
    if (valueIndex >=0)
      disabilities.splice(valueIndex,1);
    else
      disabilities.push(value);
    return disabilities;
  }

  const isSelected = (values, value) => {
    return values.indexOf(value) < 0 ? false : true;
  }
  
  return (
    <Formik
      initialValues= {medicalProfile}
      enableReinitialize= {true}
      onSubmit={values => {
        saveData(values)
      }}
    >
      {({ values, setFieldValue, errors, touched }) => (
        <Form className='row g-3'>
          <div className='col-md-6'>
            <InputField
              fieldName='bloodGroup'
              label='Select Blood Group'
              value={values.bloodGroup}
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
              value={values.allergies}
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
              value={values.medicalConditions}
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
              value={values.specialCare}
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
                  fieldName='disabilities'
                  fieldType='radio'
                  value={'Yes'}
                  checked={values.disabilities === 'Yes'}
                  errors={errors}
                  touched={touched}
                />
              </div>
              <div className='form-check ms-2'>
                <InputField
                  className='form-check-input'
                  label='No'
                  value={'No'}
                  fieldName='disabilities'
                  fieldType='radio'
                  checked={values.disabilities === 'No'}
                  errors={errors}
                  touched={touched}
                />
              </div>
            </div>
          </div>
          {values.disabilities === 'Yes' && (
            <>
                <div className='d-flex'>
                {
                  DISABILITY_LIST.filter((it,idx)=>{return idx<5}).map((it, index) => {
                      return <div key={"disability_"+index} className={'form-check' + (index !== 0 ? ' ms-3' : '')}>
                        <InputField
                          fieldName='disability'
                          fieldType='checkbox'
                          value={it.value}
                          label={it.label}
                          checked={isSelected(values.disability, it.value) ? 'checked' : ''}
                          onChange={e=>{setFieldValue(getDisabilites(values.disability,e.target.value))}}
                          errors={errors}
                          touched={touched}
                        />
                      </div>
                  })
                }
                </div>
                <div className='d-flex'>
                {
                  DISABILITY_LIST.filter((it,idx)=>{return idx>=5 && idx<10}).map((it, index) => {
                      return <div key={"disability_"+index} className={'form-check' + (index !== 0 ? ' ms-3' : '')}>
                        <InputField
                          fieldName='disability'
                          fieldType='checkbox'
                          value={it.value}
                          label={it.label}
                          checked={isSelected(values.disability, it.value) ? 'checked' : ''}
                          onChange={e=>{setFieldValue(getDisabilites(values.disability,e.target.value))}}
                          errors={errors}
                          touched={touched}
                        />
                      </div>
                  })
                }
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
              Cancel
            </button>
            <button
              className='save comn'
              type='submit'
            >
            {submitting ? 'Please wait...' : 'Save & Next'}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  )
}
export default MedicalForm
