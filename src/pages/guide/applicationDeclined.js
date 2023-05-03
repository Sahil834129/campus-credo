import React, { useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import Col from "react-bootstrap/Col";
const ApplicationDeclined = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Col className="common-content right">
      <h2>
        I have received an email/sms that my application has been approved. What
        to do next?
      </h2>
      <ListGroup as="ol" variant="flush" numbered>
        <ListGroup.Item as="li">
          <span className="screen-title">
            Decline reason is not captured. Please contact school for additional
            information.
          </span>
        </ListGroup.Item>
      </ListGroup>
    </Col>
  );
};

export default ApplicationDeclined;
