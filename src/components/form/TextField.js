import React from 'react'
import { Form } from 'react-bootstrap'

const TextField = props => {
  const errors = props.errors
  return (
    <>
      <label htmlFor={props.fieldName} className='lbl'>
        {props.label}
        {props.required ? <span className='req'>*</span> : ''}
      </label>
      <Form.Group className='fld-wrap' controlId=''>
        <Form.Control
          type={props.fieldType || 'text'}
          name={props.fieldName}
          value={props.value}
          placeholder={props.placeholder}
          required={props.required}
          {...(props.onChange ? { onChange: props.onChange } : {})}
          {...(props.disabled ? { disabled: props.disabled } : {})}
          {...(props.maxLength ? { maxLength: props.maxLength } : {})}
          {...(props.minLength ? { minLength: props.minLength } : {})}
          {...(props.min ? { min: props.min } : {})}
        />
        {
          errors && errors.hasOwnProperty(props.fieldName) ? <div className='error-exception'>{errors[props.fieldName]}</div> : ''
        }
      </Form.Group>
    </>
  )
}

export default TextField
