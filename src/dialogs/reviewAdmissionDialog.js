import React, { useState, useEffect } from "react";
import { Accordion, Tab, Tabs } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import RESTClient from "../utils/RestClient";
import RestEndPoint from "../redux/constants/RestEndpoints";
import { humanize } from '../utils/helper'
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import NoRecordsFound from "../common/NoRecordsFound";
import { downloadDocument } from "../utils/services";
import AlertDialog from "../common/AlertDialog";

const ReviewAdmissionDialog = ({ show, childId, handleClose }) => {
    const navigate = useNavigate()
    const [studentDetail, setStudentDetail] = useState({})
    const [medicalDetail, setMedicalDetail] = useState({})
    const [parentDetail, setParentDetail] = useState({})
    const [studentDocuments, setStudentDocuments] = useState([])
    const [parentDocuments, setParentDocuments] = useState([])
    const [key, setKey] = useState('student')
    const [showAlertDialog, setShowAlertDialog] = useState(false)
    const [alertMessage, setAlertMessage] = useState('')
    
    async function getChildProfile(childId) {
        try {
            const response = await RESTClient.get(RestEndPoint.GET_STUDENT_PROFILE + `/${childId}`)
            setStudentDetail(response.data)
        } catch (error) {
            setStudentDetail({})
        }
    }

    async function getMedicalProfile(childId) {
        try {
            const response = await RESTClient.get(RestEndPoint.GET_STUDENT_MEDICAL_DETAILS + `/${childId}`)
            setMedicalDetail(response.data)
        } catch (error) {
            setMedicalDetail({})
        }
    }

    async function getParentDetails(childId) {
        try {
            const response = await RESTClient.get(RestEndPoint.GET_STUDENT_PARENT + `/${childId}`)
            response.data.length ? setParentDetail(response.data[0]) : setParentDetail({})
        } catch (error) {
            setParentDetail({})
        }
    }

    async function getSupportingDocuments(childId) {
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
          }
        } catch (error) {
            setStudentDocuments([])
            setParentDocuments([])
        }
      }

    useEffect(() => {
        getChildProfile(childId)
        getMedicalProfile(childId)
        getParentDetails(childId)
        getSupportingDocuments(childId)
    }, [childId])

    async function checkOutApplication() {
        const isProfileCompleted = studentDetail.profileCompleted ? true : false
        if (!isProfileCompleted) {
            setAlertMessage('Admission form is not complete, it must be complete to checkout.')
            setShowAlertDialog(true)
            return
        }

        try {
            await RESTClient.get(RestEndPoint.APPLICATION_CHECKOUT + `/${childId}`)
            handleClose()
            navigate('/userProfile')
        } catch (error) {
            toast.error(RESTClient.getAPIErrorMessage(error))
        }
    }

    return (
        <>
            <Modal dialogClassName="review-admission-modal add-child-model" show={show} onHide={handleClose}>
                <Modal.Header closeButton><h2>Application Details</h2></Modal.Header>
                <Modal.Body dialogClassName="model-body" >
                    <Accordion defaultActiveKey="0" flush>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Candidate Details/Extracurriculars</Accordion.Header>
                            <Accordion.Body>
                                <div className="admin-detail-row">
                                    <div className='admin-detail-cell'>
                                        <label>Name</label>
                                        <span className="item-entry">{studentDetail.firstName} {studentDetail.lastName}</span>
                                    </div>
                                    <div className='admin-detail-cell'>
                                        <label>Gender</label>
                                        <span className="item-entry">{studentDetail.gender}</span>
                                    </div>
                                    <div className='admin-detail-cell'>
                                        <span>DOB </span>
                                        <span className="item-entry">{studentDetail.dateOfBirth}</span>
                                    </div>
                                </div>
                                
                                <div className="admin-detail-row">
                                    <div className='admin-detail-cell'>
                                        <label>Identification Marks</label>
                                        <span className="item-entry">{studentDetail.identificationMarks}</span>
                                    </div>
                                    <div className='admin-detail-cell'>
                                        <label>Gender</label>
                                        <span className="item-entry">{studentDetail.religion}</span>
                                    </div>
                                    <div className='admin-detail-cell'>
                                        <label>Nationality</label>
                                        <span className="item-entry">{studentDetail.nationality}</span>
                                    </div>
                                </div>
                                    
                                <div className="admin-detail-row">
                                    <div className='admin-detail-cell'>
                                        <label>Require Tranport </label>
                                        <span className="item-entry">{studentDetail.tranportFacility ? "Yes" : "No"}</span>
                                    </div>
                                    <div className='admin-detail-cell'>
                                        <label>Require Boarding </label>
                                        <span className="item-entry">{studentDetail.boardingFacility ? "Yes" : "No"}</span>
                                    </div>
                                </div>
                                <div className="admin-detail-row">
                                    <div className='admin-detail-cell'>
                                        <label>Address </label>
                                        <span className="item-entry">{studentDetail.addressLine1}, {studentDetail.addressLine2}, {studentDetail.city}, {studentDetail.state} - {studentDetail.pincode}</span>
                                    </div>
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>Medical Detail / Background Check</Accordion.Header>
                            <Accordion.Body>
                                <div className="admin-detail-row">
                                    <div className='admin-detail-cell'>
                                        <label>Blood Group </label>
                                        <span className="item-entry">{medicalDetail.bloodGroup}</span>
                                    </div>
                                    <div className='admin-detail-cell'>
                                        <label>Allergies </label>
                                        <span className="item-entry">{medicalDetail.allergies && medicalDetail.allergies !== '' ? medicalDetail.allergies : "No"}</span>
                                    </div>
                                </div>
                                <div className="admin-detail-row">
                                    <div className='admin-detail-cell'>
                                        <label>Special Care </label>
                                        <span className="item-entry">{medicalDetail.specialCare && medicalDetail.specialCare !== '' ? medicalDetail.specialCare : "No"}</span>
                                    </div>
                                    <div className='admin-detail-cell'>
                                        <label>Medical Conditions </label>
                                        <span className="item-entry">{medicalDetail.medicalConditions && medicalDetail.medicalConditions !== '' ? medicalDetail.medicalConditions : "No"}</span>
                                    </div>
                                </div>
                                <div className="admin-detail-row">
                                    <div className='admin-detail-cell'>
                                        <label>Disabilities </label>
                                        <span className="item-entry">{medicalDetail.disabilities && medicalDetail.disabilities !== '' ? medicalDetail.disabilities.join(', ') : "No"}</span>
                                    </div>
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="2">
                            <Accordion.Header>Parents/Guardian</Accordion.Header>
                            <Accordion.Body>
                                <div className="admin-detail-row">
                                    <div className='admin-detail-cell'>
                                        <label>Name </label>
                                        <span className="item-entry">{parentDetail.firstName} {parentDetail.lastName}</span>
                                    </div>
                                    <div className='admin-detail-cell'>
                                        <label>Gender </label>
                                        <span className="item-entry">{parentDetail.gender}</span>
                                    </div>
                                    <div className='admin-detail-cell'>
                                        <label>DOB </label>
                                        <span className="item-entry">{parentDetail.dateOfBirth}</span>
                                    </div>
                                </div>
                                <div className="admin-detail-row">
                                    <div className='admin-detail-cell'>
                                        <label>Relation </label>
                                        <span className="item-entry">{parentDetail.relation}</span>
                                    </div>
                                    <div className='admin-detail-cell'>
                                        <label>Marital Status </label>
                                        <span className="item-entry">{parentDetail.maritalStatus}</span>
                                    </div>
                                    <div className='admin-detail-cell'>
                                        <label>Nationality </label>
                                        <span className="item-entry">{parentDetail.nationality}</span>
                                    </div>
                                </div>
                                <div className="admin-detail-row">
                                    <div className='admin-detail-cell'>
                                        <label>Qualification </label>
                                        <span className="item-entry">{parentDetail.qualification}</span>
                                    </div>
                                    <div className='admin-detail-cell'>
                                        <label>Occupation </label>
                                        <span className="item-entry">{parentDetail.occupation}</span>
                                    </div>
                                </div>
                                <div className="admin-detail-row">
                                    <div className='admin-detail-cell'>
                                        <label>Annual Family Income </label>
                                        <span className="item-entry">{parentDetail.annualFamilyIncomes?.replace('[','').replace(']','').replace(',',' - ')}</span>
                                    </div>
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="3">
                            <Accordion.Header>Additional information &amp; Supporting Documents</Accordion.Header>
                            <Accordion.Body>
                            <div className='tab-wrapper'>
                                <Tabs id="controlled-tab-example"
                                    activeKey={key}
                                    onSelect={k => setKey(k)}
                                    className='tab-header'
                                >
                                    <Tab eventKey='student' title='Student' >
                                        {
                                            studentDocuments.length > 0 ?
                                                studentDocuments.map((document, index) => {
                                                    return <div key={'childDoc_'+index} className="admin-detail-row">
                                                        <div className="admin-detail-cell">
                                                            {humanize(document.documentName)}
                                                        </div>
                                                        <div className="admin-detail-cell">
                                                        {document.status === 'uploaded' && (
                                                            <a href="javascript:void(0)" onClick={()=> {downloadDocument(childId, document.documentName)}}> Download <i className="icons link-icon"></i></a>
                                                        )}
                                                        </div>
                                                    </div>
                                                })
                                                : <NoRecordsFound message="No documents uploaded yet."/>
                                        }
                                    </Tab>
                                    <Tab eventKey='parent1' title='Parent/Guardian' >
                                        {
                                            parentDocuments.length > 0 ?
                                                parentDocuments.map((document, index) => {
                                                    return <div key={'parentDoc_'+index} className="admin-detail-row">
                                                        <div className="admin-detail-cell">
                                                            {humanize(document.documentName)}
                                                        </div>
                                                        <div className="admin-detail-cell">
                                                        {document.status === 'uploaded' && (
                                                            <a href="javascript:void(0)" onClick={()=> {downloadDocument(childId, document.documentName)}}> Download <i className="icons link-icon"></i></a>
                                                        )}
                                                        </div>
                                                    </div>
                                                })
                                                : <NoRecordsFound message="No documents uploaded yet."/>
                                        }
                                    </Tab>
                                </Tabs>
                            </div>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                    <div className="btn-wrapper">
                        <Button className='submit' onClick={()=>checkOutApplication()}>Checkout</Button>
                    </div>
                </Modal.Body>
            </Modal>
            <AlertDialog show={showAlertDialog} message={alertMessage} handleClose={()=> setShowAlertDialog(false)}/>
        </>
    );
}

export default ReviewAdmissionDialog;

