import React, { useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import GuideScreen18 from "../../assets/img/guide/J.PNG";

const FindInvoices = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Col className="common-content right">
      <h2>Where can I find invoices?</h2>
      <ListGroup as="ol" variant="flush" numbered>
        <ListGroup.Item as="li">
          <span className="screen-title">
            Go to your dashboard and click on “Payment History” to view and
            download invoices.
          </span>
          <div className="guide-screen">
            <img width={700} src={GuideScreen18} alt="" />
          </div>
        </ListGroup.Item>
      </ListGroup>
    </Col>
  );
};

export default FindInvoices;
