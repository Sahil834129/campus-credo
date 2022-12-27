import React, { useEffect, useState } from "react";
import { Accordion, Tab, Tabs } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import PdfIcon from "../assets/img/pdf-icon.png";
import AlertDialog from "../common/AlertDialog";
import NoRecordsFound from "../common/NoRecordsFound";
import RestEndPoint from "../redux/constants/RestEndpoints";
import { humanize } from "../utils/helper";
import RESTClient from "../utils/RestClient";
import {
  downloadApplicationDocument,
  downloadDocument,
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
  const [studentDetail, setStudentDetail] = useState({});
  const [medicalDetail, setMedicalDetail] = useState({});
  const [parentDetail, setParentDetail] = useState([]);
  const [studentDocuments, setStudentDocuments] = useState([]);
  const [parentDocuments, setParentDocuments] = useState([]);
  const [key, setKey] = useState("student");
  const [guardiankey, setGuardianKey] = useState("guardianfather");
  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  async function getChildProfile(childId) {
    try {
      const response = await RESTClient.get(
        RestEndPoint.GET_STUDENT_PROFILE + `/${childId}`
      );
      setStudentDetail(response.data);
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
      }
    } catch (error) {
      setStudentDocuments([]);
      setParentDocuments([]);
    }
  }

  async function getApplicationDetail(applicationId) {
    try {
      const response = await RESTClient.get(
        RestEndPoint.APPLICANT_DETAIL + `/${applicationId}`
      );
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
      }
    } catch (error) {
      setStudentDetail({});
      setParentDetail([]);
      setMedicalDetail({});
      setStudentDocuments([]);
      setParentDocuments([]);
    }
  }

  useEffect(() => {
    console.log(parentDocuments, studentDocuments);
  }, [studentDocuments, parentDocuments]);

  async function downloadApplication(applicationId) {
    downloadApplicationDocument(applicationId);
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

  async function checkOutApplication() {
    const isProfileCompleted = studentDetail.profileCompleted ? true : false;
    if (!isProfileCompleted) {
      setAlertMessage(
        "Admission form is not complete, it must be complete to checkout."
      );
      setShowAlertDialog(true);
      return;
    }

    try {
      await RESTClient.get(RestEndPoint.APPLICATION_CHECKOUT + `/${childId}`);
      handleClose();
      navigate("/userProfile");
    } catch (error) {
      toast.error(RESTClient.getAPIErrorMessage(error));
    }
  }

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
                  <label>Name</label>
                  <span className="item-entry">
                    {studentDetail.firstName} {studentDetail.lastName}
                  </span>
                </div>
                <div className="admin-detail-cell">
                  <label>Gender</label>
                  <span className="item-entry">{studentDetail.gender}</span>
                </div>
                <div className="admin-detail-cell">
                  <span>DOB </span>
                  <span className="item-entry">
                    {studentDetail.dateOfBirth}
                  </span>
                </div>
              </div>
              <div className="admin-detail-row">
                <div className="admin-detail-cell">
                  <label>Identification Marks</label>
                  <span className="item-entry">
                    {studentDetail.identificationMarks}
                  </span>
                </div>
                <div className="admin-detail-cell">
                  <label>Religion</label>
                  <span className="item-entry">{studentDetail.religion}</span>
                </div>
                <div className="admin-detail-cell">
                  <label>Nationality</label>
                  <span className="item-entry">
                    {studentDetail.nationality}
                  </span>
                </div>
              </div>
              <div className="admin-detail-row">
                <div className="admin-detail-cell">
                  <label>Require Tranport </label>
                  <span className="item-entry">
                    {studentDetail.tranportFacility ? "Yes" : "No"}
                  </span>
                </div>
                <div className="admin-detail-cell">
                  <label>Require Boarding </label>
                  <span className="item-entry">
                    {studentDetail.boardingFacility ? "Yes" : "No"}
                  </span>
                </div>
                <div className="admin-detail-cell">
                  <label>Address </label>
                  <span className="item-entry">
                    {studentDetail.addressLine1}, {studentDetail.addressLine2},{" "}
                    {studentDetail.city}, {studentDetail.state} -{" "}
                    {studentDetail.pincode}
                  </span>
                </div>
              </div>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Medical Detail</Accordion.Header>
            <Accordion.Body>
              <div className="admin-detail-row">
                <div className="admin-detail-cell">
                  <label>Blood Group </label>
                  <span className="item-entry">{medicalDetail.bloodGroup}</span>
                </div>
                <div className="admin-detail-cell">
                  <label>Allergies </label>
                  <span className="item-entry">
                    {medicalDetail.allergies && medicalDetail.allergies !== ""
                      ? medicalDetail.allergies
                      : "No"}
                  </span>
                </div>
              </div>
              <div className="admin-detail-row">
                <div className="admin-detail-cell">
                  <label>Need special Care </label>
                  <span className="item-entry">
                    {medicalDetail.specialCare &&
                      medicalDetail.specialCare !== ""
                      ? medicalDetail.specialCare
                      : "No"}
                  </span>
                </div>
                <div className="admin-detail-cell">
                  <label>Medical Conditions </label>
                  <span className="item-entry">
                    {medicalDetail.medicalConditions &&
                      medicalDetail.medicalConditions !== ""
                      ? medicalDetail.medicalConditions
                      : "No"}
                  </span>
                </div>
              </div>
              <div className="admin-detail-row">
                <div className="admin-detail-cell">
                  <label>Disabilities </label>
                  <span className="item-entry">
                    {medicalDetail.disabilities?.length
                      ? medicalDetail.disabilities
                        .join(", ")
                        .replaceAll("_", " ")
                        .replaceAll("Other", medicalDetail.otherDisability)
                      : "No"}
                  </span>
                </div>
              </div>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>Extracurriculars</Accordion.Header>
            <Accordion.Body>
              <div className="admin-detail-row">
                <div className="admin-detail-cell">
                  <label>Participated in any competitions.</label>
                  <span className="item-entry">
                    {studentDetail.competitionCertificate
                      ? studentDetail.competitionCertificate
                      : "NA"}
                  </span>
                </div>
                <div className="admin-detail-cell">
                  <label>Having any other interests</label>
                  <span className="item-entry">
                    {studentDetail.otherInterest
                      ? studentDetail.otherInterest
                      : "No"}
                  </span>
                </div>
              </div>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="3">
            <Accordion.Header>Background Check</Accordion.Header>
            <Accordion.Body>
              <div className="admin-detail-row">
                <div className="admin-detail-cell">
                  <label>Any history of violent behaviour</label>
                  <span className="item-entry">
                    {studentDetail.violenceBehaviour
                      ? studentDetail.violenceBehaviour
                      : "No"}
                  </span>
                </div>
                <div className="admin-detail-cell">
                  <label>
                    Involved in any incidents outside of school that involve
                    serious behaviours
                  </label>
                  <span className="item-entry">
                    {studentDetail.suspension
                      ? studentDetail.offensiveConduct
                      : "No"}
                  </span>
                </div>
                <div className="admin-detail-cell">
                  <label>
                    Ever been suspended or expelled from any previous school
                  </label>
                  <span className="item-entry">
                    {studentDetail.suspension ? studentDetail.suspension : "No"}
                  </span>
                </div>
              </div>
            </Accordion.Body>
          </Accordion.Item>
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
              Additional information &amp; Supporting Documents
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
                    {studentDocuments.length > 0 ? (
                      studentDocuments.map((document, index) => {
                        return (
                          <div
                            key={"childDoc_" + index}
                            className="admin-detail-row"
                          >
                            <div className="admin-detail-cell">
                              {humanize(document.documentName)}
                            </div>
                            <div className="admin-detail-cell">
                              {document.status === "uploaded" && (
                                <a
                                  href="javascript:void(0)"
                                  onClick={() => {
                                    downloadDocument(
                                      childId,
                                      document.documentName,
                                      studentDetail?.childId
                                    );
                                  }}
                                >
                                  Download <i className="icons link-icon"></i>
                                </a>
                              )}
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <NoRecordsFound message="No documents uploaded yet." />
                    )}
                  </Tab>
                  <Tab eventKey="parent1" title="Parent/Guardian">
                    {parentDocuments.length > 0 ? (
                      parentDocuments.map((document, index) => {
                        return (
                          <div
                            key={"parentDoc_" + index}
                            className="admin-detail-row"
                          >
                            <div className="admin-detail-cell">
                              {humanize(document.documentName)}
                            </div>
                            <div className="admin-detail-cell">
                              {document.status === "uploaded" && (
                                <a
                                  href="javascript:void(0)"
                                  onClick={() => {
                                    downloadDocument(
                                      childId,
                                      document.documentName
                                    );
                                  }}
                                >
                                  {" "}
                                  Download <i className="icons link-icon"></i>
                                </a>
                              )}
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <NoRecordsFound message="No documents uploaded yet." />
                    )}
                  </Tab>
                </Tabs>
              </div>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        {childId && (
          <div className="btn-wrapper review-section-btn">
            <Button className="submit" onClick={() => checkOutApplication()}>
              Checkout
            </Button>
            <Button
              className="edit"
              onClick={() => {
                navigate("/userProfile/admissionForm/");
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
              Master Admission Manager Remarks:{" "}
              <span className="text-danger">No Remarks</span>
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
