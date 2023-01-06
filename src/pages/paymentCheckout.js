import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "../assets/scss/custom-styles.scss";

import { Form, Formik } from "formik";
import { Container } from "react-bootstrap";
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
      <section className="content-area">
        <Container className="main-container signup-main" fluid>
          <div className="signup-wrapper">
            <div className="signup-col left"></div>
            <div className="signup-col right">
              <div className="form-wrapper">
                {!isEmpty(data) &&
                !isEmpty(data.orderType) &&
                data.orderType === "REGISTRATION_CHECKOUT" ? (
                  <>
                    <div className="form-title">
                      <h4>Order Summary</h4>
                    </div>
                    <div className="form-container">
                      <div>
                        <div className="cell left">Total Amount</div>
                        <div className="cell right">₹{data.orderTotal}</div>
                      </div>
                      <div>
                        <div className="cell left">Platform Fee</div>
                        <div className="cell right"> ₹{data.platformFee}</div>
                      </div>
                      <div>
                        <div className="cell left">GST 18%</div>
                        <div className="cell right"> ₹{data.gst}</div>
                      </div>
                      <div className="total">
                        <div className="cell left">Total Payment</div>
                        <div className="cell right totalpayment">
                          ₹{data.totalAmount}
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div>Redirecting to Paytm</div>
                  </>
                )}

                <div className="form-container">
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
                          <div className="frm-cell frm-btn-wrap">
                            <Button
                              type="submit"
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
          </div>
          <ToastContainer autoClose={2000} position="top-right" />
        </Container>
      </section>
    </Layout>
  );
};

export default PaymentCheckout;
