import React, { useState } from 'react'
import '../../assets/scss/custom-styles.scss'
import { Formik, Form } from 'formik'
import InputField from '../../components/form/InputField'
import { useNavigate } from 'react-router-dom'

import { GENDER_OPTOPNS } from '../../constants/formContanst'
import DatePicker from 'react-datepicker'
import RestEndPoint from '../../redux/constants/RestEndpoints'
import RESTClient from '../../utils/RestClient'
import { useEffect } from 'react'

export default function ParentsGuardianForm ({ currentStudent, setStep }) {
  const history = useNavigate()
  const [parentExist, setParentExist] = useState(false)
  const [initialValues, setInitialValues] = useState({
    relation: 'false',
    firstName: '',
    lastName: '',
    gender: '',
    nationality: 'false',
    maritalStatus: 'true',
    addressLine1: 'false',
    qualification: '',
    occupation: '',
    annualFamilyIncome: '',
    dateOfBirth: new Date()
  })
  const [submitting, setSubmitting] = useState(false)
  const Options = [
    { value: "Master's", text: "Master's" },
    { value: "Bachelor's", text: "Bachelor's" },
    { value: 'Diploma', text: 'Diploma' }
  ]
  const occupation = [
    { value: 'Teacher', text: 'Teacher' },
    { value: 'Lawyer', text: 'Lawyer' },
    { value: 'Social Worker', text: 'Social Worker' }
  ]
  const income = [
    { value: '10000000', text: '10000000' },
    { value: '1000000', text: '1000000' },
    { value: '100000', text: '100000' }
  ]

  const saveData = formData => {
    setStep(val => val + 1)
    console.log(JSON.stringify(formData))
  }

  async function getUsersParent (user) {
    try {
      const response = await RESTClient.get(
        RestEndPoint.GET_STUDENT_PARENT + `/${user.childId}`
      )
      console.log(response)
      if (response.data !== '') {
        setInitialValues(val => {
          return {
            ...val,
            ...response.data
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
    if (currentStudent.childId) getUsersParent(currentStudent)
  }, [currentStudent])

  return (
    <Formik
      initialValues={{ ...initialValues }}
      onSubmit={values => {
        saveData(values)
      }}
    >
      {({ values, setFieldValue, errors, touched }) => (
        <Form className='row g-3 mt-2'>
          <div className='tab_btn'>
            <div className='tab-content'>
              <div className='tab-pane active' id='demo1'>
                <form className='row g-3'>
                  <div className='col-md-6'>
                    <InputField
                      fieldName='firstName'
                      label='First Name'
                      required
                      fieldType='text'
                      placeholder='Please add details...'
                      errors={errors}
                      touched={touched}
                    />
                  </div>
                  <div className='col-md-6'>
                    <InputField
                      fieldName='lastName'
                      label='Last Name'
                      required
                      fieldType='text'
                      placeholder='Please add details...'
                      errors={errors}
                      touched={touched}
                    />
                  </div>
                  <div className='col-md-6'>
                    <label for='validationServer02' className='form-label'>
                      Relationship with Student <span className='req'>*</span>
                    </label>
                    <div className='d-flex  align-items-center py-2'>
                      <div>
                        <InputField
                          className='form-check-input'
                          label='Father'
                          value='Father'
                          fieldName='relation'
                          fieldType='radio'
                          checked={values.relation === 'Father'}
                          errors={errors}
                          touched={touched}
                        />
                      </div>
                      <div className='form-check ms-2'>
                        <InputField
                          className='form-check-input'
                          label='Mother'
                          value='Mother'
                          fieldName='relation'
                          checked={values.relation === 'Mother'}
                          fieldType='radio'
                          errors={errors}
                          touched={touched}
                        />
                      </div>
                      <div className='form-check ms-2'>
                        <InputField
                          className='form-check-input'
                          label='Other'
                          value='Other'
                          fieldName='relation'
                          checked={values.relation === 'Other'}
                          fieldType='radio'
                          errors={errors}
                          touched={touched}
                        />
                      </div>
                    </div>
                  </div>
                  <div className='col-md-6'>
                    {/* <label htmlFor="Pincode" className="form-label">If Other, Please Specify</label> */}
                    <InputField
                      fieldName='detailTwo'
                      label='If Other, Please Specify'
                      required
                      fieldType='text'
                      placeholder='Please add details...'
                      errors={errors}
                      disabled={values.relation !== 'Other'}
                      touched={touched}
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
                    <label for='validationServer02' className='form-label'>
                      Select Gender <span className='req'>*</span>
                    </label>
                    <div className='d-flex  align-items-center py-2'>
                      {GENDER_OPTOPNS.map(val => (
                        <div
                          className='me-5'
                          key={`gender-parent-${val.value}`}
                        >
                          <InputField
                            className='form-check-input'
                            label={val.value}
                            value={val.value}
                            fieldName='gender'
                            checked={values.gender === val.value}
                            fieldType='radio'
                            errors={errors}
                            touched={touched}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className='col-md-6'>
                    <label for='validationServer02' className='form-label'>
                      Nationality <span className='req'>*</span>
                    </label>

                    <div className='d-flex  align-items-center py-2'>
                      <div className='me-5'>
                        <InputField
                          className='form-check-input'
                          label='Indian'
                          value='Indian'
                          fieldName='nationality'
                          checked={values.nationality === 'Indian'}
                          fieldType='radio'
                          errors={errors}
                          touched={touched}
                        />
                      </div>
                      <div className='form-check ms-2'>
                        <InputField
                          className='form-check-input'
                          label='Other'
                          value='Other'
                          checked={values.nationality === 'Other'}
                          fieldName='nationality'
                          fieldType='radio'
                          errors={errors}
                          touched={touched}
                        />
                      </div>
                    </div>
                  </div>
                  <div className='col-md-6'>
                    <label htmlFor='Other' className='form-label'>
                      If Other, Please Specify
                    </label>
                    <InputField
                      fieldName='nanitonalityOther'
                      className='frm-cell'
                      fieldType='text'
                      placeholder='Please add details...'
                      disabled={values.nationality !== 'Other'}
                      errors={errors}
                      touched={touched}
                    />
                  </div>
                  <div className='col-md-6'>
                    <label for='validationServer02' className='form-label'>
                      Marital Status
                      <span className='req'>*</span>
                    </label>
                    <div className='d-flex flex-wrap align-items-center py-2'>
                      <div className='me-2'>
                        <InputField
                          className='form-check-input'
                          label='Married'
                          value='Married'
                          checked={values.maritalStatus === 'Married'}
                          fieldName='maritalStatus'
                          fieldType='radio'
                          errors={errors}
                          touched={touched}
                        />
                      </div>
                      <div className='me-2'>
                        <InputField
                          className='form-check-input'
                          label='Widowed'
                          value='Widowed'
                          checked={values.maritalStatus === 'Widowed'}
                          fieldName='maritalStatus'
                          fieldType='radio'
                          errors={errors}
                          touched={touched}
                        />
                      </div>
                      <div className='me-2'>
                        <InputField
                          className='form-check-input'
                          label='Divorced'
                          value='Divorced'
                          checked={values.maritalStatus === 'Divorced'}
                          fieldName='maritalStatus'
                          fieldType='radio'
                          errors={errors}
                          touched={touched}
                        />
                      </div>
                      <div className='me-2'>
                        <InputField
                          className='form-check-input'
                          label='Seperated'
                          value='Seperated'
                          checked={values.maritalStatus === 'Seperated'}
                          fieldName='maritalStatus'
                          fieldType='radio'
                          errors={errors}
                          touched={touched}
                        />
                      </div>
                      <div className='me-2'>
                        <InputField
                          className='form-check-input'
                          label='Never Married'
                          value='Never Married'
                          checked={values.maritalStatus === 'Never Married'}
                          fieldName='maritalStatus'
                          fieldType='radio'
                          errors={errors}
                          touched={touched}
                        />
                      </div>
                    </div>
                  </div>
                  <div className='col-md-6'>
                    <label for='validationServer02' className='form-label'>
                      Residential Address - Same as student?{' '}
                      <span className='req'>*</span>
                    </label>
                    <div className='d-flex  align-items-center py-2'>
                      <div className='me-2'>
                        <InputField
                          className='form-check-input'
                          label='Yes'
                          value='Yes'
                          checked={values.addressLine1 === 'Yes'}
                          fieldName='addressLine1'
                          fieldType='radio'
                          errors={errors}
                          touched={touched}
                        />
                      </div>
                      <div className='me-2'>
                        <InputField
                          className='form-check-input'
                          label='No'
                          value='No'
                          checked={values.addressLine1 === 'No'}
                          fieldName='addressLine1'
                          fieldType='radio'
                          errors={errors}
                          touched={touched}
                        />
                      </div>
                    </div>
                  </div>
                  <div className='col-md-6'>
                    <InputField
                      fieldName='qualification'
                      label='Qualitfication'
                      required
                      fieldType='select'
                      placeholder=''
                      selectOptions={Options}
                      errors={errors}
                      touched={touched}
                    />
                  </div>
                  <div className='col-md-6'>
                    <InputField
                      fieldName='occupation'
                      label='Occupation'
                      required
                      fieldType='select'
                      placeholder=''
                      selectOptions={occupation}
                      errors={errors}
                      touched={touched}
                    />
                  </div>
                  <div className='col-md-6'>
                    <InputField
                      fieldName='annualFamilyIncome'
                      label=' Annual Family Income'
                      required
                      fieldType='select'
                      placeholder=''
                      selectOptions={income}
                      errors={errors}
                      touched={touched}
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
              onClick={() => history('/backgroundcheckform')}
            >
              {submitting ? 'Please wait...' : 'Cancel'}
            </button>
            <button
              className='save comn'
              type='submit'
              submitting={submitting}
              // onClick={() => history('/userProfile/SupportingDocumentForm')}
            >
              Save &amp; Next
            </button>
          </div>
        </Form>
      )}
    </Formik>
  )
}
