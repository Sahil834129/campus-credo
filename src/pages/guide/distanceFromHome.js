import React, { useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import GuideScreen13 from "../../assets/img/guide/F1.PNG";
import GuideScreen14 from "../../assets/img/guide/F2.PNG";

const DistanceFromHome = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Col className="common-content right">
      <h2>Distance from home option not working?</h2>
      <ListGroup as="ol" variant="flush" numbered>
        <ListGroup.Item as="li">
          <span className="screen-title">
            Go to your dashboard and click on “Manage Profile”. Update your home
            address under “Location” tab.
          </span>
          <div className="guide-screen">
            <img width={700} src={GuideScreen13} alt="" />
          </div>
        </ListGroup.Item>
        <ListGroup.Item as="li">
          <span className="screen-title">
            Once saved you can now use “Distance from Home” filter in the search
            page.
          </span>
          <div className="guide-screen">
            <img width={700} src={GuideScreen14} alt="" />
          </div>
        </ListGroup.Item>
      </ListGroup>
    </Col>
  );
};

export default DistanceFromHome;
