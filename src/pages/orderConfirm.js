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
  const param = new URLSearchParams(search).get("param");
  const params = atob(param).split("&").map(val => {
    const data = val.split("=");
    return data[1];
  });

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
                {params[0]==='ADMISSION_FORM'
                ? <h4>Your payment has been received for application no. {params[1] || ""}. You can go to your dashboard and select the student to track application status. You can also download invoice and money receipt from Payment History tab</h4>
                : <h4>Your fee payment has been received for {params[1] || ""}. You may view and download invoice and money receipt from Dashboard > Manage Fee > Student> Payment History</h4>
              }
              </div>
            </section>
          </Row>
        </Container>
      </section>
    </Layout>
  );
};

export default OrderConfirm;
