import React from "react";

const Button = (props) => {
    return (
        <div className="form-group mb-3 button-wrap">
            <button type="submit" onClick={props.onClick} className={"btn btn-primary " + props.class} disabled={props.submitting}>{props.submitting ? "Please wait..." : props.buttonLabel}</button>
        </div>
    );
};

export default Button;