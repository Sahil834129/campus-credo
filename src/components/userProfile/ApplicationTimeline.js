import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { SCHOOL_APPLICATION_STATUS } from "../../constants/app";
import { APPLICATION_STATUS_MESSAGE } from "../../constants/formContanst";
import RestEndPoint from "../../redux/constants/RestEndpoints";
import { formatDateToDDMMYYYY } from "../../utils/DateUtil";
import { humanize, isEmpty } from "../../utils/helper";
import RESTClient from "../../utils/RestClient";
import AcceptRejectApplication from "./AcceptRejectApplication";

const ApplicationTimeline = ({
  application,
  setApplications,
  setShowTimeline,
}) => {
  const navigate = useNavigate();
  const [applicationStatus, setApplicationStatus] = useState(
    application.applicationStatus
  );

  async function acceptApplication() {
    try {
      const response = await RESTClient.post(
        RestEndPoint.REGISTRATION_CHECKOUT +
          "?applicationDataId=" +
          `${application.applicationId}`
      );
      toast.success("Your Application has been Accepted");
      window.location.reload(false);
      // navigate("/paymentCheckout", { state: { data: response.data } });
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
      const rejectAppRes = await RESTClient.post(
        RestEndPoint.UPDATE_APPLICATION_STATUS,
        {
          applicationId: application.applicationId,
          childId: application.childId,
          applicationStatus: "DENIED",
        }
      );
      setApplicationStatus(rejectAppRes.applicationStatus);
      setShowTimeline(false);
      const response = await RESTClient.get(
        RestEndPoint.GET_APPLICATION_LIST + `/${application.childId}`
      );
      setApplications(response.data);

      toast.success("Application status updated successfully.");
    } catch (error) {
      toast.error(RESTClient.getAPIErrorMessage(error));
    }
  }

  function getApplicationStatusMessage(history , index) {
    const status = history.applicationStatus;
    let message = APPLICATION_STATUS_MESSAGE[status]
      ? APPLICATION_STATUS_MESSAGE[status]
      : humanize(status);
    if (status.toUpperCase() === SCHOOL_APPLICATION_STATUS.AT_PI) {
      message = message.replace(
        "<AT/PI timeslot>",
        history.applicantATPITimeSlot
      );
    }
    if (application.applicationStatus === SCHOOL_APPLICATION_STATUS.APPROVED
        && history?.applicationStatus?.toUpperCase() === SCHOOL_APPLICATION_STATUS.APPROVED
        && index === application.applicationDataHistory.length -1)
    {
      return  <AcceptRejectApplication rejectApplication={rejectApplication} acceptApplication={acceptApplication} />;
    }
    return message;
  }

  return (
    <>
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
        {application.applicationDataHistory?.length ? (
          <div className="timeline-list">
            <div className="timeline-info-panel">
              {application.applicationDataHistory.map((history, index) => {
                return (
                  <div className="timeline-row" key={"timeline_" + index}>
                    <div className="date">
                      {formatDateToDDMMYYYY(new Date(history.updatedDate))}
                    </div>
                    <div className="indicator">
                      <span className="indiShape circle"></span>
                    </div>
                      <div>{getApplicationStatusMessage(history , index)}</div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div style={{ margin: "15px", textAlign: "center" }}>
            No Record Found.
          </div>
        )}
      </div>
    </>
  );
};

export default ApplicationTimeline;
