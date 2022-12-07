import React from 'react'
import { Form } from 'react-bootstrap'

const TextField = props => {
  const errors = props.errors
  return (
    <>
      <label htmlFor={props.fieldName} className='form-label'>
        {props.label}
        {props.required ? <span className='req'>*</span> : ''}
      </label>
      <Form.Group className='mb-3' controlId=''>
        <Form.Control
          type={props.fieldType || 'text'}
          name={props.fieldName}
          value={props.value}
          placeholder={props.placeholder}
          required={props.required}
          {...(props.onChange ? { onChange: props.onChange } : {})}
          {...(props.disabled ? { disabled: props.disabled } : {})}
          {...(props.maxLength ? { maxLength: props.maxLength } : {})}
        />
        {
          errors && errors.hasOwnProperty(props.fieldName) ? <div className='error-exception mt-2'>{errors[props.fieldName]}</div> : ''
        }
      </Form.Group>
    </>
  )
}

export default TextField
