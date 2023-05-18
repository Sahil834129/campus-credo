import React, { useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import GuideScreen15 from "../../assets/img/guide/G1.PNG";

const StatusOfMyApplications = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
  return (
    <Col className="common-content right">
      <h2>Where do I see status of my applications?</h2>
      <ListGroup as="ol" variant="flush" numbered>
        <ListGroup.Item as="li">
          <span className="screen-title">
            Go to your dashboard and select the student from dropdown to see
            status of submitted applications
          </span>
          <div className="guide-screen">
            <img width={700} src={GuideScreen15} alt="" />
          </div>
        </ListGroup.Item>
      </ListGroup>
    </Col>
  );
};

export default StatusOfMyApplications;
