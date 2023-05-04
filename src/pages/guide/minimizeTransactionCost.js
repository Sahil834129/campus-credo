import React, { useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import Col from "react-bootstrap/Col";
const MinimizeTransactionCost = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Col className="common-content right">
      <h2>How do I minimize transaction cost when I pay online?</h2>
      <ListGroup as="ol" variant="flush" numbered>
        <ListGroup.Item as="li">
          <span className="screen-title">
            Currently there is zero transaction fee when application or
            admission fee is paid via UPI or Rupay Debit Card. All other methods
            would incur transaction costs.
          </span>
        </ListGroup.Item>
      </ListGroup>
    </Col>
  );
};

export default MinimizeTransactionCost;
