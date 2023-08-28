import React, { useEffect, useState } from "react";
import { Accordion, Form, Tab, Tabs } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import PdfIcon from "../assets/img/pdf-icon.png";
import AlertDialog from "../common/AlertDialog";
import NoRecordsFound from "../common/NoRecordsFound";
import RestEndPoint from "../redux/constants/RestEndpoints";
import RESTClient from "../utils/RestClient";
import StringUtils from "../utils/StringUtils";
import { getChildAge, getIpAddress, humanize } from "../utils/helper";
import {
  downloadApplicationDocument,
  downloadDocument,
  getPlaceOrder,
  processOrderAfterPayment,
} from "../utils/services";
import GenericDialog from "./GenericDialog";
import ParentGuardianTab from "./parentGuardianTab";

const ReviewAdmissionDialog = ({
  show,
  childId,
  handleClose,
  applicationId,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [studentDetail, setStudentDetail] = useState({});
  const [medicalDetail, setMedicalDetail] = useState({});
  const [parentDetail, setParentDetail] = useState([]);
  const [studentDocuments, setStudentDocuments] = useState([]);
  const [otherDocuments, setOtherDocuments] = useState([]);
  const [parentDocuments, setParentDocuments] = useState([]);
  const [key, setKey] = useState("student");
  const [guardiankey, setGuardianKey] = useState("guardianfather");
  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [infoDeclarationAccepted, setInfoDeclarationAccepted] = useState(false);
  const [termsPolicyDeclarationAccepted, setTermsPolicyDeclarationAccepted] =
    useState(false);
  const [remarks, setRemarks] = useState([]);
  const [checkoutButton, setCheckoutButton] = useState(false);
  const childAge = getChildAge(studentDetail.dateOfBirth);

  async function getChildProfile(childId) {
    try {
      const response = await RESTClient.get(
        RestEndPoint.GET_STUDENT_PROFILE + `/${childId}`
      );

      setStudentDetail(response.data);
      if (!response.data.childId) {
        setStudentDetail((val) => {
          return {
            ...val,
            childId,
          };
        });
      }
    } catch (error) {
      setStudentDetail({});
    }
  }

  async function getMedicalProfile(childId) {
    try {
      const response = await RESTClient.get(
        RestEndPoint.GET_STUDENT_MEDICAL_DETAILS + `/${childId}`
      );
      setMedicalDetail(response.data);
    } catch (error) {
      setMedicalDetail({});
    }
  }

  async function getParentDetails(childId) {
    try {
      const response = await RESTClient.get(
        RestEndPoint.GET_STUDENT_PARENT + `/${childId}`
      );
      response.data.length
        ? setParentDetail(response.data)
        : setParentDetail([]);
    } catch (error) {
      setParentDetail([]);
    }
  }

  async function getSupportingDocuments(childId) {
    try {
      const response = await RESTClient.get(
        RestEndPoint.STUDENT_DOCUMENT + `/${childId}`
      );
      if (response.data.studentDocumentDto !== "") {
        setStudentDocuments(
          (response.data.studentDocumentDto || []).filter(
            (val) => val.category === "student"
          )
        );
        setParentDocuments(
          (response.data.studentDocumentDto || []).filter(
            (val) => val.category === "guardian"
          )
        );
        setOtherDocuments(
          (response.data.studentDocumentDto || []).filter(
            (val) => val.category === "Other category"
          )
        );
      }
    } catch (error) {
      setStudentDocuments([]);
      setOtherDocuments([]);
      setParentDocuments([]);
    }
  }

  async function getApplicationDetail(applicationId) {
    try {
      const response = await RESTClient.get(
        RestEndPoint.APPLICANT_DETAIL + `/${applicationId}`
      );
      if (response.data.remarks !== "") {
        setRemarks(response.data.remarks);
      }
      if (response.data.applicantProfile !== "") {
        setStudentDetail(response.data?.applicantProfile);
      }
      if (response.data.applicantGuardian !== "") {
        response.data.applicantGuardian.length
          ? setParentDetail(response.data.applicantGuardian)
          : setParentDetail([]);
      }
      if (response.data.applicantMedicalDetail !== "") {
        setMedicalDetail(response.data.applicantMedicalDetail);
      }
      if (response.data?.applicantDocument !== "") {
        setStudentDocuments(
          (response.data?.applicantDocument || []).filter(
            (val) => val.category === "student"
          )
        );
        setParentDocuments(
          (response.data?.applicantDocument || []).filter(
            (val) => val.category === "guardian"
          )
        );
        setOtherDocuments(
          (response.data?.applicantDocument || []).filter(
            (val) => val.category === "Other category"
          )
        );
      }
    } catch (error) {
      setStudentDetail({});
      setParentDetail([]);
      setMedicalDetail({});
      setStudentDocuments([]);
      setOtherDocuments([]);
      setParentDocuments([]);
    }
  }

  async function downloadApplication(applicationId) {
    downloadApplicationDocument(applicationId);
  }

  const responseHandler = async (e, orderId) => {
    try {
      const formData = new FormData();
      formData.append("response", JSON.stringify(e));
      const response = await processOrderAfterPayment(formData, orderId);
      console.log(response);
      navigate(`/paymentFailed?${response.data}`);
    } catch (e) {
      console.log(e);
      handleClose();
      toast.error("Payment Cancelled");
    }
  };

  async function placeOrder() {
    if (!(infoDeclarationAccepted && termsPolicyDeclarationAccepted)) {
      setAlertMessage("Please select all terms and conditions.");
      setShowAlertDialog(true);
      return;
    }
    const isProfileCompleted = studentDetail.profileCompleted ? true : false;
    if (!isProfileCompleted) {
      setCheckoutButton(false);
      setAlertMessage(
        "Admission form is not complete, it must be complete to checkout."
      );
      setShowAlertDialog(true);
      return;
    }
    try {
      const ip = await getIpAddress();
      const payload = {
        childId: childId,
        ipAddress: ip,
        deviceUserAgent: window.navigator.userAgent,
      };
      const response = await getPlaceOrder(payload);
      console.log(response);
      handleClose();
      setCheckoutButton(false);
      const paymentLinkDetails = JSON.parse(response.data.paymentLinkDetails);
      const flowConfig = {
        merchantId: paymentLinkDetails?.parameters?.mercid,
        bdOrderId: paymentLinkDetails?.parameters?.bdorderid,
        authToken: paymentLinkDetails?.headers?.authorization,
        childWindow: false,
        retryCount: 3,
        prefs: {
          payment_categories: ["nb", "upi", "card", "wallets", "qr", "gpay"],
        },
      };
      const config = {
        responseHandler: (e) => responseHandler(e, response.data.orderId),
        merchantLogo:
          "data:image/png;base64,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",
        flowConfig: flowConfig,
        flowType: "payments",
      };
      console.log(config);
      window.loadBillDeskSdk(config);
    } catch (error) {
      handleClose();
      setCheckoutButton(false);
      console.log("Error", error);
      toast.error("Payment is failed. Please try later");
    }
  }

  function getPresentableAddress(parentObject) {
    let address = "";
    if (parentObject.addressLine1)
      address = StringUtils.append(address, parentObject.addressLine1, ",");
    if (parentObject.addressLine2)
      address = StringUtils.append(address, parentObject.addressLine2, ",");
    if (parentObject.cityName)
      address = StringUtils.append(address, parentObject.cityName, ",");
    if (parentObject.stateName)
      address = StringUtils.append(address, parentObject.stateName, ",");
    if (parentObject.pincode)
      address = StringUtils.append(address, parentObject.pincode, "-");
    return address;
  }

  useEffect(() => {
    if (childId && childId != "") {
      getChildProfile(childId);
      getMedicalProfile(childId);
      getParentDetails(childId);
      getSupportingDocuments(childId);
    }
  }, [childId]);

  useEffect(() => {
    if (applicationId && applicationId !== "") {
      getApplicationDetail(applicationId);
    }
  }, [applicationId]);

  useEffect(() => {
    if (show) {
      setTermsPolicyDeclarationAccepted(false);
      setInfoDeclarationAccepted(false);
    }
  }, [show]);

  return (
    <>
      <GenericDialog
        className="review-admission-modal add-child-model"
        show={show}
        handleClose={handleClose}
        modalHeader="Application Details"
      >
        <Accordion defaultActiveKey="0" flush>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Candidate Details</Accordion.Header>
            <Accordion.Body>
              <div className="admin-detail-row">
                <div className="admin-detail-cell">
                  <label>Name:</label>
                  <span className="item-entry">
                    {studentDetail.firstName} {studentDetail.lastName}
                  </span>
                </div>
                <div className="admin-detail-cell">
                  <label>Email ID:</label>
                  <span className="item-entry">{studentDetail.email}</span>
                </div>
                <div className="admin-detail-cell">
                  <span>Phone Number</span>
                  <span className="item-entry">{studentDetail.phone}</span>
                </div>
              </div>
              <div className="admin-detail-row">
                <div className="admin-detail-cell">
                  <label>Gender:</label>
                  <span className="item-entry">{studentDetail.gender}</span>
                </div>
                <div className="admin-detail-cell">
                  <span>DOB:</span>
                  <span className="item-entry">
                    {studentDetail.dateOfBirth}
                  </span>
                </div>
                <div className="admin-detail-cell">
                  <label>Religion:</label>
                  <span className="item-entry">{studentDetail.religion}</span>
                </div>
              </div>
              <div className="admin-detail-row">
                <div className="admin-detail-cell">
                  <label>Nationality:</label>
                  <span className="item-entry">
                    {studentDetail.nationality}
                  </span>
                </div>
                <div className="admin-detail-cell">
                  <label>Require Transport:</label>
                  <span className="item-entry">
                    {studentDetail.transportFacility ? "Yes" : "No"}
                  </span>
                </div>
                <div className="admin-detail-cell">
                  <label>Require Boarding : </label>
                  <span className="item-entry">
                    {studentDetail.boardingFacility ? "Yes" : "No"}
                  </span>
                </div>
              </div>
              <div className="admin-detail-row onextwo-col">
                <div className="admin-detail-cell">
                  <label>Identification Marks:</label>
                  <span className="item-entry">
                    {studentDetail.identificationMarks
                      ? humanize(studentDetail.identificationMarks)
                      : "No"}
                  </span>
                </div>
                <div className="admin-detail-cell">
                  <label>Annual Family Income:</label>
                  <span className="item-entry">
                    {studentDetail.familyIncome}
                  </span>
                </div>
                <div className="admin-detail-cell">
                  <label>Address:</label>
                  <span className="item-entry">
                    {getPresentableAddress(studentDetail)}
                  </span>
                </div>
              </div>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Medical Details</Accordion.Header>
            <Accordion.Body>
              <div className="admin-detail-row">
                <div className="admin-detail-cell">
                  <label>Blood Group :</label>
                  <span className="item-entry">{medicalDetail.bloodGroup}</span>
                </div>
                <div className="admin-detail-cell">
                  <label>Allergies : </label>
                  <span className="item-entry">
                    {medicalDetail.allergies && medicalDetail.allergies !== ""
                      ? humanize(medicalDetail.allergies)
                      : "No"}
                  </span>
                </div>
                <div className="admin-detail-cell">
                  <label>Need Special Care :</label>
                  <span className="item-entry">
                    {medicalDetail.specialCare &&
                    medicalDetail.specialCare !== ""
                      ? humanize(medicalDetail.specialCare)
                      : "No"}
                  </span>
                </div>
              </div>
              <div className="admin-detail-row onextwo-col">
                <div className="admin-detail-cell">
                  <label>Medical Conditions :</label>
                  <span className="item-entry">
                    {medicalDetail.medicalConditions &&
                    medicalDetail.medicalConditions !== ""
                      ? medicalDetail.medicalConditions
                      : "No"}
                  </span>
                </div>
                <div className="admin-detail-cell">
                  <label>Disabilities :</label>
                  <span className="item-entry">
                    {medicalDetail.disabilities?.length
                      ? medicalDetail.disabilities
                          .map((v) =>
                            StringUtils.capitalizeFirstLetter(
                              StringUtils.replaceUnderScoreWithSpace(v)
                            )
                          )
                          .join(", ")
                          .replaceAll(
                            "Other",
                            StringUtils.capitalizeFirstLetter(
                              medicalDetail.otherDisability
                            )
                          )
                      : "No"}
                  </span>
                </div>
              </div>
            </Accordion.Body>
          </Accordion.Item>

          {childAge >= 11 ? (
            <Accordion.Item eventKey="2">
              <Accordion.Header>Extracurriculars</Accordion.Header>
              <Accordion.Body>
                <div className="admin-detail-row">
                  <div className="admin-detail-cell">
                    <label>Participated in any competitions:</label>
                    <span className="item-entry">
                      {studentDetail.competitionCertificate
                        ? humanize(studentDetail.competitionCertificate)
                        : "NA"}
                    </span>
                  </div>
                  <div className="admin-detail-cell">
                    <label>Having any other interests :</label>
                    <span className="item-entry">
                      {studentDetail.otherInterest
                        ? humanize(studentDetail.otherInterest)
                        : "NA"}
                    </span>
                  </div>
                </div>
              </Accordion.Body>
            </Accordion.Item>
          ) : (
            ""
          )}

          {childAge >= 11 ? (
            <Accordion.Item eventKey="3">
              <Accordion.Header>Background Check</Accordion.Header>
              <Accordion.Body>
                <div className="admin-detail-row"></div>
                <div className="admin-detail-row">
                  <div className="admin-detail-cell">
                    <label>Any history of violent behaviour :</label>
                    <span className="item-entry">
                      <br />
                      {studentDetail.violenceBehaviour
                        ? humanize(studentDetail.violenceBehaviour)
                        : "NA"}
                    </span>
                  </div>
                  <div className="admin-detail-cell">
                    <label>
                      Any instances outside of school involving significant
                      behaviours:
                    </label>
                    <span className="item-entry">
                      {studentDetail.suspension
                        ? humanize(studentDetail.offensiveConduct)
                        : "NA"}
                    </span>
                  </div>
                  <div className="admin-detail-cell">
                    <label>
                      Ever been suspended or expelled from any previous school:
                    </label>
                    <span className="item-entry">
                      {studentDetail.suspension
                        ? humanize(studentDetail.suspension)
                        : "NA"}
                    </span>
                  </div>
                </div>
              </Accordion.Body>
            </Accordion.Item>
          ) : (
            ""
          )}

          <Accordion.Item eventKey="4">
            <Accordion.Header>Parents/Guardian</Accordion.Header>
            <Accordion.Body>
              <div className="tab-wrapper">
                <Tabs
                  //id="controlled-tab-example"
                  activeKey={guardiankey}
                  onSelect={(k) => setGuardianKey(k)}
                  className="tab-header"
                >
                  <Tab eventKey="guardianfather" title="Father">
                    <ParentGuardianTab
                      parentDetail={parentDetail.find(
                        (val) => val.relation === "father"
                      )}
                    />
                  </Tab>
                  <Tab eventKey="guardianMother" title="Mother">
                    <ParentGuardianTab
                      parentDetail={parentDetail.find(
                        (val) => val.relation === "mother"
                      )}
                    />
                  </Tab>
                  <Tab eventKey="Guardian" title="Guardian">
                    <ParentGuardianTab
                      parentDetail={parentDetail.find(
                        (val) =>
                          val.relation !== "father" && val.relation !== "mother"
                      )}
                    />
                  </Tab>
                </Tabs>
              </div>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="5">
            <Accordion.Header>
              Information &amp; Supporting Documents
            </Accordion.Header>
            <Accordion.Body>
              <div className="tab-wrapper">
                <Tabs
                  id="controlled-tab-example"
                  activeKey={key}
                  onSelect={(k) => setKey(k)}
                  className="tab-header"
                >
                  <Tab eventKey="student" title="Student">
                    <div className="document-container">
                      {studentDocuments.length > 0 ? (
                        studentDocuments.map((document, index) => {
                          return (
                            <div
                              key={"childDoc_" + index}
                              className="tab-outer-wrap"
                            >
                              <div className="tab-item">
                                <label>{humanize(document.documentName)}</label>
                                <span className="download-option">
                                  {document.status === "uploaded" && (
                                    <a
                                      href="#"
                                      onClick={() => {
                                        downloadDocument(
                                          childId,
                                          document.documentName,
                                          applicationId
                                        );
                                      }}
                                    >
                                      Download{" "}
                                      <i className="icons link-icon"></i>
                                    </a>
                                  )}
                                </span>
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <NoRecordsFound message="No documents uploaded yet." />
                      )}
                    </div>
                  </Tab>
                  <Tab eventKey="parent1" title="Parent/Guardian">
                    <div className="document-container">
                      {parentDocuments.length > 0 ? (
                        parentDocuments.map((document, index) => {
                          return (
                            <div
                              key={"parentDoc_" + index}
                              className="tab-outer-wrap"
                            >
                              <div className="tab-item">
                                <label>{humanize(document.documentName)}</label>
                                <span className="download-option">
                                  {document.status === "uploaded" && (
                                    <a
                                      href="#"
                                      onClick={() => {
                                        downloadDocument(
                                          childId,
                                          document.documentName,
                                          applicationId
                                        );
                                      }}
                                    >
                                      {" "}
                                      Download{" "}
                                      <i className="icons link-icon"></i>
                                    </a>
                                  )}
                                </span>
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <NoRecordsFound message="No documents uploaded yet." />
                      )}
                    </div>
                  </Tab>
                  <Tab eventKey="other1" title="Others">
                    <div className="document-container">
                      {otherDocuments.length > 0 ? (
                        otherDocuments.map((document, index) => {
                          return (
                            <div
                              key={"otherDoc_" + index}
                              className="tab-outer-wrap"
                            >
                              <div className="tab-item">
                                <label>{humanize(document.documentName)}</label>
                                <span className="download-option">
                                  {document.status === "uploaded" && (
                                    <a
                                      href="#"
                                      onClick={() => {
                                        downloadDocument(
                                          childId,
                                          document.documentName,
                                          applicationId
                                        );
                                      }}
                                    >
                                      {" "}
                                      Download{" "}
                                      <i className="icons link-icon"></i>
                                    </a>
                                  )}
                                </span>
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <NoRecordsFound message="No documents uploaded yet." />
                      )}
                    </div>
                  </Tab>
                </Tabs>
              </div>
            </Accordion.Body>
          </Accordion.Item>
          {applicationId ? (
            <Accordion.Item eventKey="6">
              <Accordion.Header>Remarks</Accordion.Header>
              <Accordion.Body>
                {remarks ? (
                  remarks.map((remark) => {
                    return (
                      <>
                        <div className="remark-block item-row">
                          <div className="item-cell remark-src">
                            <label className="user-name">
                              {remark.firstName} {remark.lastName}
                            </label>
                            <span className="remark-dt">{remark.dateTime}</span>
                          </div>
                          <div className="item-cell remark-txt">
                            <p>{remark.text}</p>
                          </div>
                        </div>

                        {/* <div className="admin-detail-row">
          <div className="admin-detail-cell">
            <label>{remark.firstName}  {remark.lastName}</label>
          </div>
          <div className="admin-detail-cell">
          <label>{remark.dateTime}</label>
          </div>
        </div>
        <div className="admin-detail-row">
        <div className="admin-detail-cell">
            <label>{remark.text}</label>
            <span className="item-entry">
            </span>
          </div>
          <div className="admin-detail-cell">
            
            <span className="item-entry">
            </span>
          </div>
         
        </div> */}
                      </>
                    );
                  })
                ) : (
                  <div className="no-remarks" style={{ textAlign: "center" }}>
                    No Record Found.
                  </div>
                )}
              </Accordion.Body>
            </Accordion.Item>
          ) : (
            ""
          )}
        </Accordion>
        {applicationId ? (
          ""
        ) : (
          <div className="declaration-wrapper">
            <Form.Check
              type="checkbox"
              label=" I hereby declare that all the particulars and the documents I have provided in, or in connection with, this application are true, up-to-date and correct."
              required
              checked={infoDeclarationAccepted}
              onChange={(e) => {
                setInfoDeclarationAccepted(e.target.checked);
              }}
            />
            <Form.Check
              type="checkbox"
              label={
                <div>
                  <span>I have read, understood and accept the </span>
                  <a href={"/termsOfService"} target="_blank">
                    <u> Terms of Service </u>
                  </a>
                  <span> , </span>
                  <a href={"/privacyPolicy"} target="_blank">
                    <u>Privacy Policy</u>
                  </a>
                  <span> , </span>
                  <span> and </span>
                  <a href={"/refundPolicy"} target="_blank">
                    <u> Refund Policy</u>
                  </a>
                  <span>.</span>
                </div>
              }
              required
              checked={termsPolicyDeclarationAccepted}
              onChange={(e) => {
                setTermsPolicyDeclarationAccepted(e.target.checked);
              }}
            />
          </div>
        )}
        {childId && (
          <div className="btn-wrapper review-section-btn">
            <Button
              className="submit"
              onClick={() => {
                setCheckoutButton(true);
                placeOrder();
              }}
              disabled={
                !(
                  infoDeclarationAccepted &&
                  termsPolicyDeclarationAccepted &&
                  !checkoutButton
                )
              }
            >
              Checkout
            </Button>
            <div className="copyright-col"></div>
            <Button
              className="edit"
              onClick={() => {
                navigate(
                  "/admissionForm/?childId=" + btoa(`#${studentDetail.childId}`)
                );
              }}
            >
              Edit
            </Button>
          </div>
        )}
        {applicationId && (
          <div className="btn-wrapper review-section-btn">
            <Button
              className="submit"
              onClick={() => downloadApplication(applicationId)}
              style={{ background: " rgba(65, 40, 95, 0.84)" }}
            >
              <img src={PdfIcon} alt="" style={{ marginRight: "10px" }} />
              Download Details
            </Button>
            <div>
              {/* Master Admission Manager Remarks:{" "}
              <span className="text-danger">No Remarks</span> */}
            </div>
          </div>
        )}
      </GenericDialog>
      <AlertDialog
        show={showAlertDialog}
        message={alertMessage}
        handleClose={() => setShowAlertDialog(false)}
      />
    </>
  );
};
export default ReviewAdmissionDialog;
