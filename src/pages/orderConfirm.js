import React from "react";
import { Container } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useLocation } from "react-router-dom";
import "../assets/scss/custom-styles.scss";
import Breadcrumbs from "../common/Breadcrumbs";

import Layout from "../common/layout";
import { isEmpty } from "../utils/helper";

const OrderConfirm = () => {
  const search = useLocation().search;
  const orderType = new URLSearchParams(search).get("orderType");
  const applications = JSON.parse(
    new URLSearchParams(search).get("applications")
  );
  return (
    <Layout>
      <section className="content-area about-page">
        <Container className="content-area-inner inner-page-container">
          <Row className="content-section bc-section">
            <Col className="bc-col">
              <Breadcrumbs />
            </Col>
          </Row>
          <Row className="content-section about-content-main">
            <section className="contact-section-wrapper">
              <div className="boxed-content-area">
                <i className="success-icon"></i>
                <h2>Congratulations!</h2>
                <h4>
                  Your Applications :{" "}
                  {applications.map((application, index) => (
                    <span className="reg-num">
                      {application +
                        "" +
                        (!isEmpty(applications[index + 1]) ? " " : "")}
                    </span>
                  ))}{" "} is Successfully Submitted</h4>
                  <h4> </h4>
                </div>
            </section>
           
          </Row>
        </Container>
      </section>
    </Layout>
  );
};

export default OrderConfirm;
