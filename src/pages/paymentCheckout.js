import { Form, Formik } from "formik";
import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "../assets/scss/custom-styles.scss";
import Breadcrumbs from "../common/Breadcrumbs";
import Layout from "../common/layout";
import Button from "../components/form/Button";
import { isEmpty } from "../utils/helper";

const PaymentCheckout = () => {
  const { state } = useLocation();
  const { data } = state || {};

  const submit = (formData) => {
    var paytm_form = document.getElementById("paytm_form");
    paytm_form.submit();
  };

  useEffect(() => {
    if (
      !isEmpty(data) &&
      !isEmpty(data.orderType) &&
      data.orderType === "CART_CHECKOUT"
    ) {
      var paytm_form = document.getElementById("paytm_form");
      paytm_form.submit();
    }
  }, []);

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
              <div className="boxed-content-area payment-checkout">
                <div className="form-wrap-outer">
                  {!isEmpty(data) &&
                  !isEmpty(data.orderType) &&
                  data.orderType === "REGISTRATION_CHECKOUT" ? (
                    <>
                
                      <div className="form-container info-area">
                        <div className="title-wrap"><h2>Order Summary</h2></div>
                        <div className="cell-row">
                          <span className="fld-title">Total Amount</span><label>₹{data.orderTotal}</label>
                        </div>
                        <div className="cell-row">
                          <span className="fld-title">Platform Fee</span><label> ₹{data.platformFee}</label>
                        </div>
                        <div className="cell-row">
                          <span className="fld-title">GST 18%</span><label> ₹{data.gst}</label>
                        </div>
                        <div className="cell-row">
                          <span className="fld-title">Total Payment</span>
                          <label className="totalpayment">
                            ₹{data.totalAmount}
                          </label>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="redirecting-msg">Redirecting to Paytm</div>
                    </>
                  )}

                  <div className="form-container frm-area">
                    <Formik>
                      {({ errors, touched }) => (
                        <Form
                          className=""
                          id="paytm_form"
                          name="paytm"
                          action={data.paymentProcessUrl}
                        >
                          <input
                            type="hidden"
                            name="mid"
                            value={data.merchantId}
                          />
                          <input
                            type="hidden"
                            name="orderId"
                            value={data.orderId}
                          />
                          <input
                            type="hidden"
                            name="txnToken"
                            value={data.transactionToken}
                          />
                          {!isEmpty(data) &&
                          !isEmpty(data.orderType) &&
                          data.orderType === "REGISTRATION_CHECKOUT" ? (
                            <div className="cell-row btn-wrapper">
                              <Button
                                type="submit"
                                class="paynow-btn"
                                buttonLabel="PAY NOW"
                                onClick={submit}
                              />
                            </div>
                          ) : (
                            ""
                          )}
                        </Form>
                      )}
                    </Formik>
                  </div>

                  
                </div>
              </div>
            </section>
          </Row>
          <ToastContainer autoClose={2000} position="top-right" />
        </Container>
      </section>
    </Layout>
  );
};

export default PaymentCheckout;
