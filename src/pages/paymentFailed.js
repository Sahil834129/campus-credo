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
              <div className="boxed-content-area payment-failed">
                <i className="failed-icon"></i>
                <h2>Error!</h2>
                <h4>
                  Opps, Something went wrong, Payment failed for applications :{" "}
                  {/* {applications.map((application, index) => (
                    <span className="reg-num">
                      {application +
                        "" +
                        (!isEmpty(applications[index + 1]) ? " " : "")}
                    </span>
                  ))}{" "} */}
                 <span className="reg-num">
                      {applications }
                      
                    </span>

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
