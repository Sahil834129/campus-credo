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
import AdmissionForms from '.'
import RestEndPoint from '../../redux/constants/RestEndpoints'
import TextField from '../../components/form/TextField'
import SelectField from '../../components/form/SelectField'
import RadioButton from '../../components/form/RadioButton'
import { Form } from 'react-bootstrap'

export default function StudentDetails ({}) {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [submitting, setSubmitting] = useState(false)
  const [selectedChild, setSelectedChild] = useState({
    childId: '',
    firstName: '',
    middleName: '',
    lastName: '',
    dateOfBirth: '',
    gender: 'Male',
    category: 'General',
    identificationMarks: '',
    religion: 'Hindu',
    nationality: 'Indian',
    addressLine1: '',
    addressLine2: '',
    pincode: '',
    city: '',
    state: '',
    tranportFacility: 'false',
    boardingFacility: 'true'
  })

  const saveStudentDetails = async postData => {
    console.log('Values are :::::::::: ' + JSON.stringify(selectedChild))
    // const postData = { ...selectedChild }
    // delete postData['firstName']
    // delete postData['lastName']
    // delete postData['gender']
    // delete postData['dateOfBirth']
    try {
      const response = await RESTClient.post(
        RestEndPoint.CREATE_STUDENT_PROFILE
        // postData
      )
      toast.success('Student details saved successfully.')
      navigate('/userProfile/MedicalForm')
    } catch (error) {
      toast.error(RESTClient.getAPIErrorMessage(error))
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

  return (
    <AdmissionForms
      showStudentList={true}
      pageTitle={'Student Details'}
      selectedChild={selectedChild}
      setSelectedChild={setSelectedChild}
    >
      <Form className='row g-3'>
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
            label='Select Gender'
            value={selectedChild.gender}
            onChange={e => {
              setFieldValue('gender', e.target.value)
            }}
            required
            selectOptions={GENDER_OPTOPNS}
          />
        </div>
        <div className='col-md-6'>
          <label for='exampleFormControlTextarea1' className='form-label'>
            Identification Marks (Please specify)
          </label>
          <textarea
            className='form-control'
            name='identificationMarks'
            rows='4'
            value={selectedChild.identificationMarks}
            onChange={e => {
              setFieldValue('identificationMarks', e.target.value)
            }}
          ></textarea>
        </div>
        <div className='col-md-6'>
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
        <div className='col-12 border-bottom pb-2'>
          <label className=' me-2'>
            Please Provide Your Current School Information(If Applicabple)
          </label>
          <div className='form-check form-check-inline'>
            <RadioButton
              label=' Yes'
              fieldName='isProvidingCurrentSchoolInfo'
              value={true}
            />
          </div>
          <div className='form-check form-check-inline'>
            <RadioButton
              label=' No'
              fieldName='isProvidingCurrentSchoolInfo'
              value={false}
            />
          </div>
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
                value={selectedChild.state}
                onChange={e => {
                  setFieldValue('state', e.target.value)
                }}
              />
            </div>
          </div>
        </div>
        <div className='col-md-6'>
          <label for='validationServer02' className='form-label'>
            Does the student require Transport facility?{' '}
            <span className='req'>*</span>
          </label>
          <div className='d-flex align-items-center py-2'>
            <div className='form-check'>
              <RadioButton
                label=' Yes'
                fieldName='transportFacility'
                value={selectedChild.transportFacility}
                onChange={e => {
                  setFieldValue('transportFacility', e.target.value)
                }}
              />
            </div>
            <div className='form-check ms-2'>
              <RadioButton
                label=' No'
                fieldName='transportFacility'
                value={!selectedChild.transportFacility}
                onChange={e => {
                  setFieldValue('transportFacility', e.target.value)
                }}
              />
            </div>
          </div>
        </div>
        <div className='col-md-6'>
          <label for='validationServer02' className='form-label'>
            Does the student require Boarding facility?{' '}
            <span className='req'>*</span>
          </label>
          <div className='d-flex align-items-center py-2'>
            <div className='form-check'>
              <RadioButton
                label=' Yes'
                fieldName='boardingFacility'
                value={true}
                onChange={e => {
                  setFieldValue('boardingFacility', e.target.value)
                }}
              />
            </div>
            <div className='form-check ms-2'>
              <RadioButton
                label=' No'
                fieldName='boardingFacility'
                value={false}
                defaultChecked
                onChange={e => {
                  setFieldValue('boardingFacility', e.target.value)
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
          <button
            type='button'
            className='save comn'
            onClick={() => {
              saveStudentDetails()
            }}
            disabled={submitting}
          >
            {submitting ? 'Please wait...' : 'Save & Next'}
          </button>
        </div>
      </Form>
    </AdmissionForms>
  )
}
