import React, { useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import GuideScreen02 from "../../assets/img/guide/C1.PNG";
import GuideScreen09 from "../../assets/img/guide/C2.PNG";
import GuideScreen10 from "../../assets/img/guide/C3.PNG";

const AddStudentDetails = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Col className="common-content right">
      <h2>Where do I add student details for application??</h2>
      <ListGroup as="ol" variant="flush" numbered>
        <ListGroup.Item as="li">
          <span className="screen-title">
            Go to your dashboard. Click on “Manage Child” to add student
            details.
          </span>
          <div className="guide-screen">
            <img width={700} src={GuideScreen02} alt="" />
          </div>
        </ListGroup.Item>
        <ListGroup.Item as="li">
          <span className="screen-title">
            Click “Add Child”. Update the pop-up with student details and click
            “Add” button to register student.
          </span>
          <div className="guide-screen">
            <img width={700} src={GuideScreen09} alt="" />
          </div>
        </ListGroup.Item>
        <ListGroup.Item as="li">
          <span className="screen-title">
            Now you should be able to see registered student in the dropdown.
          </span>
          <div className="guide-screen">
            <img width={700} src={GuideScreen10} alt="" />
          </div>
        </ListGroup.Item>
      </ListGroup>
    </Col>
  );
};

export default AddStudentDetails;
