import React, { useEffect } from "react";
import "../assets/scss/custom-styles.scss";

import { Container } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import Layout from "../common/layout";

const OrderConfirm = () => {
  const search = useLocation().search;
  const orderType = new URLSearchParams(search).get("orderType");
  const id = new URLSearchParams(search).get("id");
  return (
    <Layout>
      <section className="content-area">
        <Container className="main-container signup-main" fluid>
          Your Order : {id} Confirmed
        </Container>
      </section>
    </Layout>
  );
};

export default OrderConfirm;
