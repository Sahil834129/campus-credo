import { useState } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import { Link } from "react-router-dom";
import schoolpic01 from "../../assets/img/school-picture/boarding-icon.jpg";
import { baseURL } from "../../utils/RestClient";
import ApplicationTimeline from "./ApplicationTimeline";

const AppliedSchools = ({ application, setApplications }) => {
  const [showTimeline, setShowTimeline] = useState(false);
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
                    Admission Fee Paid : <strong>{application.formFee}</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-item right">
            <div className="col">
              <label>Status {application.applicationId}</label>
            </div>
            <div className="col">
            <span className={(application.applicationStatus === 'APPROVED' || application.applicationStatus === 'SUBMITTED') ? 'badge accepted' : 'badge under-validation'}>
                {application.applicationStatus?.replaceAll("_", " ")}
              </span>
            </div>
            <div className="col">
              <Link onClick={() => setShowTimeline((val) => !val)}>
                View Status timeline <i className={'icons ' +  (showTimeline ? 'arrowdown-icon' : 'arrowright-icon')}></i>
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
