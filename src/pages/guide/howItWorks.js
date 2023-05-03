import Accordion from "react-bootstrap/Accordion";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/esm/Container";

import { useEffect, useState } from "react";
import Breadcrumbs from "../../common/Breadcrumbs";
import Layout from "../../common/layout";
import AddMultipleStudents from "./addMultipleStudents";
import AddStudentDetails from "./addStudentDetails";
import ApplicationDeclined from "./applicationDeclined";
import ApplyToSchool from "./applyToSchool";
import DistanceFromHome from "./distanceFromHome";
import FindInvoices from "./findInvoices";
import MinimizeTransactionCost from "./minimizeTransactionCost";
import MultipleSchools from "./multipleSchools";
import QueryRegardingApplication from "./queryRegardingApplication";
import QueryRegardingSchool from "./queryRegardingSchool";
import ReceivedAnEmailSms from "./receivedAnEmailSms";
import RefundOfApplication from "./refundOfApplication";
import StatusOfMyApplications from "./statusOfMyApplications";
import UpdateMyEmailMobile from "./updateMyEmailMobile";

const HowItWorks = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [currentTab, setCurrentTab] = useState("ApplyToSchool");
  return (
    <Layout>
      <section className="content-area ">
        <Container className="content-area-inner profile-page-wrap">
          <Col className="inner-page-content">
            <Row className="bc-section common-bc">
              <Col className="bc-col">
                <Breadcrumbs />
              </Col>
            </Row>
            <div className="content-section profile-content-main">
              <Col className="left common-sidebar profile-sidebar">
                <h2>Articles in this section</h2>
                <Accordion
                  className="sidebar-collapsible"
                  defaultActiveKey={["0"]}
                  alwaysOpen
                >
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>
                      Articles in this section
                    </Accordion.Header>
                    <Accordion.Body>
                      <ListGroup
                        className="common-sidebar-list"
                        as="ul"
                        variant="flush"
                        // defaultActiveKey="#link2"
                      >
                        <ListGroup.Item
                          as="li"
                          action
                          href="#link1"
                          active={currentTab === "ApplyToSchool"}
                          onClick={() => {
                            console.log("first");
                            setCurrentTab("ApplyToSchool");
                          }}
                        >
                          How to apply to a school?
                        </ListGroup.Item>
                        <ListGroup.Item
                          as="li"
                          action
                          href="#link2"
                          onClick={() => {
                            console.log("second");
                            setCurrentTab("MultipleSchools");
                          }}
                        >
                          How to select multiple schools for application?
                        </ListGroup.Item>
                        <ListGroup.Item
                          as="li"
                          href="#link3"
                          onClick={() => {
                            console.log("third");
                            setCurrentTab("AddStudentDetails");
                          }}
                        >
                          Where do I add student details for application?
                        </ListGroup.Item>
                        <ListGroup.Item
                          as="li"
                          href="#link4"
                          onClick={() => {
                            console.log("fourth");
                            setCurrentTab("AddMultipleStudents");
                          }}
                        >
                          Can I add multiple students for application?
                        </ListGroup.Item>
                        <ListGroup.Item
                          as="li"
                          href="#link5"
                          onClick={() => {
                            console.log("five");
                            setCurrentTab("UpdateMyEmailMobile");
                          }}
                        >
                          How do I update my email/mobile?
                        </ListGroup.Item>
                        <ListGroup.Item
                          as="li"
                          href="#link6"
                          onClick={() => {
                            console.log("five");
                            setCurrentTab("DistanceFromHome");
                          }}
                        >
                          Distance from home option not working?
                        </ListGroup.Item>
                        <ListGroup.Item
                          as="li"
                          href="#link7"
                          onClick={() => {
                            console.log("seven");
                            setCurrentTab("StatusOfMyApplications");
                          }}
                        >
                          Where do I see status of my applications
                        </ListGroup.Item>
                        <ListGroup.Item
                          as="li"
                          href="#link8"
                          onClick={() => {
                            console.log("8");
                            setCurrentTab("ReceivedAnEmailSms");
                          }}
                        >
                          I have received an email/sms that my application has
                          been approved. What to do next?
                        </ListGroup.Item>
                        <ListGroup.Item
                          as="li"
                          href="#link9"
                          onClick={() => {
                            console.log("9");
                            setCurrentTab("ApplicationDeclined");
                          }}
                        >
                          My application has been declined. Where can I see the
                          reason?
                        </ListGroup.Item>
                        <ListGroup.Item
                          as="li"
                          href="#link10"
                          onClick={() => {
                            console.log("10");
                            setCurrentTab("QueryRegardingApplication");
                          }}
                        >
                          I have a query regarding the application form. What to
                          do?
                        </ListGroup.Item>
                        <ListGroup.Item
                          as="li"
                          href="#link11"
                          onClick={() => {
                            console.log("11");
                            setCurrentTab("QueryRegardingSchool");
                          }}
                        >
                          I have a query regarding a school. What to do?
                        </ListGroup.Item>
                        <ListGroup.Item
                          as="li"
                          href="#link12"
                          onClick={() => {
                            console.log("12");
                            setCurrentTab("FindInvoices");
                          }}
                        >
                          Where can I find invoices?
                        </ListGroup.Item>
                        <ListGroup.Item
                          as="li"
                          href="#link13"
                          onClick={() => {
                            console.log("13");
                            setCurrentTab("RefundOfApplication");
                          }}
                        >
                          How do I get refund of my application/admission fee?
                        </ListGroup.Item>
                        <ListGroup.Item
                          as="li"
                          href="#link14"
                          onClick={() => {
                            console.log("14");
                            setCurrentTab("MinimizeTransactionCost");
                          }}
                        >
                          How do I minimize transaction cost when I pay online?
                        </ListGroup.Item>
                      </ListGroup>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </Col>
              {currentTab === "ApplyToSchool" && <ApplyToSchool />}
              {currentTab === "MultipleSchools" && <MultipleSchools />}
              {currentTab === "AddStudentDetails" && <AddStudentDetails />}
              {currentTab === "AddMultipleStudents" && <AddMultipleStudents />}
              {currentTab === "UpdateMyEmailMobile" && <UpdateMyEmailMobile />}
              {currentTab === "DistanceFromHome" && <DistanceFromHome />}
              {currentTab === "ReceivedAnEmailSms" && <ReceivedAnEmailSms />}
              {currentTab === "ApplicationDeclined" && <ApplicationDeclined />}
              {currentTab === "FindInvoices" && <FindInvoices />}
              {currentTab === "RefundOfApplication" && <RefundOfApplication />}
              {currentTab === "MinimizeTransactionCost" && (
                <MinimizeTransactionCost />
              )}
              {currentTab === "QueryRegardingApplication" && (
                <QueryRegardingApplication />
              )}
              {currentTab === "QueryRegardingSchool" && (
                <QueryRegardingSchool />
              )}
              {currentTab === "StatusOfMyApplications" && (
                <StatusOfMyApplications />
              )}
            </div>
          </Col>
        </Container>
      </section>
    </Layout>
  );
};
export default HowItWorks;
