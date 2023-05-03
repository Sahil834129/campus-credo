import React, { useState } from "react";
import { Button } from "react-bootstrap";
import RequestCallBackDialog from "../../dialogs/requestCallBackDialog";
import { getLocalData, getUserLocation, isLoggedIn } from "../../utils/helper";

const SchoolDetailTitle = (props) => {
  const [showRequestCallBackModel, setShowRequestCallBackModel] =
    useState(false);
  const R = 6371; // Earth's radius in km
  const handleShowRequestCallbackDialog = () => {
    setShowRequestCallBackModel(true);
  };

  const handleCloseRequestCallbackDialog = () => {
    setShowRequestCallBackModel(false);
  };
  function toRad(degrees) {
    return (degrees * Math.PI) / 180;
  }
  const handleGoogleMap = async () => {
    if (isLoggedIn() && getLocalData("userLocation")) {
      let data = await getUserLocation();
      const address1 = data.addressLine1;
      const address2 = data.addressLine2;
      const city = data.cityName;
      const state = data.stateName;
      const zipCode = data.pincode;
      const lat = data.latitude;
      const lng = data.longitude;
      const schoolLat = getLocalData("SchoolDetailsLatitude");
      const schoolLong = getLocalData("SchoolDetailsLongitude");
      const destAddress = props.schoolAddress;
      console.log(destAddress, "destAddress");
      const dLat = toRad(schoolLat - lat);
      const dLon = toRad(schoolLong - lng);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat)) *
        Math.cos(toRad(lng)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = R * c * 1000; // in meters
      let zoomLevel;
      if (distance <= 1000) {
        // If the distance is less than or equal to 1 km, set the zoom level to 15
        zoomLevel = 16;
      } else if (distance <= 5000) {
        // If the distance is less than or equal to 5 km, set the zoom level to 13
        zoomLevel = 11;
      } else if (distance <= 10000) {
        // If the distance is less than or equal to 10 km, set the zoom level to 11
        zoomLevel = 10;
      } else {
        // If the distance is greater than 10 km, set the zoom level to 9
        zoomLevel = 7;
      }
      const url = `https://www.google.com/maps?ll=${lat},${lng}&z=${zoomLevel}&t=m&hl=en-US&gl=US&mapclient=embed&saddr=${address1}+${address2},+${city},+${state}+${zipCode}&daddr=${destAddress}&dirflg=d`;

      //   const url = `https://www.google.com/maps?ll=${lat},${lng}&z=10&t=m&hl=en-US&gl=US&mapclient=embed&saddr=${address1}+${address2},+${city},+${state}+${zipCode}&daddr=${destAddress}&dirflg=d`;

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