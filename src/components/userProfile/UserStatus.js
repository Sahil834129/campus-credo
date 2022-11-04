import React from "react";
import { Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const UserStatus = () => {
    return (
        <>
            <Row className='content-section profile-content-main'>
                <div className='col-item right'>
                    <div className='col'><label>Status</label></div>
                    <div className='col'><span className='badge accepted'>Application Accepted</span></div>
                    <div className='col'><Link>View Status timeline <i className='icons arrowdown-icon'></i></Link></div>
                </div>
            </Row>
        </>
    )
}

export default UserStatus;