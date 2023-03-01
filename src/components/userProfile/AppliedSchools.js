import { useState } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { ReactComponent as DownloadIcon } from "../../assets/img/icons/download.svg";
import schoolpic01 from "../../assets/img/school-picture/boarding-icon.jpg";
import { PARENT_APPLICATION_STATUS, SCHOOL_APPLICATION_STATUS } from "../../constants/app";
import { getStatusLabel, humanize, isEmpty } from "../../utils/helper";
import RESTClient, { baseURL } from "../../utils/RestClient";
import { downloadApplicationOnParentDashboard } from "../../utils/services";
import ApplicationTimeline from "./ApplicationTimeline";
// import AcceptRejectApplication from "./AcceptRejectApplication";
import AcceptRejectApplication from "./AcceptRejectApplication";



const AppliedSchools = ({ application, setApplications }) => {
  const [showTimeline, setShowTimeline] = useState(false);

  async function downloadApplicationOnDashboard(applicationId) {
    downloadApplicationOnParentDashboard(applicationId);
  }

  const getBadgeClassName = (status) => {
    switch (status) {
      case PARENT_APPLICATION_STATUS.AT_PI_SCHEDULED:
        return "violet-badge";
      case SCHOOL_APPLICATION_STATUS.RECEIVED:
      case PARENT_APPLICATION_STATUS.SUBMITTED:
        return "blue-badge";
      case SCHOOL_APPLICATION_STATUS.DECLINED:
      case PARENT_APPLICATION_STATUS.REJECTED:
      case SCHOOL_APPLICATION_STATUS.REVOKED:
      case SCHOOL_APPLICATION_STATUS.DENIED:
        return "red-badge";
      case SCHOOL_APPLICATION_STATUS.APPROVED:
      case PARENT_APPLICATION_STATUS.ACCEPTED:
        return "green-badge";
      case SCHOOL_APPLICATION_STATUS.UNDER_REVIEW:
      case SCHOOL_APPLICATION_STATUS.UNDER_FINAL_REVIEW:
        return "orange-badge";
      default:
        return "blue-badge";
    }
  }

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
    // const status = history.applicationStatus;
    // let message = APPLICATION_STATUS_MESSAGE[status]
    //   ? APPLICATION_STATUS_MESSAGE[status]
    //   : humanize(status);
    // if (status.toUpperCase() === SCHOOL_APPLICATION_STATUS.AT_PI) {
    //   message = message.replace(
    //     "<AT/PI timeslot>",
    //     history.applicantATPITimeSlot
    //   );
    // }
    if (application.applicationStatus === SCHOOL_APPLICATION_STATUS.APPROVED
        && history?.applicationStatus?.toUpperCase() === SCHOOL_APPLICATION_STATUS.APPROVED
        && index === application.applicationDataHistory.length -1)
    {
      return <AcceptRejectApplication rejectApplication={rejectApplication} acceptApplication={acceptApplication}/>;
    }
    // return ;
  }

  return (
    <Col className="right content">
      <div className="row-items application-block">
        <div className="application-row">
        
        <div className="application-inner-wrap">
          <div className="col-item left">
            <div className="school-info-main">

              <div className="info-item school-logo-wrap">
                <Card.Img
                  className="school-logo"
                  alt={application.schoolName}
                  src={
                    application.schoolThumbnailImgLink
                      ? baseURL + application.schoolThumbnailImgLink
                      : schoolpic01
                  }
                />
                
              </div>
              
              
              <div className="info-item school-info-exerpts">
                <div className="app-id">
                  <label>Application# : {application.applicationId}</label>
                </div>
                <div className="school-name">{application.schoolName}</div>
                <ListGroup className="school-type">
                  <ListGroup.Item>{application.board}</ListGroup.Item>
                  <ListGroup.Item>
                    {application.mediumOfInstruction}
                  </ListGroup.Item>
                  <ListGroup.Item>{application.gender}</ListGroup.Item>
                </ListGroup>

                <div className="moreinfo-block">
                  <div className="row-item">
                    <span className="cell-item">Applying to Class:</span>
                    <span className="cell-item"><strong>{application.className}</strong></span>
                  </div>
                  <div className="row-item">
                    <span className="cell-item">Application Fee Paid:</span>
                    <span className="cell-item"><strong>{application.formFee}</strong></span>
                  </div>
                  <div className="col divider">|</div>
                  <div className="col">
                    Application Fee Paid : <strong>{application.formFee}</strong>
                  </div>
                  
                </div>
              </div>
            </div>
          </div>

          <div className="col-item right">
            
          <div className="application-status">
                  <span className={'badge ' + getBadgeClassName(application.applicationStatus)}>
                    {getStatusLabel(application.applicationStatus)}
                  </span>
                  
              </div>
            <div className="app-timeline-stack">
              {application.applicationDataHistory?.length ? (
                  <div className="timeline-list">
                    <div className="timeline-info-panel">
                      {application.applicationDataHistory.map((history, index) => {
                        return (
                          <div className="timeline-row" key={"timeline_" + index}>
                              <div className="timeline-items">{getApplicationStatusMessage(history , index)}</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : ""}

            </div>
            <div className="app-timeline-control">
              <Link onClick={() => setShowTimeline((val) => !val)}>
                <label>View Status timeline</label> <i className={'icons ' +  (showTimeline ? 'arrowdown-icon' : 'arrowright-icon')}></i>
              </Link>
            </div>
            
            
          </div>
          
        </div>
        {showTimeline ? <ApplicationTimeline application={application} setApplications={setApplications} setShowTimeline={setShowTimeline}/> : ""}
</div>
        
      </div>
    </Col>
  );
};

export default AppliedSchools;
