const RadioButton = (props) => {
    return (
        <>
            <input className="form-check-input" type="radio" name={props.fieldName} value={props.value}
                {...(props.onChange) ? { onChange: props.onChange } : {}}
                {...(props.defaultChecked) ? { defaultChecked: props.defaultChecked } : {}}
            />
            <label className="form-check-label" for={props.fieldName}>{props.label}</label>
        </>
    )
}

export default RadioButton;