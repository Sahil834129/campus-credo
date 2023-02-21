import { useState } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import { Link } from "react-router-dom";
import schoolpic01 from "../../assets/img/school-picture/boarding-icon.jpg";
import { PARENT_APPLICATION_STATUS, SCHOOL_APPLICATION_STATUS } from "../../constants/app";
import { getStatusLabel } from "../../utils/helper";
import { baseURL } from "../../utils/RestClient";
import { downloadApplicationOnParentDashboard } from "../../utils/services";
import ApplicationTimeline from "./ApplicationTimeline";

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
                <div className="col">
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
                  <div className="col">
                    Applying to Class : <strong>{application.className}</strong>
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
            
            <div className="col">
              <span className={'badge ' + getBadgeClassName(application.applicationStatus)}>
                {getStatusLabel(application.applicationStatus)}
              </span>
              
            </div>
            <div className="col">
              <span className="download-option">
                  <a href="javascript:void(0)" onClick={() => {
                      downloadApplicationOnDashboard(application.applicationId);
                    }}
                  >
                    Download Application{" "}
                    <i className="icons link-icon"></i>
                  </a>
                </span>
            </div>
            <div className="col">
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
