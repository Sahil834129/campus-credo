import { Form } from 'react-bootstrap'

const SelectField = props => {
  return (
    <span className='selectbox'>
      <label>
        {props.label}
        {props.required ? <span className='req'>*</span> : ''}
      </label>
      <div className='frm-cell'>
        <Form.Group
          className='frm-cell'
          name={props.fieldName}
          {...(props.onChange ? { onChange: props.onChange } : {})}
        >
          <Form.Select
            disabled={props.disabled}
            required={props.required}
            value={props.value}
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
        </Form.Group>
      </div>
    </span>
  )
}

export default SelectField
