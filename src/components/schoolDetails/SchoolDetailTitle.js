import React, { useState } from "react";
import { Button } from "react-bootstrap";
import RequestCallBackDialog from "../../dialogs/requestCallBackDialog";

const SchoolDetailTitle = (props) => {
    const [showRequestCallBackModel, setShowRequestCallBackModel] = useState(false);

    const handleShowRequestCallbackDialog = () => {
        setShowRequestCallBackModel(true);
    };

    const handleCloseRequestCallbackDialog = () => {
        setShowRequestCallBackModel(false);
    };

    const handleGoogleMap = async () => {
        window.open("/googleMap");
    };

    return (
        <div className='titlebar'>
            <div className='cell left'>
                <h2>{props.schoolName}</h2>
                {
                    props.establishYear ? <h6>Since - {props.establishYear}</h6> : ''
                }
                <div>
                    <Button onClick={() => handleGoogleMap()}>Locate on Map</Button>
                </div>
            </div>
            <div className='cell right'>
                {props.schoolEmail &&
                    <>
                        <h4>Got Questions?</h4>
                        <span role="button" onClick={handleShowRequestCallbackDialog}>Request Callback</span>
                    </>
                }
                <RequestCallBackDialog show={showRequestCallBackModel} handleClose={handleCloseRequestCallbackDialog} schoolEmail={props.schoolEmail} schoolId={props.schoolId} />
            </div>
        </div>
    );
};

export default SchoolDetailTitle;