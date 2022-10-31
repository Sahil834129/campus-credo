import React from "react";
import { propTypes } from "react-bootstrap/esm/Image";

const Desclaimer = (props) => {
    return (
        <div className="disclaimer">
            <blockquote>
                <h4>{props.heading}</h4>
                <h6>{props.description}</h6>
            </blockquote>
        </div>
    )
}

export default Desclaimer;