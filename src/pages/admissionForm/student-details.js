import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { getChildsList } from '../../redux/actions/childAction'

import { useCallback } from 'react'
import { Button, Form } from 'react-bootstrap'
import { toast } from 'react-toastify'
import RadioButton from '../../components/form/RadioButton'
import SelectField from '../../components/form/SelectField'
import TextField from '../../components/form/TextField'
import {
  CATEGORY_OPTIONS,
  GENDER_OPTOPNS,
  NATIONALITY_OPTIONS,
  RELIGION_OPTIONS
} from '../../constants/formContanst'
import { StudentDetailsSchema } from '../../data/validationSchema'
import { getSchoolClasses, getStates } from '../../redux/actions/masterData'
import RestEndPoint from '../../redux/constants/RestEndpoints'
import { getClassBasedOnAge, getStudentAge, str2bool } from '../../utils/helper'
import {
  populateCities
} from '../../utils/populateOptions'
import RESTClient from '../../utils/RestClient'
import { getAgeClassMap } from '../../utils/services'

export default function StudentDetails ({
  currentStudent,
  setStep,
  selectedChild,
  setSelectedChild
}) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const childsList = useSelector(state => state.childsData.childs)
  const classOptions = useSelector(state => state.masterData.schoolClasses)
  const states = useSelector(state => state.masterData.states)
  const [validationErrors, setValidationErrors] = useState({})
  const [schoolCity, setSchoolCity] = useState([
    { value: '', text: 'Select City' }
  ])
  const [city, setCity] = useState([{ value: '', text: 'Select City' }])
  const [isUserExist, setIsUserExist] = useState(false)
  const [classMapWithAge, setClassMapWithAge] = useState({})
  
  const saveStudentDetails = async e => {
    resetValidationErrors()
    e.preventDefault()
    let postData = { ...selectedChild, ...currentStudent }
    if (!isValidFormData(postData))
      return
    
    if (postData.isProvidingCurrentSchoolInfo === 'No') {
      delete postData.schoolName
      delete postData.schoolBoard
      delete postData.obtainedMarks
      delete postData.schoolAddressLine1  
      delete postData.schoolAddressLine2
      delete postData.schoolCity
      delete postData.schoolState
      delete postData.schoolPincode
    }
    delete postData.dateOfBirth
    delete postData.isProvidingCurrentSchoolInfo
    delete postData.firstName
    delete postData.middleName
    delete postData.lastName
    delete postData.gender
    delete postData.tranportFacility

    try {
      if (isUserExist) {
        delete postData.success
        delete postData.parentId
        const response = await RESTClient.put(RestEndPoint.CREATE_STUDENT_PROFILE, postData)
        setSelectedChild(val => {
          return {
            ...val,
            ...response.data,
            isProvidingCurrentSchoolInfo: response.data.schoolName
              ? 'Yes'
              : 'No'
          }
        })
      } else {
        const response = await RESTClient.post(RestEndPoint.CREATE_STUDENT_PROFILE, postData)
        setSelectedChild(val => {
          return {
            ...val,
            ...response.data,
            isProvidingCurrentSchoolInfo: response.data.schoolName
              ? 'Yes'
              : 'No'
          }
        })
      }
      //toast.success('Student details saved successfully.')
      setStep(val => val + 1)
      window.scrollTo(0, 0)
    } catch (error) {
      toast.error(RESTClient.getAPIErrorMessage(error))
    }
  }

  const getCurrentUser = useCallback(
    async childId => {
      try {
        const response = await RESTClient.get(
          RestEndPoint.GET_STUDENT_PROFILE + `/${childId}`
        )
        if (response.data !== '') {
          setSelectedChild(val => {
            return {
              ...val,
              ...response.data,
              isProvidingCurrentSchoolInfo: response.data.schoolName
                ? 'Yes'
                : 'No'
            }
          })
          setIsUserExist(response.data.profileId ? true : false)

          if (response.data.city)
            populateCities(response.data.state, setCity)
          if (response.data.schoolCity) {
            populateCities(response.data.schoolState, setSchoolCity)
          }
          setIsUserExist(response.data.profileId ? true : false)
        } else {
          setIsUserExist(false)
        }
      } catch (error) {
        setIsUserExist(false)
        toast.error(RESTClient.getAPIErrorMessage(error))
      }
    },
    [setSelectedChild]
  )

  function getClassFromAge() {
    const optionText = getClassBasedOnAge(classMapWithAge, classOptions, getStudentAge(selectedChild.dateOfBirth))
    const selectedClass = classOptions.find(it => it.text.toLowerCase() === optionText?.toLowerCase())
    return (selectedClass ? selectedClass.value.toString() : '')
  }

  const setFieldValue = (fieldName, fieldValue) => {
    setSelectedChild({
      ...selectedChild,
      [fieldName]: fieldValue
    })
  }

  const populateClassesWithAge = async() => {
    setClassMapWithAge(await getAgeClassMap())
}

  useEffect(() => {
    if(childsList.length ===0 )
      dispatch(getChildsList())
    if (classOptions.length === 0) {
      dispatch(getSchoolClasses())
    }
    if (states.length === 1) {
      dispatch(getStates())
    }
  }, [dispatch, childsList])

  useEffect(() => {
    if (currentStudent.childId) getCurrentUser(currentStudent.childId)
  }, [currentStudent.childId, getCurrentUser])

  useEffect(() => {
    if (selectedChild.className === '') {
      setSelectedChild({...selectedChild, className: getClassFromAge()})
    }
  }, [selectedChild, setSelectedChild, getClassFromAge])

  useEffect(()=>{populateClassesWithAge()},[])

  function isValidFormData(formData) {
    try {
      StudentDetailsSchema.validateSync(formData, {abortEarly: false})
    } catch(error) {
      addPayloadError(error)
      return false
    }
    return true
  }

  function addPayloadError(error) {
    let errors = {}

    let errorsObj = error.inner ? error.inner : error
    errorsObj.forEach(e => {
      errors[e.path] = e.message
    })
    setValidationErrors(errors)
  }

  function resetValidationErrors() {
    setValidationErrors({})
  }

  return (
    <Form className='application-form-wrap' onSubmit={saveStudentDetails} noValidate>
      <div className='fld-row'>
        <div className='fld-cell'>
          <label>First Name</label>
          <TextField
            fieldName='firstName'
            disabled
            value={selectedChild.firstName}
            //label='First Name'
            placeholder='First Name'
            errors={validationErrors}
          />
        </div>
        <div className='fld-cell'>
          <label>Last Name</label>
          <TextField
            fieldName='lastName'
            disabled
            value={selectedChild.lastName}
            //label='Last Name'
            placeholder='Last Name'
            errors={validationErrors}
          />
        </div>

      </div>
      <div className='fld-row'>
        <div className='fld-cell'>
            <label>Date of Birth</label>
            <TextField
              fieldName='dateOfBirth'
              disabled
              value={selectedChild.dateOfBirth}
              //label='Date of Birth'
              errors={validationErrors}
            />
        </div>
        <div className='fld-cell'>
            {/* <label>Gender</label> */}
            <SelectField
              fieldName='gender'
              label='Gender'
              value={selectedChild.gender}
              disabled
              onChange={e => {
                setFieldValue('gender', e.target.value)
              }}
              selectOptions={GENDER_OPTOPNS}
              errors={validationErrors}
            />
        </div>
      </div>
      <div className='fld-row'>
        <div className='fld-cell'>
          <SelectField
              fieldName='className'
              label='Select Class'
              required={true}
              errors={validationErrors}
              selectOptions={classOptions}
              value={selectedChild.className ? selectedChild.className : getClassFromAge()}
              onChange={e => {
                setFieldValue('className', e.target.value)
              }}
            />
        </div>
        <div className='fld-cell'>
          <SelectField
              fieldName='religion'
              label='Select Religion'
              required={true}
              errors={validationErrors}
              selectOptions={RELIGION_OPTIONS}
              value={selectedChild.religion}
              onChange={e => {
                setFieldValue('religion', e.target.value)
              }}
            />
        </div>
      </div>
      <div className='fld-row mt-3'>
        <div className='fld-cell identification-mark-cell'>
            <label htmlFor='exampleFormControlTextarea1' className='form-label'>
                Identification Marks (Please specify) <span className='req'>*</span>
              </label>
              <textarea
                className='form-control'
                name='identificationMarks'
                rows='4'
                value={selectedChild.identificationMarks}
                onChange={e => {
                  console.log(e.target.value)
                  setFieldValue('identificationMarks', e.target.value)
                }}
              ></textarea>
              {
                validationErrors.hasOwnProperty('identificationMarks') ? <div className='error-exception'>{validationErrors.identificationMarks}</div> : ''
              }
          </div>
        <div className='fld-cell two-row'>
          <div className='fld-item'>
          <SelectField
              fieldName='nationality'
              label='Nationality'
              required={true}
              errors={validationErrors}
              selectOptions={NATIONALITY_OPTIONS}
              value={selectedChild.nationality}
              onChange={e => {
                setFieldValue('nationality', e.target.value)
              }}
            />
          </div>
          <div className='fld-item'>
            <SelectField
              fieldName='category'
              label='Select Category'
              required={true}
              errors={validationErrors}
              selectOptions={CATEGORY_OPTIONS}
              value={selectedChild.category}
              onChange={e => {
                setFieldValue('category', e.target.value)
              }}
            />
          </div>

        </div>
        
        
      </div>

     
      <div className='currentschoolinfo-row'>
        <div className='currentschoolinfo-cell'>
          <label className=''>Please Provide Your Current School Information(If Applicable)</label>
          <div className='form-check'>
            <RadioButton
              label='Yes'
              value='Yes'
              fieldName='isProvidingCurrentSchoolInfo'
              currentValue={selectedChild.isProvidingCurrentSchoolInfo}
              onChange={e => {
                setFieldValue('isProvidingCurrentSchoolInfo', e.target.value)
              }}
            />
          </div>
          <div className='form-check'>
            <RadioButton
              label='No'
              value='No'
              fieldName='isProvidingCurrentSchoolInfo'
              currentValue={selectedChild.isProvidingCurrentSchoolInfo}
              onChange={e => {
                setFieldValue('isProvidingCurrentSchoolInfo', e.target.value)
              }}
            />
          </div>
        </div>
        {selectedChild.isProvidingCurrentSchoolInfo === 'Yes' && (

          <div className='row ifschool-block'>
            <div className='fld-row'>
              <div className='fld-cell'>
                <TextField
                  fieldName='schoolName'
                  value={selectedChild.schoolName}
                  label='School Name'
                  required={selectedChild.isProvidingCurrentSchoolInfo === 'Yes'}
                  errors={validationErrors}
                  placeholder='School Name'
                  onChange={e => {
                    setFieldValue('schoolName', e.target.value)
                  }}
                />
              </div>
              <div className='fld-cell'>
                <TextField
                  fieldName='schoolBoard'
                  value={selectedChild.schoolBoard}
                  label='School Board'
                  required={selectedChild.isProvidingCurrentSchoolInfo === 'Yes'}
                  errors={validationErrors}
                  placeholder='School Board'
                  onChange={e => {
                    setFieldValue('schoolBoard', e.target.value)
                  }}
                />
              </div>
            </div>
            <div className='fld-row'>
              <div className='fld-cell'>
                <TextField
                  fieldName='obtainedMarks'
                  value={selectedChild.obtainedMarks}
                  label='Obtained Marks'
                  required={selectedChild.isProvidingCurrentSchoolInfo === 'Yes'}
                  errors={validationErrors}
                  placeholder='Obtained Marks'
                  onChange={e => {
                    setFieldValue('obtainedMarks', e.target.value)
                  }}
                />
              </div>
              <div className='fld-cell'>
                <TextField
                  fieldName='schoolAddressLine1'
                  value={selectedChild.schoolAddressLine1}
                  label='School Address Line 1'
                  required={selectedChild.isProvidingCurrentSchoolInfo === 'Yes'}
                  errors={validationErrors}
                  placeholder='School Address Line 1'
                  onChange={e => {
                    setFieldValue('schoolAddressLine1', e.target.value)
                  }}
                />
              </div>
            </div>
            <div className='fld-row'>
              <div className='fld-cell'>
                <TextField
                  fieldName='schoolAddressLine2'
                  value={selectedChild.schoolAddressLine2}
                  label='School Address Line 2'
                  required={selectedChild.isProvidingCurrentSchoolInfo === 'Yes'}
                  errors={validationErrors}
                  placeholder='School Address Line 2'
                  onChange={e => {
                    setFieldValue('schoolAddressLine2', e.target.value)
                  }}
                />
              </div>
              <div className='fld-cell'>
                <SelectField
                  fieldName='schoolState'
                  label='Select State'
                  required={selectedChild.isProvidingCurrentSchoolInfo === 'Yes'}
                  errors={validationErrors}
                  selectOptions={states}
                  value={selectedChild.schoolState}
                  onChange={e => {
                    populateCities(e.target.value, setSchoolCity)
                    setFieldValue('schoolState', e.target.value)
                  }}
                />
              </div>
            </div>

            <div className='fld-row'>
              <div className='fld-cell'>
                <SelectField
                  fieldName='schoolCity'
                  label='Select City'
                  required={selectedChild.isProvidingCurrentSchoolInfo === 'Yes'}
                  errors={validationErrors}
                  selectOptions={schoolCity}
                  value={selectedChild.schoolCity}
                  onChange={e => {
                    setFieldValue('schoolCity', e.target.value)
                  }}
                />
              </div>
              <div className='fld-cell'>
                <TextField
                  fieldName='schoolPincode'
                  value={selectedChild.schoolPincode}
                  label='School Pincode'
                  required={selectedChild.isProvidingCurrentSchoolInfo === 'Yes'}
                  errors={validationErrors}
                  placeholder='School Pincode'
                  maxLength='6'
                  onChange={e => {
                    setFieldValue('schoolPincode', e.target.value)
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className='fld-row'>
        <div className='fld-cell info-title'>
        <p className='Addresss_info'>
          Please Provide your Address details{' '}
          <span>(Add Your complete address for easy communication)</span>
        </p>
        </div>
      </div>

      <div className='fld-row'>
        <div className='fld-cell'>
          <TextField
                fieldName='addressLine1'
                required
                errors={validationErrors}
                label='House No., Block No.'
                value={selectedChild.addressLine1}
                onChange={e => {
                  setFieldValue('addressLine1', e.target.value)
                }}
              />
        </div>
        <div className='fld-cell'>
          <TextField
                fieldName='addressLine2'
                required
                errors={validationErrors}
                label='Area or Locality'
                value={selectedChild.addressLine2}
                onChange={e => {
                  setFieldValue('addressLine2', e.target.value)
                }}
              />
        </div>
      </div>
      <div className='fld-row'>
        <div className='fld-cell'>
          <TextField
                fieldName='pincode'
                label='Pincode'
                required
                errors={validationErrors}
                value={selectedChild.pincode}
                maxLength='6'
                onChange={e => {
                  setFieldValue('pincode', e.target.value)
                }}
              />
        </div>
        <div className='fld-cell'>
          <SelectField
                fieldName='state'
                label='Select State'
                required
                errors={validationErrors}
                selectOptions={states}
                value={selectedChild.state}
                onChange={e => {
                  populateCities(e.target.value, setCity)
                  setFieldValue('state', e.target.value)
                }}
              />
        </div>
      </div>
      <div className='fld-row'>
        <div className='fld-cell'> <SelectField
              fieldName='city'
              label='Select City'
              required
              errors={validationErrors}
              selectOptions={city}
              value={selectedChild.city}
              onChange={e => {
                setFieldValue('city', e.target.value)
              }}
            /></div>
        <div className='fld-cell'></div>
      </div>


      <div className='fld-row check-option'>
        <div className='fld-cell'>
          <div className='title'>
            <label htmlFor='validationServer02' className='form-label'>
              Does the student require Transport facility?{' '}
              <span className='req'>*</span>
            </label>
          </div>
          <div className='option-fld-cell'>
            <div className='input-fld'>
              <RadioButton
                    label='Yes'
                    value={true}
                    fieldName='transportFacility'
                    currentValue={selectedChild.transportFacility}
                    onChange={e => {
                      setFieldValue('transportFacility', str2bool(e.target.value))
                    }}
                  />
            </div>
            <div className='input-fld'>
              <RadioButton
                  label='No'
                  value={false}
                  fieldName='transportFacility'
                  currentValue={selectedChild.transportFacility}
                  onChange={e => {
                    setFieldValue('transportFacility', str2bool(e.target.value))
                  }}
                />
            </div>
          </div>
        </div>
        <div className='fld-cell '>
          <div className='title'>
            <label htmlFor='validationServer02' className='form-label'>
              Does the student require Boarding facility?{' '}
              <span className='req'>*</span>
            </label>
            </div>
          <div className='option-fld-cell'>
            <div className='input-fld'>
              <RadioButton
                  label='Yes'
                  value={true}
                  fieldName='boardingFacility'
                  currentValue={selectedChild.boardingFacility}
                  onChange={e => {
                    setFieldValue('boardingFacility', str2bool(e.target.value))
                  }}
                />
            </div>
            <div className='input-fld'>
              <RadioButton
                  label='No'
                  value={false}
                  fieldName='boardingFacility'
                  currentValue={selectedChild.boardingFacility}
                  onChange={e => {
                    setFieldValue('boardingFacility', str2bool(e.target.value))
                  }}
                />
            </div>

          </div>
        </div>
      </div>
  
      <div className='fld-row button-wrap'>
        <Button
            type='button'
            className='cancel comn'
            onClick={() => navigate('/userProfile')}
          >
            Cancel
          </Button>
          <Button type='submit' className='save comn'>
            Save & Next
          </Button>
      </div>
      
    </Form>
  )
}
