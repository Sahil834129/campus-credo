import React, { useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import GuideScreen06 from "../../assets/img/guide/B1.PNG";
import GuideScreen07 from "../../assets/img/guide/B2.PNG";

const MultipleSchools = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Col className="common-content right">
      <h2>How to select multiple schools for application?</h2>
      <ListGroup as="ol" variant="flush" numbered>
        <ListGroup.Item as="li">
          <span className="screen-title">
            Go to “All Schools” at the top and use filters to identify schools
            that match your criteria. You can click on “View Details” to see
            additional details or click “Add to Apply” to select schools for
            application.
          </span>
          <div className="guide-screen">
            <img width={700} src={GuideScreen06} alt="" />
          </div>
        </ListGroup.Item>
        <ListGroup.Item as="li">
          <span className="screen-title">
            Click on Cart to review selected schools and finalize payment.
          </span>
          <div className="guide-screen">
            <img width={700} src={GuideScreen07} alt="" />
          </div>
        </ListGroup.Item>
      </ListGroup>
    </Col>
  );
};

export default MultipleSchools;
