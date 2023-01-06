import { useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import RestEndPoint from "../../redux/constants/RestEndpoints";
import { formatDateToDDMMYYYY } from "../../utils/DateUtil";
import { isEmpty } from "../../utils/helper";
import RESTClient from "../../utils/RestClient";

const ApplicationTimeline = ({ application, setApplications, setShowTimeline }) => {
  const navigate = useNavigate();
  const [applicationStatus, setApplicationStatus] = useState(application.applicationStatus)

  async function acceptApplication() {
    try {
      const response = await RESTClient.post(
        RestEndPoint.PLACE_REGISTRATION_ORDER +
          "?applicationDataId=" +
          `${application.applicationId}`
      );
      navigate("/paymentCheckout", { state: { data: response.data } });
    } catch (error) {
      if (
        !isEmpty(error) &&
        !isEmpty(error.response) &&
        error.response.status == 400
      ) {
        if (
          !isEmpty(error.response.data) &&
          !isEmpty(error.response.data.apierror) &&
          !isEmpty(error.response.data.apierror.errorObject) &&
          !isEmpty(error.response.data.apierror.errorObject.Child)
        ) {
          error.response.data.apierror.errorObject.Child.map((val, index) => {
            toast.error(val);
          });
        }
        if (
          !isEmpty(error.response.data) &&
          !isEmpty(error.response.data.apierror) &&
          !isEmpty(error.response.data.apierror.errorObject) &&
          !isEmpty(error.response.data.apierror.errorObject.Cart)
        ) {
          error.response.data.apierror.errorObject.Cart.map((val, index) => {
            toast.error(val);
          });
        }
      } else {
        toast.error(RESTClient.getAPIErrorMessage(error));
      }
    }
  }

  async function rejectApplication() {
    try {
      const rejectAppRes = await RESTClient.post(RestEndPoint.UPDATE_APPLICATION_STATUS, {
        applicationId: application.applicationId,
        childId: application.childId,
        applicationStatus: "DENIED",
      });
      setApplicationStatus(rejectAppRes.applicationStatus);
      setShowTimeline(false)
      const response = await RESTClient.get(RestEndPoint.GET_APPLICATION_LIST + `/${application.childId}`)
      setApplications(response.data)
      
      toast.success("Application status updated successfully.");
    } catch (error) {
      toast.error(RESTClient.getAPIErrorMessage(error));
    }
  }



  return (
    <>
    {
      applicationStatus.toUpperCase() === 'APPROVED' ? (
        <div className="row-items timeline-wrapper">
          <div className="title-wrap">
            <div className="col">
              <h2>Application Status Timeline</h2>
            </div>
            {/* <div className="col right">
              <Link>
                View your form details <i className="icons arrowright-icon"></i>
              </Link>
            </div> */}
          </div>
          <div className="timeline-list">
            <div className="timeline-info-panel">
              <div className="timeline-row">
                <div className="date">{formatDateToDDMMYYYY(new Date())}</div>
                <div className="indicator">
                  <span className="indiShape circle"></span>
                </div>
                <div className="particulars-status">
                  <div className="update-info">
                    Congratulation!!!{" "}
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
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div style={{margin: '15px', textAlign: 'center'}}>
          No Record Found.
        </div>
      )
    }
    </>
  );
};

export default ApplicationTimeline;
