import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/esm/Container";
import Breadcrumbs from "../common/Breadcrumbs";
import Layout from "../common/layout";

const RefundPolicy = () => {
  window.scrollTo(0, 0);

  return (
    <Layout>
      <section className="content-area about-page">
        <Container className="content-area-inner inner-page-container">
          <Row className="content-section bc-section">
            <Col className="bc-col">
              <Breadcrumbs />
            </Col>
          </Row>
          <Row className="content-section about-content-main  terms-main">
            <div className=" terms-section">
              <section className="section-wrapper">
                <h2>REFUNDS AND CANCELLATION POLICY</h2>
                <p>
                  We thank you and appreciate your purchase with us. Please read
                  the policy, conditions and process carefully as they will give
                  you important information and guidelines about your rights and
                  obligations as our User, concerning any purchase you make
                  through us. The policy concerning the returns and refund
                  requests, shall be following the clauses as set forth:
                </p>
              </section>

              <section className="section-wrapper">
                <h4>1.REFUND REQUESTS :</h4>
                <p>
                  The Refunds shall be granted only under the following
                  circumstance:
                </p>
                <p>a. In case of payment gateway processing errors. </p>
                <p>
                  The Refund shall not be granted under the following
                  circumstances:
                </p>
                <p>
                  a. Once the fee is paid or an application has been submitted.{" "}
                </p>
                <p>
                  b. In case of change of mind or wrong data or insufficient
                  data being submitted by the User at the time of paying fees or
                  submitting the applications.
                </p>
                <p>
                  Refunds are done usually within 30 business days. You will be
                  refunded in the currency you were charged in. If this is not
                  your native currency, your bank may charge exchange fees, or a
                  change in the exchange rate may have resulted in a difference
                  in the amount refunded compared to the amount you originally
                  paid (in your native currency). It is solely your
                  responsibility if you have to pay any fees or bear any losses
                  in this process. You shall make all Refund requests by
                  contacting the technical team support available on the
                  Website, which will be the official mode of communication with
                  our Website and the Company. The Company shall waive all other
                  means of communication made. All Refunds shall be made only on
                  the basis and upon investigation by us on following such
                  guidelines.
                </p>
                <h4>2. CANCELLATION:</h4>
                <p>
                  The Company at its sole discretion may cancel any Service(s):
                </p>
                <p>
                  a. If it suspects a User has undertaken a fraudulent
                  transaction, or
                </p>
                <p>
                  b. If it suspects a User has undertaken a transaction which is
                  not following the Terms of Service, or
                </p>
                <p>c. In case of unavailability of a service, or</p>
                <p>
                  d. For any reason outside the control of the Company including
                  causes for delivery related logistical difficulties.
                </p>
                <p>
                  e. If the Company does not want to do business with the User
                </p>
                <p>
                  Further, while all measures are taken to ensure accuracy of
                  service specifications, the details of the service as
                  reflected on the Website may be inaccurate due to technical
                  issues, typographical errors or incorrect service information
                  provided to the Company and in such an event you shall be
                  notified as soon as such error comes to the notice of the
                  Company. The Company maintains a negative list of all
                  fraudulent transactions and non-complying Users and reserves
                  the right to deny access to such Users at any time or cancel
                  any orders placed by them in future.
                </p>
              </section>
            </div>
          </Row>
        </Container>
      </section>
    </Layout>
  );
};
export default RefundPolicy;
