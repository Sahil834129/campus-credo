import React from "react";
import { Field } from "formik";

const FORM_FIELD_TYPE = {TEXT : "text", PASSWORD: "password", SELECT: "select", CHECKBOX: "checkbox", RADIO: "radio" ,FILE:'file'};

const getOptionTags = (selectOptions) => {
    return (
        <>
            {selectOptions.map((option, index) => (
                <option key={"option_" + index} value={option.value}>{option.text}</option>
            ))
            }
        </>
    );
};

const getFieldTagElement = (props) => {
    switch (props.fieldType) {
        case FORM_FIELD_TYPE.TEXT:
            return (
            <>
                {props.label ? <label>{props.label} {props.required ? <span className="req">*</span> : ''} </label> : ''}
                <Field type="text" className="form-control" name={props.fieldName}
                    value={props.value} placeholder={props.placeholder}
                    {...(props.readOnly ? { readOnly: props.readOnly } : {})}
                    {...(props.disabled ? { disabled: props.disabled } : {})}
                />
            </>
            )
        case FORM_FIELD_TYPE.PASSWORD:
            return <Field type="password" className="form-control" name={props.fieldName} placeholder={props.placeholder} /> 
        case FORM_FIELD_TYPE.SELECT:
            return (
                <>
                {props.label ? <label>{props.label} {props.required ? <span className="req">*</span> : ''} </label> : ''}
                <Field as="select" className="form-select" name={props.fieldName} {...(props.onBlur ? { onBlur: props.onBlur} : {} )}>
                    {getOptionTags(props.selectOptions)}
                </Field></>
            )
        case FORM_FIELD_TYPE.CHECKBOX:
            return (
                <label>
                    <Field type="checkbox" name={props.fieldName}/>
                    <span>{props.label}</span>
                </label>
            )
        case FORM_FIELD_TYPE.RADIO:
            return (
                <label>
                    <Field type="radio" name={props.fieldName} value={props.value} {...(props.checked ? { checked: props.checked } : {})}
                    {...(props.onClick ? { onClick: props.onClick} : {} )}/>
                    <span>{props.label}{props.onChange}</span>
                </label>
            )
        case FORM_FIELD_TYPE.FILE:
            return (
                <label>
                    <Field type="file" name={props.fieldName} value={props.value} />
                    <span>{props.label}</span>
                </label>
            )
        default:
            return null;
    }
}

const InputField = (props) => {
    return (
        <div className="form-group mb-3">
            { getFieldTagElement(props) }
            { props.errors[props.fieldName] && props.touched[props.fieldName] ? (
                <div className="error-exception">{props.errors[props.fieldName]}</div>
            ) : null}
        </div>
    );
};

export default InputField;