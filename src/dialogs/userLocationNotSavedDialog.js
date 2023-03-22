import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/scss/custom-styles.scss";
import ConfirmDialog from "../common/ConfirmDialog";
import { getLocalData, isEmpty } from "../utils/helper";

const UserLocationNotSavedDialog = () => {
    const navigate = useNavigate();

    const [showYourHomePopup, showSetYourHomePopup] = useState(false)
    const  setYourHomeAddress=
  "Please save your Home Address to proceed further.";
  const loginHasLocation = ()=>
  {
     if(isEmpty( getLocalData("userLocation")))
     {
      showSetYourHomePopup(true);
     }
  }

const handleConfirmHomePopup = ()=>
{
  showSetYourHomePopup(false);
  navigate("/manageProfile/?manageAddress=true")
}
useEffect(() => { 
      loginHasLocation(); 
  }, []);
    return (
        <ConfirmDialog
        show={showYourHomePopup}
        message={setYourHomeAddress}
        handleConfirm={handleConfirmHomePopup}
    />

    )
}

export default UserLocationNotSavedDialog;