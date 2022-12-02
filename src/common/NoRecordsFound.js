import React from "react";

const NoRecordsFound = (props) => {
    return (
        <div className="no-record-wrap">
            <span className="norecord-msg">{props.message}</span>
        </div>
    )
}

export default NoRecordsFound;