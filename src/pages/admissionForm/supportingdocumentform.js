import React, { useState } from 'react'
import '../../assets/scss/custom-styles.scss'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'

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
    } else {
      await RESTClient.get(
        RestEndPoint.MARK_PROFILE_COMPLETE + `/${currentStudent.childId}`
      )
      toast.success('Student Details saved')
      navigate('/userProfile')
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
        { key === 'student' ? 
          <button
            type='button'
            className='save comn me-2'
            onClick={() => {setStep(val => val - 1); window.scrollTo(0, 0)}}
            >
              Back
          </button>
          : '' }
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
              validateAllDocumentFilled(studentDocuments, parentDocuments)
            }
          >
            Submit
          </button>
        )}
      </div>
    </>
  )
}
export default SupportingDocumentForm
