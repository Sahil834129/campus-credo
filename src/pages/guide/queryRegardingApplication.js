import React, { useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import Col from "react-bootstrap/Col";
const QueryRegardingApplication = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Col className="common-content right">
      <h2>I have a query regarding the application form. What to do?</h2>
      <ListGroup as="ol" variant="flush" numbered>
        <ListGroup.Item as="li">
          <span className="screen-title">
            Get in touch with us
            <ListGroup.Item>1. Call +91-9903096754 ( Mon – Sat)</ListGroup.Item>
            <ListGroup.Item>2. Whatsapp +91-9903096754</ListGroup.Item>
            <ListGroup.Item>3. E-mail: support@campuscredo.com</ListGroup.Item>
          </span>
        </ListGroup.Item>
      </ListGroup>
    </Col>
  );
};

export default QueryRegardingApplication;
