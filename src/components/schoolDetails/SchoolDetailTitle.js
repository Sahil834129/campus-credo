import React from "react";
import { Link } from "react-router-dom";

const SchoolDetailTitle = (props) => {
    return (
        <div className='titlebar'>
            <div className='cell left'>
                <h2>{props.schoolName}</h2>
                {
                    props.establishYear ? <h6>Since - {props.establishYear}</h6> : ''
                }
            </div>
            <div className='cell right'>
                <h4>Got Questions?</h4>
                <Link href=''>Request Callback</Link>
            </div>
        </div>
    )
}

export default SchoolDetailTitle;