import React, { useState } from "react";
import { Button } from "react-bootstrap";
import RequestCallBackDialog from "../../dialogs/requestCallBackDialog";
import { getLocalData, getUserLocation, isLoggedIn } from "../../utils/helper";

const SchoolDetailTitle = (props) => {
  const [showRequestCallBackModel, setShowRequestCallBackModel] =
    useState(false);

  const handleShowRequestCallbackDialog = () => {
    setShowRequestCallBackModel(true);
  };

  const handleCloseRequestCallbackDialog = () => {
    setShowRequestCallBackModel(false);
  };

  const handleGoogleMap = async () => {
    if (isLoggedIn() && getLocalData("userLocation")) {
      let data = await getUserLocation();
      const address1 = data.addressLine1;
      const address2 = data.addressLine2;
      const city = data.cityName;
      const state = data.stateName;
      const zipCode = data.pincode;
      const destAddress = props.schoolAddress;
      const url = `https://www.google.com/maps?t=m&hl=en-US&gl=US&mapclient=embed&saddr=${address1}+${address2},+${city},+${state}+${zipCode}&daddr=${destAddress}&dirflg=d&travelmode=driving`;

      window.open(url, "_blank");
    } else {
      const destAddress = props.schoolAddress;
      const url = `https://www.google.com/maps?daddr=${destAddress}`;
      window.open(url, "_blank");
    }
  };

  return (
    <div className='titlebar'>
      <div className='cell left'>
        <h2>{props.schoolName}</h2>
        {
          props.establishYear ? <h6>Since - {props.establishYear}</h6> : ''
        }
        <div className="btn-wrapper">
          <Button className="locateonmap-btn" onClick={() => handleGoogleMap()}>Locate on Map</Button>
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