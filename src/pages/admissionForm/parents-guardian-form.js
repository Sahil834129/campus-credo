import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../../assets/scss/custom-styles.scss';
import RadioButton from '../../components/form/RadioButton';
import SelectField from '../../components/form/SelectField';
import TextField from '../../components/form/TextField';
import { GENDER_OPTOPNS } from '../../constants/formContanst';
import { StudentParentGuardianSchema } from '../../data/validationSchema';
import { getParentOCcupation } from '../../redux/actions/masterData';
import RestEndPoint from '../../redux/constants/RestEndpoints';
import { formatDateToDDMMYYYY, parseDateWithDefaultFormat } from '../../utils/DateUtil';
import { getAge, getStudentAge } from '../../utils/helper';
import { handleStateChange, populateCities } from '../../utils/populateOptions';
import RESTClient from '../../utils/RestClient';

export default function ParentsGuardianForm({
  currentStudent,
  setStep,
  currentParent,
  setKey,
  nextParent,
  previousParent,
  values,
  setValues,
  disableGender,
  parentExist,
  setAllParentDetail,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [validationErrors, setValidationErrors] = useState({});
  const states = useSelector(state => state.masterData.states)
  const [city, setCity] = useState([{ value: '', text: 'Select City' }])

  const Options = [
    { value: "Master's", text: "Master's" },
    { value: "Bachelor's", text: "Bachelor's" },
    { value: 'Diploma', text: 'Diploma' }
  ];
  const occupation = useSelector(
    state => state?.masterData?.parentOccupation || []
  );

  const handleAddressSameAsStudent = () => {
    setFieldValue("addressLine1", "");
    setFieldValue("addressLine2", "");
    setFieldValue("pincode", "");
    setFieldValue("state", "");
    setFieldValue("city", "");
  };
  const saveData = async (e, formData) => {
    e.preventDefault();
    resetValidationErrors()
    let postData = { ...values, ...formData };
    if (!isValidFormData(postData)) {
      console.log("validatio error guardian -- " + validationErrors)
      return;
    }
      

    postData.nationality =
      postData.otherNationality !== ''
        ? postData.otherNationality
        : postData.nationality;
    postData.relation = currentParent !== 'other' ? currentParent : postData.otherRelation;
    postData.studentId = postData.studentId || currentStudent.childId;
    delete postData.profileId;
    delete postData.annualFamilyIncomes;
    delete postData.otherNationality;
    delete postData.otherRelation;
    try {
      if (parentExist) {
        postData = {
          ...postData
        };
        delete postData.success;
        delete postData.parentId;

        await RESTClient.put(RestEndPoint.GET_STUDENT_PARENT, postData);
        setAllParentDetail(val => {
          return val.map(parent => {
            if(parent.id === formData.id){
              return {...values, ...formData}
            }else{
              return parent
            }
          })
        })
      } else {
      const response=  await RESTClient.post(RestEndPoint.GET_STUDENT_PARENT, postData);
        setAllParentDetail(val => {
          return [
            ...val,
            {...response.data}
          ]
        })
      }
      
      //toast.success('Student details saved successfully.')
      if (nextParent === '') {
        setStep(val => val + 1);
      } else {
        setKey(nextParent);
      }
    } catch (error) {
      toast.error(RESTClient.getAPIErrorMessage(error));
    }
  };

  const skipAndNext = () => {
    if (nextParent === '') {
      setStep(val => val + 1);
    } else {
      setKey(nextParent);
    }
  }

  const setFieldValue = (fieldName, fieldValue) => {
    setValues(val=> {
      return {
        ...val,
        [fieldName]: fieldValue
      }
    })
  };

  useEffect(() => {
    if (occupation.length === 0) {
      dispatch(getParentOCcupation());
    }
  }, [occupation]);

  useEffect(()=>{
    if(values?.state)
      populateCities(values.state, setCity)
  }, [values.state])

  function isValidFormData(formData) {
    try {
      StudentParentGuardianSchema.validateSync(formData, { abortEarly: false });
    } catch (error) {
      addPayloadError(error);
      return false;
    }
    if (!isValidDateOfBirth(formData.dateOfBirth))
      return false
    return true
  }

  function isValidDateOfBirth(dateOfBirth) {
    const guardianAge = getAge(dateOfBirth)
    const childAge = getAge(currentStudent.dateOfBirth)
    // if (guardianAge-childAge < 10) {
    //   setValidationErrors({...validationErrors, dateOfBirth: 'Guardian age should be atleast 10 years greater than student age.'})
    //   return false
    // }
     if((currentParent==="father" && guardianAge<21) || (currentParent==="mother" && guardianAge< 18)  ||
     (currentParent==="guardian" && guardianAge<18))
     {
      setValidationErrors({...validationErrors, dateOfBirth: 'Date of birth does not meet the minimum age requirement. Please review and update.'})
      return false
     }
    return true
  }

  function addPayloadError(error) {
    let errors = {};

    let errorsObj = error.inner ? error.inner : error;
    errorsObj.forEach(e => {
      errors[e.path] = e.message;
    });
    setValidationErrors(errors);
  }

  function resetValidationErrors() {
    setValidationErrors({})
  }

  function handleGuardianBackClick() {
    if (previousParent === '') {
      if (getStudentAge(currentStudent.dateOfBirth) < 11)
        setStep(val => val - 3)
      else
        setStep(val => val - 1);
    } else {
      setKey(previousParent)
    }
    window.scrollTo(0, 0);
  }

  return (
    <Form className='application-form-wrap' noValidate onSubmit={e => saveData(e, values)}>
      <div className='tab_btn'>
        <div className='tab-content'>
          <div className='tab-pane active' id='demo1'>
          <div className='fld-row'>
            <div className='fld-cell'>11</div>
            <div className='fld-cell'>22</div>
          </div>
            <div className='row g-3'>
              <div className='col-md-6'>
                <TextField
                  fieldName='firstName'
                  label='First Name'
                  value={values.firstName}
                  required
                  fieldType='text'
                  placeholder='Please add details...'
                  errors={validationErrors}
                  onChange={e => {
                    setFieldValue('firstName', e.target.value);
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
                  errors={validationErrors}
                  onChange={e => {
                    setFieldValue('lastName', e.target.value);
                  }}
                />
              </div>
              {currentParent === 'other' && (
                <><div className='col-md-6'>
                  <TextField
                    fieldName='otherRelation'
                    label='Relationship with Student'
                    value={
                      values.relation !== 'Father' && values.relation !== 'Mother'
                        ? values.otherRelation
                        : ''
                    }
                    required={
                      values.relation !== 'Father' && values.relation !== 'Mother'
                    }
                    fieldType='text'
                    errors={validationErrors}
                    placeholder='Please add details...'
                    disabled={
                      !(
                        values.relation !== 'Father' &&
                        values.relation !== 'Mother'
                      )
                    }
                    onChange={e => {
                      setFieldValue('otherRelation', e.target.value);
                    }}
                  />
                </div><div className='col-md-6'></div></>)}
                    
              <div className='col-md-6'>
                <label>
                  Date of Birth<span className='req'>*</span>
                </label>
                <div className='field-group-wrap'>
                  <DatePicker
                    selected={values.dateOfBirth ? parseDateWithDefaultFormat(values.dateOfBirth) : ""}
                    dateFormat='dd/MM/yyyy'
                    className='form-control'
                    name='dateOfBirth'
                    placeholderText='DD/MM/YYYY'
                    onChange={date => {return (date ? setFieldValue('dateOfBirth', formatDateToDDMMYYYY(date)) : '')}}
                    //maxDate={getGuadianMaxDateOfBirth()}
                    dropdownMode="select"
                    showMonthDropdown
                    showYearDropdown
                  />
                  {
                    validationErrors && validationErrors.hasOwnProperty('dateOfBirth') ? <div className='error-exception mt-2'>{validationErrors['dateOfBirth']}</div> : ''
                  }
                </div>
              </div>
              <div className='col-md-6'>
                <label htmlFor='validationServer02' className='form-label'>
                  Select Gender <span className='req'>*</span>
                </label>
                <div className='d-flex  align-items-center py-2'>
                  {GENDER_OPTOPNS.filter(v=> v.value !== '').map(val => (
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
                        disabled={disableGender}
                        onChange={e => {
                          setFieldValue('gender', val.value);
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
                        setFieldValue('nationality', 'Indian');
                      }}
                      //required
                    />
                  </div>
                  <div className='form-check ms-2'>
                    <RadioButton
                      className='form-check-input'
                      label='Other'
                      value='Other'
                      currentValue={values.nationality}
                      onChange={e => {
                        setFieldValue('nationality', 'Other');
                      }}
                      //required
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
                  errors={validationErrors}
                  value={
                    values.nationality !== 'Indian'
                      ? values.otherNationality
                      : ''
                  }
                  onChange={e => {
                    setFieldValue('otherNationality', e.target.value);
                  }}
                  required={values.nationality !== 'Indian'}
                  placeholder='Please add details...'
                  disabled={!(values.nationality !== 'Indian' && values.nationality !== '')}
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
                        setFieldValue('maritalStatus', 'Married');
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
                        setFieldValue('maritalStatus', 'Widowed');
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
                        setFieldValue('maritalStatus', 'Divorced');
                      }}
                    />
                  </div>
                  <div className='form-check ms-2'>
                    <RadioButton
                      className='form-check-input'
                      label='Separated'
                      value='Separated'
                      fieldName='maritalStatus'
                      currentValue={values.maritalStatus}
                      onChange={e => {
                        setFieldValue('maritalStatus', 'Separated');
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
                        setFieldValue('maritalStatus', 'Never Married');
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className='col-md-6'>
              <label htmlFor='validationServer02' className='form-label'>
                  Deceased?{' '}
                  <span className='req'>*</span>
                </label>
                <div className='d-flex  align-items-center py-2'>
                  <div className='form-check ms-2'>
                    <RadioButton
                      className='form-check-input'
                      label='Yes'
                      value='Yes'
                      fieldName='guardianDeceased'
                      currentValue={values.guardianDeceased}
                      onChange={e => {
                        setFieldValue('guardianDeceased', 'Yes');
                      }}
                    />
                  </div>
                  <div className='form-check ms-2'>
                    <RadioButton
                      className='form-check-input'
                      label='No'
                      value='No'
                      fieldName='guardianDeceased'
                      currentValue={values.guardianDeceased}
                      onChange={e => {
                        setFieldValue('guardianDeceased', 'No');
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
                    setFieldValue('qualification', e.target.value);
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
                    setFieldValue('occupation', e.target.value);
                  }}
                />
              </div>
              <div className='col-md-6'>
                <TextField
                  fieldName='annualFamilyIncome'
                  label='Annual Family Income'
                  className='frm-cell'
                  fieldType='number'
                  value={values.annualFamilyIncome}
                  errors={validationErrors}
                  min='0'
                  onChange={e => {
                    setFieldValue('annualFamilyIncome', e.target.value);
                  }}
                  required
                  placeholder='Please add details...'
                />
              </div>

              <div className='col-md-6'>
                <label htmlFor='validationServer02' className='form-label'>
                  Residential Address - Same as student? {values.isAddressSameAsStudent}{' '}
                  <span className='req'>*</span>
                </label>
                <div className='d-flex  align-items-center py-2'>
                  <div className='form-check ms-2'>
                    <RadioButton
                      className='form-check-input'
                      label='Yes'
                      value='Yes'
                      fieldName='isAddressSameAsStudent'
                      currentValue={values.isAddressSameAsStudent}
                      onChange={(e) => {
                        setFieldValue("isAddressSameAsStudent", "Yes");
                        handleAddressSameAsStudent();
                      }}
                    />
                  </div>
                  <div className='form-check ms-2'>
                    <RadioButton
                      className='form-check-input'
                      label='No'
                      value='No'
                      fieldName='isAddressSameAsStudent'
                      currentValue={values.isAddressSameAsStudent}
                      onChange={e => {
                        setFieldValue('isAddressSameAsStudent', 'No');
                      }}
                    />
                  </div>
                </div>
              </div>
              {
                values.isAddressSameAsStudent === 'No' ?
                  <div className='tab_btn pb-3'>
                    <div className='row g-3'>
                      <div className='col-md-6'>
                        <TextField
                          fieldName='addressLine1'
                          required={values.isAddressSameAsStudent === 'No'}
                          errors={validationErrors}
                          label='House No., Block No.'
                          value={values.addressLine1}
                          onChange={e => {
                            setFieldValue('addressLine1', e.target.value)
                          }}
                        />
                      </div>
                      <div className='col-md-6'>
                        <TextField
                          fieldName='addressLine2'
                          //required={values.isAddressSameAsStudent === 'No'}
                          errors={validationErrors}
                          label='Area or Locality'
                          value={values.addressLine2}
                          onChange={e => {
                            setFieldValue('addressLine2', e.target.value)
                          }}
                        />
                      </div>
                      <div className='col-md-6'>
                        <TextField
                          fieldName='pincode'
                          label='Pincode'
                          required={values.isAddressSameAsStudent === 'No'}
                          errors={validationErrors}
                          value={values.pincode}
                          maxLength='6'
                          onChange={e => {
                            setFieldValue('pincode', e.target.value)
                          }}
                        />
                      </div>
                      <div className='col-md-6'>
                        <SelectField
                          fieldName='state'
                          label='Select State'
                          required={values.isAddressSameAsStudent === 'No'}
                          errors={validationErrors}
                          selectOptions={states}
                          value={values.state}
                          onChange={e => {
                            populateCities(e.target.value, setCity);
                            handleStateChange(setValues, values, {state: e.target.value, city:''})
                          }}
                        />
                      </div>
                      <div className='col-md-6'>
                        <SelectField
                          fieldName='city'
                          label='Select City'
                          required={values.isAddressSameAsStudent === 'No'}
                          errors={validationErrors}
                          selectOptions={city}
                          value={values.city}
                          onChange={e => {
                            setFieldValue('city', e.target.value)
                          }}
                        />
                      </div>
                    </div>
                  </div>
                : ''
              }
            </div>
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
          onClick={() => { handleGuardianBackClick() }}
        >
          Back
        </button>
        <button
          type='button'
          className='save comn me-2'
          onClick={() => { skipAndNext(); window.scrollTo(0, 0); }}
        >
          Skip
        </button>
        <button className='save comn' type='submit'>
          {parentExist ? `Update & Next` : `Save & Next`}
        </button>
      </div>
    </Form>
  );
}
