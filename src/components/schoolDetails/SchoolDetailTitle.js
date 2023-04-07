import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import RequestCallBackDialog from "../../dialogs/requestCallBackDialog";
import { getLocalData, isEmpty, isLoggedIn } from "../../utils/helper";

const SchoolDetailTitle = (props) => {

    const navigate = useNavigate();
    const defaultLocation = useSelector((state) => state.locationData.selectedLocation);
    const selectedLocation = isLoggedIn() && !isEmpty(getLocalData("selectedLocation")) ? getLocalData("selectedLocation") : defaultLocation;
    
    const [showRequestCallBackModel, setShowRequestCallBackModel] = useState(false)
    const handleShowRequestCallbackDialog=()=>
    {
        setShowRequestCallBackModel(true)
    }
    const handleCloseRequestCallbackDialog=()=>
    {
        setShowRequestCallBackModel(false)
    }
    const handleGoogleMap = async()=>
    {    
        
        if(!isEmpty(getLocalData("userLatitude"))   && !isEmpty(getLocalData("userLongitude")))
        window.open("/googleMap");
        else 
        {
            toast.error("Error in getting your location");
        }
    
    }
    return (
        <div className='titlebar'>
            <div className='cell left'>
                <h2>{props.schoolName}</h2>
                {
                    props.establishYear ? <h6>Since - {props.establishYear}</h6> : ''
                }
                <div>
                    <Button  onClick={()=>handleGoogleMap()}>Locate on Map</Button>
                </div>
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