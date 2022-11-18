import React, { useState, useEffect, useCallback } from "react";
import { Accordion, Tab, Tabs } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import { useDispatch } from 'react-redux'
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import RESTClient from "../utils/RestClient";
import RestEndPoint from "../redux/constants/RestEndpoints";
import { humanize } from '../utils/helper'
import { propTypes } from "react-bootstrap/esm/Image";

const ReviewAdmissionDialog = ({ show, studentid, handleClose }) => {

    const dispatch = useDispatch()
    const [studentdetail, setStudentdetail] = useState({})
    const [medicaldetail, setmedicaldetail] = useState({})
    const [parentdetail, setParentDetail] = useState({})
    const [studentDocuments, setStudentDocuments] = useState([])
    const [parentDocuments, setParentDocuments] = useState([])
    const [key, setKey] = useState('student')
    console.log("student id : " + studentid)
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

    const getSupportingDocument = useCallback(async childId => {
        try {
          const response = await RESTClient.get(
            RestEndPoint.STUDENT_DOCUMENT + `/${childId}`
          )
          if (response.data.studentDocumentDto !== '') {
            setStudentDocuments(
              (response.data.studentDocumentDto || []).filter(
                val => val.category === 'student'
              )
            )
            setParentDocuments(
              (response.data.studentDocumentDto || []).filter(
                val => val.category === 'guardian'
              )
            )
          } else {
          }
        } catch (error) {
          // toast.error(RESTClient.getAPIErrorMessage(error))
        }
      }, [])

    useEffect(() => {
        getCurrentUser(studentid)
        getMedicalProfile(studentid)
        getUsersParent(studentid)
        getSupportingDocument(studentid)
    }, [studentid])

    return (
        <>
            <Modal dialogClassName="signin-model add-child-model" show={show} onHide={handleClose}>
                <Modal.Header closeButton>Application</Modal.Header>
                <Modal.Body dialogClassName="model-body" >
                    {/* <div closeButton>{getLocalData("name")}</div> */}
                    <Accordion defaultActiveKey="0" flush>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Candidate Details/Extracurriculars</Accordion.Header>
                            <Accordion.Body>
                                <div className="row">
                                    <div className='col-md-4'>
                                        <span>Name </span>
                                        <span>{studentdetail.firstName} {studentdetail.lastName}</span>
                                    </div>
                                    <div className='col-md-4'>
                                        <span>Gender </span>
                                        <span>{studentdetail.gender}</span>
                                    </div>
                                    <div className='col-md-4'>
                                        <span>DOB </span>
                                        <span> {studentdetail.dateOfBirth}</span>
                                    </div>
                                </div>
                                
                                <div className="row">
                                    <div className='col-md-4'>
                                        <span>Identification Marks </span>
                                        <span>{studentdetail.identificationMarks}</span>
                                    </div>
                                    <div className='col-md-4'>
                                        <span>Gender </span>
                                        <span>{studentdetail.religion}</span>
                                    </div>
                                    <div className='col-md-4'>
                                        <span>Nationality </span>
                                        <span>{studentdetail.nationality}</span>
                                    </div>
                                </div>
                                    
                                <div className="row">
                                    <div className='col-md-6'>
                                        <span>Require Tranport </span>
                                        <span>{studentdetail.tranportFacility ? "Yes" : "No"}</span>
                                    </div>
                                    <div className='col-md-6'>
                                        <span>Require Boarding </span>
                                        <span>{studentdetail.boardingFacility ? "Yes" : "No"}</span>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className='col-md-12'>
                                        <span>Address </span>
                                        <span>{studentdetail.addressLine1}, {studentdetail.addressLine2}, {studentdetail.city}, {studentdetail.state} - {studentdetail.pincode}</span>
                                    </div>
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>Medical Detail / Background Check</Accordion.Header>
                            <Accordion.Body>
                                <div className="row">
                                    <div className='col-md-6'>
                                        <span>Blood Group </span>
                                        <span>{medicaldetail.bloodGroup}</span>
                                    </div>
                                    <div className='col-md-6'>
                                        <span>Allergies </span>
                                        <span>{medicaldetail.allergies && medicaldetail.allergies !== '' ? medicaldetail.allergies : "No"}</span>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className='col-md-6'>
                                        <span>Special Care </span>
                                        <span>{medicaldetail.specialCare && medicaldetail.specialCare !== '' ? medicaldetail.specialCare : "No"}</span>
                                    </div>
                                    <div className='col-md-6'>
                                        <span>Medical Conditions </span>
                                        <span>{medicaldetail.medicalConditions && medicaldetail.medicalConditions !== '' ? medicaldetail.medicalConditions : "No"}</span>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className='col-md-12'>
                                        <span>Disabilities </span>
                                        <span>{medicaldetail.disabilities && medicaldetail.disabilities !== '' ? medicaldetail.disabilities.join(', ') : "No"}</span>
                                    </div>
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="2">
                            <Accordion.Header>Parents/Guardian</Accordion.Header>
                            <Accordion.Body>
                                <div className="row">
                                    <div className='col-md-4'>
                                        <span>Name </span>
                                        <span>{parentdetail.firstName} {parentdetail.lastName}</span>
                                    </div>
                                    <div className='col-md-4'>
                                        <span>Gender </span>
                                        <span>{parentdetail.gender}</span>
                                    </div>
                                    <div className='col-md-4'>
                                        <span>DOB </span>
                                        <span>{parentdetail.dateOfBirth}</span>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className='col-md-4'>
                                        <span>Relation </span>
                                        <span>{parentdetail.relation}</span>
                                    </div>
                                    <div className='col-md-4'>
                                        <span>Marital Status </span>
                                        <span>{parentdetail.maritalStatus}</span>
                                    </div>
                                    <div className='col-md-4'>
                                        <span>Nationality </span>
                                        <span>{parentdetail.nationality}</span>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className='col-md-4'>
                                        <span>Qualification </span>
                                        <span>{parentdetail.qualification}</span>
                                    </div>
                                    <div className='col-md-8'>
                                        <span>Occupation </span>
                                        <span>{parentdetail.occupation}</span>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className='col-md-8'>
                                        <span>Annual Family Income </span>
                                        <span>{parentdetail.annualFamilyIncomes?.replace('[','').replace(']','').replace(',',' - ')}</span>
                                    </div>
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="3">
                            <Accordion.Header>Additional information & Supporting Documents</Accordion.Header>
                            <Accordion.Body>
                            <div className='tab_btn'>
                                <Tabs id="controlled-tab-example"
                                    activeKey={key}
                                    onSelect={k => setKey(k)}
                                    className='mb-3'
                                >
                                    <Tab eventKey='student' title='Student' >
                                        {
                                            studentDocuments.length && studentDocuments.map((document, index) => {
                                                return <>
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            {humanize(document.documentName)}
                                                        </div>
                                                        <div className="col-md-6">
                                                        {document.status === 'uploaded' && (
                                                            <a target='_blank' href={document.documentLink}>
                                                            {document.documentName}
                                                            </a>
                                                        )}
                                                        </div>
                                                    </div>
                                                </>
                                            })
                                        }
                                    </Tab>
                                    <Tab eventKey='parent1' title='Parent/Guardian' >
                                        {
                                            parentDocuments.length && parentDocuments.map((document, index) => {
                                                return <>
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            {humanize(document.documentName)}
                                                        </div>
                                                        <div className="col-md-6">
                                                        {document.status === 'uploaded' && (
                                                            <a target='_blank' href={document.documentLink}>
                                                            {document.documentName}
                                                            </a>
                                                        )}
                                                        </div>
                                                    </div>
                                                </>
                                            })
                                        }
                                    </Tab>
                                </Tabs>
                            </div>
                                
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

