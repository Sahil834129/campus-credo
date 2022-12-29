import React from "react";
import "../assets/scss/custom-styles.scss";

import { Container } from "react-bootstrap";
import Layout from "../common/layout";

const OrderConfirm = () => {
  return (
    <Layout>
      <section className="content-area">
        <Container className="main-container signup-main" fluid>
          Order Confirmed
        </Container>
      </section>
    </Layout>
  );
};

export default OrderConfirm;
