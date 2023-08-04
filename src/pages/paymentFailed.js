import React from "react";
import "../assets/scss/custom-styles.scss";

import { Container } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useLocation } from "react-router-dom";
import Breadcrumbs from "../common/Breadcrumbs";
import Layout from "../common/layout";
import { isEmpty } from "../utils/helper";

const PaymentFailed = () => {
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
              <div className="boxed-content-area payment-failed">
                <i className="failed-icon"></i>
                <h2>Error!</h2>
                <h4>
                  Your payment has failed for {params[0] === "ADMISSION_FORM" ? "order no." : (params[0] === "SCHOOL_FEE"  ?  "": "application no.")} {params[1] || ""}. You can view the details on the payment history page.
                </h4>
              </div>
            </section>
          </Row>

        </Container>
      </section>
    </Layout>
  );
};

export default PaymentFailed;
