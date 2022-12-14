import React, { useState } from 'react'
import '../../assets/scss/custom-styles.scss'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import RESTClient from '../../utils/RestClient'
import RestEndPoint from '../../redux/constants/RestEndpoints'
import { useEffect } from 'react'
import { DocumentTableFormat } from './documentTableForm'
import { toast } from 'react-toastify'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

export const SupportingDocumentForm = ({ currentStudent, setStep }) => {
  const navigate = useNavigate()
  const [studentDocuments, setStudentDocuments] = useState([])
  const [parentDocuments, setParentDocuments] = useState([])
  const [key, setKey] = useState('student')
  const [show, setShow] = useState(false)
  const [check, setCheck] = useState(false)
  const [condition, setCondition] = useState(false)
  const finalSubmit = () => {
    if (check) {
      RESTClient.get(
        RestEndPoint.MARK_PROFILE_COMPLETE + `/${currentStudent.childId}`
      )
      setCondition(false)
      toast.success('Student Details saved')
      navigate('/userProfile')
    }
    else {
      setCondition(true)
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

  const validateAllDocumentFilled = async (stuDocs, parDocs) => {
    const stuDocsUnfilled = stuDocs.filter(
      val => val.status !== 'uploaded' && val.mandatory
    )
    const parDocsUnfilled = parDocs.filter(
      val => val.status !== 'uploaded' && val.mandatory
    )
    if (stuDocsUnfilled.length || parDocsUnfilled.length) {
      toast.error('Some Mandatory Files are missing!')
    }
    else {
      // setShow(true)
      finalSubmit()
      toast.success("document uploaded successfully")
    }
  }

  useEffect(() => {
    if (currentStudent.childId) getSupportingDocument(currentStudent.childId)
  }, [currentStudent.childId, getSupportingDocument])

  return (
    <>
      <div className='supporting-document tab_btn'>
        <Tabs
          id='controlled-tab-example'
          activeKey={key}
          onSelect={k => setKey(k)}
          className='mb-3'
        >
          <Tab eventKey='student' title='Student' >
            <div className='tab-content'>
              <div className='tab-pane active' id='paperback'>
                <DocumentTableFormat
                  documents={studentDocuments}
                  currentStudent={currentStudent}
                  currentTab={key}
                  setDocument={setStudentDocuments}
                />
              </div>
            </div>
          </Tab>
          <Tab eventKey='parent' title='Parent/Guardian' >
            <div className='tab-content'>
              <div className='tab-pane active' id='paperback'>
                <DocumentTableFormat
                  documents={parentDocuments}
                  currentStudent={currentStudent}
                  currentTab={key}
                  setDocument={setParentDocuments}
                />
              </div>
            </div>
            <div>
              <Form.Check
                type='checkbox'
                label='I hereby declare that all the particulars and the documents I have provided in, or in connection with, this application are true, up-to-date and correct'
                required
                onChange={(e) => {
                  setCheck(e.target.checked)
                  setCondition(!e.target.checked)
                }} 
              />
              {condition && <label style={{ display: 'flex', color: 'Red' }}>Please accept all T&C  </label>}
              <Form.Check
                type='checkbox'
                label='I have read, understood and accept the Terms of Use, Privacy Policy and Refund Policy'
                required
                onChange={(e) => {
                  setCheck(e.target.checked)
                  setCondition(!e.target.checked)
                }} 
              />
              {condition && <label style={{ display: 'flex', color: 'Red' }}>Please accept all T&C  </label>}
            </div>
          </Tab>
        </Tabs>
      </div>
      <div className='form-group mb-3 button-wrap'>
        <button
          type='button'
          className='cancel comn'
          onClick={() => navigate('/userProfile')}
        >
          Cancel
        </button>
        {key === 'student' ?
          <button
            type='button'
            className='save comn me-2'
            onClick={() => {
              setStep(val => val - 1)
              window.scrollTo(0, 0)
            }}
          >
            Back
          </button>
          : ''}
        <button
          className='save comn me-2'
          onClick={() =>
            setKey(val => (val === 'student' ? 'parent' : 'student'))
          }
        >
          {key === 'student' ? 'Next' : 'Back'}
        </button>
        {key === 'parent' && (
          <button
            className='save comn'
            onClick={() =>
              validateAllDocumentFilled(studentDocuments, parentDocuments)}
          >
            Submit
          </button>
        )}
        <Modal
          show={show}
          onHide={() => {
            setCheck(false)
            setShow(false)
            setCondition(false)
          }}>
          <Modal.Header closeButton>
            <Modal.Title>Please Confirm</Modal.Title>
          </Modal.Header>
          <Modal.Body class=" modal-content">
            <div style={{ padding: "20px" }}>
              <p >
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
              </p>
            </div>
            <div style={{ padding: "20px" }}>
              <input
                type='checkbox'
                onChange={(e) => {
                  setCheck(e.target.checked)
                  setCondition(!e.target.checked)
                }} style={{ marginRight: "10px" }} />
              <label>I understand and Accept</label>
              {condition && <label style={{ display: 'flex', color: 'Red' }}>Please accept all T&C  </label>}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => {
              setCheck(false)
              setShow(false)
              setCondition(false)
            }}>
              Close
            </Button>
            <Button variant="primary" onClick={finalSubmit}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  )
}
export default SupportingDocumentForm
