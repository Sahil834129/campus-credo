import React, { useState } from "react";
import RequestCallBackDialog from "../../dialogs/requestCallBackDialog";

const SchoolDetailTitle = (props) => {
    const [showRequestCallBackModel, setShowRequestCallBackModel] = useState(false)
    const handleShowRequestCallbackDialog=()=>
    {
        setShowRequestCallBackModel(true)
    }
    const handleCloseRequestCallbackDialog=()=>
    {
        setShowRequestCallBackModel(false)
    }
    
    return (
        <div className='titlebar'>
            <div className='cell left'>
                <h2>{props.schoolName}</h2>
                {
                    props.establishYear ? <h6>Since - {props.establishYear}</h6> : ''
                }
            </div>
            <div className='cell right'>
                { props.schoolEmail && 
                    <>
                    <h4>Got Questions?</h4>
                    <span role="button" onClick={handleShowRequestCallbackDialog}>Request Callback</span>
                    </> 
                }
                <RequestCallBackDialog show={showRequestCallBackModel} handleClose={handleCloseRequestCallbackDialog} schoolEmail={props.schoolEmail} schoolId={props.schoolId}/>
            </div>
        </div>
    )
}

export default SchoolDetailTitle;