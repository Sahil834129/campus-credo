import { useState } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { ReactComponent as DownloadIcon } from "../../assets/img/icons/download.svg";
import schoolpic01 from "../../assets/img/school-picture/boarding-icon.jpg";
import { PARENT_APPLICATION_STATUS, SCHOOL_APPLICATION_STATUS } from "../../constants/app";
import { getIpAddress, getStatusLabel, humanize, isEmpty } from "../../utils/helper";
import RESTClient, { baseURL } from "../../utils/RestClient";
import { downloadApplicationOnParentDashboard, registrationCheckout, processOrderAfterPayment } from "../../utils/services";
import ApplicationTimeline from "./ApplicationTimeline";
import AcceptRejectApplication from "./AcceptRejectApplication";
import RestEndPoint from "../../redux/constants/RestEndpoints";



const AppliedSchools = ({ application, setApplications }) => {
  const [showTimeline, setShowTimeline] = useState(false);
  const [acceptButton, setAcceptButton] = useState(false)

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
  };

  const [applicationStatus, setApplicationStatus] = useState(
    application.applicationStatus
  );

  const responseHandler = async (e) => {
    try {
      await processOrderAfterPayment(e);
    } catch (e) {
      console.log(e);
      toast.error("Payment is failed. Please try later");
    }
  };

  async function acceptApplication() {
    setAcceptButton(true)
    try {
      const ip = await getIpAddress();
      const payload = {
        'childId': application.applicationId,
        'ipAddress': ip,
        'deviceUserAgent': window.navigator.userAgent
      };
      const response = await registrationCheckout(payload);
      const paymentLinkDetails = JSON.parse(response.data.paymentLinkDetails);
      const flowConfig = {
        merchantId: paymentLinkDetails?.parameters?.mercid,
        bdOrderId: paymentLinkDetails?.parameters?.bdorderid,
        authToken: paymentLinkDetails?.headers?.authorization,
        childWindow: false,
        retryCount: 3,
        prefs: { "payment_categories": ["nb", "upi"] }

      };
      const config = {
        responseHandler: responseHandler,
        merchantLogo: "data:image/png;base64,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",
        flowConfig: flowConfig,
        flowType: "payments"
      };
      console.log(config);
      window.loadBillDeskSdk(config);
      setAcceptButton(false)
    } catch (error) {
      console.log('Error', error);
      toast.error("Payment is failed. Please try later");
      setAcceptButton(false)
    }
    // try {
    //   const response = await RESTClient.post(
    //     RestEndPoint.REGISTRATION_CHECKOUT +
    //       "?applicationDataId=" +
    //       `${application.applicationId}`
    //   );
    //   toast.success("Your Application has been Accepted");
    //   window.location.reload(false);
    //   // navigate("/paymentCheckout", { state: { data: response.data } });
    // } catch (error) {
    //   if (
    //     !isEmpty(error) &&
    //     !isEmpty(error.response) &&
    //     error.response.status == 400
    //   ) {
    //     if (
    //       !isEmpty(error.response.data) &&
    //       !isEmpty(error.response.data.apierror) &&
    //       !isEmpty(error.response.data.apierror.errorObject) &&
    //       !isEmpty(error.response.data.apierror.errorObject.Child)
    //     ) {
    //       error.response.data.apierror.errorObject.Child.map((val, index) => {
    //         toast.error(val);
    //       });
    //     }
    //     if (
    //       !isEmpty(error.response.data) &&
    //       !isEmpty(error.response.data.apierror) &&
    //       !isEmpty(error.response.data.apierror.errorObject) &&
    //       !isEmpty(error.response.data.apierror.errorObject.Cart)
    //     ) {
    //       error.response.data.apierror.errorObject.Cart.map((val, index) => {
    //         toast.error(val);
    //       });
    //     }
    //   } else {
    //     toast.error(RESTClient.getAPIErrorMessage(error));
    //   }
    // }
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

  function getApplicationStatusMessage(history, index) {
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
      && index === application.applicationDataHistory.length - 1) {
      return <AcceptRejectApplication rejectApplication={rejectApplication} acceptApplication={acceptApplication} />;
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

                <div className="info-item school-logo-wrap" style={{ height: '132px', width: '132px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
                  <div className="school-name">{application.schoolName}</div>
                  <ListGroup className="school-type">
                    <ListGroup.Item>{application.board}</ListGroup.Item>
                    <ListGroup.Item>
                      {application.mediumOfInstruction}
                    </ListGroup.Item>
                    <ListGroup.Item>{application.gender}</ListGroup.Item>
                  </ListGroup>

                  <div className="moreinfo-block">
                    <div className="app-id">
                      <label>Application ID : {application.applicationId}</label>
                    </div>
                    <div className="row-item">
                      <span className="cell-item">Applied To Class:</span>
                      <span className="cell-item"><strong>{application.className}</strong></span>
                    </div>
                    <div className="row-item">
                      <span className="cell-item">Application Fee Paid:</span>
                      <span className="cell-item"><strong>{application.formFee}</strong></span>
                    </div>
                    <div className="row-item">
                      <span className="cell-item">Applied for Session:</span>
                      <span className="cell-item"><strong>{application.admissionSession}</strong></span>
                    </div>
                    <div className="row-item">
                      <span className="download-option">
                        <a href="javascript:void(0)" style={{ alignItems: 'baseline' }} onClick={() => {
                          downloadApplicationOnDashboard(application.applicationId);
                        }}
                        >
                          <label style={{ cursor: "pointer" }}>Download Application Form</label> <DownloadIcon />
                        </a>
                      </span>
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
                            <div className="timeline-items">{getApplicationStatusMessage(history, index)}</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : ""}

              </div>
              <div className="app-timeline-control">
                <Link onClick={() => setShowTimeline((val) => !val)}>
                  <label>View Status timeline</label> <i className={'icons ' + (showTimeline ? 'arrowdown-icon' : 'arrowright-icon')}></i>
                </Link>
              </div>


            </div>
            <div className="app-timeline-control">
              <Link onClick={() => setShowTimeline((val) => !val)}>
                <label>View Status timeline</label> <i className={'icons ' +  (showTimeline ? 'arrowdown-icon' : 'arrowright-icon')}></i>
              </Link>
            </div>
          </div>
          {showTimeline ? <ApplicationTimeline application={application} setApplications={setApplications} setShowTimeline={setShowTimeline} /> : ""}
        </div>

      </div>
    </Col>
  );
};

export default AppliedSchools;
