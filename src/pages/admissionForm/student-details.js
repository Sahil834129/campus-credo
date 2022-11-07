import { Form, Formik } from 'formik'
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
    console.log('Values are :::::::::: ' + JSON.stringify(postData))
    try {
      // const response = await RESTClient.post(
      //   RestEndPoint.CREATE_STUDENT_PROFILE,
      //   postData
      // )
      toast.success('Student details saved successfully.')
      navigate('/userProfile/MedicalForm')
    } catch (error) {
      toast.error(RESTClient.getAPIErrorMessage(error))
    }
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
      <Formik
        initialValues={selectedChild}
        enableReinitialize={true}
        onSubmit={values => {
          saveStudentDetails(values)
        }}
      >
        {({ values, setFieldValue, errors, touched }) => (
          <Form className='row g-3'>
            <div className='col-md-6'>
              <InputField
                fieldName='firstName'
                value={values.firstName}
                disabled
                label='First name'
                required
                fieldType='text'
                placeholder='First Name'
                errors={errors}
                touched={touched}
              />
            </div>
            <div className='col-md-6'>
              <InputField
                fieldName='middleName'
                value={values.middleName}
                disabled
                label='Middle name'
                fieldType='text'
                placeholder='Middle Name'
                errors={errors}
                touched={touched}
              />
            </div>
            <div className='col-md-6'>
              <InputField
                fieldName='lastName'
                value={values.lastName}
                disabled
                label='Last name'
                fieldType='text'
                placeholder='Last Name'
                errors={errors}
                touched={touched}
              />
            </div>
            <div className='col-md-6'>
              <InputField
                fieldName='lastName'
                value={values.dateOfBirth}
                disabled
                label='Date of Birth'
                fieldType='text'
                placeholder='Last Name'
                errors={errors}
                touched={touched}
              />
            </div>
            <div className='col-md-6'>
              <InputField
                fieldName='gender'
                label='Select Gender'
                required
                fieldType='select'
                placeholder=''
                selectOptions={GENDER_OPTOPNS}
                errors={errors}
                touched={touched}
              />
            </div>
            <div className='col-md-6'>
              <InputField
                fieldName='category'
                label='Select Category'
                required
                fieldType='select'
                placeholder=''
                selectOptions={CATEGORY_OPTIONS}
                errors={errors}
                touched={touched}
              />
            </div>
            <div className='col-md-6'>
              <label
                htmlFor='exampleFormControlTextarea1'
                className='form-label'
              >
                Identification Marks (Please specify)
              </label>
              <textarea
                className='form-control'
                name='identificationMarks'
                id='exampleFormControlTextarea1'
                rows='3'
                onChange={e => {
                  setFieldValue('identificationMarks', e.target.value)
                }}
              ></textarea>
            </div>
            <div className='col-md-6'>
              <div>
                <InputField
                  fieldName='religion'
                  label='Religion'
                  required
                  fieldType='select'
                  placeholder=''
                  selectOptions={RELIGION_OPTIONS}
                  errors={errors}
                  touched={touched}
                />
              </div>
              <div>
                <InputField
                  fieldName='nationality'
                  label='Nationality'
                  required
                  fieldType='select'
                  placeholder=''
                  selectOptions={NATIONALITY_OPTIONS}
                  errors={errors}
                  touched={touched}
                />
              </div>
            </div>
            <div className='col-12 border-bottom pb-2'>
              <label className=' me-2'>
                Please Provide Your Current School Information(If Applicabple)
              </label>
              <div className='form-check form-check-inline'>
                <InputField
                  className='form-check-input'
                  label=' Yes'
                  fieldName='isProvidingCurrentSchoolInfo'
                  fieldType='radio'
                  errors={errors}
                  touched={touched}
                />
              </div>
              <div className='form-check form-check-inline'>
                <InputField
                  className='form-check-input'
                  label=' No'
                  fieldName='isProvidingCurrentSchoolInfo'
                  fieldType='radio'
                  errors={errors}
                  touched={touched}
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
                  <InputField
                    fieldName='addressLine1'
                    label='House No., Block No.'
                    fieldType='text'
                    errors={errors}
                    touched={touched}
                  />
                </div>
                <div className='col-md-6'>
                  <InputField
                    fieldName='addressLine2'
                    label='Area or Locality'
                    fieldType='text'
                    errors={errors}
                    touched={touched}
                  />
                </div>
                <div className='col-md-6'>
                  <InputField
                    fieldName='pincode'
                    label='Pincode'
                    fieldType='text'
                    errors={errors}
                    touched={touched}
                  />
                </div>
                <div className='col-md-6'>
                  <InputField
                    fieldName='city'
                    label='City'
                    fieldType='text'
                    errors={errors}
                    touched={touched}
                  />
                </div>
                <div className='col-md-6'>
                  <InputField
                    fieldName='state'
                    label='State'
                    fieldType='text'
                    errors={errors}
                    touched={touched}
                  />
                </div>
                {/* <div className="col-md-6">
										<InputField fieldName="country" label="Country" fieldType="text" errors={errors} touched={touched} />
									</div> */}
              </div>
            </div>
            <div className='col-md-6'>
              <label htmlFor='validationServer02' className='form-label'>
                Does the student require Transport facility?{' '}
                <span className='req'>*</span>
              </label>
              <div className='d-flex align-items-center py-2'>
                <div className='form-check'>
                  <InputField
                    className='form-check-input'
                    label=' Yes'
                    value='true'
                    fieldName='tranportFacility'
                    {...(values.tranportFacility === 'true' ? 'checked' : '')}
                    fieldType='radio'
                    errors={errors}
                    touched={touched}
                  />
                </div>
                <div className='form-check ms-2'>
                  <InputField
                    className='form-check-input'
                    label=' No'
                    value='false'
                    fieldName='tranportFacility'
                    {...(values.tranportFacility === 'true' ? '' : 'checked')}
                    fieldType='radio'
                    errors={errors}
                    touched={touched}
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
                  <InputField
                    className='form-check-input'
                    label=' Yes'
                    value='true'
                    fieldName='boardingFacility'
                    fieldType='radio'
                    errors={errors}
                    touched={touched}
                  />
                </div>
                <div className='form-check ms-2'>
                  <InputField
                    className='form-check-input'
                    label=' No'
                    value='false'
                    fieldName='boardingFacility'
                    fieldType='radio'
                    errors={errors}
                    touched={touched}
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
              <button type='submit' className='save comn' disabled={submitting}>
                {submitting ? 'Please wait...' : 'Save & Next'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </AdmissionForms>
  )
}
