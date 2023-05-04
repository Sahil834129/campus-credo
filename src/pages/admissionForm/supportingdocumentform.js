import React, { useCallback, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import '../../assets/scss/custom-styles.scss'
import RestEndPoint from '../../redux/constants/RestEndpoints'
import RESTClient from '../../utils/RestClient'
import { DocumentTableFormat } from './documentTableForm'
import ConfirmDialog from '../../common/ConfirmDialog'

export const SupportingDocumentForm = ({ currentStudent, setStep }) => {
  const navigate = useNavigate()
  const [enable, setEnable] = useState(false);
  const [studentDocuments, setStudentDocuments] = useState([])
  const [parentDocuments, setParentDocuments] = useState([])
  const [key, setKey] = useState('student')
  const [check1, setCheck1] = useState(false)
  const [check2, setCheck2] = useState(false)
  const [submittedSuccessfully, setSubmittedSuccessfully] = useState(false);

  const [condition, setCondition] = useState(false);

  const handleConfirmSuccessfulDialog = () => {
    navigate("/schools");
    setSubmittedSuccessfully(false);
  };
  const finalSubmit = async () => {
    if (check1 && check2) {
      setEnable(true);
      try {
        await RESTClient.get(
          RestEndPoint.MARK_PROFILE_COMPLETE + `/${currentStudent.childId}`
        );
        setCondition(false);
        setSubmittedSuccessfully(true);
        setEnable(false);
      } catch (error) {
        toast.error(RESTClient.getAPIErrorMessage(error))
        setEnable(false);
      }
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
      toast.error('Some Mandatory Documents are missing!')
    }
    else {
      finalSubmit()
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
                  setCheck1(e.target.checked)
                  setCondition(!e.target.checked)
                }}
              />
              <Form.Check
                type='checkbox'
                label={
                  <div>
                    <span>I have read, understood and accept the </span>
                    <a href={`/termsOfService`} target="_blank">
                      <u> Terms of Service </u>
                    </a>
                    <span> , </span>
                    <a href={`/privacyPolicy`} target="_blank">
                      <u>Privacy Policy</u>
                    </a>
                    <span> , </span>
                    <span> and </span>
                    <a href={`/refundPolicy`} target="_blank">
                      <u> Refund Policy</u>
                    </a>
                    <span>.</span>
                  </div>
                }
                required
                onChange={(e) => {
                  setCheck2(e.target.checked)
                  setCondition(!e.target.checked)
                }}
              />
              {condition && <label style={{ display: 'flex', color: 'Red' }}>Please accept all T&C  </label>}
            </div>
          </Tab>
        </Tabs>
      </div>
      <div className="fld-row button-wrap">
        <Button
          type='button'
          className='cancel comn'
          onClick={() => navigate('/userProfile')}
        >
          Cancel
        </Button>
        {key === 'student' ?
          <Button
            type='button'
            className='save comn'
            onClick={() => {
              setStep(val => val - 1)
              window.scrollTo(0, 0)
            }}
          >
            Back
          </Button>
          : ''}
        <Button
          className='save comn'
          onClick={() =>
            setKey(val => (val === 'student' ? 'parent' : 'student'))
          }
        >
          {key === 'student' ? 'Next' : 'Back'}
        </Button>
        {key === 'parent' && (
          <Button
            className='save comn'
            disabled={enable}
            onClick={() =>{ 
              validateAllDocumentFilled(studentDocuments, parentDocuments)}}
          >
            Submit
          </Button>
        )}
      
      </div>

      <ConfirmDialog
        show={submittedSuccessfully}
        message="You are all set to apply in schools."
        handleConfirm={handleConfirmSuccessfulDialog}
      />
    </>
  )
}
export default SupportingDocumentForm
