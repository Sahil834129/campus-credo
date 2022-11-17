import React, { useState, useEffect } from "react";
import { Accordion } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import { useDispatch } from 'react-redux'
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import RESTClient from "../utils/RestClient";
import RestEndPoint from "../redux/constants/RestEndpoints";

const ReviewAdmissionDialog = ({ show, studentid, handleClose }) => {

    const dispatch = useDispatch()
    const [studentdetail, setStudentdetail] = useState({})
    const [medicaldetail, setmedicaldetail] = useState({})
    const [parentdetail, setParentDetail] = useState({})
    async function getCurrentUser(user) {
        try {
            const response = await RESTClient.get(
                RestEndPoint.GET_STUDENT_PROFILE + `/${user}`
            )
            console.log(response)
            if (response.data) {
                setStudentdetail(response.data)
            }
        } catch (error) {
        }
    }

    async function getMedicalProfile(user) {
        try {
            const response = await RESTClient.get(
                RestEndPoint.GET_STUDENT_MEDICAL_DETAILS + `/${user}`
            )
            console.log(response)
            if (response.data) {
                setmedicaldetail(response.data)
            }

        } catch (error) {
        }
    }

    async function getUsersParent(user) {
        try {
            const response = await RESTClient.get(
                RestEndPoint.GET_STUDENT_PARENT + `/${user}`
            )
            console.log(response)
            if (response.data) {
                setParentDetail(response.data[0])
            }
        } catch (error) {
        }
    }

    useEffect(() => {
        getCurrentUser(studentid)
        getMedicalProfile(studentid)
        getUsersParent(studentid)
    }, [studentid])

    return (
        <>
            <Modal dialogClassName="signin-model" show={show} onHide={handleClose}>
                <Modal.Header closeButton>Application</Modal.Header>
                <Modal.Body dialogClassName="model-body" >
                    {/* <div closeButton>{getLocalData("name")}</div> */}
                    <Accordion defaultActiveKey="0" flush>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Candidate Details/Extracurriculars</Accordion.Header>
                            <Accordion.Body>
                                <Col>
                                    <Row>
                                        Name {studentdetail.firstName} {studentdetail.lastName} Gender {studentdetail.gender} DOB {studentdetail.dateOfBirth}
                                    </Row>

                                    <Row>
                                        Age {studentdetail.age}
                                    </Row>
                                </Col>
                                <Col>
                                    <Row>
                                        Identification Marks {studentdetail.identificationMarks}  Religion {studentdetail.religion}  Nationality {studentdetail.nationality}
                                    </Row>
                                </Col>
                                <Col>
                                    <Row>
                                        Require Tranport {studentdetail.tranportFacility} Require Boarding {studentdetail.boardingFacility}
                                    </Row>
                                </Col>
                                <Col>
                                    <Row>
                                        Esidetails Address {studentdetail.addressLine1}{studentdetail.addressLine2}-
                                        {studentdetail.pincode}
                                    </Row>
                                </Col>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>Medical Detail / Background Check</Accordion.Header>
                            <Accordion.Body>
                                <Col>
                                    <Row>
                                        Name {medicaldetail.firstName} {medicaldetail.lastName}  Gender {studentdetail.gender} DOB {studentdetail.dateOfBirth}
                                    </Row>
                                    <Row>
                                        Blood Group {medicaldetail.bloodGroup} Allergies {medicaldetail.allergies}   SpecialCare {studentdetail.specialCare}
                                    </Row>
                                    <Row>
                                        Medical Conditions {studentdetail.medicalConditions}  Disabilities {studentdetail.disabilities}
                                    </Row>
                                </Col>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="2">
                            <Accordion.Header>Parents/Guardian</Accordion.Header>
                            <Accordion.Body>
                                <Col>
                                    <Row>
                                        Name {parentdetail.firstName} {parentdetail.lastName}  Gender {parentdetail.gender} DOB {parentdetail.dateOfBirth}
                                    </Row>
                                    <Row>
                                        Relation{parentdetail.relation}   Marital Status {parentdetail.maritalStatus} Qualification {parentdetail.qualification}
                                    </Row>
                                    <Row>
                                        Occupation {parentdetail.occupation} {parentdetail.lastName} Nationality {parentdetail.nationality}
                                    </Row>
                                    <Row>
                                        Annual Family Incomes {parentdetail.annualFamilyIncomes}
                                    </Row>
                                </Col>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="3">
                            <Accordion.Header>Additional information & Supporting Documents</Accordion.Header>
                            <Accordion.Body>
                                <Col>
                                    <Row>

                                    </Row>

                                </Col>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                    {/* <Button>Download Details</Button> */}
                </Modal.Body>
            </Modal>

        </>
    );
}

export default ReviewAdmissionDialog;

