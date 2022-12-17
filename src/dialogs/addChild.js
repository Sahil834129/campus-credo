import React, { useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import InputField from '../components/form/InputField';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import * as moment from 'moment';
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux';
import { AddChildSchema } from '../data/validationSchema';
import { getChildsList } from '../redux/actions/childAction';
import { GENDER_OPTOPNS } from '../constants/formContanst';
import RESTClient from '../utils/RestClient';
import RestEndPoint from '../redux/constants/RestEndpoints';
import GenericDialog from './GenericDialog';

const AddChildDialog = (props) => {
  const dispatch = useDispatch();
  const [submitting, setSubmitting] = useState(false);
  const maxDate =  moment().set('year', parseInt(new Date().getFullYear()) - 2) //new Date().setFullYear(parseInt(new Date().getFullYear()) - 2);
  const [selectedChild, setSelectedChild] = useState({
    firstName: '',
    lastName: '',
    gender: 'Male',
    dateOfBirth: ''
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
    reqPayload.dateOfBirth = moment(reqPayload.dateOfBirth, 'DD/MM/yyyy').format('DD/MM/yyyy');
    
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
              dateOfBirth: moment(maxDate).format('DD/MM/yyyy'), 
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
                      selected={values.dateOfBirth ? moment(values.dateOfBirth, 'DD/MM/yyyy').toDate() : maxDate.toDate()}
                      dateFormat='dd/MM/yyyy'
                      className='form-control'
                      name='dateOfBirth'
                      onChange={date => setFieldValue('dateOfBirth', date)}
                      maxDate={maxDate.toDate()}
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
                    buttonLabel="Cancel"
                    onClick={props.handleClose}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    class="save-btn"
                    className={"save-btn btn btn-primary " + props.class}
                    submitting={submitting}
                  >
                    {props.child ? "Update" : "Add"}
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
