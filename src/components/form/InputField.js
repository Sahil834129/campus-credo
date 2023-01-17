import { Field } from "formik";
import React from "react";

const FORM_FIELD_TYPE = {
  TEXT: "text",
  TEXTAREA:"textarea",
  PASSWORD: "password",
  SELECT: "select",
  CHECKBOX: "checkbox",
  RADIO: "radio",
  FILE: "file",
};

const getOptionTags = (selectOptions) => {
  return (
    <>
      {selectOptions.map((option, index) => (
        <option key={"option_" + index} value={option.value}>
          {option.text}
        </option>
      ))}
    </>
  );
};

const getFieldTagElement = (props) => {
  switch (props.fieldType) {
    case FORM_FIELD_TYPE.TEXTAREA:
      return (
        <>
          {props.label ? (
            <label>
              {props.label}{" "}
              {props.required ? <span className="req">*</span> : ""}{" "}
            </label>
          ) : (
            ""
          )}
          <Field
            // type="textarea"
            component="textarea"
            rows={props.rows}
            className="form-control"
            name={props.fieldName}
            value={props.value}
            placeholder={props.placeholder}
            {...(props.required ? { required: props.required } : {})}
            {...(props.readOnly ? { readOnly: props.readOnly } : {})}
            {...(props.disabled ? { disabled: props.disabled } : {})}
          />
        </>
      );
    case FORM_FIELD_TYPE.TEXT:
      return (
        <>
          {props.label ? (
            <label>
              {props.label}{" "}
              {props.required ? <span className="req">*</span> : ""}{" "}
            </label>
          ) : (
            ""
          )}
          <Field
            type="text"
            className="form-control"
            name={props.fieldName}
            value={props.value}
            placeholder={props.placeholder}
            {...(props.required ? { required: props.required } : {})}
            {...(props.readOnly ? { readOnly: props.readOnly } : {})}
            {...(props.disabled ? { disabled: props.disabled } : {})}
          />
        </>
      );
    case FORM_FIELD_TYPE.PASSWORD:
      return (
        <>
          {props.label ? (
            <label>
              {props.label}{" "}
              {props.required ? <span className="req">*</span> : ""}{" "}
            </label>
          ) : (
            ""
          )}
          <Field
            type="password"
            className="form-control"
            name={props.fieldName}
            placeholder={props.placeholder}
            {...(props.required ? { required: props.required } : {})}
            onPaste={(e) => e.preventDefault()}
            onCopy={(e) => e.preventDefault()}
          />
        </>
      );
    case FORM_FIELD_TYPE.SELECT:
      return (
        <>
          {props.label ? (
            <label>
              {props.label}{" "}
              {props.required ? <span className="req">*</span> : ""}{" "}
            </label>
          ) : (
            ""
          )}
          <Field
            as="select"
            className="form-select"
            name={props.fieldName}
            {...(props.onBlur ? { onBlur: props.onBlur } : {})}
            {...(props.onChange ? { onBlur: props.onChange } : {})}
            {...(props.required ? { required: props.required } : {})}
          >
            {getOptionTags(props.selectOptions)}
          </Field>
        </>
      );
    case FORM_FIELD_TYPE.CHECKBOX:
      return (
        <label className="lbl">
          <Field
            type="checkbox"
            name={props.fieldName}
            value={props.value}
            {...(props.onChange ? { onChange: props.onChange } : {})}
            {...(props.defaultChecked
              ? { defaultChecked: props.defaultChecked }
              : {})}
            {...(props.checked ? { checked: props.checked } : {})}
          />
          <span className="mx-2">{props.label}</span>
        </label>
      );
    case FORM_FIELD_TYPE.RADIO:
      return (
        <label className="lbl">
          <Field
            type="radio"
            name={props.fieldName}
            value={props.value}
            {...(props.checked ? { checked: props.checked } : {})}
            {...(props.onClick ? { onClick: props.onClick } : {})}
            {...(props.required ? { required: props.required } : {})}
          />
          <span className="mx-2">
            {props.label}
            {props.onChange}
          </span>
        </label>
      );
    case FORM_FIELD_TYPE.FILE:
      return (
        <label className="lbl">
          <Field
            type={"file"}
            accept=".jpg,.jpeg,.png,.pdf"
            name={props.fieldName}
            value={props.value}
            {...(props.required ? { required: props.required } : {})}
          />
          <span className="">{props.label}</span>
        </label>
      );
    default:
      return null;
  }
};

const InputField = (props) => {
  return (
    <div className="fld-wrap">
      {getFieldTagElement(props)}
      {props.errors[props.fieldName] && props.touched[props.fieldName] ? (
        <div className="error-exception">
          {props.errors[props.fieldName]}
        </div>
      ) : null}
    </div>
  );
};

export default InputField;
