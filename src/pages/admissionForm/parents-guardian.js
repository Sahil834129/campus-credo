import React, { useState } from 'react'
import '../../assets/scss/custom-styles.scss'
// import { Formik, Form } from 'formik'
import { useNavigate } from 'react-router-dom'
import { Form } from 'react-bootstrap'
import TextField from '../../components/form/TextField'
import { toast } from 'react-toastify'

import { GENDER_OPTOPNS } from '../../constants/formContanst'
import DatePicker from 'react-datepicker'
import RestEndPoint from '../../redux/constants/RestEndpoints'
import RESTClient from '../../utils/RestClient'
import { useEffect } from 'react'
import RadioButton from '../../components/form/RadioButton'
import SelectField from '../../components/form/SelectField'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { getParentOCcupation } from '../../redux/actions/masterData'

export default function ParentsGuardianForm ({ currentStudent, setStep }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [parentExist, setParentExist] = useState(false)
  const [values, setValues] = useState({
    relation: 'Father',
    otherRelation: '',
    firstName: '',
    lastName: '',
    gender: 'Male',
    nationality: 'Indian',
    otherNationality: '',
    maritalStatus: 'Married',
    addressLine1: 'Yes',
    qualification: 'Diploma',
    occupation: 'Chartered_Accountant',
    annualFamilyIncome: '',
    dateOfBirth: new Date()
  })
  const Options = [
    { value: "Master's", text: "Master's" },
    { value: "Bachelor's", text: "Bachelor's" },
    { value: 'Diploma', text: 'Diploma' }
  ]
  const occupation = useSelector(
    state => state?.masterData?.parentOccupation || []
  )

  const saveData = async (e, formData) => {
    e.preventDefault()
    let postData = { ...values, ...formData }
    postData.nationality =
      postData.otherNationality !== ''
        ? postData.otherNationality
        : postData.nationality
    postData.otherRelation =
      postData.relation !== '' ? postData.relation : postData.relation

    postData.dateOfBirth = moment(postData.dateOfBirth).format('yyyy-MM-DD')
    postData.studentId = postData.studentId || currentStudent.childId
    delete postData.profileId
    delete postData.annualFamilyIncomes
    delete postData.otherNationality
    delete postData.otherRelation
    try {
      if (parentExist) {
        postData = {
          ...postData
        }
        delete postData.success
        delete postData.parentId

        await RESTClient.put(RestEndPoint.GET_STUDENT_PARENT, postData)
      } else {
        await RESTClient.post(RestEndPoint.GET_STUDENT_PARENT, postData)
      }
      toast.success('Student details saved successfully.')
      setStep(val => val + 1)
    } catch (error) {
      toast.error(RESTClient.getAPIErrorMessage(error))
    }
  }

  const setFieldValue = (fieldName, fieldValue) => {
    setValues({
      ...values,
      [fieldName]: fieldValue
    })
  }

  async function getUsersParent (user) {
    try {
      const response = await RESTClient.get(
        RestEndPoint.GET_STUDENT_PARENT + `/${user.childId}`
      )

      if (response.data !== '') {
        let dateBirth = (response.data[0]?.dateOfBirth)
          .split('/')
          .reverse()
          .join('-')
        setValues(val => {
          return {
            ...val,
            ...response.data[0],
            dateOfBirth: new Date(dateBirth),
            otherRelation: response.data[0]?.relation,
            nationality:
              response.data[0]?.nationality === ''
                ? 'Other'
                : response.data[0]?.nationality
          }
        })

        setParentExist(true)
      } else {
        setParentExist(false)
      }
    } catch (error) {
      // toast.error(RESTClient.getAPIErrorMessage(error))
    }
  }

  useEffect(() => {
    // if (currentStudent.childId)
    getUsersParent(currentStudent)
  }, [currentStudent])

  useEffect(() => {
    if (occupation.length === 0) {
      dispatch(getParentOCcupation())
    }
  }, [occupation])
  return (
    <Form className='row g-3' onSubmit={e => saveData(e, values)}>
      <div className='tab_btn'>
        <div className='tab-content'>
          <div className='tab-pane active' id='demo1'>
            <form className='row g-3'>
              <div className='col-md-6'>
                <TextField
                  fieldName='firstName'
                  label='First Name'
                  value={values.firstName}
                  required
                  fieldType='text'
                  placeholder='Please add details...'
                  onChange={e => {
                    setFieldValue('firstName', e.target.value)
                  }}
                />
              </div>
              <div className='col-md-6'>
                <TextField
                  fieldName='lastName'
                  label='Last Name'
                  value={values.lastName}
                  required
                  fieldType='text'
                  placeholder='Please add details...'
                  onChange={e => {
                    setFieldValue('lastName', e.target.value)
                  }}
                />
              </div>
              <div className='col-md-6'>
                <label htmlFor='validationServer02' className='form-label'>
                  Relationship with Student <span className='req'>*</span>
                </label>
                <div className='d-flex  align-items-center py-2'>
                  <div className='form-check ms-2'>
                    <RadioButton
                      label='Father'
                      value='Father'
                      fieldName='relation'
                      currentValue={values.relation}
                      onChange={e => {
                        setFieldValue('relation', 'Father')
                      }}
                    />
                  </div>
                  <div className='form-check ms-2'>
                    <RadioButton
                      label='Mother'
                      value='Mother'
                      fieldName='relation'
                      currentValue={values.relation}
                      onChange={e => {
                        setFieldValue('relation', 'Mother')
                      }}
                    />
                  </div>
                  <div className='form-check ms-2'>
                    <RadioButton
                      label='Other'
                      value='Other'
                      fieldName='relation'
                      currentValue={
                        values.relation !== 'Father' &&
                        values.relation !== 'Mother'
                          ? 'Other'
                          : ''
                      }
                      onChange={e => {
                        setFieldValue('relation', 'Other')
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className='col-md-6'>
                {/* <label htmlFor="Pincode" className="form-label">If Other, Please Specify</label> */}
                <TextField
                  fieldName='otherRelation'
                  label='If Other, Please Specify'
                  value={
                    values.relation !== 'Father' && values.relation !== 'Mother'
                      ? values.otherRelation
                      : ''
                  }
                  required={
                    values.relation !== 'Father' && values.relation !== 'Mother'
                  }
                  fieldType='text'
                  placeholder='Please add details...'
                  disabled={
                    !(
                      values.relation !== 'Father' &&
                      values.relation !== 'Mother'
                    )
                  }
                  onChange={e => {
                    setFieldValue('otherRelation', e.target.value)
                  }}
                />
              </div>

              <div className='col-md-6'>
                <label>
                  Date of Birth<span className='req'>*</span>
                </label>
                <div className='field-group-wrap'>
                  <DatePicker
                    selected={values.dateOfBirth}
                    dateFormat='dd/MM/yyyy'
                    className='form-control'
                    name='dateOfBirth'
                    onChange={date => setFieldValue('dateOfBirth', date)}
                  />
                </div>
              </div>
              <div className='col-md-6'>
                <label htmlFor='validationServer02' className='form-label'>
                  Select Gender <span className='req'>*</span>
                </label>
                <div className='d-flex  align-items-center py-2'>
                  {GENDER_OPTOPNS.map(val => (
                    <div
                      className='form-check ms-2'
                      key={`gender-parent-${val.value}`}
                    >
                      <RadioButton
                        className='form-check-input'
                        label={val.value}
                        value={val.value}
                        fieldName='gender'
                        currentValue={values.gender}
                        onChange={e => {
                          setFieldValue('gender', val.value)
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className='col-md-6'>
                <label htmlFor='validationServer02' className='form-label'>
                  Nationality <span className='req'>*</span>
                </label>

                <div className='d-flex align-items-center py-2'>
                  <div className='form-check ms-2'>
                    <RadioButton
                      className='form-check-input'
                      label='Indian'
                      value='Indian'
                      fieldName='nationality'
                      currentValue={values.nationality}
                      onChange={e => {
                        setFieldValue('nationality', 'Indian')
                      }}
                      required
                    />
                  </div>
                  <div className='form-check ms-2'>
                    <RadioButton
                      className='form-check-input'
                      label='Other'
                      value='Other'
                      currentValue={values.nationality}
                      onChange={e => {
                        setFieldValue('nationality', 'Other')
                      }}
                      required
                      fieldName='nationality'
                    />
                  </div>
                </div>
              </div>
              <div className='col-md-6'>
                <label htmlFor='Other' className='form-label'>
                  If Other, Please Specify
                </label>
                <TextField
                  fieldName='otherNationality'
                  className='frm-cell'
                  fieldType='text'
                  value={
                    values.nationality !== 'Indian'
                      ? values.otherNationality
                      : ''
                  }
                  onChange={e => {
                    setFieldValue('otherNationality', e.target.value)
                  }}
                  required={values.nationality === 'Indian'}
                  placeholder='Please add details...'
                  disabled={values.nationality === 'Indian'}
                />
              </div>
              <div className='col-md-6'>
                <label htmlFor='validationServer02' className='form-label'>
                  Marital Status
                  <span className='req'>*</span>
                </label>
                <div className='d-flex flex-wrap align-items-center py-2'>
                  <div className='form-check ms-2'>
                    <RadioButton
                      className='form-check-input'
                      label='Married'
                      value='Married'
                      fieldName='maritalStatus'
                      currentValue={values.maritalStatus}
                      onChange={e => {
                        setFieldValue('maritalStatus', 'Married')
                      }}
                    />
                  </div>
                  <div className='form-check ms-2'>
                    <RadioButton
                      className='form-check-input'
                      label='Widowed'
                      value='Widowed'
                      fieldName='maritalStatus'
                      currentValue={values.maritalStatus}
                      onChange={e => {
                        setFieldValue('maritalStatus', 'Widowed')
                      }}
                    />
                  </div>
                  <div className='form-check ms-2'>
                    <RadioButton
                      className='form-check-input'
                      label='Divorced'
                      value='Divorced'
                      fieldName='maritalStatus'
                      currentValue={values.maritalStatus}
                      onChange={e => {
                        setFieldValue('maritalStatus', 'Divorced')
                      }}
                    />
                  </div>
                  <div className='form-check ms-2'>
                    <RadioButton
                      className='form-check-input'
                      label='Seperated'
                      value='Seperated'
                      fieldName='maritalStatus'
                      currentValue={values.maritalStatus}
                      onChange={e => {
                        setFieldValue('maritalStatus', 'Seperated')
                      }}
                    />
                  </div>
                  <div className='form-check ms-2'>
                    <RadioButton
                      className='form-check-input'
                      label='Never Married'
                      value='Never Married'
                      fieldName='maritalStatus'
                      currentValue={values.maritalStatus}
                      onChange={e => {
                        setFieldValue('maritalStatus', 'Never Married')
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className='col-md-6'>
                <label htmlFor='validationServer02' className='form-label'>
                  Residential Address - Same as student?{' '}
                  <span className='req'>*</span>
                </label>
                <div className='d-flex  align-items-center py-2'>
                  <div className='form-check ms-2'>
                    <RadioButton
                      className='form-check-input'
                      label='Yes'
                      value='Yes'
                      fieldName='addressLine1'
                      currentValue={values.addressLine1}
                      onChange={e => {
                        setFieldValue('addressLine1', 'Yes')
                      }}
                    />
                  </div>
                  <div className='form-check ms-2'>
                    <RadioButton
                      className='form-check-input'
                      label='No'
                      value='No'
                      fieldName='addressLine1'
                      currentValue={values.addressLine1}
                      onChange={e => {
                        setFieldValue('addressLine1', 'No')
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className='col-md-6'>
                <SelectField
                  fieldName='qualification'
                  label='Qualitfication'
                  required
                  selectOptions={Options}
                  value={values.qualification}
                  onChange={e => {
                    setFieldValue('qualification', e.target.value)
                  }}
                />
              </div>
              <div className='col-md-6'>
                <SelectField
                  fieldName='occupation'
                  label='Occupation'
                  required
                  selectOptions={occupation}
                  value={values.occupation}
                  onChange={e => {
                    setFieldValue('occupation', e.target.value)
                  }}
                />
              </div>
              <div className='col-md-6'>
                <TextField
                  label='Annual Family Income'
                  fieldName='annualFamilyIncome'
                  className='frm-cell'
                  fieldType='number'
                  value={values.annualFamilyIncome}
                  onChange={e => {
                    setFieldValue('annualFamilyIncome', e.target.value)
                  }}
                  required
                  placeholder='Please add details...'
                />
              </div>
            </form>
          </div>
          <div className='tab-pane' id='demo2'>
            <h1>hello shiv</h1>
          </div>
          <div className='tab-pane' id='demo3'>
            <h1>hello </h1>
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
        <button
              type='button'
              className='save comn me-2'
              onClick={() => {setStep(val => val - 1); window.scrollTo(0, 0)}}
              >
                Back
            </button>
        <button className='save comn' type='submit'>
          {parentExist ? `Update & Next` : `Save & Next`}
        </button>
      </div>
    </Form>
  )
}
