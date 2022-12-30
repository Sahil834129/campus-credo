import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import InputField from '../components/form/InputField';
import { GENDER_OPTOPNS } from '../constants/formContanst';
import { AddChildSchema } from '../data/validationSchema';
import { getChildsList } from '../redux/actions/childAction';
import RestEndPoint from '../redux/constants/RestEndpoints';
import { formatDateToDDMMYYYY, parseDateWithDefaultFormat } from '../utils/DateUtil';
import { getStudentMaxDateOfBirth } from '../utils/helper';
import RESTClient from '../utils/RestClient';
import GenericDialog from './GenericDialog';

const AddChildDialog = (props) => {
  const dispatch = useDispatch();
  const [submitting, setSubmitting] = useState(false);
  const [selectedChild, setSelectedChild] = useState({
    firstName: '',
    lastName: '',
    gender: 'Male',
    dateOfBirth: formatDateToDDMMYYYY(getStudentMaxDateOfBirth())
  });

  useEffect(() => {
    if (props.child) {
      setSelectedChild({
        ...selectedChild,
        firstName: props.child.firstName,
        lastName: props.child.lastName,
        dateOfBirth: props.child.dateOfBirth,
        gender: props.child.gender
      });
    }
  }, [props.child]);

  const saveChild = async formData => {
    setSubmitting(true);
    const reqPayload = { ...formData };
    try {
      if (props.child) {
        reqPayload.childId = props.child.childId;
        await RESTClient.put(RestEndPoint.UPDATE_CHILD, reqPayload)
        dispatch(getChildsList(reqPayload));
        toast.success("Child updated successfuly")
      } else {
        await RESTClient.post(RestEndPoint.ADD_CHILD, reqPayload)
        dispatch(getChildsList(reqPayload));
        toast.success("Child created successfuly")		
      }
    } catch (error) {
      toast.error(RESTClient.getAPIErrorMessage(error))
    }
    setSubmitting(false);
    props.handleClose();
  };

  return (
    <GenericDialog className='signin-model add-child-model' show={props.show} handleClose={props.handleClose}>
      <div className='model-body-col'>
          <h2>Add Child Information</h2>
          <h4>
            Join theEduSmart to find best featured schools, seats available, their benefits, pay school fees and fill admission form online.
          </h4>
          <Formik
            initialValues={props.child ? props.child : {
              firstName: '',
              lastName: '',
              gender: 'Male',
              dateOfBirth: formatDateToDDMMYYYY(getStudentMaxDateOfBirth()), 
            }}
            validationSchema={AddChildSchema}
            enableReinitialize
            validateOnBlur
            onSubmit={values => {
              saveChild(values)
            }}
          >
            {({ values, setFieldValue, errors, touched }) => (
              <Form className='model-frm'>
                <div className='frm-cell'>
                  <label>
                    Child’s Full Name<span className='req'>*</span>
                  </label>
                  <div className='field-group-wrap'>
                    <InputField
                      fieldName='firstName'
                      value={values.firstName}
                      className='frm-cell'
                      fieldType='text'
                      placeholder='First Name'
                      errors={errors}
                      touched={touched}
                    />
                    <InputField
                      fieldName='lastName'
                      value={values.lastName}
                      className='frm-cell'
                      fieldType='text'
                      placeholder='Last Name'
                      errors={errors}
                      touched={touched}
                    />
                  </div>
                </div>
                <div className='frm-cell'>
                  <label>
                    Date of Birth<span className='req'>*</span>
                  </label>
                  <div className='field-group-wrap'>
                    <DatePicker
                      selected={values.dateOfBirth ? parseDateWithDefaultFormat(values.dateOfBirth) : getStudentMaxDateOfBirth()}
                      dateFormat='dd/MM/yyyy'
                      className='form-control'
                      name='dateOfBirth'
                      onChange={date => {return (date ? setFieldValue('dateOfBirth', formatDateToDDMMYYYY(date)) : '')}}
                      //maxDate={getStudentMaxDateOfBirth()}
                      dropdownMode="select"
                      showMonthDropdown
                      showYearDropdown
                    />
                  </div>
                  {
                    errors && errors.hasOwnProperty('dateOfBirth') ? <div className='error-exception mb-2'>{errors['dateOfBirth']}</div> : ''
                  }
                  <div className='fld-inst'>
                    Editing Date of Birth may remove schools from your shortlisted schools list if age criteria doesn't meet with the applying class
                  </div>
                </div>
                <div className='frm-cell '>
                  <label className='sel-gender-lbl'>
                    Select Gender<span className='req'>*</span>
                  </label>
                  <div className='field-group-wrap'>
                    <InputField
                      fieldName='gender'
                      value={values.gender}
                      fieldType='select'
                      placeholder=''
                      selectOptions={GENDER_OPTOPNS}
                      errors={errors}
                      touched={touched}
                    />
                  </div>
                </div>
                <div className='frm-cell button-wrap'>
                <button
                    type="button"
                    className={"cancel-btn btn btn-primary " + props.class}
                    onClick={props.handleClose}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className={"save-btn btn btn-primary " + props.class}
                    disabled={submitting}
                  >
                    {submitting ? "Please wait..." : (props.child ? 'Update' : 'Add')}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
    </GenericDialog>
  );
};

export default AddChildDialog;
