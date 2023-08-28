import React, { useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import Col from "react-bootstrap/Col";
const RefundOfApplication = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Col className="common-content right">
      <h2>How do I get refund of my application/admission fee?</h2>
      <ListGroup as="ol" variant="flush" numbered>
        <ListGroup.Item as="li">
          <span className="screen-title">
            No refunds are allowed of any application or admission fee once paid
          </span>
        </ListGroup.Item>
      </ListGroup>
    </Col>
  );
};

export default RefundOfApplication;
