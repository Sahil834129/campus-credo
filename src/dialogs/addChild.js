import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from '../components/form/Button'
import { Formik, Form } from 'formik'
import InputField from '../components/form/InputField'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import * as moment from 'moment'
import { useDispatch } from 'react-redux'
import { AddChildSchema } from '../data/validationSchema'
import { addChild } from '../redux/actions/childAction'
import { GENDER_OPTOPNS } from '../constants/formContanst'

const AddChildDialog = props => {
  const dispatch = useDispatch()
  const [submitting, setSubmitting] = useState(false)

  const saveChild = async formData => {
    setSubmitting(true)
    const reqPayload = JSON.parse(JSON.stringify(formData))
    reqPayload.dateOfBirth = moment(reqPayload.dateOfBirth).format('DD/MM/yyyy')
    dispatch(addChild(reqPayload))
    setSubmitting(false)
    props.handleClose()
  }

  return (
    <Modal
      dialogClassName='signin-model add-child-model'
      show={props.show}
      onHide={props.handleClose}
    >
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body dialogClassName='model-body'>
        <div className='model-body-col'>
          <h2>Add Child Information</h2>
          <h4>
            Join theEduSmart to find best featured schools, seats available,
            their benefits, pay school fees and fill admission form online.
          </h4>
          <Formik
            initialValues={{
              firstName: '',
              lastName: '',
              gender: 'Male',
              dateOfBirth: new Date()
            }}
            validationSchema={AddChildSchema}
            validateOnBlur
            onSubmit={values => {
              saveChild(values)
            }}
          >
            {({ values, setFieldValue, errors, touched }) => (
              <Form className='model-frm'>
                <div class='frm-cell mb-3'>
                  <label>
                    Child’s Full Name<span className='req'>*</span>
                  </label>
                  <div className='field-group-wrap'>
                    <InputField
                      fieldName='firstName'
                      className='frm-cell'
                      fieldType='text'
                      placeholder='First Name'
                      errors={errors}
                      touched={touched}
                    />
                    <InputField
                      fieldName='lastName'
                      className='frm-cell'
                      fieldType='text'
                      placeholder='Last Name'
                      errors={errors}
                      touched={touched}
                    />
                  </div>
                </div>
                <div class='frm-cell mb-3'>
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
                  <div className='fld-inst'>
                    Editing Date of Birth may remove schools from your
                    shortlisted schools list if age criteria doesn't meet with
                    the applying class
                  </div>
                </div>
                <div class='frm-cell mb-3'>
                  <label className='sel-gender-lbl'>
                    Select Gender<span className='req'>*</span>
                  </label>
                  <div className='field-group-wrap'>
                    <InputField
                      fieldName='gender'
                      fieldType='select'
                      placeholder=''
                      selectOptions={GENDER_OPTOPNS}
                      errors={errors}
                      touched={touched}
                    />
                  </div>
                </div>
                <div class='frm-cell button-wrap mb-3'>
                  <Button
                    class='cancel-btn'
                    buttonLabel='Cancel'
                    onClick={props.handleClose}
                  />
                  <Button
                    type='submit'
                    class='save-btn'
                    buttonLabel='Add Child'
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
  )
}

export default AddChildDialog
