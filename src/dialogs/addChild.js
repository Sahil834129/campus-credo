import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from '../components/form/Button';
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
import { DATE_FORMAT } from "../constants/app";

const AddChildDialog = (props) => {
  const dispatch = useDispatch();
  const [submitting, setSubmitting] = useState(false);
  const maxDate = new Date().setFullYear(parseInt(new Date().getFullYear()) - 2);
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
    reqPayload.dateOfBirth = moment(reqPayload.dateOfBirth).format(DATE_FORMAT);
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
    <Modal
      dialogClassName='signin-model add-child-model'
      show={props.show}
      onHide={props.handleClose}
    >
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body dialogClassName='model-body add-child-body'>
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
              dateOfBirth: moment(maxDate).format(DATE_FORMAT), 
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
                      selected={values.dateOfBirth ? moment(values.dateOfBirth, DATE_FORMAT).toDate() : maxDate}
                      showYearDropdown={true}
                      dateFormat='dd/MM/yyyy'
                      className='form-control'
                      name='dateOfBirth'
                      onChange={date => setFieldValue('dateOfBirth', date)}
                      maxDate={maxDate}
                    />
                  </div>
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
                  <Button
                    type='button'
                    class='cancel-btn'
                    buttonLabel='Cancel'
                    onClick={props.handleClose}
                  />
                  <Button
                    type='submit'
                    class='save-btn'
                    buttonLabel={props.child ? 'Update' : 'Add'}
                    submitting={submitting}
                  />
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </Modal.Body>
      {/* <Modal.Footer></Modal.Footer> */}
    </Modal>
  );
};

export default AddChildDialog;
