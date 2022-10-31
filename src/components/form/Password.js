import React from "react";
import { Field } from "formik";

const Password = (props) => {
    const fieldName = props.fieldName;
    return (
        <div className="form-group mb-3">
            <Field type="password" className="form-control" name={fieldName} placeholder={props.placeholder} />
            {props.errors[fieldName] && props.touched[fieldName] ? (
                <div>{props.errors[props.fieldName]}</div>
            ) : null}
        </div>
    );
};

export default Password;