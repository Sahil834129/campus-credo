import React from "react";

const Description = (props) => {
    return (
        <>
            <h2>{props.heading}</h2>
            <div className='description'>{props.description}</div>
        </>
    )
}

export default Description;