import { Form } from 'react-bootstrap'

const SelectField = props => {
  const errors = props.errors
  return (
    <span className='selectbox'>
      <label className='lbl'>
        {props.label}
        {props.required ? <span className='req'>*</span> : ''}
      </label>
      <div className=''>
        <Form.Group className='fld-wrap' name={props.fieldName}>
          <Form.Select
            disabled={props.disabled}
            required={props.required}
            value={props.value}
            {...(props.onChange ? { onChange: props.onChange } : {})}
          >
            {props.selectOptions.map((option, index) => {
              return (
                <option
                  value={option.value}
                  key={props.fieldName + '_' + index}
                >
                  {option.text}
                </option>
              )
            })}
          </Form.Select>
          {
            errors && errors.hasOwnProperty(props.fieldName) ? <div className='error-exception'>{errors[props.fieldName]}</div> : ''
          }
        </Form.Group>
      </div>
    </span>
  )
}

export default SelectField
