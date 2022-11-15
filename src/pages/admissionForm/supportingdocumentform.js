import React, { useState, useRef } from 'react'
import '../../assets/scss/custom-styles.scss'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'

import { useNavigate } from 'react-router-dom'

import { Formik, Form } from 'formik'
import InputField from '../../components/form/InputField'
import RESTClient from '../../utils/RestClient'
import RestEndPoint from '../../redux/constants/RestEndpoints'
import { useEffect } from 'react'
import { humanize } from '../../utils/helper'

export const SupportingDocumentForm = ({ currentStudent, setStep }) => {
  const [submitting, setSubmitting] = useState(false)
  const [studentDocuments, setStudentDocuments] = useState([])
  const [parentDocuments, setParentDocuments] = useState([])
  const [fileUploadErrors, setFileUploadErrrors] = useState({})

  const [key, setKey] = useState('home')

  const [files, setFiles] = useState({})
  const [documentExist, setDocumentExist] = useState(false)
  const [loader, setLoader] = useState(false)
  const saveData = formData => {
    console.log(JSON.stringify(formData))
  }
  const hiddenFileInput = useRef(null)

  // Customize the file upload UI (see "customization"):
  const handleFileChangeInput = e => {
    setFiles(val => {
      return {
        ...val,
        [e.target.name]: e.target.files[0]
      }
    })
  }

  const fileUplaod = (fileType, files) => {
    const error = {}
    if (files[fileType]) {
      console.log(fileType, files)
      error[fileType] = ''
    } else {
      error[fileType] = 'File is not selected'
    }
    setFileUploadErrrors(val => {
      return {
        ...val,
        ...error
      }
    })
  }
  const getSupportingDocument = async () => {
    try {
      const response = await RESTClient.get(
        RestEndPoint.STUDENT_DOCUMENT + `/${currentStudent.childId}`
      )
      console.log(response.data.studentDocumentDto)
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
        setDocumentExist(true)
      } else {
        setDocumentExist(false)
      }
    } catch (error) {
      // toast.error(RESTClient.getAPIErrorMessage(error))
    }
  }

  useEffect(() => {
    console.log(currentStudent)
    if (currentStudent.childId) getSupportingDocument(currentStudent)
  }, [currentStudent])

  return (
    <Formik
      initialValues={{
        file1: '',
        documentName: ''
      }}
      validateOnBlur
      onSubmit={values => {
        saveData(values)
      }}
    >
      {({ values, setFieldValue, errors, touched }) => (
        <Form className='row g-3'>
          <div className='tab_btn'>
            <Tabs
              id='controlled-tab-example'
              activeKey={key}
              onSelect={k => setKey(k)}
              className='mb-3'
            >
              <Tab eventKey='home' title='Student'>
                <div className='tab-content'>
                  <div className='tab-pane active' id='paperback'>
                    <Form className='row g-3'>
                      <Table bordered hover>
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Document Name</th>
                            <th>Select</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {studentDocuments.map((val, index) => (
                            <tr>
                              <td>{index + 1}</td>
                              <td>{humanize(val.documentName)}</td>
                              <td>
                                <input
                                  type='file'
                                  name={val.documentName}
                                  onChange={handleFileChangeInput}
                                  accept='.png, .jpg, .jpeg .pdf'
                                />
                                {fileUploadErrors[val.documentName] !==
                                undefined
                                  ? fileUploadErrors[val.documentName]
                                  : ''}
                              </td>
                              <td>
                                <Button
                                  className='ok-btn'
                                  onClick={e => {
                                    fileUplaod(val.documentName, files)
                                  }}
                                >
                                  Upload
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </Form>
                  </div>
                  <div className='tab-pane' id='ebook'>
                    <h1>hello shiv</h1>
                  </div>
                </div>
              </Tab>
              <Tab eventKey='profile' title='Parent/Guardian'>
                <div className='tab-content'>
                  <div className='tab-pane active' id='paperback'>
                    <Form className='row g-3'>
                      <Table bordered hover>
                        <thead>
                          <th>#</th>
                          <th>Document Name</th>
                          <th>Select</th>
                          <th>Action</th>
                        </thead>
                        <tbody>
                          {parentDocuments.map((val, index) => (
                            <tr>
                              <td>{index + 1}</td>
                              <td>{humanize(val.documentName)}</td>
                              <td>
                                <input type='file' name={val.documentName} />
                              </td>
                              <td>
                                <Button
                                  className='ok-btn'
                                  onClick={e => {
                                    console.log(e)
                                  }}
                                >
                                  Upload
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </Form>
                  </div>
                  <div className='tab-pane' id='ebook'>
                    <h1>hello shiv</h1>
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
              {submitting ? 'Please wait...' : 'Cancel'}
            </button>
            <button
              className='save comn'
              type='submit'
              submitting={submitting}
              // onClick={() => history('/supportingdocumentform')}
            >
              Save &amp; Next
            </button>
          </div>
        </Form>
      )}
    </Formik>
  )
}
export default SupportingDocumentForm
