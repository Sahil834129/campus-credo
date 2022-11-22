import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { getChildsList } from '../../redux/actions/childAction'

import {
  CATEGORY_OPTIONS,
  GENDER_OPTOPNS,
  NATIONALITY_OPTIONS,
  RELIGION_OPTIONS
} from '../../constants/formContanst'
import { toast } from 'react-toastify'
import RESTClient from '../../utils/RestClient'
import RestEndPoint from '../../redux/constants/RestEndpoints'
import TextField from '../../components/form/TextField'
import SelectField from '../../components/form/SelectField'
import RadioButton from '../../components/form/RadioButton'
import { Button, Form } from 'react-bootstrap'
import {
  populateCities
} from '../../utils/populateOptions'
import { str2bool } from '../../utils/helper'
import { useCallback } from 'react'
import { getSchoolClasses, getStates } from '../../redux/actions/masterData'

export default function StudentDetails ({
  currentStudent,
  setStep,
  selectedChild,
  setSelectedChild
}) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const classOptions = useSelector(state => state.masterData.schoolClasses)
  const states = useSelector(state => state.masterData.states)
  const [schoolCity, setSchoolCity] = useState([
    { value: '', text: 'Select State' }
  ])
  const [city, setCity] = useState([{ value: '', text: 'Select City' }])

  const [isUserExist, setIsUserExist] = useState(false)
  const saveStudentDetails = async e => {
    e.preventDefault()
    let postData = { ...selectedChild, ...currentStudent }
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

        await RESTClient.put(RestEndPoint.CREATE_STUDENT_PROFILE, postData)
      } else {
        await RESTClient.post(RestEndPoint.CREATE_STUDENT_PROFILE, postData)
      }
      toast.success('Student details saved successfully.')
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
          populateCities(response.data.state, setCity)
          if (response.data.schoolCity) {
            populateCities(response.data.schoolState, setSchoolCity)
          }
          setIsUserExist(true)
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

  const setFieldValue = (fieldName, fieldValue) => {
    setSelectedChild({
      ...selectedChild,
      [fieldName]: fieldValue
    })
  }

  useEffect(() => {
    dispatch(getChildsList())
    if (classOptions.length === 0) {
      dispatch(getSchoolClasses())
    }
    if (states.length === 1) {
      dispatch(getStates())
    }
  }, [dispatch])

  useEffect(() => {
    if (currentStudent.childId) getCurrentUser(currentStudent.childId)
  }, [currentStudent.childId, getCurrentUser])

  useEffect(() => {}, [])

  return (
    <Form className='row g-3' onSubmit={saveStudentDetails}>
      <div className='col-md-6'>
        <TextField
          fieldName='firstName'
          disabled
          value={selectedChild.firstName}
          label='First Name'
          required
          placeholder='First Name'
        />
      </div>
      <div className='col-md-6'>
        <TextField
          fieldName='lastName'
          disabled
          value={selectedChild.lastName}
          label='Last Name'
          required
          placeholder='Last Name'
        />
      </div>
      <div className='col-md-6'>
        <TextField
          fieldName='dateOfBirth'
          disabled
          value={selectedChild.dateOfBirth}
          label='Date of Birth'
          required
        />
      </div>
      <div className='col-md-6'>
        <SelectField
          fieldName='gender'
          label='Gender'
          value={selectedChild.gender}
          disabled
          onChange={e => {
            setFieldValue('gender', e.target.value)
          }}
          required
          selectOptions={GENDER_OPTOPNS}
        />
      </div>
      <div className='col-md-6'>
        <div>
          <SelectField
            fieldName='className'
            label='Select Class'
            required
            selectOptions={classOptions}
            value={selectedChild.className}
            onChange={e => {
              setFieldValue('className', e.target.value)
            }}
          />
        </div>
        <div>
          <SelectField
            fieldName='religion'
            label='Select Religion'
            required
            selectOptions={RELIGION_OPTIONS}
            value={selectedChild.religion}
            onChange={e => {
              setFieldValue('religion', e.target.value)
            }}
          />
        </div>
      </div>
      <div className='col-md-6'>
        <label htmlFor='exampleFormControlTextarea1' className='form-label'>
          Identification Marks (Please specify) <span className='req'>*</span>
        </label>
        <textarea
          className='form-control'
          name='identificationMarks'
          rows='4'
          required
          value={selectedChild.identificationMarks}
          onChange={e => {
            setFieldValue('identificationMarks', e.target.value)
          }}
        ></textarea>
      </div>
      <div className='col-md-6'>
        <div>
          <SelectField
            fieldName='nationality'
            label='Nationality'
            required
            selectOptions={NATIONALITY_OPTIONS}
            value={selectedChild.nationality}
            onChange={e => {
              setFieldValue('nationality', e.target.value)
            }}
          />
        </div>
      </div>

      <div className='col-md-6'>
        <SelectField
          fieldName='category'
          label='Select Category'
          required
          selectOptions={CATEGORY_OPTIONS}
          value={selectedChild.category}
          onChange={e => {
            setFieldValue('category', e.target.value)
          }}
        />
      </div>
      <div className='col-12 border-bottom border-top pt-2 pb-2'>
        <div className='col-md-12 mb-2'>
          <label className=' me-2'>
            Please Provide Your Current School Information(If Applicabple)
          </label>
          <div className='form-check form-check-inline'>
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
          <div className='form-check form-check-inline'>
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
          <div className='row g-3'>
            <div className='col-md-6'>
              <TextField
                fieldName='schoolName'
                value={selectedChild.schoolName}
                label='School Name'
                required={selectedChild.isProvidingCurrentSchoolInfo === 'Yes'}
                placeholder='School Name'
                onChange={e => {
                  setFieldValue('schoolName', e.target.value)
                }}
              />
            </div>
            <div className='col-md-6'>
              <TextField
                fieldName='schoolBoard'
                value={selectedChild.schoolBoard}
                label='School Board'
                required={selectedChild.isProvidingCurrentSchoolInfo === 'Yes'}
                placeholder='School Board'
                onChange={e => {
                  setFieldValue('schoolBoard', e.target.value)
                }}
              />
            </div>
            <div className='col-md-6'>
              <TextField
                fieldName='obtainedMarks'
                value={selectedChild.obtainedMarks}
                label='Obtained Marks'
                required={selectedChild.isProvidingCurrentSchoolInfo === 'Yes'}
                placeholder='Obtained Marks'
                onChange={e => {
                  setFieldValue('obtainedMarks', e.target.value)
                }}
              />
            </div>
            <div className='col-md-6'>
              <TextField
                fieldName='schoolAddressLine1'
                value={selectedChild.schoolAddressLine1}
                label='School Address Line 1'
                required={selectedChild.isProvidingCurrentSchoolInfo === 'Yes'}
                placeholder='School Address Line 1'
                onChange={e => {
                  setFieldValue('schoolAddressLine1', e.target.value)
                }}
              />
            </div>
            <div className='col-md-6'>
              <TextField
                fieldName='schoolAddressLine2'
                value={selectedChild.schoolAddressLine2}
                label='School Address Line 2'
                required={selectedChild.isProvidingCurrentSchoolInfo === 'Yes'}
                placeholder='School Address Line 2'
                onChange={e => {
                  setFieldValue('schoolAddressLine2', e.target.value)
                }}
              />
            </div>
            <div className='col-md-6'>
              <SelectField
                fieldName='schoolState'
                label='Select State'
                required={selectedChild.isProvidingCurrentSchoolInfo === 'Yes'}
                selectOptions={states}
                value={selectedChild.schoolState}
                onChange={e => {
                  populateCities(e.target.value, setSchoolCity)
                  setFieldValue('schoolState', e.target.value)
                }}
              />
            </div>
            <div className='col-md-6'>
              <SelectField
                fieldName='schoolCity'
                label='Select City'
                required={selectedChild.isProvidingCurrentSchoolInfo === 'Yes'}
                selectOptions={schoolCity}
                value={selectedChild.schoolCity}
                onChange={e => {
                  setFieldValue('schoolCity', e.target.value)
                }}
              />
            </div>
            <div className='col-md-6'>
              <TextField
                fieldName='schoolPincode'
                value={selectedChild.schoolPincode}
                label='School Pincode'
                required={selectedChild.isProvidingCurrentSchoolInfo === 'Yes'}
                placeholder='School Pincode'
                onChange={e => {
                  setFieldValue('schoolPincode', e.target.value)
                }}
              />
            </div>
          </div>
        )}
      </div>
      <p className='Addresss_info'>
        Please Provide your Address details{' '}
        <span>(Add Your complete address for easy communication)</span>
      </p>
      <div className='tab_btn border-bottom'>
        <div className='row g-3'>
          <div className='col-md-6'>
            <TextField
              fieldName='addressLine1'
              required
              label='House No., Block No.'
              value={selectedChild.addressLine1}
              onChange={e => {
                setFieldValue('addressLine1', e.target.value)
              }}
            />
          </div>
          <div className='col-md-6'>
            <TextField
              fieldName='addressLine2'
              required
              label='Area or Locality'
              value={selectedChild.addressLine2}
              onChange={e => {
                setFieldValue('addressLine2', e.target.value)
              }}
            />
          </div>
          <div className='col-md-6'>
            <TextField
              fieldName='pincode'
              label='Pincode'
              required
              value={selectedChild.pincode}
              onChange={e => {
                setFieldValue('pincode', e.target.value)
              }}
            />
          </div>
          <div className='col-md-6'>
            <SelectField
              fieldName='state'
              label='Select State'
              required
              selectOptions={states}
              value={selectedChild.state}
              onChange={e => {
                populateCities(e.target.value, setCity)
                setFieldValue('state', e.target.value)
              }}
            />
          </div>
          <div className='col-md-6'>
            <SelectField
              fieldName='city'
              label='Select City'
              required
              selectOptions={city}
              value={selectedChild.city}
              onChange={e => {
                setFieldValue('city', e.target.value)
              }}
            />
          </div>
        </div>
      </div>
      <div className='col-md-6'>
        <label htmlFor='validationServer02' className='form-label'>
          Does the student require Transport facility?{' '}
          <span className='req'>*</span>
        </label>
        <div className='d-flex align-items-center py-2'>
          <div className='form-check'>
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
          <div className='form-check ms-2'>
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
      <div className='col-md-6'>
        <label htmlFor='validationServer02' className='form-label'>
          Does the student require Boarding facility?{' '}
          <span className='req'>*</span>
        </label>
        <div className='d-flex align-items-center py-2'>
          <div className='form-check'>
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
          <div className='form-check ms-2'>
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
      <div className='form-group mb-3 button-wrap'>
        <button
          type='button'
          className='cancel comn'
          onClick={() => navigate('/userProfile')}
        >
          Cancel
        </button>
        <Button type='submit' className='save comn'>
          Save & Next
        </Button>
      </div>
    </Form>
  )
}
