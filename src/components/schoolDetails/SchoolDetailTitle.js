import React, { useState } from "react";
import { Button } from "react-bootstrap";
import RequestCallBackDialog from "../../dialogs/requestCallBackDialog";
import { getUserLocation, isEmpty } from "../../utils/helper";

const SchoolDetailTitle = (props) => {
    const [showRequestCallBackModel, setShowRequestCallBackModel] = useState(false);

    const handleShowRequestCallbackDialog = () => {
        setShowRequestCallBackModel(true);
    };

    const handleCloseRequestCallbackDialog = () => {
        setShowRequestCallBackModel(false);
    };

  const handleGoogleMap = async () => {
    let data = await getUserLocation();
    // let data;
    if (!isEmpty(data)) {
      const address1 = data.addressLine1;
      const address2 = data.addressLine2;
      const city = data.cityName;
      const state = data.stateName;
      const zipCode = data.pincode;
      const lat = data.latitude;
      const lng = data.longitude;
      const schoolName = props.schoolName;
      const schoolAddress = `${schoolName}, ${props.schoolAddress}`;
      const destAddress = encodeURIComponent(schoolAddress);
      const url = `https://www.google.com/maps?ll=${lat},${lng}&z=7&t=m&hl=en-US&gl=US&mapclient=embed&saddr=${address1}+${address2},+${city},+${state}+${zipCode}&daddr=${destAddress}&dirflg=d`;

      window.open(url, "_blank");
    } else {
      const schoolName = props.schoolName;
      const schoolAddress = `${schoolName}, ${props.schoolAddress}`;
      const destAddress = encodeURIComponent(schoolAddress);
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