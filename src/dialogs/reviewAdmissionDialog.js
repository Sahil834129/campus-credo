import React, { useState, useEffect } from "react";
import { Accordion, Tab, Tabs } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import RESTClient from "../utils/RestClient";
import RestEndPoint from "../redux/constants/RestEndpoints";
import { humanize } from '../utils/helper'
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ReviewAdmissionDialog = ({ show, childId, handleClose }) => {
    const navigate = useNavigate()
    const [studentDetail, setStudentDetail] = useState({})
    const [medicalDetail, setMedicalDetail] = useState({})
    const [parentDetail, setParentDetail] = useState({})
    const [studentDocuments, setStudentDocuments] = useState([])
    const [parentDocuments, setParentDocuments] = useState([])
    const [key, setKey] = useState('student')
    
    async function getChildProfile(childId) {
        try {
            const response = await RESTClient.get(RestEndPoint.GET_STUDENT_PROFILE + `/${childId}`)
            setStudentDetail(response.data)
        } catch (error) {}
    }

    async function getMedicalProfile(childId) {
        try {
            const response = await RESTClient.get(RestEndPoint.GET_STUDENT_MEDICAL_DETAILS + `/${childId}`)
            setMedicalDetail(response.data)
        } catch (error) {}
    }

    async function getParentDetails(childId) {
        try {
            const response = await RESTClient.get(RestEndPoint.GET_STUDENT_PARENT + `/${childId}`)
            setParentDetail(response.data[0])
        } catch (error) {}
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
        } catch (error) {}
      }

    useEffect(() => {
        getChildProfile(childId)
        getMedicalProfile(childId)
        getParentDetails(childId)
        getSupportingDocuments(childId)
    }, [childId])

    async function checkOutApplication() {
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
            <Modal dialogClassName="signin-model add-child-model" show={show} onHide={handleClose}>
                <Modal.Header closeButton>Application</Modal.Header>
                <Modal.Body dialogClassName="model-body" >
                    <Accordion defaultActiveKey="0" flush>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Candidate Details/Extracurriculars</Accordion.Header>
                            <Accordion.Body>
                                <div className="row">
                                    <div className='col-md-4'>
                                        <span>Name </span>
                                        <span>{studentDetail.firstName} {studentDetail.lastName}</span>
                                    </div>
                                    <div className='col-md-4'>
                                        <span>Gender </span>
                                        <span>{studentDetail.gender}</span>
                                    </div>
                                    <div className='col-md-4'>
                                        <span>DOB </span>
                                        <span> {studentDetail.dateOfBirth}</span>
                                    </div>
                                </div>
                                
                                <div className="row">
                                    <div className='col-md-4'>
                                        <span>Identification Marks </span>
                                        <span>{studentDetail.identificationMarks}</span>
                                    </div>
                                    <div className='col-md-4'>
                                        <span>Gender </span>
                                        <span>{studentDetail.religion}</span>
                                    </div>
                                    <div className='col-md-4'>
                                        <span>Nationality </span>
                                        <span>{studentDetail.nationality}</span>
                                    </div>
                                </div>
                                    
                                <div className="row">
                                    <div className='col-md-6'>
                                        <span>Require Tranport </span>
                                        <span>{studentDetail.tranportFacility ? "Yes" : "No"}</span>
                                    </div>
                                    <div className='col-md-6'>
                                        <span>Require Boarding </span>
                                        <span>{studentDetail.boardingFacility ? "Yes" : "No"}</span>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className='col-md-12'>
                                        <span>Address </span>
                                        <span>{studentDetail.addressLine1}, {studentDetail.addressLine2}, {studentDetail.city}, {studentDetail.state} - {studentDetail.pincode}</span>
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
                                        <span>{medicalDetail.bloodGroup}</span>
                                    </div>
                                    <div className='col-md-6'>
                                        <span>Allergies </span>
                                        <span>{medicalDetail.allergies && medicalDetail.allergies !== '' ? medicalDetail.allergies : "No"}</span>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className='col-md-6'>
                                        <span>Special Care </span>
                                        <span>{medicalDetail.specialCare && medicalDetail.specialCare !== '' ? medicalDetail.specialCare : "No"}</span>
                                    </div>
                                    <div className='col-md-6'>
                                        <span>Medical Conditions </span>
                                        <span>{medicalDetail.medicalConditions && medicalDetail.medicalConditions !== '' ? medicalDetail.medicalConditions : "No"}</span>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className='col-md-12'>
                                        <span>Disabilities </span>
                                        <span>{medicalDetail.disabilities && medicalDetail.disabilities !== '' ? medicalDetail.disabilities.join(', ') : "No"}</span>
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
                                        <span>{parentDetail.firstName} {parentDetail.lastName}</span>
                                    </div>
                                    <div className='col-md-4'>
                                        <span>Gender </span>
                                        <span>{parentDetail.gender}</span>
                                    </div>
                                    <div className='col-md-4'>
                                        <span>DOB </span>
                                        <span>{parentDetail.dateOfBirth}</span>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className='col-md-4'>
                                        <span>Relation </span>
                                        <span>{parentDetail.relation}</span>
                                    </div>
                                    <div className='col-md-4'>
                                        <span>Marital Status </span>
                                        <span>{parentDetail.maritalStatus}</span>
                                    </div>
                                    <div className='col-md-4'>
                                        <span>Nationality </span>
                                        <span>{parentDetail.nationality}</span>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className='col-md-4'>
                                        <span>Qualification </span>
                                        <span>{parentDetail.qualification}</span>
                                    </div>
                                    <div className='col-md-8'>
                                        <span>Occupation </span>
                                        <span>{parentDetail.occupation}</span>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className='col-md-8'>
                                        <span>Annual Family Income </span>
                                        <span>{parentDetail.annualFamilyIncomes?.replace('[','').replace(']','').replace(',',' - ')}</span>
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
                                                return <div key={'childDoc_'+index} className="row">
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
                                            })
                                        }
                                    </Tab>
                                    <Tab eventKey='parent1' title='Parent/Guardian' >
                                        {
                                            parentDocuments.length && parentDocuments.map((document, index) => {
                                                return <div key={'parentDoc_'+index} className="row">
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
                                            })
                                        }
                                    </Tab>
                                </Tabs>
                            </div>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                    <Button className='applyFilter' onClick={()=>checkOutApplication()}>Checkout</Button>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default ReviewAdmissionDialog;

