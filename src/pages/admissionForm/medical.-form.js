import React, { useState } from 'react'
import '../../assets/scss/custom-styles.scss'
import { Formik, Form } from 'formik'
import InputField from '../../components/form/InputField'
import { useNavigate } from 'react-router-dom'
import AdmissionForms from '.'
import { BLOOD_OPTIONS } from '../../constants/formContanst'

export const MedicalForm = () => {
  const history = useNavigate()
  const [submitting, setSubmitting] = useState(false)

  const saveData = formData => {
    console.log(JSON.stringify(formData))
  }

  return (
    <AdmissionForms pageTitle={'Medical Details'}>
      <Formik
        initialValues={{
          bloodGroup: 'A+',
          allergies: '',
          medicalConditions: '',
          specialCare: '',
          disabilityDescribtion: '',
          disability: 'No'
        }}
        onSubmit={values => {
          saveData(values)
        }}
      >
        {({ values, errors, touched }) => (
          <Form className='row g-3'>
            <div className='col-md-6'>
              <InputField
                fieldName='bloodGroup'
                label='Select Blood Group'
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
                    fieldName='disability'
                    fieldType='radio'
                    value={'Yes'}
                    checked={values.disability === 'Yes'}
                    errors={errors}
                    touched={touched}
                  />
                </div>
                <div className='form-check ms-2'>
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
            </div>
            {values.disability === 'Yes' && (
              <>
                <div className='d-flex'>
                  <div className='form-check'>
                    <InputField
                      fieldName='Autism'
                      fieldType='checkbox'
                      label='Autism'
                      errors={errors}
                      touched={touched}
                    />
                  </div>
                  <div className='form-check ms-3'>
                    <InputField
                      fieldName='hearingImpairment'
                      fieldType='checkbox'
                      label='Hearing impairment'
                      errors={errors}
                      touched={touched}
                    />
                  </div>
                  <div className='form-check ms-3'>
                    <InputField
                      fieldName='languageDisorder'
                      fieldType='checkbox'
                      label='Language disorder'
                      errors={errors}
                      touched={touched}
                    />
                  </div>
                  <div className='form-check  ms-3'>
                    <InputField
                      fieldName='physicalDisability'
                      fieldType='checkbox'
                      label='Physical disability'
                      errors={errors}
                      touched={touched}
                    />
                  </div>
                  <div className='form-check ms-3'>
                    <InputField
                      fieldName='learningDifficulty'
                      fieldType='checkbox'
                      label='Learning difficulty'
                      errors={errors}
                      touched={touched}
                    />
                  </div>
                </div>
                <div className='d-flex'>
                  <div className='form-check'>
                    <InputField
                      fieldName='behaviourDisorder'
                      fieldType='checkbox'
                      label='Behaviour disorder'
                      errors={errors}
                      touched={touched}
                    />
                  </div>
                  <div className='form-check ms-3'>
                    <InputField
                      fieldName='mentalHealth'
                      fieldType='checkbox'
                      label='Mental health disorder'
                      errors={errors}
                      touched={touched}
                    />
                  </div>
                  <div className='form-check ms-3'>
                    <InputField
                      fieldName='speechImpairment'
                      fieldType='checkbox'
                      label='Speech impairment'
                      errors={errors}
                      touched={touched}
                    />
                  </div>
                  <div className='form-check  ms-3'>
                    <InputField
                      fieldName='visionImpairment'
                      fieldType='checkbox'
                      label='Vision impairment'
                      errors={errors}
                      touched={touched}
                    />
                  </div>
                  <div className='form-check ms-3'>
                    <InputField
                      fieldName='Other'
                      fieldType='checkbox'
                      label='Other'
                      errors={errors}
                      touched={touched}
                    />
                  </div>
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
                {submitting ? 'Please wait...' : 'Cancel'}
              </button>
              <button
                className='save comn'
                type='submit'
                submitting={submitting}
                // onClick={() => history('/userProfile/ExtracurricularForm')}
              >
                Save &amp; Next
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </AdmissionForms>
  )
}
export default MedicalForm
