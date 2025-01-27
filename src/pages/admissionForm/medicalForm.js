import { Form, Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import '../../assets/scss/custom-styles.scss'
import InputField from '../../components/form/InputField'
import { BLOOD_OPTIONS } from '../../constants/formContanst'
import { StudentMedicalDetailsSchema } from '../../data/validationSchema'
import { getDisabilites } from '../../redux/actions/masterData'
import RestEndPoint from '../../redux/constants/RestEndpoints'
import { getStudentAge } from '../../utils/helper'
import RESTClient from '../../utils/RestClient'
import { Button } from 'react-bootstrap'

export const MedicalForm = ({ selectedChild, setStep }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const disabilitiesOption = useSelector(
    state => state?.masterData?.disabilities || []
  )
  const [enable, setEnable] = useState(false)
  const [medicalProfile, setMedicalProfile] = useState({
    childId: selectedChild.childId,
    bloodGroup: '',
    hasAllergies: 'No',
    allergies: '',
    hasMedicalConditions: 'No',
    medicalConditions: '',
    specialCare: '',
    doesNeedSpecialCare: 'No',
    disabilities: [],
    disability: 'No',
    otherDisability: ''
  })
  const [isMedicalProfileExists, setIsMedicalProfileExists] = useState(false)

  useEffect(() => {
    if (selectedChild.childId) getMedicalProfile(selectedChild.childId)
  }, [selectedChild])

  useEffect(() => {
    if (disabilitiesOption.length === 0) {
      dispatch(getDisabilites())
    }
  }, [disabilitiesOption])
  async function getMedicalProfile (childId) {
    try {
      const response = await RESTClient.get(
        RestEndPoint.GET_STUDENT_MEDICAL_DETAILS + `/${childId}`
      )
      if (response.data !== '') {
        updateMedicalProfileData(response)
      }
    } catch (error) {}
  }

  const saveData = async formData => {
    let disabilitiesArray = formData.disabilities.filter(v=>v!= '')
    
    if (formData.disability === 'Yes' && disabilitiesArray.length === 0){
      toast.error("Please select disability.")
      return
    }

    const disabilities =
      formData.disability === 'Yes' ? formData.disabilities : []

    formData = {
      ...formData,
      childId: selectedChild.childId,
      disabilities: disabilities
    }
    delete formData.disability
    delete formData.hasAllergies
    delete formData.hasMedicalConditions
    delete formData.doesNeedSpecialCare

    try {
      if (isMedicalProfileExists) {
        formData['id'] = medicalProfile.id
        const response =  await RESTClient.put(
          RestEndPoint.CREATE_STUDENT_MEDICAL_DETAILS,
          formData
        )
        updateMedicalProfileData(response)
      } else {
        const response = await RESTClient.post(
          RestEndPoint.GET_STUDENT_MEDICAL_DETAILS,
          formData
        )
        updateMedicalProfileData(response)
      }
      // If age is less than 11 skip extracurricular and background check
      setEnable(false);
      if (getStudentAge(selectedChild.dateOfBirth) < 11)
        setStep(val => val + 3)
      else
        setStep(val => val + 1)
    } catch (error) {
      setEnable(false);
      toast.error(RESTClient.getAPIErrorMessage(error))
    }
  }

  function updateMedicalProfileData (response) {
    setMedicalProfile({
      ...medicalProfile,
      id: response.data.id,
      bloodGroup: response.data.bloodGroup,
      allergies: response.data.allergies,
      hasAllergies: response.data.allergies ? 'Yes' : 'No',
      medicalConditions: response.data.medicalConditions,
      hasMedicalConditions: response.data.medicalConditions ? 'Yes' : 'No',
      specialCare: response.data.specialCare,
      doesNeedSpecialCare: response.data.specialCare ? 'Yes' : 'No',
      disabilities: response.data.disabilities ? response.data.disabilities : [],
      otherDisability: response.data.otherDisability || '',
      disability: response.data.disabilities.filter(v=> v!='').length > 0 ? 'Yes' : 'No'
    })
    setIsMedicalProfileExists(true)
  }

  const getDisabilitesData = (disabilities, value) => {
    const valueIndex = disabilities.indexOf(value)
    if (valueIndex >= 0) disabilities.splice(valueIndex, 1)
    else disabilities.push(value)
    return disabilities
  }

  const isSelected = (values, value) => {
    return values.indexOf(value) < 0 ? false : true
  }

  return (
    <Formik
      initialValues={medicalProfile}
      validationSchema={StudentMedicalDetailsSchema}
      enableReinitialize={true}
      onSubmit={(values) => {
        setEnable(true);
        saveData(values)
      }}
    >
      {({ values, setFieldValue, errors, touched }) => (
        <Form className='application-form-wrap'>
          <div className='fld-row'>
            <div className='fld-cell'>
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
            <div className='fld-cell'></div>
          </div>

   
          {/* <div className='col-12 border-bottom'></div> */}
          
          <div className='fld-row'>
            <div className='fld-cell checkbox-cell'>
              <label className="lbl">Does the student have any allergies? </label>
              <div className='checkbox-fld'>
              <InputField
                fieldName='hasAllergies'
                value={'Yes'}
                label='Yes'
                checked={values.hasAllergies === 'Yes'}
                fieldType='radio'
                errors={errors}
                touched={touched}
              />
              <InputField
                fieldName='hasAllergies'
                value={'No'}
                label='No'
                checked={values.hasAllergies === 'No'}
                fieldType='radio'
                onClick={e => {
                    setFieldValue('allergies', '')
                }}
                errors={errors}
                touched={touched}
              />
              </div>
            </div>
            <div className='fld-cell'>
              <InputField
                fieldName='allergies'
                value={values.allergies}
                label='If yes, Please Specify'
                fieldType='text'
                placeholder='Please add details...'
                disabled={values.hasAllergies === 'No'}
                errors={errors}
                touched={touched}
              />
            </div>
          </div>
          <div className='fld-row'>
            <div className='fld-cell checkbox-cell'>
              <label className="lbl">Is the student being treated for any medical conditions? </label>
              <div className='checkbox-fld'>
                <InputField
                  fieldName='hasMedicalConditions'
                  value={'Yes'}
                  label='Yes'
                  checked={values.hasMedicalConditions === 'Yes'}
                  fieldType='radio'
                  errors={errors}
                  touched={touched}
                />
                <InputField
                  fieldName='hasMedicalConditions'
                  value={'No'}
                  label='No'
                  checked={values.hasMedicalConditions === 'No'}
                  fieldType='radio'
                  onClick={e => {
                    setFieldValue('medicalConditions', '')
                }}
                  errors={errors}
                  touched={touched}
                />
              </div>
            </div>
            <div className='fld-cell'>
              <InputField
                fieldName='medicalConditions'
                value={values.medicalConditions}
                label='If yes, Please Specify'
                fieldType='text'
                placeholder='Please add details...'
                disabled={values.hasMedicalConditions === 'No'}
                errors={errors}
                touched={touched}
              />
            </div>
          </div>
         
          <div className='fld-row'>
            <div className='fld-cell checkbox-cell'>
              <label className="lbl">Does the student need any special care due to any allergies/medical conditions?</label>
              <div className='checkbox-fld'>
                <InputField
                  fieldName='doesNeedSpecialCare'
                  value={'Yes'}
                  label='Yes'
                  checked={values.doesNeedSpecialCare === 'Yes'}
                  fieldType='radio'
                  errors={errors}
                  touched={touched}
                />
                <InputField
                  fieldName='doesNeedSpecialCare'
                  value={'No'}
                  label='No'
                  checked={values.doesNeedSpecialCare === 'No'}
                  fieldType='radio'
                  onClick={e => {
                    setFieldValue('specialCare', '')
                }}
                  errors={errors}
                  touched={touched}
                />
              </div>
            </div>
            <div className='fld-cell'>
              <InputField
                fieldName='specialCare'
                value={values.specialCare}
                label='If Yes, Please Specify'
                fieldType='text'
                placeholder='Please add details...'
                disabled={values.doesNeedSpecialCare === 'No'}
                errors={errors}
                touched={touched}
              />
            </div>
          </div>
          <div className='fld-row expand-block'>

                <div className='expand-block-cell'>
                  <label className="lbl"> Does the student have any disability?{' '} <span className='req'>*</span></label>
                  <div className='checkbox-fld'>
                    <InputField
                        className='form-check-input'
                        label='Yes'
                        fieldName='disability'
                        fieldType='radio'
                        value={'Yes'}
                        checked={values.disability === 'Yes'}
                        errors={errors}
                        touched={touched}
                      />
                      <InputField
                        className='form-check-input'
                        label='No'
                        value={'No'}
                        fieldName='disability'
                        fieldType='radio'
                        checked={values.disability === 'No'}
                        errors={errors}
                        touched={touched}
                      />
                  </div>
                </div>

                
                      {values.disability === 'Yes' && (
                        <div className='expanded-block'>
                      <>
                        <div className='disability-list-wrapper'>
                          {disabilitiesOption
                            .map((it, index) => {
                              return (
                                <div
                                  key={'disability_' + index}
                                  className='disability-list'
                                >
                                  <InputField
                                    fieldName='disabilities'
                                    fieldType='checkbox'
                                    value={it.value}
                                    label={it.text}
                                    checked={
                                      isSelected(values.disabilities, it.value)
                                        ? 'checked'
                                        : ''
                                    }
                                    onChange={e => {
                                      setFieldValue(
                                        getDisabilitesData(
                                          values.disabilities,
                                          e.target.value
                                        )
                                      )
                                    }}
                                    errors={errors}
                                    touched={touched}
                                  />
                                </div>
                              )
                            })}
                        </div>
                        <div className='fld-row others-cell'>
                          <InputField
                            fieldName='otherDisability'
                            label='If Other, Please Specify'
                            required={values.disabilities.find(val => {
                              return val === 'Other'
                            })}
                            disabled={
                              !values.disabilities.find(val => {
                                return val === 'Other'
                              })
                            }
                            value={values.otherDisability}
                            fieldType='text'
                            placeholder='Please add details...'
                            errors={errors}
                            touched={touched}
                          />
                        </div>
                      </>
                      </div>
                    )}
                  

          </div>
        
    

          
          <div className='fld-row button-wrap'>
            <button
              type='button'
              className='cancel comn'
              onClick={() => navigate('/userProfile')}
            >
              Cancel
            </button>
            <button
              type='button'
              className='save comn'
              onClick={() => {setStep(val => val - 1); window.scrollTo(0, 0)}}
              >
                Back
            </button>
            <Button className='save comn' type='submit' disabled={enable}>
              Save & Next
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  )
}
export default MedicalForm
