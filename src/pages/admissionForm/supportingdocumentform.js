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

export const SupportingDocumentForm = ({ currentStudent, setStep }) => {
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
      // const response = await RESTClient.post(
      //   RestEndPoint.APPLICATION_CHECKOUT + `/${currentStudent.childId}`
      // )
      // console.log(response.data)
      toast.success('Student Details saved')
    }
  }

  useEffect(() => {
    if (currentStudent.childId) getSupportingDocument(currentStudent.childId)
  }, [currentStudent.childId, getSupportingDocument])

  return (
    <>
      <div className='tab_btn'>
        <Tabs
          id='controlled-tab-example'
          activeKey={key}
          onSelect={k => setKey(k)}
          className='mb-3'
        >
          <Tab eventKey='student' title='Student' disabled>
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
          <Tab eventKey='parent' title='Parent/Guardian' disabled>
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
          // onClick={() => history('/parentsguardianform')}
        >
          Cancel
        </button>
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
