import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/esm/Container";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Breadcrumbs from "../common/Breadcrumbs";
import Layout from "../common/layout";

const PrivacyPolicy = () => {
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
                <h2>PRIVACY POLICY</h2>
                <p>
                  The creator of this Privacy Policy ensures a steady commitment
                  to Your privacy with regard to the protection of your
                  invaluable information that you may share across this Website.
                  This privacy policy contains information about the Website.
                </p>
                <p>
                  To provide You with Our uninterrupted use of the Website, We
                  may collect and, in some circumstances, disclose information
                  about you with your permission. To ensure better protection of
                  Your privacy, We provide this notice explaining Our
                  information collection and disclosure policies, and the
                  choices You make about the way Your information is collected
                  and used.{" "}
                </p>
                <h4>Index:</h4>
                <ListGroup className="list">
                  <ListGroup.Item>Personal Information</ListGroup.Item>
                  <ListGroup.Item>Information We Collect</ListGroup.Item>
                  <ListGroup.Item>Our Use Of Your Information</ListGroup.Item>
                  <ListGroup.Item>How Information Is Collected</ListGroup.Item>
                  <ListGroup.Item>
                    External Links on The Platform
                  </ListGroup.Item>
                  <ListGroup.Item>Google Analytics</ListGroup.Item>
                  <ListGroup.Item>Google Adsense</ListGroup.Item>
                  <ListGroup.Item>Your Rights</ListGroup.Item>
                  <ListGroup.Item>Compliances</ListGroup.Item>
                  <ListGroup.Item>Confidentiality</ListGroup.Item>
                  <ListGroup.Item>Other Information Collectors</ListGroup.Item>
                  <ListGroup.Item>
                    Our Disclosure of Your Information
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Accessing, Reviewing and Changing Your Profile
                  </ListGroup.Item>
                  <ListGroup.Item>Security</ListGroup.Item>
                  <ListGroup.Item>Severability</ListGroup.Item>
                  <ListGroup.Item>Amendment</ListGroup.Item>
                  <ListGroup.Item>
                    Consent Withdrawal, Data Download & Data Removal Requests
                  </ListGroup.Item>
                  <ListGroup.Item>Contact Us</ListGroup.Item>
                </ListGroup>
                <p>
                  <strong>
                    This Privacy Policy shall be in compliance with the General
                    Data Protection Regulation (GDPR) in effect from May 25,
                    2018, and any and all provisions that may read to the
                    contrary shall be deemed to be void and unenforceable as of
                    that date. If you do not agree with the terms and conditions
                    of our Privacy Policy, including in relation to the manner
                    of collection or use of your information, please do not use
                    or access the Site. If you have any questions or concerns
                    regarding this Privacy Policy, you should contact our
                    Customer Support Desk at “support@campuscredo.com”.
                  </strong>
                </p>
                <p className="allUppercase">
                  ANY CAPITALIZED WORDS USED HENCEFORTH SHALL HAVE THE MEANING
                  ACCORDED TO THEM UNDER THIS AGREEMENT. FURTHER, ALL HEADING
                  USED HEREIN ARE ONLY FOR THE PURPOSE OF ARRANGING THE VARIOUS
                  PROVISIONS OF THE AGREEMENT IN ANY MANNER. NEITHER THE USER
                  NOR THE CREATORS OF THIS PRIVACY POLICY MAY USE THE HEADING TO
                  INTERPRET THE PROVISIONS CONTAINED WITHIN IT IN ANY MANNER.
                </p>
              </section>

              <section className="section-wrapper">
                <h2>INFORMATION WE COLLECT</h2>
                <p>
                  We are committed to respecting Your online privacy. We further
                  recognize Your need for appropriate protection and management
                  of any Personal Information You share with us. We may collect
                  the following information:
                </p>
                <p>a. Personal data includes but is not limited to: </p>
                <h4>1. Educational Institution:</h4>
                <ListGroup className="list">
                  <ListGroup.Item>● Name</ListGroup.Item>
                  <ListGroup.Item>● Address</ListGroup.Item>
                  <ListGroup.Item>● Email id</ListGroup.Item>
                </ListGroup>

                <h4>2. Parents/Students:</h4>
                <ListGroup className="list">
                  <ListGroup.Item>● Student’s Name</ListGroup.Item>
                  <ListGroup.Item>● Parents Name</ListGroup.Item>
                  <ListGroup.Item>● Parents Occupation</ListGroup.Item>
                  <ListGroup.Item>● Student’s Age</ListGroup.Item>
                  <ListGroup.Item>● Student’s Gender</ListGroup.Item>
                  <ListGroup.Item>● Medical history</ListGroup.Item>
                  <ListGroup.Item>● Certificates</ListGroup.Item>
                  <ListGroup.Item>● Extra curricular activities</ListGroup.Item>
                </ListGroup>
              </section>
            </div>
          </Row>
        </Container>
      </section>
    </Layout>
    );
};
export default PrivacyPolicy;