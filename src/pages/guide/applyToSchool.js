import React, { useEffect } from "react";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import GuideScreen01 from "../../assets/img/guide/screen-01.jpg";
import GuideScreen02 from "../../assets/img/guide/screen-02.jpg";
import GuideScreen03 from "../../assets/img/guide/screen-03.jpg";
import GuideScreen04 from "../../assets/img/guide/screen-04.jpg";
import GuideScreen05 from "../../assets/img/guide/screen-05.PNG";
import GuideScreen06 from "../../assets/img/guide/screen-06.jpg";
import GuideScreen07 from "../../assets/img/guide/screen-07.jpg";
import GuideScreen08 from "../../assets/img/guide/screen-08.jpg";

const ApplyToSchool = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Col className="common-content right">
      <h2>How to apply to a school on CampusCredo?</h2>
      <ListGroup as="ol" variant="flush" numbered>
        <ListGroup.Item as="li">
          <span className="screen-title">
            Login to your CampusCredo Account
          </span>
          <div className="guide-screen">
            <img src={GuideScreen01} alt="" />
          </div>
        </ListGroup.Item>
        <ListGroup.Item as="li">
          <span className="screen-title">
            Go to your dashboard. Click on “Manage Child” to add student details
          </span>
          <div className="guide-screen">
            <img src={GuideScreen02} alt="" />
          </div>
        </ListGroup.Item>
        <ListGroup.Item as="li">
          <span className="screen-title">
            Click “Add Child”. Update the pop-up with student details and click
            “Add” button to register student.
          </span>
          <div className="guide-screen">
            <img src={GuideScreen03} alt="" />
          </div>
        </ListGroup.Item>
        <ListGroup.Item as="li">
          <span className="screen-title">
            Now click on the “Admission Form” in the dashboard. Select Child
            registered from the dropdown and fill out the rest of the admission
            form.
          </span>
          <div className="guide-screen">
            <img src={GuideScreen05} alt="" />
          </div>
        </ListGroup.Item>
        <ListGroup.Item as="li">
          <span className="screen-title">
            Once all the fields are updated, upload required documents and click
            “Submit” to save form. Now your form is ready to be sent to one or
            multiple schools as you wish.
          </span>
          <div className="guide-screen">
            <img src={GuideScreen04} alt="" />
          </div>
        </ListGroup.Item>
        <ListGroup.Item as="li">
          <span className="screen-title">
            Now you can search with School name in the search bar or you can go
            to “All Schools” at the top and use filters to identify schools that
            match your criteria. You can click on “View Details” to see
            additional details or click “Add to Apply” to select school for
            application.
          </span>
          <div className="guide-screen">
            <img src={GuideScreen06} alt="" />
          </div>
        </ListGroup.Item>
        <ListGroup.Item as="li">
          <span className="screen-title">
            Click on Cart to review selected schools and finalize payment.
          </span>
          <div className="guide-screen">
            <img src={GuideScreen07} alt="" />
          </div>
        </ListGroup.Item>
        <ListGroup.Item as="li">
          <span className="screen-title">
            Once payment is completed, your admission form will be automatically
            sent to all the schools you have applied to. You will receive email
            and sms confirmation. You can now track the progress of your
            applications from your dashboard.
          </span>
          <div className="guide-screen">
            <img src={GuideScreen08} alt="" />
          </div>
        </ListGroup.Item>
      </ListGroup>
    </Col>
  );
};

export default ApplyToSchool;
