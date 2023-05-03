import React, { useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import GuideScreen16 from "../../assets/img/guide/screen-16.jpg";

const ReceivedAnEmailSms = () => {
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
            Congratulations! Now if you want to accept the offer, go to your
            dashboard. Select the student name from the “Select Child” dropdown
            and identify the school from which you have received the offer. You
            should be able to the see the status “Application Approved”. Now
            click on “Accept” button and finalize payment to accept the offer.
          </span>
          <div className="guide-screen">
            <img src={GuideScreen16} alt="" />
          </div>
        </ListGroup.Item>
      </ListGroup>
    </Col>
  );
};

export default ReceivedAnEmailSms;
