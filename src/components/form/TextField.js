import React from "react";
import { Form } from "react-bootstrap";

const TextField = (props) => {
    return (
        <>
            <label for={props.fieldName} className="form-label">
                {props.label} 
                {props.required ? <span className="req">*</span> : ''}
            </label>
            <Form.Group className="mb-3" controlId="">
                <Form.Control type="text" name={props.fieldName} value={props.value} 
                    placeholder={props.placeholder} 
                    { ...(props.onChange) ? {onChange:props.onChange} : {}}
                    {...(props.disabled ? { disabled: props.disabled } : {})}
                />
            </Form.Group>
        </>
    );
};

export default TextField;