import React from "react";
import "../assets/scss/custom-styles.scss";

import { Container } from "react-bootstrap";
import Layout from "../common/layout";

const PaymentFailed = () => {
  return (
    <Layout>
      <section className="content-area">
        <Container className="main-container signup-main" fluid>
          Payment Failed
        </Container>
      </section>
    </Layout>
  );
};

export default PaymentFailed;
