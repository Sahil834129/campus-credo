 
import React from "react";
import Button from "react-bootstrap/esm/Button";
 const AcceptRejectApplication = ({acceptApplication,rejectApplication,}) => { 
  return (
    <div className="particulars-status">
      <div className="update-info">
        Congratulations!!!
        <span className="status submitted">
          Your Application is Approved
        </span>
      </div>
      <div className="instruction">
        Do you want to proceed with Admission?
        <div className="btn-wrapper">
          <Button
            type="button"
            className="accept-btn btn btn-primary"
            onClick={acceptApplication}
            //onClick={() => navigate("/userProfile")}
          >
            ACCEPT
          </Button>
          <Button
            type="button"
            className="decline-btn btn btn-primary"
            onClick={() => {
              rejectApplication();
            }}
          >
            REJECT
          </Button>
        </div>
      </div>
    </div>
  );
}
export default AcceptRejectApplication;