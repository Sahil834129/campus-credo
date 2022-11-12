import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import InputField from '../../components/form/InputField'
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
import { combineArray, popularSchoolClasses } from '../../utils/populateOptions'
import { str2bool } from '../../utils/helper'

export default function StudentDetails ({
  currentStudent,
  setStep,
  selectedChild,
  setSelectedChild
}) {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [classOptions, setClassOptions] = useState([
    { value: '', text: 'Select Class' }
  ])
  const [submitting, setSubmitting] = useState(false)
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
    let response
    try {
      if (isUserExist) {
        postData = {
          ...postData,
          profileId: postData.id
        }
        delete postData.id
        delete postData.success
        delete postData.parentId

        response = await RESTClient.put(
          RestEndPoint.CREATE_STUDENT_PROFILE,
          postData
        )
      } else {
        response = await RESTClient.post(
          RestEndPoint.CREATE_STUDENT_PROFILE,
          postData
        )
      }
      toast.success('Student details saved successfully.')
      setStep(val => val + 1)
    } catch (error) {
      console.log(error)
      toast.error(RESTClient.getAPIErrorMessage(error))
    }
  }

  // function validateForm (data) {
  //   return data.category.length > 0 && password.length > 0
  // }

  async function getCurrentUser (user) {
    try {
      const response = await RESTClient.get(
        RestEndPoint.GET_STUDENT_PROFILE + `/${user.childId}`
      )
      console.log(response)
      if (response.data !== '') {
        setSelectedChild(val => {
          console.log({
            ...val,
            ...response.data
          })

          return {
            ...val,
            ...response.data
          }
        })

        setIsUserExist(true)
      } else {
        setIsUserExist(false)
      }
    } catch (error) {
      // toast.error(RESTClient.getAPIErrorMessage(error))
    }
  }

  const setFieldValue = (fieldName, fieldValue) => {
    setSelectedChild({
      ...selectedChild,
      [fieldName]: fieldValue
    })
  }

  useEffect(() => {
    dispatch(getChildsList())
  }, [dispatch])

  useEffect(() => {
    if (currentStudent.childId) getCurrentUser(currentStudent)
  }, [currentStudent])

  useEffect(() => {
    popularSchoolClasses()
      .then(data => combineArray(data.data.classes))
      .then(data => {
        setClassOptions(data)
      })
  }, [])

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
              />
            </div>
            <div className='col-md-6'>
              <TextField
                fieldName='schoolBoard'
                value={selectedChild.schoolBoard}
                label='School Board'
                required={selectedChild.isProvidingCurrentSchoolInfo === 'Yes'}
                placeholder='School Board'
              />
            </div>
            <div className='col-md-6'>
              <TextField
                fieldName='obtainedMarks'
                value={selectedChild.obtainedMarks}
                label='Obtained Marks'
                required={selectedChild.isProvidingCurrentSchoolInfo === 'Yes'}
                placeholder='Obtained Marks'
              />
            </div>
            <div className='col-md-6'>
              <TextField
                fieldName='schoolAddressLine1'
                value={selectedChild.schoolAddressLine1}
                label='School Address Line 1'
                required={selectedChild.isProvidingCurrentSchoolInfo === 'Yes'}
                placeholder='School Address Line 1'
              />
            </div>
            <div className='col-md-6'>
              <TextField
                fieldName='schoolAddressLine2'
                value={selectedChild.schoolAddressLine2}
                label='School Address Line 2'
                required={selectedChild.isProvidingCurrentSchoolInfo === 'Yes'}
                placeholder='School Address Line 2'
              />
            </div>
            <div className='col-md-6'>
              <TextField
                fieldName='schoolCity'
                value={selectedChild.schoolCity}
                label='School City'
                required={selectedChild.isProvidingCurrentSchoolInfo === 'Yes'}
                placeholder='School City'
              />
            </div>
            <div className='col-md-6'>
              <TextField
                fieldName='schoolState'
                value={selectedChild.schoolState}
                label='School State'
                required={selectedChild.isProvidingCurrentSchoolInfo === 'Yes'}
                placeholder='School State'
              />
            </div>
            <div className='col-md-6'>
              <TextField
                fieldName='schoolPincode'
                value={selectedChild.schoolPincode}
                label='School Pincode'
                required={selectedChild.isProvidingCurrentSchoolInfo === 'Yes'}
                placeholder='School Pincode'
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
            <TextField
              fieldName='city'
              label='City'
              value={selectedChild.city}
              onChange={e => {
                setFieldValue('city', e.target.value)
              }}
            />
          </div>
          <div className='col-md-6'>
            <TextField
              fieldName='state'
              label='State'
              required
              value={selectedChild.state}
              onChange={e => {
                setFieldValue('state', e.target.value)
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
              fieldName='tranportFacility'
              currentValue={selectedChild.tranportFacility}
              onChange={e => {
                setFieldValue('tranportFacility', str2bool(e.target.value))
              }}
            />
          </div>
          <div className='form-check ms-2'>
            <RadioButton
              label='No'
              value={false}
              fieldName='tranportFacility'
              currentValue={selectedChild.tranportFacility}
              onChange={e => {
                setFieldValue('tranportFacility', str2bool(e.target.value))
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
                console.log(e)
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
          {submitting ? 'Please wait...' : 'Cancel'}
        </button>
        <Button type='submit' className='save comn' disabled={submitting}>
          {submitting ? 'Please wait...' : 'Save & Next'}
        </Button>
      </div>
    </Form>
  )
}
