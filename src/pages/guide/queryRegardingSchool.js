import React, { useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import GuideScreen17 from "../../assets/img/guide/screen-17.jpg";

const QueryRegardingSchool = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Col className="common-content right">
      <h2>I have a query regarding a school. What to do?</h2>
      <ListGroup as="ol" variant="flush" numbered>
        <ListGroup.Item as="li">
          <span className="screen-title">
            When you search for a school, click on “View Details” to go to the
            school’s dedicated page. Click on the “Request Callback” option and
            enter your query. The school would get back to you.
          </span>
          <div className="guide-screen">
            <img src={GuideScreen17} alt="" />
          </div>
        </ListGroup.Item>
      </ListGroup>
    </Col>
  );
};

export default QueryRegardingSchool;
