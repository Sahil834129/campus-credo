import React, { useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import GuideScreen01 from "../../assets/img/guide/D1.PNG";
import GuideScreen02 from "../../assets/img/guide/D2.PNG";
import GuideScreen03 from "../../assets/img/guide/D3.PNG";

const AddMultipleStudents = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
  return (
    <Col className="common-content right">
      <h2>Can I add multiple students for application?</h2>
      <ListGroup as="ol" variant="flush" numbered>
        <ListGroup.Item as="li">
          <span className="screen-title">
            Yes you can register multiple students. Each student would have
            their own application form. Go to your dashboard. Click on “Manage
            Child” to add student details.
          </span>
          <div className="guide-screen">
            <img width={700} src={GuideScreen01} alt="" />
          </div>
        </ListGroup.Item>
        <ListGroup.Item as="li">
          <span className="screen-title">
            Click “Add Child”. Update the pop-up with student details and click
            “Add” button to register student.
          </span>
          <div className="guide-screen">
            <img width={700} src={GuideScreen02} alt="" />
          </div>
        </ListGroup.Item>
        <ListGroup.Item as="li">
          <span className="screen-title">
            Now click on the “Admission Form” in the dashboard. Select Child
            registered from the dropdown and fill out the rest of the admission
            form.
          </span>
          <div className="guide-screen">
            <img width={700} src={GuideScreen03} alt="" />
          </div>
        </ListGroup.Item>
      </ListGroup>
    </Col>
  );
};

export default AddMultipleStudents;
